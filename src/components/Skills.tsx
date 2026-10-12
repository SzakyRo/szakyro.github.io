import { skillGroups } from '../content/skills'
import { Reveal } from './Reveal'

export function Skills() {
  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {skillGroups.map((group, i) => (
          <Reveal key={group.group} delay={Math.min(i, 8) * 50}>
            <h3 className="text-mono text-muted text-xs uppercase tracking-wider mb-3">
              {group.group}
            </h3>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-fg/90 text-sm leading-relaxed">
                  <span className="text-accent mr-2 select-none" aria-hidden="true">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal delay={450}>
        <p className="text-mono text-muted text-xs">
          Knowledge of different operating systems, hardware knowledge, software
          knowledge, attention to detail, problem-solving mindset, critical thinking.
        </p>
      </Reveal>
    </div>
  )
}
