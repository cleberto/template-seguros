import { Building2, Car, FileLock2, Gavel, HeartPulse, ServerCog, Truck, Umbrella } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const coverages = [
  {
    icon: Building2,
    title: 'Patrimonial',
    text: 'Incêndio, explosão, danos elétricos, roubo e vendaval para prédios, máquinas e estoque.',
  },
  {
    icon: Gavel,
    title: 'Responsabilidade Civil',
    text: 'Protege contra danos causados a terceiros por operações, produtos ou prestação de serviços.',
  },
  {
    icon: FileLock2,
    title: 'D&O',
    text: 'Resguarda o patrimônio pessoal de diretores e conselheiros em decisões de gestão.',
  },
  {
    icon: ServerCog,
    title: 'Cyber',
    text: 'Resposta a incidentes, vazamento de dados, extorsão digital e interrupção de sistemas.',
  },
  {
    icon: Car,
    title: 'Frota',
    text: 'Veículos corporativos com assistência 24h, carro reserva e gestão centralizada.',
  },
  {
    icon: HeartPulse,
    title: 'Vida em Grupo',
    text: 'Benefício para colaboradores com coberturas por morte, invalidez e doenças graves.',
  },
  {
    icon: Truck,
    title: 'Transporte de Cargas',
    text: 'Mercadorias protegidas em trajetos nacionais e internacionais, do embarque à entrega.',
  },
  {
    icon: Umbrella,
    title: 'Lucros Cessantes',
    text: 'Repõe o faturamento perdido quando um sinistro interrompe a sua operação.',
  },
]

export function Coverages() {
  return (
    <section id="coberturas" aria-labelledby="coberturas-title" className="bg-muted py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-6">
        <SectionHeading
          id="coberturas-title"
          eyebrow="Coberturas"
          title="Uma apólice, todos os riscos que importam"
          description="Combine as coberturas de que sua empresa precisa em um único contrato, com vencimento e gestão unificados."
        />

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {coverages.map(({ icon: Icon, title, text }) => (
            <li key={title} className="group flex flex-col gap-4 bg-card p-6 transition-colors hover:bg-secondary md:p-7">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
