import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Alicerce Seguros Empresariais — Página inicial"
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'relative flex size-9 items-end justify-center gap-0.5 overflow-hidden rounded-lg pb-2 transition-transform group-hover:-translate-y-0.5',
          inverted ? 'bg-primary-foreground' : 'bg-primary',
        )}
      >
        <span className={cn('h-2.5 w-1.5 rounded-sm', inverted ? 'bg-primary' : 'bg-primary-foreground')} />
        <span className="h-4 w-1.5 rounded-sm bg-accent" />
        <span className={cn('h-5.5 w-1.5 rounded-sm', inverted ? 'bg-primary' : 'bg-primary-foreground')} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-heading text-lg font-extrabold tracking-tight',
            inverted ? 'text-primary-foreground' : 'text-primary',
          )}
        >
          Alicerce
        </span>
        <span
          className={cn(
            'text-[0.65rem] font-semibold tracking-[0.18em] uppercase',
            inverted ? 'text-primary-foreground/70' : 'text-muted-foreground',
          )}
        >
          Seguros Empresariais
        </span>
      </span>
    </Link>
  )
}
