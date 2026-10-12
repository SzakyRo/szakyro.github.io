import { useEffect, useRef } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import clsx from 'clsx'

// Reveal: fades/slides an element in when it enters — or is already
// above — the viewport. IntersectionObserver plus a position check:
// elements that were jumped past (deep link, fast scroll) should
// reveal too, not stay invisible.
//
// Motion rules (Subtle tier):
//  - 12px vertical offset, ~350ms, reads as a fade not a slide
//  - stagger via --reveal-delay, capped ~60ms per step
//  - transform/opacity only (compositor thread, no layout work)
//  - prefers-reduced-motion: reveal instantly, no transition
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed')
      return
    }

    const cutoff = () => window.innerHeight * 0.92

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const r = entry.target.getBoundingClientRect()
          if (entry.isIntersecting || r.top <= cutoff()) {
            entry.target.classList.add('is-revealed')
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)

    // Catch the initial position too: if the element is already at or
    // above the fold (e.g. after a deep link), reveal immediately.
    const raf = requestAnimationFrame(() => {
      if (el.getBoundingClientRect().top <= cutoff()) {
        el.classList.add('is-revealed')
        io.disconnect()
      }
    })

    // Safety net for instant jumps handled better by scroll position
    // than by intersection bookkeeping.
    const onScroll = () => {
      if (el.getBoundingClientRect().top <= cutoff()) {
        el.classList.add('is-revealed')
        io.disconnect()
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={clsx('reveal', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
