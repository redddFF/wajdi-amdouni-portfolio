'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

gsap.registerPlugin(ScrollTrigger)

const caseStudies = [
  { number: '01', title: 'LegalTech SaaS platform', org: 'LURA LAW', role: 'Full Stack & DevOps Intern', period: 'February 2026 – July 2026', location: 'Hybrid', tags: ['Next.js', 'NestJS', 'RAG', 'Azure'], summary: 'Developed a LegalTech SaaS platform while shaping the path from application code to secure cloud delivery.', bullets: ['Built asynchronous processing workflows using Redis and BullMQ.', 'Migrated infrastructure from DigitalOcean to Microsoft Azure.', 'Provisioned AKS with Terraform and Infrastructure as Code; automated CI/CD with GitHub Actions, GHCR, and Helm.'] },
  { number: '02', title: 'B2B SaaS global distribution platform', org: 'B-SMART TRAVEL', role: 'Full Stack & DevOps Intern', period: 'February 2025 – November 2025', location: 'Tunis, Tunisia', tags: ['React', 'Node.js', 'Docker', 'CI/CD'], summary: 'Developed a B2B SaaS platform for global distribution with real-time booking features for travel services.', bullets: ['Implemented real-time booking features for travel services.', 'Optimized B2B workflows to improve operational efficiency.', 'Built CI/CD pipelines for continuous deployment.'] },
  { number: '03', title: 'Customer management and activity dashboards', org: 'COMUNIK CRM', role: 'Full Stack Intern', period: 'June 2024 – August 2024', location: 'Tunis, Tunisia', tags: ['React', 'Node.js', 'WebSockets', 'TailwindCSS'], summary: 'Worked across an interactive customer-management frontend and backend services for real-time data processing.', bullets: ['Developed an interactive frontend for customer management.', 'Designed backend services for real-time data processing.', 'Implemented dynamic dashboards for activity tracking.'] },
  { number: '04', title: 'Digital catalog and access-control system', org: 'VERMEG', role: 'Full Stack & DevOps Intern', period: 'January 2023 – June 2023', location: 'Tunis, Tunisia', tags: ['Spring Boot', 'Azure', 'CI/CD', 'Keycloak'], summary: 'Developed a digital catalog system with role-based access control and authentication.', bullets: ['Configured a mailing server for system communications.', 'Deployed the application on Azure Cloud.', 'Implemented CI/CD pipelines to automate delivery workflows.'] },
]

const skillGroups = [
  ['Languages', ['JavaScript', 'TypeScript', 'Java', 'Python', 'PHP', 'Kotlin']],
  ['Frameworks', ['React', 'Angular', 'Vue.js', 'Next.js', 'NestJS', 'Node.js', 'Express.js', 'Spring Boot', 'Laravel']],
  ['DevOps & Cloud', ['Docker', 'Kubernetes', 'Helm', 'Terraform', 'Azure', 'DigitalOcean', 'GitHub Actions', 'Jenkins', 'GitLab']],
  ['Infrastructure & Monitoring', ['Nginx', 'Traefik', 'Prometheus', 'Grafana']],
  ['Backend & Systems', ['Redis', 'REST APIs', 'Keycloak', 'RAG']],
  ['Databases', ['PostgreSQL', 'MongoDB', 'MySQL', 'Oracle', 'Prisma']],
]

const identityLines = ['Wajdi Amdouni', 'Software Engineer']

const skillLogos: Record<string, string> = {
  JavaScript: 'javascript', TypeScript: 'typescript', Java: 'java', Python: 'python', PHP: 'php', Kotlin: 'kotlin',
  React: 'react', Angular: 'angular', 'Vue.js': 'vue', 'Next.js': 'nextjs', NestJS: 'nestjs', 'Node.js': 'nodejs', 'Express.js': 'express', 'Spring Boot': 'spring', Laravel: 'laravel',
  Docker: 'docker', Kubernetes: 'kubernetes', Helm: 'helm', Terraform: 'terraform', Azure: 'azure', DigitalOcean: 'digitalocean', 'GitHub Actions': 'github-actions', Jenkins: 'jenkins', GitLab: 'gitlab',
  Nginx: 'nginx', Traefik: 'traefik', Prometheus: 'prometheus', Grafana: 'grafana', 'GitHub OIDC': 'github',
  Redis: 'redis', 'REST APIs': 'postman', Keycloak: 'keycloak', RAG: 'openai',
  PostgreSQL: 'postgresql', MongoDB: 'mongodb', MySQL: 'mysql', Oracle: 'oracle', Prisma: 'prisma',
}

function SkillMark({ skill }: { skill: string }) {
  const slug = skillLogos[skill]
  if (!slug) {
    return <span className="skill-wordmark" aria-hidden="true">{skill}</span>
  }
  const source = skill === 'Jenkins'
    ? 'https://www.jenkins.io/images/logos/jenkins/jenkins.png'
    : skill === 'MongoDB'
      ? 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg'
      : `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/default.svg`
  return <span className={`skill-logo logo-${skill.toLowerCase().replace(/[^a-z0-9]/g, '')}`} aria-hidden="true"><img src={source} alt="" /></span>
}

function Topology() {
  return <div className="topology" aria-label="Illustrative software delivery path from product services to cloud infrastructure">
    <div className="topology-grid" />
    <span className="topology-label label-product">PRODUCT / SERVICES</span>
    <span className="topology-label label-cloud">CLOUD / DELIVERY</span>
    <div className="topology-node node-app">Next.js<span>application</span></div>
    <div className="topology-node node-api">NestJS<span>services</span></div>
    <div className="topology-node node-queue">Redis / BullMQ<span>async workflows</span></div>
    <div className="topology-node node-azure">Azure / AKS<span>container runtime</span></div>
    <div className="topology-node node-terraform">Terraform<span>infrastructure as code</span></div>
    <div className="topology-node node-actions">GitHub Actions<span>delivery pipeline</span></div>
    <svg className="topology-lines" viewBox="0 0 620 470" fill="none" aria-hidden="true">
      <path d="M130 95H220V205H330" /><path d="M130 205H220" /><path d="M130 315H220V205" /><path d="M330 205H420V120H505" /><path className="active-line" d="M330 205H420V350H505" /><path d="M220 205H330" />
      <circle cx="220" cy="205" r="4" /><circle cx="420" cy="205" r="4" /><circle className="active-dot" cx="505" cy="350" r="5" />
    </svg>
    <span className="topology-caption">illustrative system topology / not a live environment</span>
  </div>
}

export default function Page() {
  const pageRef = useRef<HTMLElement>(null)
  const workContainerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: workContainerRef,
    offset: ['start start', 'end end'],
  })
  const workX = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLight, setIsLight] = useState(true)
  const [mailCopied, setMailCopied] = useState(false)
  const [identityIndex, setIdentityIndex] = useState(0)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme')
    setIsLight(savedTheme ? savedTheme === 'light' : true)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = isLight ? 'light' : 'dark'
    window.localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark')
  }, [isLight])

  useEffect(() => {
    const identityTimer = window.setInterval(() => {
      setIdentityIndex((current) => (current + 1) % identityLines.length)
    }, 4200)
    return () => window.clearInterval(identityTimer)
  }, [])

  useGSAP(() => {
    const root = pageRef.current
    if (!root) return

    const mm = gsap.matchMedia()
    mm.add(
      {
        desktop: '(min-width: 801px)',
        reducedMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, reducedMotion } = context.conditions as { desktop: boolean; reducedMotion: boolean }
        if (!desktop || reducedMotion) return

        const heroStage = root.querySelector('.hero-stage')
        const heroPhoto = root.querySelector('.hero-photo')
        const heroCopy = root.querySelector('.hero-copy')
        const heroAside = root.querySelector('.hero-aside')
        const heroOrbits = root.querySelectorAll('.hero-orbit')
        const heroScrollCue = root.querySelector('.hero-scroll-cue')
        const focusTitle = root.querySelector('.focus-title')
        const focusMap = root.querySelector('.focus-map')
        const focusStatement = root.querySelector('.focus-statement')
        if (!heroStage || !heroPhoto || !heroCopy || !heroAside || !focusTitle || !focusMap || !focusStatement) return

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: heroStage,
            start: 'top top',
            end: '+=90%',
            pin: true,
            pinSpacing: false,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .to(heroPhoto, { yPercent: -8, scale: 0.94, duration: 1 }, 0)
          .to(heroCopy, { yPercent: -16, opacity: 0.35, duration: 1 }, 0)
          .to(heroAside, { yPercent: -12, opacity: 0.3, duration: 1 }, 0)
          .to(heroOrbits, { yPercent: -7, opacity: 0.5, duration: 1, stagger: 0.04 }, 0)
          .to(heroScrollCue, { opacity: 0, duration: 1 }, 0)
          .from(focusTitle, { y: 90, duration: 0.42 }, 0.18)
          .from(focusMap, { y: 120, duration: 0.42 }, 0.34)
          .from(focusStatement, { y: 80, duration: 0.42 }, 0.58)
      },
    )

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, { scope: pageRef })

  const closeMenu = () => setMenuOpen(false)
  const toggleTheme = () => setIsLight((current) => !current)
  const copyEmail = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    await navigator.clipboard.writeText('amdouniwajdiii@gmail.com')
    setMailCopied(true)
    window.setTimeout(() => setMailCopied(false), 1800)
  }

  return <main ref={pageRef}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="shell header-inner">
        <div className="nav-identity" aria-label="I am Wajdi Amdouni, Software Engineer"><span className="nav-prompt">I am </span><span key={identityLines[identityIndex]} className="nav-identity-value">{identityLines[identityIndex]}</span><span className="nav-caret" aria-hidden="true" /></div>
        <div className="header-actions">
          <span className="nav-socials" aria-label="Social links">
            <a className="social-linkedin" href="https://linkedin.com/in/wajdi-amdouni" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><span aria-hidden="true">in</span></a>
            <a href="https://github.com/redddFF" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><img src="https://cdn.simpleicons.org/github/C6B9ED" alt="" /></a>
            <a className={mailCopied ? 'mail-link mail-copied' : 'mail-link'} href="mailto:amdouniwajdiii@gmail.com" onClick={copyEmail} aria-label={mailCopied ? 'Email copied' : 'Copy email address'} title={mailCopied ? 'Copied' : 'Copy email address'}><img src="https://cdn.simpleicons.org/gmail/C6B9ED" alt="" /></a>
          </span>
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'} title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}>
            {isLight ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
          </button>
          <button className="menu-button" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        <nav id="primary-nav" className={menuOpen ? 'primary-nav open' : 'primary-nav'} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#focus" onClick={closeMenu}>Focus</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#education" onClick={closeMenu}>Education</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </div>
    </header>

    <section id="top" className="hero">
      <div className="hero-frame">
        <div className="hero-stage">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-photo"><img src="/profile.png" alt="Portrait of Wajdi Amdouni" /></div>
          <div className="hero-copy"><p className="hero-kicker mono">01 / BUILD WITH INTENTION</p><h1><span className="hero-line"><span className="hero-word word-1">Let&apos;s</span></span><span className="hero-line"><span className="hero-word word-2">Build</span></span><em><span className="hero-line"><span className="hero-word word-3">Something</span></span><span className="hero-line"><span className="hero-word word-4">That</span> <span className="hero-word word-5">Matters</span></span></em></h1></div>
          <div className="hero-aside">
            <p className="hero-aside-label mono">WHAT I CAN DO</p>
            <div className="hero-card-stack">
              <a className="hero-skill-card card-yellow" href="#work"><span className="hero-card-index mono">01</span><strong>FULL STACK ENGINEERING</strong><ArrowUpRight aria-hidden="true" /></a>
              <a className="hero-skill-card card-blue" href="#focus"><span className="hero-card-index mono">02</span><strong>CLOUD &amp; DEVOPS</strong><ArrowUpRight aria-hidden="true" /></a>
              <a className="hero-skill-card card-pink" href="#experience"><span className="hero-card-index mono">03</span><strong>REAL-TIME SYSTEMS</strong><ArrowUpRight aria-hidden="true" /></a>
              <a className="hero-skill-card card-green" href="#work"><span className="hero-card-index mono">04</span><strong>INFRASTRUCTURE AS CODE</strong><ArrowUpRight aria-hidden="true" /></a>
              <a className="hero-skill-card card-coral" href="#experience"><span className="hero-card-index mono">05</span><strong>CI/CD DELIVERY</strong><ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <a className="hero-scroll-cue" href="#focus" aria-label="Scroll down to focus section"><span className="mono">SCROLL DOWN</span><ArrowDown aria-hidden="true" /></a>
        </div>
      </div>
    </section>

    <section id="focus" className="section focus-section">
      <div className="focus-canvas shell" aria-label="Engineering flow from idea to software, platform, infrastructure, and delivery">
        <div className="focus-title">
          <p className="focus-kicker mono">02 / ORIENTATION</p>
          <h2>
            <span>From</span>
            <span className="focus-accent">idea</span>
            <span>to</span>
            <span>delivery.</span>
          </h2>
          <p className="focus-lede">I design the path between a useful idea and the infrastructure that keeps it moving.</p>
        </div>

        <div className="focus-map">
          <svg className="focus-flow" viewBox="0 0 1000 420" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path className="flow-active flow-desktop" pathLength="1" d="M70 300C175 300 205 160 300 160S425 300 500 300 625 160 700 160 825 300 930 300" />
            <path className="flow-active flow-mobile" pathLength="1" d="M250 42C500 42 750 100 750 125S250 205 250 210 750 285 750 295 250 370 250 378" />
            <circle className="flow-desktop" cx="70" cy="300" r="5" /><circle className="flow-desktop" cx="300" cy="160" r="5" /><circle className="flow-desktop" cx="500" cy="300" r="5" /><circle className="flow-desktop" cx="700" cy="160" r="5" /><circle className="flow-desktop" cx="930" cy="300" r="5" />
            <circle className="flow-mobile" cx="250" cy="42" r="5" /><circle className="flow-mobile" cx="750" cy="125" r="5" /><circle className="flow-mobile" cx="250" cy="210" r="5" /><circle className="flow-mobile" cx="750" cy="295" r="5" /><circle className="flow-mobile" cx="250" cy="378" r="5" />
          </svg>
          <ol className="focus-stages">
            <li className="focus-stage stage-idea"><span className="stage-index mono">01</span><span className="stage-label mono">ORIGIN POINT</span><strong>Idea</strong><small>Technical problem solving</small></li>
            <li className="focus-stage stage-software"><span className="stage-index mono">02</span><span className="stage-label mono">APPLICATION SURFACE</span><strong>Software</strong><small>Software engineering · Full stack development</small></li>
            <li className="focus-stage stage-platform"><span className="stage-index mono">03</span><span className="stage-label mono">CLOUD PLATFORM</span><strong>Platform</strong><small>Cloud architecture · Cloud infrastructure</small></li>
            <li className="focus-stage stage-infra"><span className="stage-index mono">04</span><span className="stage-label mono">RUNTIME LAYER</span><strong>Infrastructure</strong><small>Kubernetes · DevOps</small></li>
            <li className="focus-stage stage-delivery"><span className="stage-index mono">05</span><span className="stage-label mono">DELIVERY LAYER</span><strong>Delivery</strong><small>CI/CD · repeatable release</small></li>
          </ol>
        </div>

        <div className="focus-statement" role="status" aria-label="Engineering system shell output">
          <div className="shell-titlebar"><span className="shell-controls" aria-hidden="true"><i /><i /><i /></span><span>wajdiamdouni-portfolio — bash</span></div>
          <div className="shell-body">
            <div className="shell-command" aria-hidden="true"><span className="shell-user">wajdiamdouni</span><span className="shell-separator">@</span><span className="shell-host">portfolio</span><span className="shell-separator">:</span><span className="shell-path">~</span><span className="shell-prompt">$</span><span className="shell-typed"> make delivery-repeatable</span><span className="shell-cursor" /></div>
            <div className="shell-output">The work is not a stack of isolated skills. It is one connected system: shape the software, give it a platform, make it resilient, then make delivery repeatable.</div>
          </div>
        </div>
        <a className="focus-scroll-cue" href="#work" aria-label="Scroll down to selected work">
          <span className="mono">KEEP SCROLLING</span>
          <span className="focus-scroll-arrows" aria-hidden="true"><ArrowDown /><ArrowDown /><ArrowDown /><ArrowDown /><ArrowDown /></span>
        </a>
      </div>
    </section>

    <section id="work" ref={workContainerRef} className="horizontal-work-section">
      <div className="horizontal-work-sticky">
        <motion.div className="horizontal-work-track" style={{ x: prefersReducedMotion ? undefined : workX }}>
          <div className="section-head work-head horizontal-work-intro">
            <p className="eyebrow">03 / SELECTED PROFESSIONAL WORK</p>
            <h2>Internship<br /><em>case studies.</em></h2>
            <p className="section-note">Four professional experiences across product development, cloud infrastructure, and delivery workflows.</p>
          </div>
          <div className="case-list">{caseStudies.map((item, i) => <article className="case-study" key={item.org}><div className="case-number mono">{item.number}</div><div className="case-main"><div className="case-meta"><span>{item.org}</span><span>{item.period}</span></div><h3>{item.title}</h3><p className="case-role">{item.role} <i>·</i> {item.location}</p><p className="case-summary">{item.summary}</p><ul>{item.bullets.map(b => <li key={b}>{b}</li>)}</ul><div className="tags" aria-label="Technologies used">{item.tags.map(t => <span className="skill-chip" key={t} aria-label={t} title={t}><SkillMark skill={t} /></span>)}</div></div><div className={`case-mark mark-${i + 1}`} aria-hidden="true"><span /></div></article>)}</div>
        </motion.div>
      </div>
    </section>

    <section id="experience" className="section shell timeline-section"><div className="section-head"><p className="eyebrow">04 / EXPERIENCE</p><h2>Built through<br /><em>practice.</em></h2></div><div className="timeline">{caseStudies.map(item => <div className="timeline-item" key={item.org}><div className="timeline-dot" /><p className="mono timeline-date">{item.period}</p><div><h3>{item.role}</h3><p className="timeline-org">{item.org} <span>—</span> {item.location}</p><p className="timeline-summary">{item.summary}</p></div></div>)}</div></section>

    <section className="section shell skills-section"><div className="section-head"><p className="eyebrow">05 / TECHNICAL SKILLS</p><h2>Tools for<br /><em>the system.</em></h2></div><div className="skills-grid">{skillGroups.map(([name, skills]) => <div className="skill-group" key={name as string}><p className="mono">{name as string}</p><div className="skill-marks">{(skills as string[]).map((skill, index) => <span className="skill-chip" style={{ '--delay': `${index * 90}ms` } as React.CSSProperties} key={skill} aria-label={skill} title={skill}><SkillMark skill={skill} /></span>)}</div></div>)}</div></section>

    <section id="education" className="section shell education-section"><div className="section-head"><p className="eyebrow">06 / EDUCATION</p><h2>The foundation<br /><em>underneath.</em></h2></div><div className="education-list">{[['Engineering Degree in Software Engineering', 'Higher Institute of Multimedia Arts of Manouba', '2023 – 2026', 'Manouba, Tunisia'], ["Bachelor’s Degree in Information Technology", 'Higher Institute of Technological Studies of Bizerte', '2020 – 2023', 'Bizerte, Tunisia'], ['Technical Sciences Baccalaureate', 'Farabi High School', '2020', 'Manouba, Tunisia']].map(([degree, school, period, location]) => <div className="education-item" key={school}><p className="mono">{period}</p><div><h3>{degree}</h3><p>{school}</p><span>{location}</span></div></div>)}</div><div className="languages"><p className="mono">LANGUAGES</p><span>Arabic <i>Native</i></span><span>French <i>Fluent</i></span><span>English <i>Advanced</i></span></div></section>

    <section id="contact" className="contact-section"><div className="shell contact-inner"><div><p className="eyebrow">07 / CONTACT</p><h2>Let&apos;s build<br /><em>what&apos;s next.</em></h2></div><div className="contact-details"><p className="contact-prompt">Open to conversations about software engineering, cloud infrastructure, and thoughtful technical work.</p><a href="mailto:amdouniwajdiii@gmail.com">amdouniwajdiii@gmail.com <ArrowUpRight size={18} /></a><a href="tel:+21620472338">+216 20 472 338</a><div className="social-links"><a href="https://linkedin.com/in/wajdi-amdouni">LinkedIn ↗</a><a href="https://github.com/redddFF">GitHub ↗</a></div></div></div></section>
    <footer className="shell footer"><span>© 2026 Wajdi Amdouni</span><span>wajdiamdouni.com</span><a href="#top">Back to top ↑</a></footer>
  </main>
}
