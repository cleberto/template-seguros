import Link from 'next/link'
import { Logo } from '@/components/site/logo'
import { COMPANY, NAV_ITEMS } from '@/lib/site'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-12 md:px-6">
        <div className="flex flex-col gap-5 md:col-span-5">
          <Logo inverted />
          <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Consultoria e corretagem de seguros empresariais para negócios que não podem parar.
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <h2 className="mb-4 text-sm font-bold tracking-wide text-primary-foreground">Navegação</h2>
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="mb-4 text-sm font-bold tracking-wide text-primary-foreground">Contato e privacidade</h2>
          <ul className="flex flex-col gap-3 text-sm text-primary-foreground/70">
            <li>
              <a href={COMPANY.phoneHref} className="hover:text-primary-foreground">
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="hover:text-primary-foreground">
                {COMPANY.email}
              </a>
            </li>
            <li>
              <span className="text-primary-foreground">{'Encarregado (DPO): '}</span>
              <a href={`mailto:${COMPANY.dpoEmail}`} className="hover:text-primary-foreground">
                {COMPANY.dpoEmail}
              </a>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-primary-foreground">
                Política de Privacidade e Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs leading-relaxed text-primary-foreground/60 md:px-6">
          <p>
            {`${COMPANY.legalName} · CNPJ ${COMPANY.cnpj} · Registro SUSEP ${COMPANY.susep} · ${COMPANY.address}`}
          </p>
          <p>
            Template fictício para demonstração. O registro do produto na SUSEP não implica, por parte da
            Autarquia, incentivo ou recomendação à sua comercialização. Consulte as condições gerais antes de contratar.
          </p>
          <p>{`© ${new Date().getFullYear()} Alicerce Seguros Empresariais. Todos os direitos reservados.`}</p>
        </div>
      </div>
    </footer>
  )
}
