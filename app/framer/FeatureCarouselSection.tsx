"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Calculator,
  Plane,
  BarChart3,
} from "lucide-react";

type Step = {
  key: string;
  title: string;
  desc: string;
  // you can swap these later per-slide
  phoneSrc: string;
  // icon is a React component
  Icon: React.ComponentType<{ className?: string }>;
  accent: "teal" | "orange";
};

export function FeatureCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to animation values
  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0.3]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0.85, 1, 1, 0.92]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [120, 0, 0, -60]);
  
  // Individual element animations
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const textBlur = useTransform(scrollYProgress, [0.15, 0.35], [10, 0], {
    ease: (t) => t * t,
  });
  
  const phoneX = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const phoneScale = useTransform(scrollYProgress, [0.2, 0.4], [0.9, 1]);
  
  const iconRailOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const iconRailX = useTransform(scrollYProgress, [0.25, 0.4], [-30, 0]);

  // Convert blur value to filter string
  const textFilter = useTransform(textBlur, (value) => `blur(${value}px)`);

  const steps: Step[] = useMemo(
    () => [
      {
        key: "step-1",
        title: "PERSONAL FINANCE\nMANAGER",
        desc:
          "Budgets, goals, expenses — all in one spot! Link\n" +
          "accounts, crush chaos, and own your financial\n" +
          "game. Easily where dreams meet dollars!",
        phoneSrc: "/phone-slide.png",
        Icon: DollarSign,
        accent: "teal",
      },
      {
        key: "step-2",
        title: "SMART\nINSIGHTS",
        desc:
          "Understand your spending patterns and trends\n" +
          "at a glance — and get recommendations that\n" +
          "actually help you move forward.",
        phoneSrc: "/phone-slide.png",
        Icon: BarChart3,
        accent: "orange",
      },
      {
        key: "step-3",
        title: "BUDGETS &\nGOALS",
        desc:
          "Set targets, track progress, and stay in control.\n" +
          "Make adjustments instantly with a simple, clear\n" +
          "system that fits your life.",
        phoneSrc: "/phone-slide.png",
        Icon: Calculator,
        accent: "teal",
      },
      {
        key: "step-4",
        title: "TRAVEL &\nPLANNING",
        desc:
          "Plan ahead with confidence. See what’s possible,\n" +
          "what to optimize, and how close you are to the\n" +
          "next big milestone.",
        phoneSrc: "/phone-slide.png",
        Icon: Plane,
        accent: "orange",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const step = steps[active];

  const go = (dir: -1 | 1) => {
    setActive((prev) => {
      const next = prev + dir;
      if (next < 0) return steps.length - 1;
      if (next >= steps.length) return 0;
      return next;
    });
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0B0B0E] py-1 md:py-28 overflow-hidden">
      {/* backdrop vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_62%)]" />

      <div className="relative mx-auto px-40">
        {/* Main Card */}
        <motion.div
          style={{
            opacity: cardOpacity,
            scale: cardScale,
            y: cardY,
          }}
          className="
            relative overflow-hidden rounded-[2.25rem]
            border border-white/10
            shadow-[0_30px_90px_rgba(0,0,0,0.55)]
            bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_55%)]
          "
        >
          {/* Warm gradient wash like your design */}
          <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(ellipse_at_center,rgba(232,140,90,0.45),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_left,rgba(90,200,190,0.25),transparent_55%)]" />

          <div className="relative grid grid-cols-1 md:grid-cols-[92px_1fr_430px] gap-10 md:gap-8 px-8 md:px-10 py-12 md:py-14">
            {/* Left icon rail */}
            <motion.div 
              style={{ opacity: iconRailOpacity, x: iconRailX }}
              className="hidden md:flex flex-col items-center justify-center gap-6"
            >
              {steps.map((s, i) => {
                const isActive = i === active;
                const AccentRing =
                  s.accent === "teal"
                    ? "ring-teal-300/30"
                    : "ring-[#E88C5A]/30";
                const ActiveBg =
                  s.accent === "teal" ? "bg-teal-600/60" : "bg-[#E88C5A]/60";
                const ActiveIcon =
                  s.accent === "teal" ? "text-teal-100" : "text-orange-950";
                const InactiveIcon = "text-white/40";

                return (
                  <button
                    key={s.key}
                    onClick={() => setActive(i)}
                    className="group relative"
                    type="button"
                    aria-label={`Go to ${s.title}`}
                  >
                    <div
                      className={[
                        "h-16 w-16 rounded-full flex items-center justify-center",
                        "transition-all duration-300",
                        isActive
                          ? `${ActiveBg} ring-4 ${AccentRing} scale-[1.05] shadow-[0_10px_30px_rgba(0,0,0,0.45)]`
                          : "bg-white/5 hover:bg-white/8 ring-1 ring-white/10",
                      ].join(" ")}
                    >
                      <s.Icon
                        className={[
                          "h-7 w-7 transition-colors duration-300",
                          isActive ? ActiveIcon : InactiveIcon,
                        ].join(" ")}
                      />
                    </div>

                    {/* subtle rail glow behind active */}
                    {isActive && (
                      <div
                        className={[
                          "pointer-events-none absolute inset-0 -z-10 blur-xl opacity-70",
                          s.accent === "teal"
                            ? "bg-teal-400/25"
                            : "bg-[#E88C5A]/25",
                        ].join(" ")}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* Center copy */}
            <motion.div 
              style={{ 
                y: textY, 
                opacity: textOpacity,
                filter: textFilter
              }}
              className="flex flex-col justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="whitespace-pre-line text-[42px] leading-[1.05] md:text-[64px] font-extrabold tracking-wide text-white/70">
                    {step.title}
                  </h2>

                  <p className="mt-6 whitespace-pre-line text-base md:text-xl text-white/55 leading-relaxed max-w-[44ch]">
                    {step.desc}
                  </p>


                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right phone visual */}
            <motion.div 
              style={{ 
                x: phoneX, 
                opacity: phoneOpacity,
                scale: phoneScale
              }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-[min(86vw,360px)] md:w-[360px]">
                <div className="absolute -inset-6 rounded-[2.25rem] bg-black/35 blur-2xl" />
                <div className="relative rounded-[1.75rem]  bg-[#0B0B0E]/60 shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.key + "-phone"}
                      initial={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="p-6">
                      <Image
                        src={step.phoneSrc}
                        alt="Feature preview"
                        width={520}
                        height={980}
                        className="w-full h-auto object-contain"
                        priority={false}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile icon rail (bottom) */}
              <div className="md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/35 backdrop-blur rounded-full border border-white/10 px-3 py-2">
                {steps.map((s, i) => {
                  const isActive = i === active;
                  const Icon = s.Icon;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setActive(i)}
                      className={[
                        "h-10 w-10 rounded-full flex items-center justify-center transition",
                        isActive ? "bg-white/12" : "bg-white/5",
                      ].join(" ")}
                      type="button"
                      aria-label={`Go to slide ${i + 1}`}
                    >
                      <Icon
                        className={[
                          "h-5 w-5",
                          isActive ? "text-white/80" : "text-white/40",
                        ].join(" ")}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Optional: spacing below */}
        <div className="h-14 md:h-20" />
      </div>
    </section>
  );
}
