import { useEffect, useState } from 'react'
import { useReducedMotionFlag } from './useReducedMotionFlag'

type Phase = 'typing' | 'hold' | 'erasing' | 'rest'

// Types `text` character by character, holds it briefly, erases it
// character by character (faster), waits, and repeats. The caret is
// rendered by the caller so it keeps blinking across all phases.
export function useTypingLoop(
  text: string,
  {
    typeMs = 110,    // between keystrokes while typing
    eraseMs = 40,    // between keystrokes while erasing (quicker)
    holdMs = 2600,   // hold the completed line before erasing
    restartMs = 900, // idle gap before typing again
  } = {},
): string {
  const reduced = useReducedMotionFlag()
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')

  useEffect(() => {
    if (reduced) return

    if (phase === 'typing') {
      const t = window.setTimeout(() => {
        if (typed.length < text.length) {
          setTyped(text.slice(0, typed.length + 1))
        } else {
          setPhase('hold')
        }
      }, typeMs)
      return () => window.clearTimeout(t)
    }

    if (phase === 'hold') {
      const t = window.setTimeout(() => setPhase('erasing'), holdMs)
      return () => window.clearTimeout(t)
    }

    if (phase === 'erasing') {
      const t = window.setTimeout(() => {
        if (typed.length > 0) {
          setTyped(text.slice(0, typed.length - 1))
        } else {
          setPhase('rest')
        }
      }, eraseMs)
      return () => window.clearTimeout(t)
    }

    const t = window.setTimeout(() => setPhase('typing'), restartMs)
    return () => window.clearTimeout(t)
  }, [phase, typed, text, typeMs, eraseMs, holdMs, restartMs, reduced])

  return reduced ? text : typed
}
