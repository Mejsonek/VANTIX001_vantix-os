import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';

  try {
    // Sumaryczne użycie tokenów z workflow_logs (gdzie payload zawiera usage info)
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const since = new Date();
    since.setDate(since.getDate() - days);

    const logs = await prisma.workflowLog.findMany({
      where: {
        createdAt: { gte: since },
        status: 'success',
      },
      select: {
        payload: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Próba wyciągnięcia token usage z payloadów
    const tokenData = logs
      .map((log) => {
        const payload = log.payload as Record<string, unknown> | null;
        if (payload && typeof payload.usage === 'object' && payload.usage) {
          const usage = payload.usage as Record<string, number>;
          return {
            date: log.createdAt.toISOString().split('T')[0],
            inputTokens: usage.input_tokens || usage.inputTokens || 0,
            outputTokens: usage.output_tokens || usage.outputTokens || 0,
          };
        }
        return { date: log.createdAt.toISOString().split('T')[0], inputTokens: 0, outputTokens: 0 };
      })
      .filter((d) => d.inputTokens > 0 || d.outputTokens > 0);

    const totalInputTokens = tokenData.reduce((sum, d) => sum + d.inputTokens, 0);
    const totalOutputTokens = tokenData.reduce((sum, d) => sum + d.outputTokens, 0);
    const totalCalls = tokenData.length;

    return NextResponse.json(
      {
        data: {
          total_input_tokens: totalInputTokens,
          total_output_tokens: totalOutputTokens,
          total_tokens: totalInputTokens + totalOutputTokens,
          total_calls: totalCalls,
          days,
          breakdown: tokenData,
        },
        correlation_id: correlationId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] /api/analytics/token-usage error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}
