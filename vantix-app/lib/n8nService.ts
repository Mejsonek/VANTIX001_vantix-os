export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/[&<>"'`]/g, (char) => {
      const entities: Record<string, string> = {
        '&': '&amp;', '<': '&lt;', '>': '&gt;',
        '"': '&quot;', "'": '&#39;', '`': '&#96;',
      };
      return entities[char];
    });
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export interface FormErrors {
  client_name?: string;
  email?: string;
  phone?: string;
  pain_desc?: string;
}

export interface N8NPayload {
  source: string;
  timestamp: string;
  lead: {
    name: string;
    email: string;
    phone: string;
    message: string;
    service_type: string;
  };
}

export function validateForm(data: {
  client_name: string;
  email: string;
  phone: string;
  pain_desc: string;
}): FormErrors {
  const errors: FormErrors = {};

  if (!isNotEmpty(data.client_name)) {
    errors.client_name = 'Podaj imię i nazwisko.';
  } else if (data.client_name.trim().length < 2) {
    errors.client_name = 'Imię i nazwisko musi mieć co najmniej 2 znaki.';
  }

  if (!isNotEmpty(data.email)) {
    errors.email = 'Podaj adres e-mail.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Nieprawidłowy format adresu e-mail.';
  }

  if (!isNotEmpty(data.phone)) {
    errors.phone = 'Podaj numer telefonu.';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Numer telefonu jest nieprawidłowy (min. 7 cyfr).';
  }

  if (!isNotEmpty(data.pain_desc)) {
    errors.pain_desc = 'Opisz swój problem.';
  } else if (data.pain_desc.trim().length < 10) {
    errors.pain_desc = 'Opis musi mieć co najmniej 10 znaków.';
  }

  return errors;
}

export async function sendToN8N(payload: N8NPayload): Promise<void> {
  const webhookUrl =
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
    'https://SolutionKacper-VantixN8N.hf.space/webhook-test/715085bc-3b38-4080-aee7-814c923c92e2';

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`n8n zwróciło błąd: HTTP ${response.status}`);
  }
}
