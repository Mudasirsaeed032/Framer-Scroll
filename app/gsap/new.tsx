"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useMotionValueEvent,
    useVelocity,
} from "framer-motion";
import { useResizeObserver } from "./useResizeObserver";
import { computeCenterlineFromStrip } from "./math";
import { getCoinSize, getStripHeight } from "./config";

type ScrollCoinStripProps = {
    coinSrc?: string;               // default: /scroll-coin.png
    speed?: number;                 // default: 1
    topOffset?: string;             // default: clamp(...)
    wrapperHeightClass?: string;    // default: h-[220vh]
    stripAngleDeg?: number;         // default: 13
    offset?: Array<string | number>;
};

export function ScrollCoinStrip({
    coinSrc = "/scroll-coin.png",
    speed = 1,
    topOffset = "clamp(22vh, 36vh, 42vh)",
    wrapperHeightClass = "h-[220vh]",
    stripAngleDeg = 13,
    offset = ["start start", "end end"], // ✅ default
}: ScrollCoinStripProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const sceneRef = useRef<HTMLDivElement | null>(null);
    const stripRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: offset as any,
    });

    const sceneSize = useResizeObserver(sceneRef);
    const sceneW = sceneSize.width;
    const sceneH = sceneSize.height;

    const [stripMetrics, setStripMetrics] = useState<{
        cx: number;
        cy: number;
        w: number;
    } | null>(null);

    useEffect(() => {
        const sceneEl = sceneRef.current;
        const stripEl = stripRef.current;
        if (!sceneEl || !stripEl) return;

        const update = () => {
            const sceneRect = sceneEl.getBoundingClientRect();
            const stripRect = stripEl.getBoundingClientRect();

            // Convert strip center into scene-local coordinates
            const cx = (stripRect.left + stripRect.right) / 2 - sceneRect.left;
            const cy = (stripRect.top + stripRect.bottom) / 2 - sceneRect.top;
            const w = stripRect.width;

            setStripMetrics({ cx, cy, w });
        };

        update();

        const ro = new ResizeObserver(() => update());
        ro.observe(sceneEl);
        ro.observe(stripEl);

        window.addEventListener("resize", update);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", update);
        };
    }, []);

    const coinSize = useMemo(() => getCoinSize(sceneW), [sceneW]);
    const stripHeight = useMemo(() => getStripHeight(sceneW), [sceneW]);

    const isReverse = stripAngleDeg < 0;

    const { start, end, pathLen } = useMemo(() => {
        if (!stripMetrics) return { start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, pathLen: 0 };

        const { leftEnd, rightEnd, pathLen } = computeCenterlineFromStrip(
            stripMetrics.cx,
            stripMetrics.cy,
            stripMetrics.w,
            stripAngleDeg
        );

        // +13: left -> right, -13: right -> left
        const start = isReverse ? rightEnd : leftEnd;
        const end = isReverse ? leftEnd : rightEnd;

        return { start, end, pathLen };
    }, [stripMetrics, stripAngleDeg, isReverse]);

    const rawProgress = useTransform(scrollYProgress, (p) =>
        Math.min(1, Math.max(0, p * speed))
    );

    // ---- Smooth scroll input (Option B) ----
    // Raw progress is "truth" (Framer's mapping). We'll filter it for visuals only.
    const pRaw = rawProgress;

    // Velocity tells us when the user is actively scrolling vs stopped.
    const pVel = useVelocity(pRaw);

    // Smoothed progress motion value (what you use everywhere instead of pRaw)
    const pSmooth = useMotionValue(0);

    // Keep latest raw target in a ref
    const targetRef = useRef(0);
    useMotionValueEvent(pRaw, "change", (v) => {
        targetRef.current = v;
    });

    // rAF smoothing loop with snap-on-stop
    useEffect(() => {
        let raf = 0;
        let lastT = performance.now();

        const tick = (t: number) => {
            const dt = Math.max(0.001, (t - lastT) / 1000);
            lastT = t;

            const target = targetRef.current;
            const current = pSmooth.get();
            const vel = Math.abs(pVel.get());

            // When scroll stops (velocity tiny), snap to target to avoid "laggy" feel.
            if (vel < 0.01) {
                pSmooth.set(target);
            } else {
                // Low-pass filter: higher "follow" when scrolling fast, lower when slow.
                // This preserves responsiveness but removes wheel step jitter.
                const tau = 0.06; // smaller = tighter tracking (0.04–0.10 is a good range)
                const alpha = 1 - Math.exp(-dt / tau);
                pSmooth.set(current + (target - current) * alpha);
            }

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [pSmooth, pVel]);

    const x = useTransform(pSmooth, (p) => start.x + (end.x - start.x) * p);
    const y = useTransform(pSmooth, (p) => start.y + (end.y - start.y) * p);

    const rotate = useTransform(pSmooth, (p) => {
        const radius = coinSize / 2;
        const sign = isReverse ? -1 : 1; // reverse travel => reverse roll
        const s = sign * pathLen * p;
        const rad = s / radius;
        return (rad * 180) / Math.PI;
    });

    const lagPx = coinSize * 0.9; // reveal trails behind coin

    const revealWidth = useTransform(pSmooth, (p) => {
        if (!pathLen) return "0px";
        const w = Math.max(0, p * pathLen - lagPx);
        return `${w}px`;
    });

    return (
        <div ref={wrapperRef} className="relative overflow-hidden">
            <div className="pointer-events-none">
                <div className="sticky top-0 h-screen">
                    <div className="absolute left-0 w-full" style={{ top: topOffset }}>
                        <div
                            ref={sceneRef}
                            className="relative mx-auto w-[min(96vw,103.125rem)] aspect-[1650/520]"
                        >
                            <div
                                ref={stripRef}
                                className="absolute top-1/2 -left-[21vw] w-[160vw]"
                                style={{
                                    height: stripHeight,
                                    background: "#E88C5A",
                                    transform: `rotate(${stripAngleDeg}deg)`,
                                    boxShadow: "0 10px 50px rgba(0,0,0,0.35)",
                                }}
                            >
                                {/* LOGO REVEAL LAYER */}
                                <motion.div
                                    className="absolute overflow-hidden"
                                    style={{
                                        height: stripHeight,
                                        width: revealWidth,
                                        top: 0,

                                        ...(isReverse
                                            ? { right: 0, transformOrigin: "right center" as any }
                                            : { left: 0, transformOrigin: "left center" as any }),

                                        ...(isReverse
                                            ? {
                                                WebkitMaskImage:
                                                    "linear-gradient(to left, black 0%, black 92%, transparent 100%)",
                                                maskImage:
                                                    "linear-gradient(to left, black 0%, black 92%, transparent 100%)",
                                            }
                                            : {
                                                WebkitMaskImage:
                                                    "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
                                                maskImage:
                                                    "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
                                            }),
                                    }}
                                >
                                    <div
                                        className={[
                                            "h-full flex items-center gap-20",
                                            isReverse ? "flex-row-reverse justify-end pr-12" : "justify-start pl-12",
                                        ].join(" ")}
                                    >
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <Image
                                                key={i}
                                                src="/citi-home.png"
                                                alt="Citi"
                                                width={140}
                                                height={60}
                                                className="object-contain opacity-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                className="absolute"
                                style={{
                                    x,
                                    y,
                                    rotate,
                                    width: coinSize,
                                    height: coinSize,
                                    translateX: "-50%",
                                    translateY: "-50%",
                                    transformOrigin: "50% 50%",
                                }}
                            >
                                <Image
                                    src={coinSrc}
                                    alt="coin"
                                    fill
                                    sizes={`${coinSize}px`}
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>

            <section className={`relative ${wrapperHeightClass}`} />
        </div>
    );
}
