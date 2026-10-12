import { useEffect, useState } from 'react'

// React hook so components can branch on prefers-reduced-motion.
// Rendered once at mount and kept current if the user toggles the
// setting during the session.
export function useReducedMotionFlag(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    if (mq.addEventListener) {
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
    // Safari <=13
    mq.addListener(handler)
    return () => mq.removeListener(handler)
  }, [])

  return reduced
}
