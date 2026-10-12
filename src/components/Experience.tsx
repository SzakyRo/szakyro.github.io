import { durationLabel, experience } from '../content/experience'
import { Reveal } from './Reveal'

export function Experience() {
  return (
    <ol className="space-y-10 border-l border-line pl-6">
      {experience.map((e, i) => (
        <Reveal
          as="li"
          key={`${e.company}-${e.role}-${e.period}`}
          className="relative"
          delay={i * 80}
        >
          <span
            className="absolute -left-[27px] top-1.5 w-2 h-2 rounded-full bg-accent dot-pop"
            aria-hidden="true"
          />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
            <h3 className="text-fg text-base md:text-lg font-medium">{e.role}</h3>
            <span className="text-mono text-muted text-xs">@ {e.company}</span>
          </div>
          <div className="text-mono text-muted text-xs mb-3 flex items-center gap-2">
            <span>{e.period} · {durationLabel(e.start, e.end)}</span>
            {e.current ? (
              <span className="text-mono text-[10px] uppercase tracking-wider text-accent border border-accent/40 rounded-sm px-1.5 py-0.5">
                current
              </span>
            ) : null}
          </div>
          <div className="text-mono text-muted text-xs mb-3">{e.location}</div>
          <ul className="space-y-2 text-fg/90 text-sm leading-relaxed list-disc list-outside ml-4 marker:text-muted">
            {e.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          {e.acquiredSkills && e.acquiredSkills.length > 0 ? (
            <div className="mt-4">
              <div className="text-mono text-muted text-xs mb-2">Acquired skills and competencies</div>
              <ul className="flex flex-wrap gap-1.5">
                {e.acquiredSkills.map((s) => (
                  <li
                    key={s}
                    className="pill text-mono text-xs text-fg/90 border border-line rounded-sm px-2 py-0.5"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Reveal>
      ))}
    </ol>
  )
}
