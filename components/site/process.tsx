import { SectionHeading } from '@/components/site/section-heading'

const steps = [
  {
    title: 'Diagnóstico de riscos',
    text: 'Entendemos sua operação, ativos, contratos e exposições em uma conversa com um consultor.',
  },
  {
    title: 'Proposta comparativa',
    text: 'Cotamos com seguradoras parceiras e apresentamos as opções lado a lado, sem letras miúdas.',
  },
  {
    title: 'Contratação digital',
    text: 'Assinatura eletrônica, apólice emitida e documentos disponíveis na área do cliente.',
  },
  {
    title: 'Gestão contínua',
    text: 'Acompanhamento de sinistros, renovações e ajustes sempre que sua empresa crescer.',
  },
]

export function Process() {
  return (
    <section id="como-funciona" aria-labelledby="processo-title" className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 md:px-6">
        <SectionHeading
          id="processo-title"
          eyebrow="Como funciona"
          title="Do diagnóstico à apólice em quatro etapas"
          description="Um processo transparente e acompanhado por um único consultor do início ao fim."
          inverted
        />

        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col gap-4 border-t border-primary-foreground/20 pt-6">
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-0.5 w-12 bg-accent"
              />
              <span className="font-heading text-sm font-bold tabular-nums text-accent">
                {`Etapa ${i + 1}`}
              </span>
              <h3 className="text-xl font-bold text-primary-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-primary-foreground/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
