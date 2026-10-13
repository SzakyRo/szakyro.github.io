import type { LucideIcon } from 'lucide-react'
import { Server, Globe2, ShieldCheck, Gauge, PackageCheck, GitBranch, Cloud, Phone } from 'lucide-react'
import { focusAreas } from '../content/focus'
import { Reveal } from './Reveal'

const icons: LucideIcon[] = [Server, Globe2, ShieldCheck, Gauge, PackageCheck, GitBranch, Cloud, Phone]

export function Focus() {
  return (
    <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
      {focusAreas.map((f, i) => {
        const Icon = icons[i % icons.length]
        return (
          <Reveal
            key={f.title}
            delay={Math.min(i, 8) * 60}
            className="group relative border border-line bg-surface/40 rounded-sm p-5 transition-all duration-200 hover:border-accent/50 hover:bg-surface/70 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <Icon size={18} className="text-muted group-hover:text-accent transition-colors duration-200" aria-hidden="true" />
              <span className="text-mono text-[10px] text-muted select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="text-fg text-base md:text-lg font-medium mb-2 leading-snug">
              {f.title}
            </h3>
            <p className="text-fg/80 text-sm leading-relaxed mb-4">{f.description}</p>
            <ul className="flex flex-wrap gap-1.5">
              {f.stack.map((s) => (
                <li
                  key={s}
                  className="pill text-mono text-xs text-fg/90 border border-line rounded-sm px-2 py-0.5"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        )
      })}
    </div>
  )
}
