import Link from 'next/link'
import { Eye, KeyRound, LockKeyhole, ScrollText, ServerCrash, UserCheck } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const practices = [
  {
    icon: LockKeyhole,
    title: 'Criptografia de ponta a ponta',
    text: 'Tráfego protegido por TLS 1.2+ com HSTS e dados sensíveis criptografados em repouso.',
  },
  {
    icon: KeyRound,
    title: 'Autenticação em dois fatores',
    text: 'Área do cliente com MFA, sessões com expiração e bloqueio após tentativas suspeitas.',
  },
  {
    icon: ScrollText,
    title: 'Conformidade com a LGPD',
    text: 'Coleta mínima, finalidade declarada, consentimento registrado e Encarregado (DPO) nomeado.',
  },
  {
    icon: UserCheck,
    title: 'Acesso por necessidade',
    text: 'Princípio do menor privilégio: cada colaborador acessa apenas o que precisa para atender você.',
  },
  {
    icon: Eye,
    title: 'Monitoramento contínuo',
    text: 'Registros de auditoria, detecção de anomalias e testes de intrusão periódicos.',
  },
  {
    icon: ServerCrash,
    title: 'Plano de resposta a incidentes',
    text: 'Procedimentos documentados e comunicação à ANPD e aos titulares nos prazos legais.',
  },
]

export function Security() {
  return (
    <section id="seguranca" aria-labelledby="seguranca-title" className="py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="seguranca-title"
            eyebrow="Segurança da informação"
            title="Seus dados tratados com o mesmo rigor que seus riscos"
            description="Informações empresariais são ativos críticos. Adotamos práticas alinhadas à ISO/IEC 27001 e à LGPD."
          />
          <Link
            href="/privacidade"
            className="shrink-0 text-sm font-semibold text-primary underline underline-offset-4 hover:text-foreground"
          >
            Ler Política de Privacidade
          </Link>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practices.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
