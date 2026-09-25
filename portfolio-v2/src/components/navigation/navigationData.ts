export type BranchId = 'projects' | 'about' | 'contact'
export type SectionId = 'home' | 'who-i-am' | 'technologies' | 'journey' | 'projects' | 'contact'

interface NavigationItem {
  label: string
  href: string
  section?: SectionId
  external?: boolean
}

interface NavigationBranch {
  id: BranchId
  label: string
  items: readonly NavigationItem[]
}

// Contact destinations verified against Portfolio V1's index.html.
export const navigationBranches: readonly NavigationBranch[] = [
  {
    id: 'projects',
    label: 'Projects',
    items: [
      { label: 'Project folders', href: '/#projects', section: 'projects' },
      { label: 'Accountability OS', href: '/projects/accountability-os' },
    ],
  },
  {
    id: 'about',
    label: 'About',
    items: [
      { label: 'Who I Am', href: '/#who-i-am', section: 'who-i-am' },
      { label: 'Technologies', href: '/#technologies', section: 'technologies' },
      { label: 'Journey', href: '/#journey', section: 'journey' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    items: [
      { label: 'Email', href: 'mailto:amenyoakese99@gmail.com', external: true },
      { label: 'GitHub', href: 'https://github.com/likkleSaint', external: true },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/amenyo-akeseh-9911b1350',
        external: true,
      },
    ],
  },
]

export const homeSections: readonly SectionId[] = [
  'home', 'who-i-am', 'technologies', 'journey', 'projects', 'contact',
]

export function sectionFromHash(hash: string): SectionId {
  return homeSections.find((section) => hash === `#${section}`) ?? 'home'
}
