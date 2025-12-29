"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    value: "item-1",
    q: "How Secure is my Financial Data?",
    a: "Your data is protected with bank-level encryption and read-only access. We never store sensitive details or move your money—your information stays private and secure.",
  },
  {
    value: "item-2",
    q: "Can I cancel my subscription anytime?",
    a: "Yes. You can cancel anytime from your account settings. Your plan stays active until the end of the billing cycle.",
  },
  {
    value: "item-3",
    q: "Which banks do you support?",
    a: "We support thousands of banks and financial institutions through secure integrations. If your bank isn’t listed, reach out and we’ll check compatibility.",
  },
  {
    value: "item-4",
    q: "Do you offer a free trial?",
    a: "Yes — you can try the platform for free before choosing a plan.",
  },
  {
    value: "item-5",
    q: "Can I use on multiple devices?",
    a: "Absolutely. Your account works across devices — just sign in and your data stays in sync.",
  },
];

export function FaqSection() {
  return (
    <section className="relative w-full bg-[#0B0B0E] py-24 md:py-28">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.15fr] md:items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl sm:text-4xl leading-[1.05] md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white/80">
              GOT ANY
              <br />
              QUESTIONS?
            </h2>

            <button
              type="button"
              className="
                mt-6 inline-flex items-center justify-center
                rounded-full px-6 py-2.5 text-sm font-medium
                text-black shadow-[0_10px_30px_rgba(0,0,0,0.45)]
                bg-gradient-to-r from-[#E88C5A] to-[#3ED6C6]
                hover:opacity-95 transition
              "
            >
              Reach Out here!
            </button>
          </div>

          {/* Right card */}
          <div
            className="
              rounded-2xl bg-white/10
              border border-white/10
              shadow-[0_30px_80px_rgba(0,0,0,0.6)]
              backdrop-blur
              px-6 py-6 md:px-8 md:py-7
            "
          >
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              {faqs.map((f) => (
                <AccordionItem
                  key={f.value}
                  value={f.value}
                  className="border-white/10"
                >
                  <AccordionTrigger className="text-left text-white/80 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-white/55">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
