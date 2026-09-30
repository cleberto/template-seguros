import { Clock, Headphones, Mail, Phone } from 'lucide-react'
import { QuoteForm } from '@/components/site/quote-form'
import { SectionHeading } from '@/components/site/section-heading'
import { COMPANY } from '@/lib/site'

export function QuoteSection() {
  return (
    <section id="cotacao" aria-labelledby="cotacao-title" className="bg-muted py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <SectionHeading
            id="cotacao-title"
            eyebrow="Cotação"
            title="Receba uma proposta sob medida"
            description="Preencha os dados abaixo e um consultor especializado no seu setor entrará em contato."
          />

          <ul className="flex flex-col gap-5">
            <li className="flex gap-4">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-foreground">Retorno em até 1 dia útil</p>
                <p className="text-sm leading-relaxed text-muted-foreground">Segunda a sexta, das 8h às 18h.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Headphones className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold text-foreground">Sinistros 24 horas</p>
                <p className="text-sm leading-relaxed text-muted-foreground">Central dedicada para clientes.</p>
              </div>
            </li>
          </ul>

          <div className="flex flex-col gap-3 border-t border-border pt-8">
            <a href={COMPANY.phoneHref} className="flex items-center gap-3 font-semibold text-foreground hover:text-primary">
              <Phone className="size-4 text-primary" aria-hidden="true" />
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 font-semibold text-foreground hover:text-primary">
              <Mail className="size-4 text-primary" aria-hidden="true" />
              {COMPANY.email}
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
