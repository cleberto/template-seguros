import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { CookieBanner } from '@/components/site/cookie-banner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Alicerce Seguros Empresariais | Proteção sob medida para empresas',
    template: '%s | Alicerce Seguros Empresariais',
  },
  description:
    'Seguro empresarial para indústrias, comércio, serviços e tecnologia. Patrimonial, Responsabilidade Civil, D&O, Cyber, Frota e Vida em Grupo com consultoria especializada.',
  keywords: [
    'seguro empresarial',
    'seguro patrimonial',
    'seguro D&O',
    'seguro cyber',
    'responsabilidade civil',
    'seguro frota',
    'vida em grupo',
  ],
  generator: 'v0.app',
  applicationName: 'Alicerce Seguros Empresariais',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Alicerce Seguros Empresariais',
    description: 'Proteção sob medida para a sua empresa continuar operando, aconteça o que acontecer.',
    images: [{ url: '/images/hero-empresa.png', width: 1200, height: 800, alt: 'Gestora em operação industrial' }],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#16305a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable} bg-background`}>
      <body className="antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Pular para o conteúdo
        </a>
        {children}
        <CookieBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
