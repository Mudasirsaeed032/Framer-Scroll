"use client"

import Image from "next/image"
import { ScrollCoinStrip } from "./ScrollCoinStrip"

export function PlurafiHero() {
    return (
        <main className="relative w-full overflow-hidden bg-[#0B0B0E] ">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_55%)]" />

            {/* Scroll space for strips */}
            <section className="relative h-[260vh] z-0">
                <ScrollCoinStrip
                    coinSrc="/scroll-coin.png"
                    speed={1}
                    topOffset="clamp(30vh, 60vh, 100vh)"
                    wrapperHeightClass="h-[40vh]"
                    stripAngleDeg={13}
                />

                <ScrollCoinStrip
                    coinSrc="/scroll-coin.png"
                    speed={2}
                    topOffset="clamp(0vh, 0vh, 0vh)"
                    wrapperHeightClass="h-[20vh]"
                    stripAngleDeg={13}
                    offset={["start end", "end start"]}
                />
            </section>

            {/* Hero content container - overlays the scroll space */}
            <div className="absolute top-0 left-0 right-0 min-h-screen flex flex-col z-10 pointer-events-none">
                {/* Navbar */}
                <nav className="sticky top-0 z-50 pointer-events-auto bg-gradient-to-b from-[#0B0B0E] to-transparent">
                    <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
                        {/* Logo */}
                        <div className="text-xl font-bold text-white">
                            FinViro<span className="text-orange-500">.</span>
                        </div>

                        {/* Center nav */}
                        <div className="hidden md:flex gap-8 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition">
                                Features
                            </a>
                            <a href="#" className="hover:text-white transition">
                                Pricing
                            </a>
                            <a href="#" className="hover:text-white transition">
                                FAQ's
                            </a>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-4 pointer-events-auto">
                            <a href="#" className="text-sm text-gray-400 hover:text-white">
                                Login
                            </a>
                            <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-full transition">
                                Signup
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Hero section */}
                <div className="flex-1 relative flex flex-col items-center justify-center px-6 pt-[10vh]">
                    {/* Eyebrow */}
                    <p className="text-sm text-gray-500 mb-4 text-center">One place for accounts, insights, and peace of mind</p>

                    {/* Main heading */}
                    <div className="text-center mb-10 md:mb-12">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2">Your Money.</h1>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            <span className="text-white">Clearly </span>
                            <span className="text-teal-400">Organized</span>
                            <span className="text-white">.</span>
                        </h1>
                    </div>

                    <div className="relative w-full max-w-5xl">
                        {/* Dashboard image centerpiece */}
                        <div className="relative mx-auto w-full z-20 pointer-events-auto">
                            <Image
                                src="/dashboard.png"
                                alt="Plurafi dashboard"
                                width={1600}
                                height={900}
                                priority
                                className="w-full h-auto rounded-2xl"
                            />
                        </div>

                        {/* Floating credit card - top right */}
                        <div
                            className="
                                absolute top-[2%]
                                w-[clamp(8rem,19vw,22rem)]
                                rotate-[14deg]
                                drop-shadow-2xl
                                pointer-events-auto
                                z-10
                                right-[clamp(-18%,-10vw,0.75rem)]
                            "
                        >
                            <Image
                                src="/credit-card.png"
                                alt="Credit card"
                                width={1224}
                                height={1160}
                                className="w-full h-auto object-contain"
                            />
                        </div>



                        <div
                            className="
                                absolute bottom-[-12%]
                                w-[clamp(10rem,28vw,32rem)]
                                rotate-[-12deg]
                                drop-shadow-2xl
                                pointer-events-auto
                                float-slow
                                left-[clamp(-25%,-19vw,0.75rem)]
                            "
                        >
                            <Image
                                src="/100-dollar-bills.png"
                                alt="One hundred dollar bill"
                                width={800}
                                height={1208}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export { PlurafiHero as Plurafi }
