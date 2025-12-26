"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { animate } from "animejs";

export default function AnimeCoinPage() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const coinInnerRef = useRef<HTMLDivElement | null>(null);

  const sceneW = 1100;
  const sceneH = 520;

  const coinSize = 90;
  const radius = coinSize / 2;

  // Define the path in scene coordinates
  const { x1, y1, x2, y2, dx, dy, pathLen } = useMemo(() => {
    const start = { x: 140, y: 160 };
    const end = { x: sceneW - 140, y: sceneH - 160 };

    const _dx = end.x - start.x;
    const _dy = end.y - start.y;
    const len = Math.hypot(_dx, _dy);

    return { x1: start.x, y1: start.y, x2: end.x, y2: end.y, dx: _dx, dy: _dy, pathLen: len };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const coinInner = coinInnerRef.current;
    if (!wrapper || !coinInner) return;

    // IMPORTANT:
    // We animate ONLY the INNER element so we don't overwrite outer centering transform.
    // Outer wrapper centers the coin on (x1, y1). Inner moves from (0,0) -> (dx,dy).
    const totalRotateDeg = ((pathLen / radius) * 180) / Math.PI;

    const anim = animate(coinInner, {
      translateX: [0, dx],
      translateY: [0, dy],
      rotate: [0, totalRotateDeg],
      duration: 1000,
      easing: "linear",
      autoplay: false,
    });

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const p = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      anim.seek(anim.duration * p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [dx, dy, pathLen, radius]);

  return (
    <div ref={wrapperRef} className="min-h-[220vh] bg-neutral-950 text-white">
      <section className="sticky top-0 h-screen flex items-center justify-center">
        <div
          className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
          style={{ width: sceneW, height: sceneH }}
        >
          {/* angled strip (DIV) */}
          <div
            className="absolute left-1/2 top-1/2 h-[110px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "#E88C5A",
              transform: "translate(-50%, -50%) rotate(-13deg)",
              boxShadow: "0 10px 50px rgba(0,0,0,0.35)",
            }}
          />

          {/* OUTER coin wrapper: anchors coin center at the start point */}
          <div
            className="absolute"
            style={{
              left: x1,
              top: y1,
              width: coinSize,
              height: coinSize,
              transform: "translate(-50%, -50%)", // centering stays here, never overwritten
              transformOrigin: "50% 50%",
              pointerEvents: "none",
            }}
          >
            {/* INNER coin: Anime animates translateX/Y/rotate here */}
            <div
              ref={coinInnerRef}
              style={{
                width: "100%",
                height: "100%",
                transformOrigin: "50% 50%",
                willChange: "transform",
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
          </div>

          <div className="absolute left-4 top-4 text-sm text-white/70">
            Anime.js v4 — scroll-linked rolling coin (seek)
          </div>
        </div>
      </section>

      <section className="h-[120vh]" />
    </div>
  );
}
