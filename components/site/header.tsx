'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Lock, Menu, Phone, X } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { buttonVariants } from '@/components/ui/button'
import { COMPANY, NAV_ITEMS } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-colors duration-300',
        scrolled || open ? 'border-border bg-background/90 backdrop-blur-md' : 'border-transparent bg-background',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:h-18 md:px-6">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="/area-do-cliente"
            className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'h-10 px-3 text-muted-foreground')}
          >
            <Lock aria-hidden="true" />
            Área do cliente
          </a>
          <Link href="/#cotacao" className={cn(buttonVariants({ size: 'lg' }), 'h-10 px-4')}>
            Solicitar cotação
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
      >
        <nav aria-label="Menu mobile" className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="border-b border-border">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-heading text-lg font-semibold text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <Link
              href="/#cotacao"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ size: 'lg' }), 'h-12 text-base')}
            >
              Solicitar cotação
            </Link>
            <a href="/area-do-cliente" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-12 text-base')}>
              <Lock aria-hidden="true" />
              Área do cliente
            </a>
            <a
              href={COMPANY.phoneHref}
              className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-muted-foreground"
            >
              <Phone className="size-4" aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
