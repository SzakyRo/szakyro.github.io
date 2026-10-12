import { useEffect, useRef } from 'react'

// Scroll progress: 1px accent hairline across the top of the viewport,
// driven by scroll position via transform scaleX (compositor-only,
// no layout work). Hidden entirely under prefers-reduced-motion —
// a progress bar is motion-adjacent UI, and reduced users get nothing
// from a moving line anyway.
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      bar.style.display = 'none'
      return
    }

    let ticking = false
    const update = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = doc.scrollHeight - doc.clientHeight
        const pct = max > 0 ? window.scrollY / max : 0
        bar.style.transform = `scaleX(${pct})`
        ticking = false
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left scale-x-0 z-50"
    />
  )
}
