import { Mail, Linkedin, Github, ArrowDown } from 'lucide-react'
import { profile } from '../content/profile'
import { useTypingLoop } from '../hooks/useTypingLoop'

export function Hero() {
  const command = useTypingLoop('whoami')

  return (
    <header className="pt-12 md:pt-20 pb-12 md:pb-16">
      <div
        className="boot text-mono text-muted text-sm mb-6 select-none"
        aria-hidden="true"
        style={{ '--boot-delay': '0ms' } as React.CSSProperties}
      >
        last login: liviu@bitdefender ~ $ <span className="text-fg">{command}</span><span className="text-accent caret">▌</span>
      </div>

      <h1
        className="boot text-mono text-3xl sm:text-4xl md:text-5xl text-fg font-medium leading-tight mb-4"
        style={{ '--boot-delay': '80ms' } as React.CSSProperties}
      >
        {profile.name}
      </h1>
      <p
        className="boot text-mono text-link text-base md:text-lg mb-8"
        style={{ '--boot-delay': '180ms' } as React.CSSProperties}
      >
        {profile.role}
      </p>

      <div
        className="boot flex flex-wrap items-center gap-x-6 gap-y-3 text-mono text-sm"
        style={{ '--boot-delay': '280ms' } as React.CSSProperties}
      >
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 hover:text-accent transition-colors duration-150"
        >
          <Mail size={14} aria-hidden="true" />
          <span>{profile.email}</span>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 hover:text-accent transition-colors duration-150"
        >
          <Linkedin size={14} aria-hidden="true" />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/SzakyRo"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 hover:text-accent transition-colors duration-150"
        >
          <Github size={14} aria-hidden="true" />
          <span>GitHub</span>
        </a>
        <a
          href="#experience"
          className="inline-flex items-center gap-2 text-muted hover:text-fg transition-colors duration-150"
        >
          <ArrowDown size={14} aria-hidden="true" />
          <span>jump to experience</span>
        </a>
      </div>

      <div
        className="boot mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-mono text-xs text-muted max-w-2xl"
        style={{ '--boot-delay': '380ms' } as React.CSSProperties}
      >
        <Stat label="Role" value="Infrastructure Engineer" />
        <Stat label="Total exp." value={profile.totalExperience} />
        <Stat label="Based in" value={profile.basedIn} />
        <Stat
          label="LFS ID"
          value={
            <a
              href={profile.lfsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-accent transition-colors duration-150"
            >
              #{profile.lfsId}
            </a>
          }
        />
      </div>
    </header>
  )
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-l border-line pl-3">
      <div className="text-muted">{label}</div>
      <div className="text-fg text-sm mt-1">{value}</div>
    </div>
  )
}
