"use client";

import Image from "next/image";

export function StayUpdatedSection() {
  return (
    <section className="relative w-full bg-[#0B0B0E] py-20 md:py-24 overflow-hidden">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left: Visual block */}
          <div className="relative min-h-[200px] md:min-h-[320px]">

            {/* Cards foreground */}
            <div className="relative z-10 w-full max-w-[520px]">
              <Image
                src="/cards.png"
                alt="Credit cards"
                width={900}
                height={520}
                className="w-full h-auto object-contain drop-shadow-[0_35px_90px_rgba(0,0,0,0.75)]"
                priority={false}
              />
            </div>
          </div>

          {/* Right: Content + form */}
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white/80">
              STAY UPDATED
            </h2>

            <p className="mt-3 text-sm md:text-base text-teal-300/75 max-w-xl">
              Get weekly tips, insights, and exclusive offers delivered to your inbox
            </p>

            <form
              className="mt-8 flex flex-col sm:flex-row items-stretch gap-4 sm:gap-3 max-w-xl"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="
                    w-full h-12
                    rounded-full
                    bg-white/5
                    border border-white/15
                    px-5
                    text-sm text-white/80
                    placeholder:text-white/40
                    outline-none
                    focus:border-teal-300/40
                    focus:ring-2 focus:ring-teal-300/15
                    transition
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  h-12
                  rounded-full
                  px-8
                  text-sm font-semibold
                  text-black
                  bg-gradient-to-r from-[#E88C5A] to-[#D57A4A]
                  shadow-[0_18px_50px_rgba(0,0,0,0.55)]
                  hover:opacity-95
                  transition
                  whitespace-nowrap
                "
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
