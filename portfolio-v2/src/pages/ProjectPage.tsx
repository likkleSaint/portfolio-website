import { Link, useParams } from 'react-router'
import { projects } from '../data/projects'
import { NotFoundPage } from './NotFoundPage'
import { CaseStudySection } from '../components/project/CaseStudySection'
import { CaseStudyFacts, CaseStudyFlow } from '../components/project/CaseStudyFacts'
import styles from '../components/project/CaseStudy.module.css'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((item) => item.slug === slug)

  if (!project) return <NotFoundPage />

  return (
    <article>
      <title>{`${project.title} | Portfolio V2`}</title>
      <meta name="description" content={project.summary} />
      <header className={styles.header}>
        <p className={styles.eyebrow}>Engineering case study</p>
        <h1>{project.title}</h1>
        <p className={styles.summary}>{project.summary}</p>
        <dl className={styles.metadata}>
          <div><dt>Status</dt><dd>{project.status === 'in-development' ? 'In development' : 'Completed'}</dd></div>
          <div><dt>Development plan</dt><dd>{project.timeframe}</dd></div>
        </dl>
      </header>
      <CaseStudySection id="overview" title="Overview"><p>{project.overview}</p></CaseStudySection>
      <CaseStudySection id="problem" title="Problem"><p>{project.problem}</p></CaseStudySection>
      <CaseStudySection id="building" title="What I’m Building">
        <ul>{project.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
      </CaseStudySection>
      <CaseStudySection id="architecture" title="Architecture">
        <p>Core Accountability Engine + Modules. This flow describes responsibilities and the authorization boundary in the current architecture.</p>
        <CaseStudyFlow items={project.architecture} />
      </CaseStudySection>
      <CaseStudySection id="human-review" title="Human-in-the-Loop Design">
        <p><strong>AI proposes. Human decides. System executes.</strong> AI must not autonomously mutate consequential state.</p>
        <CaseStudyFlow items={project.approvalFlow} />
        <h3>Proposal states</h3>
        <p>Possible states, rather than a single automatic execution sequence:</p>
        <ul>{project.proposalStates.map((state) => <li key={state}>{state}</li>)}</ul>
      </CaseStudySection>
      <CaseStudySection id="system-model" title="Core Data and System Model"><CaseStudyFacts items={project.systemModel} /></CaseStudySection>
      <CaseStudySection id="decisions" title="Engineering Decisions"><CaseStudyFacts items={project.engineeringDecisions} /></CaseStudySection>
      <CaseStudySection id="stack" title="Technology Stack"><CaseStudyFacts items={project.stack} /></CaseStudySection>
      <CaseStudySection id="development" title="Current Development Status">
        <p>{project.statusDetails}</p>
        <ol>{project.phases.map((phase) => <li key={phase}>{phase}</li>)}</ol>
      </CaseStudySection>
      <CaseStudySection id="evidence" title="Evidence and Links">
        <p>{project.evidenceNote}</p>
        {project.links.length > 0 && <ul>{project.links.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>}
      </CaseStudySection>
      <Link className={styles.backLink} to="/">Back home</Link>
    </article>
  )
}
