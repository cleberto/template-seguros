import { z } from 'zod'

export function onlyDigits(value: string) {
  return value.replace(/\D/g, '')
}

export function isValidCnpj(raw: string) {
  const cnpj = onlyDigits(raw)
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false

  const calcDigit = (base: string) => {
    const weights = base.length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const sum = base.split('').reduce((acc, digit, i) => acc + Number(digit) * weights[i], 0)
    const rest = sum % 11
    return rest < 2 ? 0 : 11 - rest
  }

  const d1 = calcDigit(cnpj.slice(0, 12))
  const d2 = calcDigit(cnpj.slice(0, 12) + d1)
  return cnpj.endsWith(`${d1}${d2}`)
}

export function formatCnpj(value: string) {
  return onlyDigits(value)
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11)
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2')
  }
  return digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')
}

const safeText = (min: number, max: number, label: string) =>
  z
    .string()
    .trim()
    .min(min, `${label} deve ter ao menos ${min} caracteres.`)
    .max(max, `${label} deve ter no máximo ${max} caracteres.`)
    .refine((v) => !/[<>]/.test(v), `${label} contém caracteres não permitidos.`)

export const COVERAGE_OPTIONS = [
  'Patrimonial',
  'Responsabilidade Civil',
  'D&O',
  'Cyber',
  'Frota',
  'Vida em Grupo',
] as const

export const EMPLOYEE_RANGES = ['1 a 19', '20 a 99', '100 a 499', '500 ou mais'] as const

export const quoteSchema = z.object({
  name: safeText(3, 80, 'Nome'),
  company: safeText(2, 120, 'Razão social'),
  cnpj: z.string().refine(isValidCnpj, 'Informe um CNPJ válido.'),
  email: z.string().trim().toLowerCase().max(120).email('Informe um e-mail corporativo válido.'),
  phone: z
    .string()
    .transform(onlyDigits)
    .refine((v) => v.length === 10 || v.length === 11, 'Informe um telefone com DDD.'),
  employees: z.enum(EMPLOYEE_RANGES, { message: 'Selecione o porte da empresa.' }),
  coverages: z.array(z.enum(COVERAGE_OPTIONS)).min(1, 'Selecione ao menos uma cobertura.'),
  message: z
    .string()
    .trim()
    .max(600, 'A mensagem deve ter no máximo 600 caracteres.')
    .refine((v) => !/[<>]/.test(v), 'A mensagem contém caracteres não permitidos.')
    .optional()
    .default(''),
  consent: z.literal('on', { message: 'É necessário aceitar a Política de Privacidade.' }),
})

export type QuoteFieldErrors = Partial<Record<keyof z.infer<typeof quoteSchema>, string>>
