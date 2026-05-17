# Cognitive Mesh v1 — Dual-Engine AI Architecture

> Architektura dwusilnikowego systemu AI dla Vantix OS.
> Wersja: 1.0 | Data: 2026-05-17

---

## Koncepcja

Cognitive Mesh to warstwa AI systemu Vantix OS oparta o dwa modele z podziałem ról:

| Rola | Model | Endpoint | Zadanie |
|------|-------|----------|---------|
| **Orchestrator** | Claude Sonnet 4.x | `https://api.anthropic.com` | Dekompozycja zadań, JSON plan, walidacja outputów |
| **Worker** | DeepSeek R1 | `https://api.deepseek.com/v1` (OpenAI-compatible) | Wykonanie atomowych tasków wg specyfikacji |

---

## Przepływ danych

```
[User / Trigger]
       │
       ▼
POST /api/v1/ai/orchestrate
{ correlationId, userBrief }
       │
       ▼
CognitiveMeshEngine.orchestrate()
       │
       ├─► [ORCHESTRATOR — Claude Sonnet]
       │     Prompt: "Rozłóż zadanie na atomowe taski JSON"
       │     Output: OrchestratorPlan (Zod validated)
       │     { steps: [{ id, description, input, expectedOutput, acceptanceCriteria }] }
       │     Zapis: AiOrchestrationJob (status: PROCESSING)
       │
       ├─► [WORKER — DeepSeek R1] × N tasków (sekwencyjnie)
       │     Input: pojedynczy task z planu
       │     Output: rawOutput (string)
       │     Walidacja: Zod schema per task type
       │     Zapis: AiWorkerTask { sequenceOrder, rawOutput, validationPassed }
       │     Retry: max 2 próby jeśli validationPassed = false
       │     Fallback: status KWARANTANNA jeśli retry nie pomaga
       │
       └─► Agregacja wyników
             Zapis: AiOrchestrationJob (status: COMPLETED / QUARANTINED)
             Return: { correlationId, status, results[], cost, executionTime }
```

---

## Modele danych (Prisma)

```prisma
model AiOrchestrationJob {
  id              String        @id @default(cuid())
  correlationId   String        @unique
  userBrief       String
  status          ProcessStatus @default(PENDING)
  orchestratorModel String      @default("claude-sonnet-4-6")
  workerModel     String        @default("deepseek-r1")
  totalTokens     Int?
  totalCostUsd    Float?
  executionTimeMs Int?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  tasks           AiWorkerTask[]
}

model AiWorkerTask {
  id               String   @id @default(cuid())
  jobId            String
  sequenceOrder    Int
  description      String
  input            String
  expectedOutput   String
  rawOutput        String?
  validationPassed Boolean  @default(false)
  retryCount       Int      @default(0)
  tokenCount       Int?
  createdAt        DateTime @default(now())
  job              AiOrchestrationJob @relation(fields: [jobId], references: [id])
}

enum ProcessStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  QUARANTINED
  RETRYING
}
```

---

## Implementacja — `lib/ai/cognitive-mesh.ts`

```typescript
// Szkielet klasy — DeepSeek implementuje pełną wersję

import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai'; // DeepSeek jest OpenAI-compatible
import { z } from 'zod';

const OrchestratorPlanSchema = z.object({
  steps: z.array(z.object({
    id: z.string(),
    description: z.string(),
    input: z.string(),
    expectedOutput: z.string(),
    acceptanceCriteria: z.string(),
  }))
});

export class CognitiveMeshEngine {
  private orchestrator: Anthropic;
  private worker: OpenAI;
  private readonly MAX_COST_USD = 0.50; // hard cap per job

  constructor() {
    this.orchestrator = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    this.worker = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com/v1',
    });
  }

  async orchestrate(correlationId: string, userBrief: string) {
    // 1. Orchestrator decomposes task → JSON plan
    // 2. Validate plan with Zod
    // 3. Save AiOrchestrationJob to DB
    // 4. Execute each step with Worker
    // 5. Validate each output, retry if needed
    // 6. Quarantine if max retries exceeded
    // 7. Update job status, return results
  }
}
```

---

## API Endpoint

```
POST /api/v1/ai/orchestrate
Authorization: Bearer <session_token>
Content-Type: application/json

{
  "userBrief": "Znajdź leady bez follow-up od ponad 3 dni i zaproponuj wiadomości follow-up"
}

Response 200:
{
  "correlationId": "01JVK2...",
  "status": "COMPLETED",
  "results": [...],
  "totalCostUsd": 0.03,
  "executionTimeMs": 4200
}

Response 202 (async):
{
  "correlationId": "01JVK2...",
  "status": "PROCESSING",
  "pollUrl": "/api/v1/workflows/01JVK2..."
}
```

---

## Zasady bezpieczeństwa

1. **Hard cap kosztów:** $0.50 per job — jeśli przekroczony przed zakończeniem → abort + QUARANTINED
2. **Output validation:** każdy output Worker przechodzi przez Zod schema — nigdy nie trafia surowy LLM output do DB bez walidacji
3. **Retry limit:** max 2 retry per task — potem KWARANTANNA (wymaga ręcznej interwencji)
4. **CorrelationId:** UUID v7 na każdym request — śledzalność przez cały stack
5. **Audit trail:** każda akcja Mesh zapisana w `AuditLog`

---

## Zmienne środowiskowe

```env
ANTHROPIC_API_KEY=sk-ant-...
DEEPSEEK_API_KEY=sk-...
```

---

## Wdrożenie

**Phase 2, Sesja C** — implementacja przez DeepSeek wg tej specyfikacji.

Specyfikacja tasków dla DeepSeeka:
1. Task: typy TypeScript (`OrchestratorPlan`, `WorkerTask`, enum `ProcessStatus`)
2. Task: klasa `CognitiveMeshEngine` z metodą `orchestrate()`
3. Task: Prisma modele `AiOrchestrationJob` + `AiWorkerTask`
4. Task: API route `POST /api/v1/ai/orchestrate`
5. Task: testy jednostkowe dla walidacji Zod
