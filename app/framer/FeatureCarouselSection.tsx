"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { DollarSign, Calculator, Plane, BarChart3 } from "lucide-react";

type Step = {
  key: string;
  title: string;
  desc: string;
  phoneSrc: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: "teal" | "orange";
};

export function FeatureCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0.3]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0.85, 1, 1, 0.92]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [120, 0, 0, -60]);

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

  const textFilter = useTransform(textBlur, (value) => `blur(${value}px)`);

  const steps: Step[] = useMemo(
    () => [
      {
        key: "step-1",
        title: "ALL YOUR\nACCOUNTS",
        desc:
          "Connect checking, savings, credit, and more\n" +
          "into one unified view. No spreadsheets,\n" +
          "no guesswork — just complete financial clarity.",
        phoneSrc: "/phone-slide.png",
        Icon: DollarSign,
        accent: "teal",
      },
      {
        key: "step-2",
        title: "SMART\nINSIGHTS",
        desc:
          "Understand where your money goes with\n" +
          "real-time trends, breakdowns, and insights\n" +
          "that help you make better decisions.",
        phoneSrc: "/phone-slide.png",
        Icon: BarChart3,
        accent: "orange",
      },
      {
        key: "step-3",
        title: "BUDGETS &\nGOALS",
        desc:
          "Set budgets, define goals, and track progress\n" +
          "effortlessly. Stay in control with a system\n" +
          "designed to adapt to your life.",
        phoneSrc: "/phone-slide.png",
        Icon: Calculator,
        accent: "teal",
      },
      {
        key: "step-4",
        title: "PLANNING &\nCONFIDENCE",
        desc:
          "Plan ahead with confidence. See what’s\n" +
          "possible, what to optimize, and how close\n" +
          "you are to your next milestone.",
        phoneSrc: "/phone-slide.png",
        Icon: Plane,
        accent: "orange",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section ref={sectionRef} className="relative w-full bg-background-secondary py-12 md:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.60_0.16_45/0.04),transparent_62%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_62%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity: cardOpacity, scale: cardScale, y: cardY }}
          className="
            relative overflow-hidden rounded-[2.25rem]
            border border-border/30 dark:border-border/20
            shadow-lg dark:shadow-[0_30px_90px_rgba(0,0,0,0.55)]
            bg-card
            bg-[radial-gradient(ellipse_at_top,oklch(0.60_0.16_45/0.04),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_55%)]
          "
        >
          <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-70 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.13_50/0.45),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-60 bg-[radial-gradient(ellipse_at_left,oklch(0.59_0.04_196/0.25),transparent_55%)]" />

          <div className="relative grid grid-cols-1 md:grid-cols-[5.75rem_1fr_26.875rem] gap-10 md:gap-8 px-6 sm:px-8 md:px-10 py-10 sm:py-12 md:py-14">
            {/* Left icon rail */}
            <motion.div
              style={{ opacity: iconRailOpacity, x: iconRailX }}
              className="hidden md:flex flex-col items-center justify-center gap-6"
            >
              {steps.map((s, i) => {
                const isActive = i === active;
                const AccentRing = s.accent === "teal" ? "ring-secondary/30" : "ring-primary/30";
                const ActiveBg = s.accent === "teal" ? "bg-secondary/60" : "bg-primary/60";
                const ActiveIcon = s.accent === "teal" ? "text-secondary-foreground" : "text-primary-foreground";
                const InactiveIcon = "text-foreground/40";

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
                          : "bg-foreground/5 hover:bg-foreground/8 ring-1 ring-border/20",
                      ].join(" ")}
                    >
                      <s.Icon className={["h-7 w-7 transition-colors duration-300", isActive ? ActiveIcon : InactiveIcon].join(" ")} />
                    </div>

                    {isActive && (
                      <div
                        className={[
                          "pointer-events-none absolute inset-0 -z-10 blur-xl opacity-70",
                          s.accent === "teal" ? "bg-secondary/25" : "bg-primary/25",
                        ].join(" ")}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* Center copy */}
            <motion.div style={{ y: textY, opacity: textOpacity, filter: textFilter }} className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="whitespace-pre-line font-extrabold tracking-wide text-foreground/70 leading-[1.05]
                    text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                    {step.title}
                  </h2>

                  <p className="mt-5 sm:mt-6 whitespace-pre-line text-sm sm:text-base md:text-lg text-foreground/55 leading-relaxed max-w-[44ch]">
                    {step.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right phone visual */}
            <motion.div style={{ x: phoneX, opacity: phoneOpacity, scale: phoneScale }} className="relative flex items-center justify-center">
              <div className="relative w-[min(86vw,22.5rem)] md:w-[22.5rem]">
                <div className="absolute -inset-6 rounded-[2.25rem] bg-black/35 blur-2xl" />
                <div className="relative rounded-[1.75rem] bg-background/60 shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.key + "-phone"}
                      initial={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="p-5 sm:p-6"
                    >
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

              {/* Mobile icon rail */}
              <div className="md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/35 backdrop-blur rounded-full border border-border/20 px-3 py-2">
                {steps.map((s, i) => {
                  const isActive = i === active;
                  const Icon = s.Icon;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setActive(i)}
                      className={["h-10 w-10 rounded-full flex items-center justify-center transition", isActive ? "bg-foreground/12" : "bg-foreground/5"].join(" ")}
                      type="button"
                      aria-label={`Go to slide ${i + 1}`}
                    >
                      <Icon className={["h-5 w-5", isActive ? "text-foreground/80" : "text-foreground/40"].join(" ")} />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="h-14 md:h-20" />
      </div>
    </section>
  );
}
