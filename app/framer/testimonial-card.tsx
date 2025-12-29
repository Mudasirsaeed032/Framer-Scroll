"use client"

import { motion } from "framer-motion"

interface TestimonialCardProps {
  id: string
  name: string
  title: string
  description: string
  bgGradient: string
  avatarColor: string
  accentColor: string
  borderColor: string
  size: { width: number; height: number }
  isMobile: boolean
}

export default function TestimonialCard({
  name,
  title,
  description,
  bgGradient,
  avatarColor,
  accentColor,
  borderColor,
  isMobile,
}: TestimonialCardProps) {
  return (
    <motion.div
      className={`w-full h-full rounded-2xl overflow-hidden bg-card/80 dark:bg-card/60 bg-gradient-to-br ${bgGradient} backdrop-blur-xl border ${borderColor} transition-all duration-300 group shadow-lg dark:shadow-2xl`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        boxShadow: "0 25px 50px -12px var(--overlay)",
      }}
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-foreground/[0.06] via-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-bl from-background/20 dark:from-background/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 md:p-7">
        {/* Avatar and Name Section */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            <motion.div
              className={`w-10 h-10 rounded-full ${avatarColor} flex-shrink-0 shadow-md dark:shadow-lg`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">From</p>
              <p className="text-sm md:text-base font-bold text-foreground truncate leading-tight">{name}</p>
            </div>
          </div>

          <p className={`text-sm md:text-base font-bold ${accentColor} leading-snug mb-3 line-clamp-2`}>{title}</p>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-foreground/70 leading-relaxed line-clamp-3">{description}</p>
      </div>
    </motion.div>
  )
}
