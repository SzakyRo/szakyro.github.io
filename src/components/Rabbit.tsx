import { useReducedMotionFlag } from '../hooks/useReducedMotionFlag'

export function Rabbit() {
  const reduced = useReducedMotionFlag()

  return (
    <div
      aria-hidden="true"
      className="relative h-36 overflow-hidden border-t border-line/50 select-none pointer-events-none"
    >
      {/* dust cloud drifting behind while it hops */}
      {!reduced && <div className="rabbit-clouds absolute left-1/3 bottom-14" />}
      <div className="rabbit absolute bottom-3 left-12" />
      <div className="absolute top-1 right-2 text-mono text-[10px] text-muted/60">
        a wild rabbit appears
      </div>
    </div>
  )
}
