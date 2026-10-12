import { Mail, Linkedin, Rss, ExternalLink } from 'lucide-react'
import { profile } from '../content/profile'

export function Contact() {
  return (
    <div className="border-t border-line pt-8 mt-8">
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-mono text-sm">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 link-sweep"
          >
            <Mail size={14} aria-hidden="true" />
            <span>{profile.email}</span>
          </a>
        </li>
        <li>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 link-sweep"
          >
            <Linkedin size={14} aria-hidden="true" />
            <span>LinkedIn</span>
            <ExternalLink size={10} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            href={profile.blog}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 link-sweep"
          >
            <Rss size={14} aria-hidden="true" />
            <span>Blog</span>
            <ExternalLink size={10} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            href={profile.lfsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 link-sweep text-muted hover:text-fg"
          >
            <span>LFS ID {profile.lfsId}</span>
            <ExternalLink size={10} aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  )
}
