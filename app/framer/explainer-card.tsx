"use client"

import { motion } from "framer-motion"

interface ExplainerCardProps {
  currentStep: number
}

export default function ExplainerCard({ currentStep }: ExplainerCardProps) {
  const cardVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <motion.div
        key={`card-${currentStep}`}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="relative"
      >
        {/* Card with subtle gradient and shadow */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-slate-900/40 pointer-events-none" />

          {/* Phone mockup / Card visual */}
          <div className="relative w-80 h-96 bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl p-6 flex flex-col justify-between text-white overflow-hidden">
            {/* Card header with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

            {/* Content per step */}
            <div className="relative z-10">
              <div className="text-sm font-semibold opacity-80 mb-2">Step {currentStep + 1}</div>
              <h3 className="text-2xl font-bold mb-4">
                {["Account Overview", "Smart Analytics", "Budget Controls", "Secure Insights"][currentStep]}
              </h3>
            </div>

            {/* Visual representation */}
            <div className="relative z-10 space-y-3">
              {currentStep === 0 && (
                <div className="space-y-2">
                  <div className="h-8 bg-white/20 rounded-lg" />
                  <div className="h-8 bg-white/20 rounded-lg w-5/6" />
                  <div className="h-8 bg-white/20 rounded-lg w-4/6" />
                </div>
              )}
              {currentStep === 1 && (
                <div className="flex gap-2 justify-center">
                  {[40, 60, 45, 75].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-green-400 to-green-500 rounded"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              )}
              {currentStep === 2 && (
                <div className="grid grid-cols-2 gap-2">
                  {["Budget", "Goals", "Limits", "Alerts"].map((label, i) => (
                    <div key={i} className="bg-white/10 rounded-lg p-3 text-center text-xs font-semibold">
                      {label}
                    </div>
                  ))}
                </div>
              )}
              {currentStep === 3 && (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center font-bold text-2xl">
                    ✓
                  </div>
                  <p className="text-sm mt-4 opacity-90">Security Verified</p>
                </div>
              )}
            </div>

            {/* Card bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-orange-400" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
