import { Link } from 'react-router'
import { JourneySection } from '../components/home/JourneySection'
import { TechnologiesSection } from '../components/home/TechnologiesSection'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <>
      <title>Home | Portfolio V2</title>
      <header id="home" tabIndex={-1} className={styles.intro}>
        <p className={styles.eyebrow}>Software Engineer</p>
        <h1>Ammishaddai</h1>
        <p className={styles.lead}>
          Learning software engineering by building practical software and
          automation systems.
        </p>
        <p>
          My current focus is <strong>Accountability OS</strong>, an AI-assisted
          personal accountability system <strong>in development</strong>. It brings
          together Telegram, n8n and PostgreSQL with human-approved AI workflows.
        </p>
        <div className={styles.actions}>
          <Link to="/projects/accountability-os">View Accountability OS</Link>
          <Link to="/#journey">Explore my journey</Link>
        </div>
      </header>
      <div className={styles.sections}>
        <section id="who-i-am" tabIndex={-1} aria-labelledby="who-i-am-title">
          <h2 id="who-i-am-title">Who I Am</h2>
          <p>
            I’m studying BTech Computer Science at Sunyani Technical University
            (2025–2028), with software engineering as my career direction. I learn
            best by building practical systems and working through the problems
            that come with them.
          </p>
          <p>
            Before this, I worked as a teacher in Enchi. Teaching gave me practice
            in communicating clearly, being patient and breaking difficult ideas
            into manageable steps. Those habits are useful as I learn, though my
            technical skills are still developing.
          </p>
          <p>
            Computer Science gives that learning a technical foundation. My
            interests include automation, AI and connected systems, with a
            longer-term direction in AIoT: bringing AI and connected devices
            together. For now, practical projects are how I turn that interest
            into engineering ability.
          </p>
        </section>
        <TechnologiesSection />
        <JourneySection />
        <section id="contact" tabIndex={-1} aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <p>Contact experience coming in a later task.</p>
        </section>
      </div>
    </>
  )
}
