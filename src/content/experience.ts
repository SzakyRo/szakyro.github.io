export type Experience = {
  company: string
  role: string
  period: string
  start: string      // ISO date, used to compute duration at runtime
  end?: string       // ISO date; omitted when current
  duration?: string  // computed at render; left blank in source
  current?: boolean  // true for the role you're still in
  highlights: string[]
  location: string
  acquiredSkills?: string[]
}

// Human-friendly 'N years and M months' between two dates. Falls back
// to months-only below a year.
export function durationLabel(start: string, end?: string): string {
  const [sy, sm] = start.split('-').map(Number)
  const e = end ? end : new Date().toISOString().slice(0, 7)
  const [ey, em] = e.split('-').map(Number)
  let months = (ey - sy) * 12 + (em - sm) + 1
  if (months < 0) months = 0
  const y = Math.floor(months / 12)
  const m = months % 12
  if (y === 0) return `${m} month${m === 1 ? '' : 's'}`
  if (m === 0) return `${y} year${y === 1 ? '' : 's'}`
  return `${y} year${y === 1 ? '' : 's'} and ${m} month${m === 1 ? '' : 's'}`
}

export const experience: Experience[] = [
  {
    company: 'Bitdefender',
    role: 'Infrastructure Engineer (L2)',
    period: 'Aug 2024 – present',
    start: '2024-08',
    current: true,
    location: 'Remote · IT Software · IT / Telecom',
    highlights: [
      'Focused on Linux infrastructure with supporting Windows administration (deployment, configuration, scripting, application management).',
      'Troubleshooting and resolution of hardware, software, and networking issues.',
      'Project analysis and implementation in line with architectural designs.',
      'Maintained and updated operational procedures; stayed current with new technologies.',
    ],
    acquiredSkills: [
      'Linux',
      'Windows Server',
      'Zabbix',
      'DNS operations',
      'File Integrity Monitoring',
      'Cloudflare WAF / Access',
      'Puppet',
      'Nginx',
      'OpenNebula',
      'Veeam backup',
      'Foreman',
      'Internal PKI',
      'Grafana',
      'MAAS',
      'Proxmox VE',
    ],
  },
  {
    company: 'Bitdefender',
    role: 'Business Technical Support L2 (Specialist, then Engineer)',
    period: 'Nov 2022 – Aug 2024',
    start: '2022-11',
    end: '2024-08',
    location: 'Remote · IT Software · IT / Telecom',
    highlights: [
      'Automated the team\'s highest-volume workflows. Wrote nine Python tools that reduced execution time on those tasks by an order of magnitude and removed a recurring source of human error.',
      'Owned the GravityZone endpoint platform for customers: deployments, console configuration, and escalations handled directly over phone, chat, and email.',
      'Kept tickets inside SLA and quality targets across three channels in parallel.',
      'Tracked known product issues from RCA status to resolution in JIRA; reproduced and isolated reported misbehavior for the product teams, and supplied valid workarounds until dedicated fixes shipped.',
      'Debugged Linux and Windows systems by correlating log-file evidence with internal tooling (database queries, JSON payloads).',
      'Improved internal and customer-facing documentation and practiced knowledge sharing across the team.',
    ],
    acquiredSkills: [
      'Python',
      'JIRA',
      'Active Directory',
      'Windows Server',
      'Microsoft Exchange',
      'RHEL',
      'CentOS',
      'Remote Desktop',
      'SSO',
      'Salesforce',
      'VMware ESXi',
      'Microsoft Hyper-V',
      'Splunk SIEM',
      'EDR / XDR',
      'BitLocker',
      'Office 365',
      'Email security',
      'Unix',
      'SharePoint',
      'API integrations',
      'RMM Integrations',
    ],
  },
  {
    company: 'Delta Plus Trading',
    role: 'System Administrator',
    period: 'Nov 2021 – Oct 2022',
    start: '2021-11',
    end: '2022-10',
    location: 'Pitești · IT Software · IT / Telecom',
    highlights: [
      'Owned day-to-day operations for a mixed Windows and Linux environment: servers, operating systems, databases, networking, and security equipment.',
      'Stood up infrastructure. Installed and configured operating systems, applications, databases, and supporting software across on-premises and cloud.',
      'Kept the environment patched and current through regular patch management, system upgrades, drivers, and firmware.',
      'Ran the security surface area: drafted and enforced security policies; configured data-loss prevention, firewalls, and intrusion-detection systems; conducted vulnerability scans and compliance audits and drove the resulting recommendations through to fixes.',
      'Designed and maintained the LAN/WAN with switching, routing, Wi-Fi, and VPN.',
      'Closed the loop on support: managed the ticketing queue, produced end-user documentation, and wrote the knowledge-base articles the rest of the team used.',
      'Found and eliminated repetitive work through automation, reducing error rate and freeing engineering time.',
    ],
    acquiredSkills: [
      'VPN',
      'Microsoft Office',
      'Active Directory',
      'DNS',
      'Network File System',
      'DDNS',
      'Oracle VirtualBox',
      'VMware ESXi',
      'Remote Desktop Connection',
      'Microsoft Windows Server',
      'Windows troubleshooting',
      'BitLocker',
      'Windows installation and configuration',
      'Microsoft Hyper-V',
      'network administration troubleshooting',
      'AnyDesk',
      'Linux install and configuration',
      'Microsoft Windows 11/10/8/7/XP',
    ],
  },
  {
    company: 'Data Starter Management',
    role: 'Technician for Detection Systems, Video Surveillance, Access Control',
    period: 'Feb 2020 – Oct 2021',
    start: '2020-02',
    end: '2021-10',
    location: 'Pitești · IT Software · IT / Telecom',
    highlights: [
      'Delivered physical-security installations end-to-end: site survey, equipment installation, cabling, configuration, and commissioning, for video surveillance, intrusion detection, and access control.',
      'Surveyed sites to determine camera, sensor, and reader placement that actually worked in practice, accounting for sightlines, power availability, and network reach.',
      'Built the supporting infrastructure: terminated and tested power and data cabling, and racked and configured the servers, routers, switches, and firewalls the systems run on.',
      'Configured and validated video recorders, intrusion panels, and access readers end-to-end after install; verified every zone under real operating conditions.',
      'Trained customer personnel on operation and maintenance, handing over working systems rather than unfinished hardware.',
      'Diagnosed and resolved hardware failures and replaced defective equipment.',
      'Maintained accurate technical documentation and maintenance schedules across customer sites.',
      'Monitored network connectivity and performance, and scaled capacity as the customer footprint grew.',
    ],
    acquiredSkills: [
      'Linux',
      'Security',
      'Cisco',
      'Networking',
      'network security',
      'Windows Server',
      'CCTV',
      'information security',
      'security systems',
      'Hikvision',
      'CCTV systems',
    ],
  },
]
