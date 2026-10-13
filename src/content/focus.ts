export type FocusArea = {
  title: string
  description: string
  stack: string[]
}

export const focusAreas: FocusArea[] = [
  {
    title: 'Bare-metal provisioning platform',
    description:
      'Server commissioning as code. I run the MAAS layer the team uses to turn hardware into available servers: pooling, tags, storage layouts, network configuration.',
    stack: ['MAAS', 'cloud-init', 'Ubuntu', 'commissioning'],
  },
  {
    title: 'DNS & authoritative operations',
    description:
      'Authoritative DNS at enterprise scale. Provider migrations, geo-routing, and per-batch validation across a large multi-domain footprint.',
    stack: ['Akamai Edge DNS', 'UltraDNS', 'Cloudflare', 'BIND', 'GeoDNS'],
  },
  {
    title: 'Web-application firewalling',
    description:
      'The enterprise WAF layer. Rule replication across zones, custom IP lists, false-positive triage, and the referrer rules that keep analytics honest.',
    stack: ['Cloudflare WAF', 'Cloudflare Access', 'AWS WAF'],
  },
  {
    title: 'Monitoring & incident hygiene',
    description:
      'Keeping the observability stack alive: Zabbix, alerting pipelines, on-call routes, and the automation that glues them together.',
    stack: ['Zabbix', 'FIM', 'Grafana', 'incident management'],
  },
  {
    title: 'Patch management & compliance',
    description:
      'The recurring Linux patch cycle for the in-scope environment, plus the SOX and SOC2 evidence exports each audit period needs.',
    stack: ['patching', 'SOX', 'SOC2', 'compliance'],
  },
  {
    title: 'Configuration management',
    description:
      'The Puppet layer the rest of the team depends on, kept current: nginx templates, host checks, forwarder configuration across zones.',
    stack: ['Puppet', 'Foreman', 'nginx', 'filebeat'],
  },
  {
    title: 'Cloud & private cloud',
    description:
      'Public cloud alongside the on-premises estate: AWS workloads, GCP pieces, and the OpenNebula / OpenStack private cloud the team runs as the in-house compute substrate.',
    stack: ['AWS', 'Google Cloud', 'OpenNebula', 'OpenStack'],
  },
  {
    title: 'Telephony & PBX',
    description:
      'Self-hosted Asterisk for the team voice stack: dialplan, extensions, SIP trunks, voicemail, and the call-queue logic the rest of the team relies on.',
    stack: ['Asterisk'],
  },
]
