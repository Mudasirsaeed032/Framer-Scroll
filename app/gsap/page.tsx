"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GsapCoinPage() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const coinWrapRef = useRef<HTMLDivElement | null>(null);

  const sceneW = 1100;
  const sceneH = 520;

  const coinSize = 90;
  const radius = coinSize / 2;

  const { x1, y1, x2, y2, pathLen } = useMemo(() => {
    const start = { x: 140, y: 160 };
    const end = { x: sceneW - 140, y: sceneH - 160 };
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const len = Math.hypot(dx, dy);
    return { x1: start.x, y1: start.y, x2: end.x, y2: end.y, pathLen: len };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!wrapperRef.current || !coinWrapRef.current) return;

    const coin = coinWrapRef.current;

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;

        const x = x1 + (x2 - x1) * p;
        const y = y1 + (y2 - y1) * p;

        const s = pathLen * p;
        const rad = s / radius;
        const deg = (rad * 180) / Math.PI;

        gsap.set(coin, {
          x,
          y,
          rotation: deg,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [x1, y1, x2, y2, pathLen, radius]);

  return (
    <div ref={wrapperRef} className="min-h-[220vh] bg-neutral-950 text-white">
      <section className="sticky top-0 h-screen flex items-center justify-center">
        <div
          className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
          style={{ width: sceneW, height: sceneH }}
        >
          {/* strip */}
          <div
            className="absolute left-1/2 top-1/2 h-[110px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "#E88C5A",
              transform: "translate(-50%, -50%) rotate(-13deg)",
              boxShadow: "0 10px 50px rgba(0,0,0,0.35)",
            }}
          />

          {/* coin wrapper controlled by GSAP */}
          <div
            ref={coinWrapRef}
            className="absolute"
            style={{
              width: coinSize,
              height: coinSize,
              left: 0,
              top: 0,
              transform: "translate(-50%, -50%)",
              transformOrigin: "50% 50%",
            }}
          >
            <Image
              src="/scroll-coin.png"
              alt="coin"
              fill
              sizes={`${coinSize}px`}
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute left-4 top-4 text-sm text-white/70">
            GSAP + ScrollTrigger — scroll-scrub rolling coin
          </div>
        </div>
      </section>

      <section className="h-[120vh]" />
    </div>
  );
}
