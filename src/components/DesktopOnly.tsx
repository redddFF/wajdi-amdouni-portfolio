'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Laptop, Mouse, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const DESKTOP_BREAKPOINT = 1024

function isMobileOrTablet(): boolean {
  const userAgent = navigator.userAgent
  const userAgentData = (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData

  return Boolean(
    userAgentData?.mobile
      || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(userAgent),
  )
}

function isDesktopViewport(): boolean {
  return window.innerWidth >= DESKTOP_BREAKPOINT && !isMobileOrTablet()
}

function DesktopExperience() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <main className="desktop-experience">
      <div className="desktop-experience-grid" aria-hidden="true" />
      <motion.div
        className="desktop-experience-content"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="desktop-experience-mark" aria-hidden="true">
          <motion.div
            className="desktop-experience-laptop"
            animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Laptop strokeWidth={1.25} />
            <motion.span
              className="desktop-experience-pulse"
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          </motion.div>
          <motion.div
            className="desktop-experience-mouse"
            animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            <Mouse strokeWidth={1.25} />
          </motion.div>
          <motion.div
            className="desktop-experience-arrow"
            animate={prefersReducedMotion ? undefined : { x: [0, 7, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight strokeWidth={1.5} />
          </motion.div>
        </div>

       
        <h1>Desktop Experience Recommended</h1>
        <p className="desktop-experience-description">
          This portfolio was designed for desktop viewing to showcase interactive architecture diagrams, case studies, animations, and engineering projects.
        </p>

        <div className="desktop-experience-best-viewed">
          <p>Best viewed on:</p>
          <ul>
            <li>Laptop</li>
            <li>Desktop</li>
            <li>Large displays</li>
          </ul>
        </div>

        <div className="desktop-experience-actions">
        
          
        </div>
      </motion.div>
      <footer className="desktop-experience-footer">Wajdi Amdouni © 2026</footer>
    </main>
  )
}

export default function DesktopOnly({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const updateViewport = () => setIsDesktop(isDesktopViewport())
    const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)

    updateViewport()
    window.addEventListener('resize', updateViewport)
    window.addEventListener('orientationchange', updateViewport)
    mediaQuery.addEventListener('change', updateViewport)

    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('orientationchange', updateViewport)
      mediaQuery.removeEventListener('change', updateViewport)
    }
  }, [])

  useEffect(() => {
    if (isDesktop === true) {
      return
    }

    const previousDocumentOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = previousDocumentOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [isDesktop])

  if (isDesktop) {
    return <>{children}</>
  }

  return <DesktopExperience />
}
