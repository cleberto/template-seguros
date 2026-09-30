import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  inverted?: boolean
}

export function SectionHeading({ id, eyebrow, title, description, align = 'left', inverted = false }: SectionHeadingProps) {
  return (
    <div className={cn('flex max-w-2xl flex-col gap-4', align === 'center' && 'mx-auto items-center text-center')}>
      <p
        className={cn(
          'flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase',
          inverted ? 'text-accent' : 'text-primary',
        )}
      >
        <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-accent" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          'text-3xl leading-tight font-extrabold tracking-tight text-balance md:text-4xl',
          inverted ? 'text-primary-foreground' : 'text-primary',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-base leading-relaxed text-pretty md:text-lg',
            inverted ? 'text-primary-foreground/75' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
