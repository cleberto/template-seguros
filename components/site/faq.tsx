import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionHeading } from '@/components/site/section-heading'

const questions = [
  {
    q: 'Qual o porte mínimo de empresa para contratar?',
    a: 'Atendemos desde MEIs e pequenas empresas até grandes grupos. As coberturas e franquias são ajustadas ao porte e ao faturamento.',
  },
  {
    q: 'Quanto tempo leva para receber uma proposta?',
    a: 'Para riscos padrão, enviamos a proposta em até 48 horas úteis. Riscos complexos podem exigir vistoria técnica prévia.',
  },
  {
    q: 'Posso incluir várias unidades em uma única apólice?',
    a: 'Sim. É possível consolidar filiais, depósitos e escritórios em um único contrato, com limites por local.',
  },
  {
    q: 'Como aciono o seguro em caso de sinistro?',
    a: 'Pela central 24 horas ou pela área do cliente. Um analista acompanha o processo até a indenização.',
  },
  {
    q: 'Como meus dados são protegidos?',
    a: 'Aplicamos criptografia, controle de acesso, registros de auditoria e seguimos a LGPD. Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo canal do Encarregado (DPO).',
  },
]

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="duvidas-title"
            eyebrow="Dúvidas frequentes"
            title="Perguntas que ouvimos toda semana"
            description="Não encontrou o que procurava? Fale com um consultor pelo formulário de cotação."
          />
        </div>
        <Accordion className="lg:col-span-7">
          {questions.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-border">
              <AccordionTrigger className="py-5 font-heading text-base font-bold text-foreground hover:no-underline md:text-lg">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
