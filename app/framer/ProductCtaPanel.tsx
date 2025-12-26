"use client";

import Image from "next/image";

export function ProductCtaPanel() {
  return (
    <section className="relative w-full bg-[#0B0B0E] py-[110px] px-4">
      {/* Outer container */}
      <div className="relative mx-auto max-w-[1200px]">
        {/* Panel */}
        <div
          className="
            relative overflow-hidden
            rounded-[32px]
            border border-white/10
            shadow-[0_40px_120px_rgba(0,0,0,0.6)]
            bg-[#1A1A1A]
          "
        >
          {/* Atmospheric gradients */}
          <div className="pointer-events-none absolute inset-0">
            {/* Teal bloom */}
            <div className="absolute -top-[20%] left-[15%] h-[420px] w-[420px] rounded-full bg-teal-400/20 blur-[140px]" />
            {/* Secondary warm tint */}
            <div className="absolute top-[10%] right-[10%] h-[360px] w-[360px] rounded-full bg-orange-400/10 blur-[160px]" />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]" />
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center px-6 md:px-12 pt-[56px] pb-[64px] text-center">
            {/* Eyebrow */}
            <p className="text-[13px] tracking-[0.18em] uppercase text-orange-400 mb-5">
              Try it for free
            </p>

            {/* Headline */}
            <h2
              className="
                max-w-[900px]
                text-[38px] leading-[1.1]
                md:text-[52px]
                font-extrabold
                text-white/80
              "
            >
              YOUR ONE STOP
              <br />
              TOOL FOR ALL FINANCES
            </h2>

            {/* Screenshot */}
            <div className="relative mt-[64px] w-full flex justify-center">
              <div
                className="
                  relative
                  w-full
                  max-w-[920px]
                  rounded-[22px]
                  overflow-hidden
                  border border-white/10
                  shadow-[0_30px_80px_rgba(0,0,0,0.65)]
                  bg-[#0B0B0E]
                "
              >
                {/* Inner vignette for blend */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.45))]" />

                <Image
                  src="/checking-dash.png"
                  alt="Plurafi dashboard preview"
                  width={1600}
                  height={1000}
                  className="w-full h-auto object-cover"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
