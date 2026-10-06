'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type Experience = {
  number: string
  title: string
  org: string
  role: string
  period: string
  location: string
  tags: string[]
  summary: string
  bullets: string[]
}

type ExperienceTimelineProps = {
  experiences: Experience[]
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add(
        {
          desktop: '(min-width: 801px)',
          reducedMotion: '(prefers-reduced-motion: reduce)',
        },
        ({ conditions }) => {
          const { desktop, reducedMotion } = conditions as { desktop: boolean; reducedMotion: boolean }
          if (!desktop || reducedMotion) return

          const items = gsap.utils.toArray<HTMLElement>('.timeline-item', section)
          const progress = section.querySelector<HTMLElement>('.timeline-progress')
          const heading = section.querySelector<HTMLElement>('.section-head')
          if (!items.length || !progress) return

          const itemContent = (item: HTMLElement) => item.querySelectorAll<HTMLElement>(
            '.timeline-date, .timeline-org, h3, .timeline-summary',
          )

          gsap.set(items, { opacity: 0.36, y: 12, scale: 0.96, filter: 'blur(1.5px)' })
          gsap.set(itemContent(items[0]), { opacity: 0.45, y: 10 })
          gsap.set(items[0], { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' })

          const animation = gsap.timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${Math.max(2400, experiences.length * window.innerHeight * 0.85)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          animation
            .to(progress, { scaleY: 1, duration: experiences.length }, 0)
            .to(heading, { opacity: 0.92, duration: experiences.length }, 0)

          experiences.forEach((_, index) => {
            const item = items[index]
            const content = itemContent(item)
            const start = index

            if (index === 0) {
              animation.to(content, { opacity: 1, y: 0, duration: 0.28, stagger: 0.1 }, start)
            } else {
              const previous = items[index - 1]
              animation.to(previous, {
                opacity: 0.36,
                y: 12,
                scale: 0.96,
                filter: 'blur(1.5px)',
                duration: 0.24,
              }, start)
              animation.to(item, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.28,
              }, start)
              animation.fromTo(
                content,
                { opacity: 0.45, y: 10 },
                { opacity: 1, y: 0, duration: 0.28, stagger: 0.1 },
                start + 0.08,
              )
            }

            animation.to(item.querySelector<HTMLElement>('.timeline-dot'), {
              scale: 1.35,
              backgroundColor: 'var(--accent)',
              duration: 0.2,
            }, start)
            if (index > 0) {
              animation.to(items[index - 1].querySelector<HTMLElement>('.timeline-dot'), {
                scale: 1,
                backgroundColor: 'var(--border-strong)',
                duration: 0.2,
              }, start)
            }
          })
        },
      )
    }, section)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      context.revert()
    }
  }, [experiences.length])

  return (
    <section id="experience" ref={sectionRef} className="section shell timeline-section">
      <div className="section-head">
        <p className="eyebrow">04 / EXPERIENCE</p>
        <h2>Built through<br /><em>practice.</em></h2>
      </div>
      <div className="timeline">
        <span className="timeline-progress" aria-hidden="true" />
        {experiences.map((item) => (
          <div className="timeline-item" key={item.org}>
            <div className="timeline-dot" />
            <p className="mono timeline-date">{item.period}</p>
            <div>
              <h3>{item.role}</h3>
              <p className="timeline-org">{item.org} <span>—</span> {item.location}</p>
              <p className="timeline-summary">{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
