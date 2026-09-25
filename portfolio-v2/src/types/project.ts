export interface CaseStudyFact {
  title: string
  description: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  status: 'in-development' | 'completed'
}

export interface ProjectCaseStudy extends Project {
  timeframe: string
  overview: string
  problem: string
  goals: readonly string[]
  architecture: readonly CaseStudyFact[]
  approvalFlow: readonly CaseStudyFact[]
  proposalStates: readonly string[]
  systemModel: readonly CaseStudyFact[]
  engineeringDecisions: readonly CaseStudyFact[]
  stack: readonly CaseStudyFact[]
  statusDetails: string
  phases: readonly string[]
  evidenceNote: string
  links: readonly { label: string; href: string }[]
}
