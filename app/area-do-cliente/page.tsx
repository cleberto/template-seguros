import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, KeyRound, LifeBuoy, ShieldCheck } from 'lucide-react'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Área do cliente',
  description: 'Acesse apólices, boletos e sinistros com autenticação segura.',
  robots: { index: false, follow: false },
}

const features = [
  { icon: FileText, title: 'Apólices e endossos', text: 'Documentos vigentes e histórico em um só lugar.' },
  { icon: LifeBuoy, title: 'Abertura de sinistros', text: 'Registre ocorrências e acompanhe cada etapa.' },
  { icon: KeyRound, title: 'Acesso com MFA', text: 'Login com segundo fator e sessões com expiração.' },
]

export default function ClientAreaPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center md:px-6 md:py-28">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <ShieldCheck className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance text-primary md:text-5xl">
          Área do cliente
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
          Este template reserva este espaço para o portal autenticado. Conecte um provedor de autenticação e
          banco de dados para habilitar o acesso.
        </p>

        <ul className="mt-12 grid w-full gap-4 text-left sm:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <h2 className="font-bold text-foreground">{title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>

        <Link href="/" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'mt-12 h-11 px-5')}>
          Voltar para o início
        </Link>
      </main>
      <Footer />
    </>
  )
}
