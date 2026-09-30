'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { CheckCircle2, Loader2, Lock } from 'lucide-react'
import { submitQuote, type QuoteState } from '@/lib/quote'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { COVERAGE_OPTIONS, EMPLOYEE_RANGES, formatCnpj, formatPhone } from '@/lib/validation'
import { cn } from '@/lib/utils'

const initialState: QuoteState = { status: 'idle' }

const fieldClass = 'h-11 rounded-lg bg-card px-3 text-base'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-sm font-medium text-destructive">
      {message}
    </p>
  )
}

export function QuoteForm() {
  const [state, setState] = useState<QuoteState>(initialState)
  const [pending, setPending] = useState(false)
  const [startedAt] = useState(() => Date.now())
  const [cnpj, setCnpj] = useState('')
  const [phone, setPhone] = useState('')
  const errors = state.errors ?? {}

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    setPending(true)
    try {
      const result = await submitQuote(new FormData(form))
      setState(result)
      if (result.errors) {
        const firstInvalid = Object.keys(result.errors)[0]
        form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      }
    } finally {
      setPending(false)
    }
  }

  if (state.status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-8">
        <span className="flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <h3 className="text-2xl font-bold text-foreground">Solicitação enviada</h3>
        <p className="leading-relaxed text-muted-foreground">{state.message}</p>
        <p className="rounded-lg bg-muted px-3 py-2 font-mono text-sm text-foreground">
          {`Protocolo: ${state.protocol}`}
        </p>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-busy={pending}
      className="relative flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
      <input type="hidden" name="startedAt" value={startedAt} />
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && state.message && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="company">Razão social</Label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            required
            maxLength={120}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={fieldClass}
          />
          <FieldError id="company-error" message={errors.company} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            name="cnpj"
            inputMode="numeric"
            placeholder="00.000.000/0000-00"
            required
            value={cnpj}
            onChange={(e) => setCnpj(formatCnpj(e.target.value))}
            aria-invalid={!!errors.cnpj}
            aria-describedby={errors.cnpj ? 'cnpj-error' : undefined}
            className={fieldClass}
          />
          <FieldError id="cnpj-error" message={errors.cnpj} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="employees">Nº de colaboradores</Label>
          <select
            id="employees"
            name="employees"
            required
            defaultValue=""
            aria-invalid={!!errors.employees}
            aria-describedby={errors.employees ? 'employees-error' : undefined}
            className={cn(
              fieldClass,
              'w-full border border-input outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive',
            )}
          >
            <option value="" disabled>
              Selecione
            </option>
            {EMPLOYEE_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <FieldError id="employees-error" message={errors.employees} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail corporativo</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={120}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 90000-0000"
            required
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={fieldClass}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
      </div>

      <fieldset
        className="flex flex-col gap-3"
        aria-describedby={errors.coverages ? 'coverages-error' : undefined}
      >
        <legend className="mb-1 text-sm font-medium text-foreground">Coberturas de interesse</legend>
        <div className="flex flex-wrap gap-2">
          {COVERAGE_OPTIONS.map((option) => (
            <label
              key={option}
              className="cursor-pointer rounded-full border border-input px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
            >
              <input type="checkbox" name="coverages" value={option} className="sr-only" />
              {option}
            </label>
          ))}
        </div>
        <FieldError id="coverages-error" message={errors.coverages} />
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Conte um pouco sobre a operação (opcional)</Label>
        <Textarea
          id="message"
          name="message"
          rows={3}
          maxLength={600}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="rounded-lg bg-card px-3 py-2 text-base"
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            name="consent"
            value="on"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-0.5"
          />
          <Label htmlFor="consent" className="block text-sm leading-relaxed font-normal text-muted-foreground">
            Autorizo o uso dos meus dados para contato sobre esta cotação, conforme a{' '}
            <Link href="/privacidade" className="font-medium text-primary underline underline-offset-4">
              Política de Privacidade
            </Link>
            .
          </Label>
        </div>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <Button type="submit" size="lg" disabled={pending} className="h-12 text-base">
        {pending ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          'Solicitar cotação'
        )}
      </Button>
      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock className="size-3.5" aria-hidden="true" />
        Conexão criptografada. Não compartilhamos seus dados com terceiros.
      </p>
    </form>
  )
}
