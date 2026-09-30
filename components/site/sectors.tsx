'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionHeading } from '@/components/site/section-heading'

const sectors = [
  {
    id: 'industria',
    label: 'Indústria',
    title: 'Linhas de produção sem paradas inesperadas',
    text: 'Cobertura para quebra de máquinas, lucros cessantes e responsabilidade sobre produtos fabricados.',
    items: ['Quebra de máquinas e equipamentos', 'Lucros cessantes por interrupção', 'RC Produtos e recall'],
  },
  {
    id: 'varejo',
    label: 'Comércio',
    title: 'Lojas, estoques e clientes protegidos',
    text: 'Da vitrine ao centro de distribuição, proteja mercadorias e o atendimento ao público.',
    items: ['Roubo e furto qualificado de estoque', 'RC Estabelecimento comercial', 'Danos elétricos e vidros'],
  },
  {
    id: 'tecnologia',
    label: 'Tecnologia',
    title: 'Riscos digitais tratados como riscos de negócio',
    text: 'Para empresas de software, SaaS e serviços digitais que dependem de dados e disponibilidade.',
    items: ['Cyber e resposta a incidentes', 'RC Profissional (E&O)', 'D&O para rodadas de investimento'],
  },
  {
    id: 'logistica',
    label: 'Logística',
    title: 'Carga, frota e armazém em uma só gestão',
    text: 'Transporte de mercadorias com rastreamento de sinistros e atendimento 24 horas.',
    items: ['Transporte nacional e internacional', 'Frota com assistência 24h', 'Armazenagem e operadores'],
  },
  {
    id: 'saude',
    label: 'Saúde',
    title: 'Clínicas e laboratórios com respaldo técnico',
    text: 'Coberturas desenhadas para a responsabilidade técnica e equipamentos de alto valor.',
    items: ['RC Profissional médica', 'Equipamentos eletrônicos', 'Proteção de dados sensíveis'],
  },
]

export function Sectors() {
  return (
    <section id="setores" aria-labelledby="setores-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="setores-title"
            eyebrow="Setores atendidos"
            title="Especialistas no risco do seu segmento"
            description="Cada setor tem exposições diferentes. Nossos consultores falam a língua da sua operação."
          />

          <Tabs defaultValue="industria" className="gap-6">
            <TabsList
              variant="line"
              className="h-auto! w-full flex-wrap justify-start gap-2 p-0"
              aria-label="Selecione um setor"
            >
              {sectors.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="h-10 flex-none rounded-full border border-border px-4 text-sm after:hidden data-active:border-primary! data-active:bg-primary! data-active:text-primary-foreground!"
                >
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {sectors.map((s) => (
              <TabsContent key={s.id} value={s.id} className="flex flex-col gap-4 animate-in fade-in duration-300">
                <h3 className="text-2xl font-bold text-balance text-foreground">{s.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{s.text}</p>
                <ul className="flex flex-col gap-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base text-foreground">
                      <span className="flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="relative min-h-80 overflow-hidden rounded-3xl bg-muted lg:min-h-full">
          <Image
            src="/images/equipe-consultoria.png"
            alt="Equipe de consultores de risco em reunião com um empresário"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
