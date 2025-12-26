"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useResizeObserver } from "./useResizeObserver";
import { computePath } from "./math";
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

    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: offset as any,
    });

    const sceneSize = useResizeObserver(sceneRef);
    const sceneW = sceneSize.width;
    const sceneH = sceneSize.height;

    const coinSize = useMemo(() => getCoinSize(sceneW), [sceneW]);
    const stripHeight = useMemo(() => getStripHeight(sceneW), [sceneW]);
    const radius = coinSize / 2;

    const { x1, y1, x2, y2, pathLen } = useMemo(
        () => computePath(sceneW, sceneH),
        [sceneW, sceneH]
    );

    const fastProgress = useTransform(scrollYProgress, (p) =>
        Math.min(1, Math.max(0, p * speed))
    );

    const x = useTransform(fastProgress, (p) => x1 + (x2 - x1) * p);
    const y = useTransform(fastProgress, (p) => y1 + (y2 - y1) * p);
    const rotate = useTransform(fastProgress, (p) => {
        const s = pathLen * p;
        const rad = s / radius;
        return (rad * 180) / Math.PI;
    });

    const STRIP_WIDTH_PX = sceneW ? sceneW * 1.3 : 0; // 160vw relative to scene width

    const revealWidth = useTransform(fastProgress, (p) => {
        if (!STRIP_WIDTH_PX) return "0px";
        const delayPx = 0; // how far behind coin the reveal edge should be
        const w = Math.max(0, p * STRIP_WIDTH_PX - delayPx);
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
                                        transformOrigin: "left center",
                                        left: 0,
                                        top: 0,
                                        WebkitMaskImage: "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
                                        maskImage: "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
                                    }}
                                >
                                    {/* Inner container holds logos */}
                                    <div className="h-full flex items-center justify-start gap-20 pl-12">
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
