import type { Metadata } from 'next'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { COMPANY } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Política de Privacidade e Cookies',
  description: 'Como a Alicerce Seguros Empresariais coleta, utiliza e protege dados pessoais, conforme a LGPD.',
}

const sections = [
  {
    title: '1. Dados que coletamos',
    body: 'Coletamos apenas os dados necessários para elaborar cotações e administrar apólices: nome, cargo, e-mail e telefone corporativos, razão social, CNPJ e informações sobre a operação da empresa fornecidas voluntariamente.',
  },
  {
    title: '2. Finalidade e base legal',
    body: 'Os dados são tratados para atendimento de solicitações de cotação (procedimentos preliminares a contrato — art. 7º, V da LGPD), cumprimento de obrigações regulatórias (art. 7º, II) e, mediante consentimento, envio de comunicações (art. 7º, I).',
  },
  {
    title: '3. Compartilhamento',
    body: 'Compartilhamos dados somente com seguradoras parceiras necessárias à cotação e contratação, sob contratos de confidencialidade, e com autoridades quando exigido por lei. Não vendemos dados pessoais.',
  },
  {
    title: '4. Segurança',
    body: 'Adotamos criptografia em trânsito (TLS) e em repouso, controle de acesso baseado em função, autenticação multifator, registros de auditoria, backups e plano de resposta a incidentes.',
  },
  {
    title: '5. Retenção',
    body: 'Mantemos os dados pelo tempo necessário às finalidades descritas e aos prazos legais e regulatórios. Cotações não convertidas são eliminadas em até 12 meses.',
  },
  {
    title: '6. Cookies',
    body: 'Utilizamos cookies essenciais para o funcionamento do site e, somente com sua autorização, cookies de medição de audiência. Você pode alterar sua escolha limpando os cookies do navegador.',
  },
  {
    title: '7. Seus direitos',
    body: 'Você pode solicitar confirmação, acesso, correção, anonimização, portabilidade, eliminação e revogação do consentimento, conforme o art. 18 da LGPD, pelo canal do Encarregado.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">Documento fictício de exemplo</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance text-primary md:text-5xl">
          Política de Privacidade e Cookies
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Última atualização: 30 de setembro de 2026</p>

        <div className="mt-12 flex flex-col gap-10">
          {sections.map((s) => (
            <section key={s.title} className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-foreground">{s.title}</h2>
              <p className="leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
          <section className="flex flex-col gap-3 rounded-2xl bg-muted p-6">
            <h2 className="text-xl font-bold text-foreground">Encarregado pelo tratamento (DPO)</h2>
            <p className="leading-relaxed text-muted-foreground">
              {'Contato: '}
              <a href={`mailto:${COMPANY.dpoEmail}`} className="font-medium text-primary underline underline-offset-4">
                {COMPANY.dpoEmail}
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
