'use client'

import { motion, type MotionStyle } from 'motion/react'

type Tone = 'blue' | 'green' | 'purple' | 'orange'

const colors: Record<Tone, string> = {
  blue: '#4d83d1',
  green: '#5b9d7b',
  purple: '#876bc0',
  orange: '#d38a51',
}

const logos: Record<string, string> = {
  'Next.js': 'nextdotjs',
  NestJS: 'nestjs',
  'Azure AKS': 'kubernetes',
  PostgreSQL: 'postgresql',
  Redis: 'redis',
  OpenRouter: 'openai',
  Docker: 'docker',
  Terraform: 'terraform',
  'GitHub Actions': 'githubactions',
}

type TechNodeProps = {
  x: number
  y: number
  label: string
  tone?: Tone
  central?: boolean
}

type ArchitecturePreviewProps = {
  style?: MotionStyle
}

export function TechNode({ x, y, label, tone = 'blue', central = false }: TechNodeProps) {
  const size = central ? 82 : 48
  const logoSize = central ? 30 : 21
  const logo = logos[label]

  return (
    <motion.g
      className={`tech-node${central ? ' tech-node-central' : ''}`}
      initial={{ scale: 1 }}
      animate={{ scale: central ? [1, 1.025, 1] : [1, 1.015, 1] }}
      transition={{ duration: central ? 4 : 3.2, repeat: Infinity, ease: 'easeInOut', delay: central ? 0 : x / 1000 }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <circle cx={x} cy={y} r={size / 2} fill="#fff" stroke={central ? colors.blue : '#c6d0db'} strokeWidth={central ? 1.5 : 1} />
      <circle cx={x} cy={y} r={(size / 2) - 5} fill="none" stroke={colors[tone]} strokeOpacity=".2" />
      {logo && <image href={`https://cdn.simpleicons.org/${logo}/${colors[tone].slice(1)}`} x={x - logoSize / 2} y={y - logoSize / 2 - (central ? 5 : 4)} width={logoSize} height={logoSize} />}
      <text x={x} y={y + (central ? 24 : 19)} textAnchor="middle" className={central ? 'tech-label tech-label-central' : 'tech-label'}>{central ? 'AZURE AKS' : label}</text>
    </motion.g>
  )
}

type DataParticleProps = {
  points: Array<{ x: number; y: number }>
  tone: Tone
  duration?: number
  delay?: number
}

export function DataParticle({ points, tone, duration = 3.5, delay = 0 }: DataParticleProps) {
  return (
    <motion.circle
      r="3"
      fill={colors[tone]}
      initial={{ cx: points[0].x, cy: points[0].y, opacity: 0 }}
      animate={{ cx: points.map((point) => point.x), cy: points.map((point) => point.y), opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear', times: [0, .12, .82, 1] }}
    />
  )
}

type ConnectionProps = {
  d: string
  points: Array<{ x: number; y: number }>
  tone: Tone
  delay?: number
}

export function AnimatedConnection({ d, points, tone, delay }: ConnectionProps) {
  return (
    <g>
      <path d={d} fill="none" stroke="#c1ccd8" strokeWidth="1" />
      <path d={d} fill="none" stroke={colors[tone]} strokeOpacity=".12" strokeWidth="4" />
      <DataParticle points={points} tone={tone} delay={delay} />
    </g>
  )
}

function ArchitectureConnections() {
  const center = { x: 400, y: 250 }
  return (
    <g aria-hidden="true">
      <AnimatedConnection d="M400 96C400 140 400 170 400 209" points={[{ x: 400, y: 96 }, { x: 400, y: 155 }, center]} tone="blue" />
      <AnimatedConnection d="M640 132C575 155 520 190 455 225" points={[{ x: 640, y: 132 }, { x: 550, y: 177 }, { x: 455, y: 225 }]} tone="blue" delay=".7" />
      <AnimatedConnection d="M652 350C580 325 525 295 455 270" points={[{ x: 652, y: 350 }, { x: 560, y: 315 }, { x: 455, y: 270 }]} tone="orange" delay="1.2" />
      <AnimatedConnection d="M540 425C510 370 470 330 430 290" points={[{ x: 540, y: 425 }, { x: 500, y: 350 }, { x: 430, y: 290 }]} tone="orange" delay="1.8" />
      <AnimatedConnection d="M400 291C400 345 400 380 400 415" points={[center, { x: 400, y: 345 }, { x: 400, y: 415 }]} tone="green" delay=".4" />
      <AnimatedConnection d="M185 350C250 320 300 290 345 270" points={[{ x: 185, y: 350 }, { x: 275, y: 310 }, { x: 345, y: 270 }]} tone="green" delay="1" />
      <AnimatedConnection d="M158 132C235 155 290 190 345 225" points={[{ x: 158, y: 132 }, { x: 250, y: 175 }, { x: 345, y: 225 }]} tone="purple" delay="1.5" />
      <AnimatedConnection d="M112 250C190 250 270 250 345 250" points={[{ x: 112, y: 250 }, { x: 220, y: 250 }, { x: 345, y: 250 }]} tone="blue" delay="1.1" />
      <AnimatedConnection d="M260 460C310 400 350 345 380 290" points={[{ x: 260, y: 460 }, { x: 315, y: 380 }, { x: 380, y: 290 }]} tone="orange" delay=".3" />
    </g>
  )
}

export default function ArchitecturePreview({ style }: ArchitecturePreviewProps) {
  return (
    <motion.div className="architecture-diagram" style={style} aria-label="LURA LAW technology ecosystem">
      <svg viewBox="0 0 800 500" role="img">
        <defs>
          <pattern id="architecture-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="#d8e0e8" strokeWidth=".7" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#architecture-grid)" opacity=".42" />
        <circle cx="400" cy="250" r="145" fill="none" stroke="#c8d6e4" strokeDasharray="2 8" />
        <circle cx="400" cy="250" r="104" fill="none" stroke="#dce5ed" />
        <text x="28" y="30" className="architecture-overline">LURA LAW / PLATFORM ECOSYSTEM</text>
        <text x="772" y="30" textAnchor="end" className="architecture-overline">AZURE RUNTIME</text>
        <ArchitectureConnections />
        <TechNode x={400} y={250} label="Azure AKS" central />
        <TechNode x={400} y={72} label="Next.js" tone="blue" />
        <TechNode x={640} y={112} label="GitHub Actions" tone="orange" />
        <TechNode x={652} y={350} label="Terraform" tone="orange" />
        <TechNode x={540} y={435} label="PostgreSQL" tone="green" />
        <TechNode x={185} y={350} label="Redis" tone="green" />
        <TechNode x={158} y={132} label="OpenRouter" tone="purple" />
        <TechNode x={112} y={250} label="NestJS" tone="blue" />
        <TechNode x={260} y={460} label="Docker" tone="orange" />
        <text x="400" y="489" textAnchor="middle" className="architecture-caption">APPLICATION · DATA · AI · DELIVERY</text>
      </svg>
    </motion.div>
  )
}
