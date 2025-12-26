"use client";

import { PlurafiHero } from "./plurafi-hero";
import { FeatureCarouselSection } from "./FeatureCarouselSection";
import { ScrollCoinStrip } from "./ScrollCoinStrip";

export default function FramerCoinPage() {
    return (
        // <main>
        //     {/* Shared scroll space */}
        //     <section className="relative h-[160vh]">
        //         <ScrollCoinStrip
        //             coinSrc="/scroll-coin.png"
        //             speed={1}
        //             topOffset="clamp(30vh, 60vh, 100vh)"
        //             wrapperHeightClass="h-[40vh]"
        //             stripAngleDeg={13}
        //         />

        //         <ScrollCoinStrip
        //             coinSrc="/scroll-coin.png"
        //             speed={2}
        //             topOffset="clamp(0vh, 0vh, 0vh)"
        //             wrapperHeightClass="h-[18vh]"
        //             stripAngleDeg={13}
        //             offset={["start end", "end start"]}
        //         />
        //     </section>
        // </main>
        <main>
            <PlurafiHero />
            <FeatureCarouselSection />
        </main>
    );
}
