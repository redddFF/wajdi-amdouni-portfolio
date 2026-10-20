'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Education = {
  degree: string
  school: string
  period: string
  location: string
}

type EducationTimelineProps = {
  education: Education[]
}

export default function EducationTimeline({ education }: EducationTimelineProps) {
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
          const { desktop, reducedMotion } = conditions as {
            desktop: boolean
            reducedMotion: boolean
          }

          if (!desktop || reducedMotion) return

          const items = gsap.utils.toArray<HTMLElement>('.education-item', section)
          const heading = section.querySelector<HTMLElement>('.section-head')
          if (!items.length || !heading) return

          const itemContent = (item: HTMLElement) =>
            item.querySelectorAll<HTMLElement>('.mono, h3, p:not(.mono), span')

          gsap.set(items, {
            opacity: 0.36,
            y: 12,
            scale: 0.96,
            filter: 'blur(1.5px)',
          })

          gsap.set(itemContent(items[0]), { opacity: 0.45, y: 10 })
          gsap.set(items[0], {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
          })

          const animation = gsap.timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${Math.max(2400, education.length * window.innerHeight * 0.85)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          animation.to(heading, { opacity: 0.92, duration: education.length }, 0)

          education.forEach((_, index) => {
            const item = items[index]
            const content = itemContent(item)
            const start = index

            if (index === 0) {
              animation.to(
                content,
                { opacity: 1, y: 0, duration: 0.28, stagger: 0.1 },
                start,
              )
            } else {
              const previous = items[index - 1]

              animation.to(
                previous,
                {
                  opacity: 0.36,
                  y: 12,
                  scale: 0.96,
                  filter: 'blur(1.5px)',
                  duration: 0.24,
                },
                start,
              )

              animation.to(
                item,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: 0.28,
                },
                start,
              )

              animation.fromTo(
                content,
                { opacity: 0.45, y: 10 },
                { opacity: 1, y: 0, duration: 0.28, stagger: 0.1 },
                start + 0.08,
              )
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
  }, [education.length])

  return (
    <section id="education" ref={sectionRef} className="section shell education-section">
      <div className="section-head">
        <p className="eyebrow">06 / EDUCATION</p>
        <h2>The foundation<br /><em>underneath.</em></h2>
      </div>

      <div className="education-list">
        {education.map((item) => (
          <div className="education-item" key={item.school}>
            <p className="mono">{item.period}</p>
            <div>
              <h3>{item.degree}</h3>
              <p>{item.school}</p>
              <span>{item.location}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="languages">
        <p className="mono">LANGUAGES</p>
        <span>Arabic <i>Native</i></span>
        <span>French <i>Fluent</i></span>
        <span>English <i>Advanced</i></span>
      </div>
    </section>
  )
}

