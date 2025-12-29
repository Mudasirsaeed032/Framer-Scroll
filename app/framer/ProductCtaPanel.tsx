"use client";

import Image from "next/image";

export function ProductCtaPanel() {
  return (
    <section className="relative w-full bg-[#0B0B0E] overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div
          className="
            relative overflow-hidden
            rounded-[2rem]
            border border-white/10
            shadow-[0_40px_120px_rgba(0,0,0,0.6)]
            bg-[#1A1A1A]
          "
        >
          {/* Atmospheric gradients */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-[20%] left-[12%] h-[clamp(16rem,30vw,26rem)] w-[clamp(16rem,30vw,26rem)] rounded-full bg-teal-400/20 blur-[clamp(4rem,10vw,9rem)]" />
            <div className="absolute top-[8%] right-[8%] h-[clamp(14rem,26vw,22rem)] w-[clamp(14rem,26vw,22rem)] rounded-full bg-orange-400/10 blur-[clamp(4rem,10vw,10rem)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]" />
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center px-6 sm:px-10 md:px-12 py-14 sm:py-16 text-center">
            <p className="text-xs sm:text-[0.8125rem] tracking-[0.18em] uppercase text-orange-400 mb-5">
              Try it for free
            </p>

            <h2 className="max-w-3xl font-extrabold text-white/80 leading-[1.08]
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              YOUR ONE STOP
              <br />
              TOOL FOR ALL FINANCES
            </h2>

            {/* Screenshot */}
            <div className="relative mt-10 sm:mt-12 md:mt-16 w-full flex justify-center">
              <div
                className="
                  relative
                  w-full
                  max-w-4xl
                  rounded-2xl
                  overflow-hidden
                  border border-white/10
                  shadow-[0_30px_80px_rgba(0,0,0,0.65)]
                  bg-[#0B0B0E]
                "
              >
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
