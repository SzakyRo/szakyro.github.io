import clsx from 'clsx'
import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  index: string
  prompt: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, index, prompt, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={clsx('border-t border-line pt-10 pb-12 md:pt-14 md:pb-16', className)}
    >
      <Reveal>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-mono text-muted text-sm select-none" aria-hidden="true">
            {index}
          </span>
          <span className="text-mono text-muted text-sm" aria-hidden="true">
            {prompt}
          </span>
        </div>
        <h2
          id={`${id}-title`}
          className="text-mono text-2xl md:text-3xl text-fg font-medium mb-6 md:mb-8"
        >
          <span className="text-accent" aria-hidden="true">$</span>{' '}
          <span>{title}</span>
        </h2>
      </Reveal>
      {children}
    </section>
  )
}
