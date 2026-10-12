import { certifications, education, languages } from '../content/education'
import { GraduationCap, ShieldCheck, Languages as LanguagesIcon, ExternalLink } from 'lucide-react'
import { Reveal } from './Reveal'

export function Education() {
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <Reveal>
          <h3 className="text-mono text-muted text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
            <GraduationCap size={14} aria-hidden="true" />
            Education
          </h3>
          <ul className="space-y-5">
            {education.map((e) => (
              <li key={`${e.institution}-${e.qualification}`}>
                <div className="text-fg text-sm md:text-base font-medium">
                  {e.qualification}
                </div>
                <div className="text-fg/80 text-sm mt-1">{e.institution}</div>
                <div className="text-mono text-muted text-xs mt-1">{e.period}</div>
                {e.detail ? (
                  <div className="text-fg/70 text-sm mt-2 leading-relaxed">
                    {e.detail}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <h3 className="text-mono text-muted text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
            <LanguagesIcon size={14} aria-hidden="true" />
            Languages
          </h3>
          <ul className="space-y-5">
            {languages.map((l) => (
              <li key={l.name}>
                <div className="text-fg text-sm md:text-base font-medium">{l.name}</div>
                <div className="text-mono text-muted text-xs mt-1">{l.level}</div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <h3 className="text-mono text-muted text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
          <ShieldCheck size={14} aria-hidden="true" />
          Certifications
        </h3>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
          {certifications.map((c) => (
            <li key={c.name}>
              <div className="text-fg text-sm md:text-base font-medium">
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-start gap-1.5 hover:text-accent transition-colors duration-150"
                  >
                    <span>{c.name}</span>
                    <ExternalLink size={12} className="mt-1 flex-shrink-0" aria-hidden="true" />
                  </a>
                ) : (
                  c.name
                )}
              </div>
              <div className="text-fg/80 text-sm mt-1">{c.issuer}</div>
              <div className="text-mono text-muted text-xs mt-1">{c.date}</div>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
