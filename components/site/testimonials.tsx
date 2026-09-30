import { SectionHeading } from '@/components/site/section-heading'

const testimonials = [
  {
    quote:
      'Depois de um incêndio no galpão, a indenização saiu em semanas e o seguro de lucros cessantes manteve a folha em dia.',
    name: 'Mariana Duarte',
    role: 'Diretora Financeira, Indústria de embalagens (fictício)',
  },
  {
    quote:
      'Sofremos uma tentativa de ransomware. A cobertura cyber acionou peritos em poucas horas e evitou o pior.',
    name: 'Rafael Nogueira',
    role: 'CTO, Plataforma SaaS (fictício)',
  },
  {
    quote:
      'Consolidamos frota, carga e RC em uma só apólice. A gestão ficou simples e o custo caiu na renovação.',
    name: 'Carla Menezes',
    role: 'Gerente de Operações, Transportadora (fictício)',
  },
]

export function Testimonials() {
  return (
    <section aria-labelledby="depoimentos-title" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-6">
        <SectionHeading
          id="depoimentos-title"
          eyebrow="Clientes"
          title="Quando o imprevisto acontece, a diferença aparece"
          align="center"
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-muted p-7">
                <blockquote className="text-base leading-relaxed text-pretty text-foreground">
                  {`“${t.quote}”`}
                </blockquote>
                <figcaption className="flex flex-col gap-0.5 border-t border-border pt-4">
                  <span className="font-heading font-bold text-foreground">{t.name}</span>
                  <span className="text-sm text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
