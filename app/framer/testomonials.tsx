"use client"

import { useState, useRef, useEffect } from "react"
import { motion, cubicBezier } from "framer-motion"
import TestimonialCard from "./testimonial-card"

const EASING = cubicBezier(0.22, 1, 0.36, 1)
const TRANSITION_PILE_TO_STACK = 0.5
const TRANSITION_STACK_TO_PILE = 0.42

const testimonials = [
  {
    id: "A",
    name: "Kathy Pacheco",
    title: "Adulting made easy!",
    description: "Easily, truly financial sidekick. Budgets, goals, and expenses – all in one place.",
    bgGradient: "from-cyan-500/20 to-cyan-600/10",
    avatarColor: "bg-cyan-400",
    accentColor: "text-cyan-300",
    borderColor: "border-cyan-500/30",
    size: { width: 340, height: 265 },
  },
  {
    id: "B",
    name: "Rodger Struck",
    title: "My financial superhero!",
    description: "Simple, intuitive money management. Inclusive budgeting and planning are now streamlined.",
    bgGradient: "from-slate-700/15 to-slate-800/10",
    avatarColor: "bg-slate-400",
    accentColor: "text-slate-300",
    borderColor: "border-slate-600/30",
    size: { width: 320, height: 260 },
  },
  {
    id: "C",
    name: "Kelly Pearson",
    title: "Building made easy!",
    description: "Financial independence feels achievable. Goals and milestones are within my reach.",
    bgGradient: "from-emerald-500/20 to-emerald-600/10",
    avatarColor: "bg-emerald-400",
    accentColor: "text-emerald-300",
    borderColor: "border-emerald-500/30",
    size: { width: 340, height: 265 },
  },
  {
    id: "D",
    name: "Bradley Lawler",
    title: "Taking up with Easily",
    description: "Powerful features without complexity. Financial management is finally intuitive.",
    bgGradient: "from-indigo-500/15 to-indigo-600/10",
    avatarColor: "bg-indigo-400",
    accentColor: "text-indigo-300",
    borderColor: "border-indigo-500/30",
    size: { width: 330, height: 260 },
  },
  {
    id: "E",
    name: "Kurt Batchler",
    title: "Smashing goals with Easily!",
    description: "Simple tracking for financial wins and expenses. My go-to for leveling up!",
    bgGradient: "from-orange-500/20 to-orange-600/10",
    avatarColor: "bg-orange-400",
    accentColor: "text-orange-300",
    borderColor: "border-orange-500/30",
    size: { width: 350, height: 265 },
  },
]

const pilePositions = {
  A: { x: 25, y: 30, rotate: -18, rotateX: 8, rotateY: -12, scale: 0.96, z: 30 },
  B: { x: 45, y: 55, rotate: -6, rotateX: -5, rotateY: 8, scale: 0.94, z: 10 },
  C: { x: 72, y: 25, rotate: 16, rotateX: 10, rotateY: 15, scale: 0.98, z: 40 },
  D: { x: 32, y: 72, rotate: -12, rotateX: -8, rotateY: -10, scale: 0.95, z: 20 },
  E: { x: 65, y: 70, rotate: 8, rotateX: 6, rotateY: 12, scale: 1.02, z: 50 },
}

const stackPositions = {
  A: { x: 20, y: 22, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, z: 30 },
  B: { x: 50, y: 22, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, z: 10 },
  C: { x: 80, y: 22, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, z: 40 },
  D: { x: 35, y: 82, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, z: 20 },
  E: { x: 67, y: 82, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, z: 50 },
}

// Mobile positions (single column, no hover)
const mobilePositions = {
  A: { x: 50, y: 22, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, z: 1 },
  B: { x: 50, y: 76, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, z: 2 },
  C: { x: 50, y: 40, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, z: 3 },
  D: { x: 50, y: 92, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, z: 4 },
  E: { x: 50, y: 58, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, z: 5 },
}

export default function Testimonials() {
  const [isPile, setIsPile] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    // Check if mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Force stack on mobile
  const showPile = isPile && !isMobile

  const getPositions = () => {
    if (isMobile) return mobilePositions
    return showPile ? pilePositions : stackPositions
  }

  const getTransitionDuration = () => {
    if (prefersReducedMotion) return 0.15
    return showPile ? TRANSITION_STACK_TO_PILE : TRANSITION_PILE_TO_STACK
  }

  const positions = getPositions()
  const duration = getTransitionDuration()

  return (
    <section className="relative w-full min-h-screen bg-background py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/20 to-slate-950/60 pointer-events-none" />
      <div
        className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-20 md:mb-32 text-center px-4 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm font-semibold tracking-[0.15em] text-cyan-400/80 uppercase mb-6"
        >
          Testimonials
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-50 leading-[1.15] tracking-tight mb-6"
        >
          What users
          <br className="hidden md:block" />
          love about us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base text-slate-400 leading-relaxed"
        >
          Hover to organize cards and see what makes us loved by thousands
        </motion.p>
      </div>

      {/* Card Cluster Container */}
      <div className="relative w-full max-w-6xl px-4">
        <motion.div
          ref={containerRef}
          onMouseEnter={() => !isMobile && setIsPile(false)}
          onMouseLeave={() => !isMobile && setIsPile(true)}
          onFocus={() => !isMobile && setIsPile(false)}
          onBlur={() => !isMobile && setIsPile(true)}
          tabIndex={0}
          className="relative w-full h-96 md:h-[500px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-2xl transition-all duration-300"
          style={{ perspective: "1200px" }}
        >
          {testimonials.map((testimonial) => {
            const pos = positions[testimonial.id as keyof typeof positions]

            return (
              <motion.div
                key={testimonial.id}
                className="absolute"
                style={{
                  width: testimonial.size.width,
                  height: testimonial.size.height,
                  left: "50%",
                  top: "50%",
                  perspective: "1200px",
                }}
                animate={{
                  x: `calc(-50% + ${((pos.x - 50) * (containerRef.current?.clientWidth || 0)) / 100}px)`,
                  y: `calc(-50% + ${((pos.y - 50) * (containerRef.current?.clientHeight || 0)) / 100}px)`,
                  rotate: prefersReducedMotion ? 0 : pos.rotate,
                  rotateX: prefersReducedMotion ? 0 : pos.rotateX,
                  rotateY: prefersReducedMotion ? 0 : pos.rotateY,
                  scale: pos.scale,
                  zIndex: pos.z,
                }}
                transition={{
                  duration,
                  ease: EASING,
                  type: "tween",
                }}
              >
                <TestimonialCard {...testimonial} isMobile={isMobile} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Mobile interaction hint */}
      {isMobile && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
          className="mt-8 text-xs text-muted-foreground text-center"
        >
          Tap cards to explore
        </motion.p>
      )}
    </section>
  )
}
