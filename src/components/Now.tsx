import { Mail } from 'lucide-react'
import { profile } from '../content/profile'
import { Reveal } from './Reveal'

export function Now() {
  const focus = [
    'Moving from a decade of frontline support and systems work into enterprise-scale infrastructure. L2 at Bitdefender with active work across bare-metal provisioning, DNS, monitoring, and web-application firewalling.',
    'Most at home in Linux, monitoring, and patching. The work I value most has a measurable outcome; one Python-automation project cut task time by an order of magnitude.',
    'Currently responsible for the monthly Linux patch-management cycle and the recurring SOX and SOC2 evidence work across the production environment.',
  ]

  return (
    <div>
      <Reveal>
        <p className="text-fg/90 leading-relaxed max-w-prose mb-6 text-base md:text-lg">
          {profile.tagline}
        </p>
      </Reveal>
      <ul className="space-y-3">
        {focus.map((item, i) => (
          <Reveal as="li" key={item} delay={60 + i * 80}>
            <span className="flex gap-3 text-fg/90 leading-relaxed">
              <span className="text-accent mt-1.5 select-none" aria-hidden="true">
                ▸
              </span>
              <span>{item}</span>
            </span>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={60 + focus.length * 80}>
        <div className="mt-8 inline-flex items-center gap-2 border border-line rounded-sm px-3 py-2 transition-colors duration-150 hover:border-accent/50">
          <Mail size={14} className="text-muted" aria-hidden="true" />
          <a href={`mailto:${profile.email}`} className="text-mono text-sm hover:text-accent">
            {profile.email}
          </a>
        </div>
      </Reveal>
    </div>
  )
}
