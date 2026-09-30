'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

const COOKIE_NAME = 'alicerce_consent'

function saveConsent(value: 'all' | 'essential') {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${60 * 60 * 24 * 180}; Path=/; SameSite=Lax${secure}`
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!document.cookie.split('; ').some((c) => c.startsWith(`${COOKIE_NAME}=`)))
  }, [])

  if (!visible) return null

  const choose = (value: 'all' | 'essential') => {
    saveConsent(value)
    setVisible(false)
  }

  return (
    <div
      role="region"
      aria-label="Preferências de cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-primary/15 md:inset-x-6 md:bottom-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Cookie className="hidden size-6 shrink-0 text-primary md:block" aria-hidden="true" />
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          Usamos cookies essenciais para o funcionamento do site e, com sua permissão, cookies de medição de
          audiência. Saiba mais na{' '}
          <Link href="/privacidade" className="font-medium text-primary underline underline-offset-4">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="lg" className="h-10 flex-1 px-4" onClick={() => choose('essential')}>
            Só essenciais
          </Button>
          <Button size="lg" className="h-10 flex-1 px-4" onClick={() => choose('all')}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  )
}
