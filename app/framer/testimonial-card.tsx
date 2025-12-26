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
      className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${bgGradient} backdrop-blur-xl border ${borderColor} group`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-bl from-slate-950/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 md:p-7">
        {/* Avatar and Name Section */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            <motion.div
              className={`w-10 h-10 rounded-full ${avatarColor} flex-shrink-0 shadow-lg`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">From</p>
              <p className="text-sm md:text-base font-bold text-slate-50 truncate leading-tight">{name}</p>
            </div>
          </div>

          <p className={`text-sm md:text-base font-bold ${accentColor} leading-snug mb-3 line-clamp-2`}>{title}</p>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed line-clamp-3">{description}</p>
      </div>
    </motion.div>
  )
}
