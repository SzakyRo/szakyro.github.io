export type SkillGroup = {
  group: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    group: 'Operating systems',
    items: ['Linux (Ubuntu, Debian, CentOS, RHEL, FreeBSD)', 'Microsoft Windows Server'],
  },
  {
    group: 'Cloud & private cloud',
    items: [
      'AWS',
      'Google Cloud (GCP)',
      'OpenNebula',
      'OpenStack',
    ],
  },
  {
    group: 'Provisioning & virtualization',
    items: [
      'MAAS',
      'OpenNebula',
      'Proxmox VE',
      'Microsoft Hyper-V',
      'VMware vSphere',
      'Docker / Kubernetes',
    ],
  },
  {
    group: 'Configuration management',
    items: [
      'Puppet',
      'Foreman',
      'Ansible',
      'cloud-init',
    ],
  },
  {
    group: 'DNS',
    items: [
      'Akamai Edge DNS',
      'UltraDNS',
      'BIND',
      'Authoritative DNS operations',
    ],
  },
  {
    group: 'Observability & monitoring',
    items: [
      'Zabbix',
      'File Integrity Monitoring (FIM)',
      'Grafana',
      'Prometheus',
      'Victoria Metrics',
    ],
  },
  {
    group: 'Edge & web-application firewall',
    items: [
      'Cloudflare WAF / Access',
      'AWS WAF',
    ],
  },
  {
    group: 'Network & perimeter security',
    items: [
      'Cisco ASA VPN',
      'Fortigate',
      'pfSense / OPNsense',
      'iptables / firewalld / UFW',
      'Internal PKI',
    ],
  },
  {
    group: 'Identity, productivity & ITSM',
    items: [
      'Microsoft Active Directory',
      'Microsoft 365',
      'Google Workspace',
      'Slack',
      'Atlassian Jira / Confluence',
      'Veeam backup',
    ],
  },
  {
    group: 'Web, application & data',
    items: [
      'Nginx',
      'Apache',
      'MySQL',
      'PostgreSQL',
      'Microsoft SQL Server',
      'MongoDB',
      'Kafka',
      'filebeat',
    ],
  },
  {
    group: 'Security operations',
    items: [
      'IPS / IDS',
      'EDR / XDR',
      'BitLocker',
      'Splunk SIEM',
    ],
  },
  {
    group: 'Scripting & languages',
    items: [
      'Python',
      'Bash',
      'Git',
    ],
  },
  {
    group: 'Containers',
    items: ['Docker', 'Kubernetes'],
  },
]
