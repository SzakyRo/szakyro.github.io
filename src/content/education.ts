export type Education = {
  institution: string
  qualification: string
  period: string
  detail?: string
}

export type Certification = {
  name: string
  issuer: string
  date: string
  url?: string
}

export type Language = {
  name: string
  level: string
}

export const education: Education[] = [
  {
    institution: 'University of Pitesti',
    qualification: "Bachelor's degree in Mathematics",
    period: '2019 – 2022',
    detail:
      'Thesis: "Mathematics in Machine Learning", an exploration of the mathematics underlying machine learning.',
  },
  {
    institution: 'Costin D. Nenițescu',
    qualification: 'Technician în activități economice',
    period: '2013 – 2017',
  },
]

export const certifications: Certification[] = [
  {
    name: 'Introduction to IoT',
    issuer: 'Cisco (Credly)',
    date: 'Jan 2022',
    url: 'https://www.credly.com/badges/65a21c1c-1d6f-49bf-84a3-1afc78ad0986/linked_in_profile',
  },
  {
    name: 'Network Support and Security',
    issuer: 'Cisco (Credly)',
    date: 'Jul 2023',
    url: 'https://www.credly.com/badges/b37490ec-3d18-450c-8e81-5a96b0597c4f/linked_in_profile',
  },
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco (Credly)',
    date: 'Jul 2023',
    url: 'https://www.credly.com/badges/8d9cc91d-23f4-4ddf-aa4e-00feaf8fca4f/linked_in_profile',
  },
  {
    name: 'Cybersecurity Essentials',
    issuer: 'Cisco (Credly)',
    date: 'Jul 2023',
    url: 'https://www.credly.com/badges/7c62035f-edf2-40f2-a195-e200eda4bf83/linked_in_profile',
  },
  {
    name: 'Cisco Networking Academy (7 intro certificates)',
    issuer: 'Cisco (Credly)',
    date: '2022–2023',
  },
  {
    name: 'Master Course in Leadership',
    issuer: 'Udemy',
    date: 'Aug 2023',
    url: 'https://www.udemy.com/certificate/UC-92cc87bf-6aa3-4b41-8051-76d104908d4a/',
  },
  {
    name: 'Coding Basics: Gentle Intro to Computer Programming',
    issuer: 'Udemy',
    date: 'Aug 2023',
    url: 'https://www.udemy.com/certificate/UC-08f909cf-9214-4e41-99e3-af4802f91305/',
  },
  {
    name: 'Detection systems technician, video surveillance, access control',
    issuer: 'Professional qualification',
    date: 'Mar 2020',
  },
  {
    name: 'Technician in Economic Activities',
    issuer: 'Professional qualification',
    date: 'Sep 2013',
  },
]

export const languages: Language[] = [
  { name: 'English', level: 'Advanced' },
  { name: 'Romanian', level: 'Advanced' },
]
