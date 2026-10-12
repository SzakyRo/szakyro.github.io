import { ExternalLink } from 'lucide-react'
import { Reveal } from './Reveal'

type Post = {
  title: string
  url: string
  year: string
}

const posts: Post[] = [
  {
    title: 'Understanding Cybersecurity: Ransomware',
    url: 'https://cybersecwithszaky.blogspot.com/2023/01/understanding-cybersecurity-ransomware.html',
    year: '2023',
  },
  {
    title: 'How to Build Your Own OpenVPN Server: A Step-by-Step Guide',
    url: 'https://cybersecwithszaky.blogspot.com/2023/01/how-to-build-your-own-openvpn-server.html',
    year: '2023',
  },
  {
    title: 'Securing Your Cloud Data: Best Practices',
    url: 'https://cybersecwithszaky.blogspot.com/2023/01/securing-your-cloud-data-best-practices.html',
    year: '2023',
  },
  {
    title: '5 Tips for Keeping Your Online Accounts Secure',
    url: 'https://cybersecwithszaky.blogspot.com/2023/01/5-tips-for-keeping-your-online-accounts.html',
    year: '2023',
  },
  {
    title: 'Understanding and Preventing Ransomware Attacks',
    url: 'https://cybersecwithszaky.blogspot.com/2023/01/understanding-and-preventing-ransomware.html',
    year: '2023',
  },
  {
    title: 'CCNA - P1 - A STRONG FOUNDATION',
    url: 'https://cybersecwithszaky.blogspot.com/2022/09/ccna-p1-strong-foundation.html',
    year: '2022',
  },
]

export function Writing() {
  return (
    <div>
      <ul className="space-y-3">
        {posts.map((p, i) => (
          <Reveal as="li" key={p.url} delay={Math.min(i, 8) * 50}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-baseline gap-3 text-sm md:text-base text-fg/90 transition-colors duration-150 hover:text-accent"
            >
              <span className="text-mono text-muted text-xs flex-shrink-0 w-10">
                {p.year}
              </span>
              <span className="underline-offset-4 group-hover:underline">
                {p.title}
              </span>
              <ExternalLink
                size={12}
                className="flex-shrink-0 text-muted group-hover:text-accent transition-colors duration-150"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={350}>
        <p className="mt-6 text-mono text-xs text-muted">
          Full archive at{' '}
          <a
            href="https://cybersecwithszaky.blogspot.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-link"
          >
            cybersecwithszaky.blogspot.com
          </a>
        </p>
      </Reveal>
    </div>
  )
}
