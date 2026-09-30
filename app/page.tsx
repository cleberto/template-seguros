import { Coverages } from '@/components/site/coverages'
import { Faq } from '@/components/site/faq'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { Hero } from '@/components/site/hero'
import { Process } from '@/components/site/process'
import { QuoteSection } from '@/components/site/quote-section'
import { Sectors } from '@/components/site/sectors'
import { Security } from '@/components/site/security'
import { Testimonials } from '@/components/site/testimonials'

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Coverages />
        <Sectors />
        <Process />
        <Security />
        <Testimonials />
        <QuoteSection />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
