"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Wallet, BarChart3, Sliders, Shield } from "lucide-react"

interface IconRailProps {
  currentStep: number
  steps: Array<{
    icon: string
    label: string
    headline: string
    subtext: string
  }>
}

const iconMap: Record<string, React.ComponentType<any>> = {
  wallet: Wallet,
  chart: BarChart3,
  sliders: Sliders,
  shield: Shield,
}

export default function IconRail({ currentStep, steps }: IconRailProps) {
  return (
    <div className="flex flex-col gap-6">
      {steps.map((step, index) => {
        const IconComponent = iconMap[step.icon]
        const isActive = index === currentStep

        return (
          <motion.div
            key={index}
            className="flex items-center justify-center"
            animate={{
              scale: isActive ? 1.1 : 1,
            }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                isActive
                  ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/50"
                  : "bg-slate-700/50 text-slate-500 hover:bg-slate-600/50"
              }`}
              animate={{
                boxShadow: isActive ? "0 0 24px rgba(16, 185, 129, 0.5)" : "0 0 0px rgba(16, 185, 129, 0)",
              }}
              transition={{
                duration: 0.4,
              }}
            >
              <IconComponent size={32} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
