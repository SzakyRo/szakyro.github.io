import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

const links = [
  { href: '#now', label: 'now' },
  { href: '#focus', label: 'work' },
  { href: '#experience', label: 'experience' },
  { href: '#skills', label: 'skills' },
  { href: '#writing', label: 'writing' },
  { href: '#education', label: 'education' },
  { href: '#contact', label: 'contact' },
]

// Appears once the hero leaves the viewport (IntersectionObserver on the
// document header). Tracks the active section via scroll position. Renders
// nothing at the top of the page where it would just echo the hero.
export function Nav() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const rootsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const header = document.querySelector('header') as HTMLElement | null
    const sections = rootsRef.current

    // Find section elements once after mount.
    for (const l of links) {
      const el = document.querySelector(l.href) as HTMLElement | null
      if (el) sections.push(el)
    }

    const heroIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setVisible(!e.isIntersecting)
      },
      { rootMargin: '0px 0px -40% 0px' },
    )
    if (header) heroIO.observe(header)

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement
        const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 8
        if (atBottom && sections.length > 0) {
          setActive(`#${sections[sections.length - 1].id}`)
          return
        }
        const marker = window.scrollY + Math.min(window.innerHeight * 0.3, 260)
        let current: string | null = null
        for (const el of sections) {
          if (el.offsetTop <= marker) current = `#${el.id}`
        }
        setActive(current)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      heroIO.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <nav
      aria-label="Section navigation"
      className={clsx(
        'fixed top-0 inset-x-0 z-40 transition-transform duration-200 ease-out',
        visible ? 'translate-y-0' : '-translate-y-full',
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <div className="mt-3 flex items-center gap-1 overflow-x-auto rounded-sm border border-line bg-surface/90 px-2 py-1.5 backdrop-blur-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              tabIndex={visible ? 0 : -1}
              className={clsx(
                'text-mono text-xs px-2.5 py-1 rounded-sm whitespace-nowrap transition-colors duration-150',
                active === l.href
                  ? 'text-bg bg-accent'
                  : 'text-fg/80 hover:text-accent',
              )}
              aria-current={active === l.href ? 'true' : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
