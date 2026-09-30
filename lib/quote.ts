import { quoteSchema, type QuoteFieldErrors } from '@/lib/validation'

export type QuoteStatus = 'idle' | 'success' | 'error'

export type QuoteState = {
  status: QuoteStatus
  message?: string
  protocol?: string
  errors?: QuoteFieldErrors
}

export const MIN_FILL_TIME_MS = 3000
const COOLDOWN_MS = 60 * 1000
const COOLDOWN_KEY = 'alc-quote-last-submit'
const SUBMIT_DELAY_MS = 900

// Endpoint opcional (Formspree, Make, n8n, Cloudflare Worker...). Adicione a origem ao connect-src da CSP em public/_headers.
const WEBHOOK_URL = process.env.NEXT_PUBLIC_QUOTE_WEBHOOK_URL

export function isBotSubmission(formData: FormData, now = Date.now()) {
  const honeypot = formData.get('website')
  const startedAt = Number(formData.get('startedAt'))
  const filledHoneypot = typeof honeypot === 'string' && honeypot.length > 0
  const tooFast = !startedAt || now - startedAt < MIN_FILL_TIME_MS
  return filledHoneypot || tooFast
}

function isInCooldown(now = Date.now()) {
  try {
    const last = Number(sessionStorage.getItem(COOLDOWN_KEY))
    return !!last && now - last < COOLDOWN_MS
  } catch {
    return false
  }
}

function markSubmitted(now = Date.now()) {
  try {
    sessionStorage.setItem(COOLDOWN_KEY, String(now))
  } catch {
    // sessionStorage indisponível (modo privado restrito); segue sem cooldown.
  }
}

export function validateQuote(formData: FormData) {
  const parsed = quoteSchema.safeParse({
    name: formData.get('name') ?? '',
    company: formData.get('company') ?? '',
    cnpj: formData.get('cnpj') ?? '',
    email: formData.get('email') ?? '',
    phone: formData.get('phone') ?? '',
    employees: formData.get('employees') ?? '',
    coverages: formData.getAll('coverages'),
    message: formData.get('message') ?? '',
    consent: formData.get('consent') ?? '',
  })

  if (parsed.success) return { success: true as const, data: parsed.data }

  const errors: QuoteFieldErrors = {}
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as keyof QuoteFieldErrors
    if (key && !errors[key]) errors[key] = issue.message
  }
  return { success: false as const, errors }
}

function generateProtocol() {
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().slice(0, 4)
  return `ALC-${Date.now().toString(36).toUpperCase()}-${random}`
}

export async function submitQuote(formData: FormData): Promise<QuoteState> {
  if (isBotSubmission(formData)) {
    return { status: 'error', message: 'Não foi possível validar o envio. Tente novamente em alguns segundos.' }
  }

  if (isInCooldown()) {
    return { status: 'error', message: 'Você acabou de enviar uma solicitação. Aguarde um minuto para enviar outra.' }
  }

  const result = validateQuote(formData)
  if (!result.success) {
    return { status: 'error', message: 'Revise os campos destacados.', errors: result.errors }
  }

  const protocol = generateProtocol()

  try {
    if (WEBHOOK_URL) {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...result.data, protocol, submittedAt: new Date().toISOString() }),
        credentials: 'omit',
        referrerPolicy: 'strict-origin-when-cross-origin',
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
    } else {
      await new Promise((resolve) => setTimeout(resolve, SUBMIT_DELAY_MS))
    }
  } catch {
    return { status: 'error', message: 'Não conseguimos enviar agora. Verifique sua conexão e tente novamente.' }
  }

  markSubmitted()

  return {
    status: 'success',
    protocol,
    message: `Recebemos sua solicitação, ${result.data.name.split(' ')[0]}. Um especialista retornará em até 1 dia útil.`,
  }
}
