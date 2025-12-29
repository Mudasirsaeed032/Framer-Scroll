"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

type FooterLink = { label: string; href: string };

const quickLinks: FooterLink[] = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
];

const productLinks: FooterLink[] = [
  { label: "AI Budgeting", href: "#" },
  { label: "Financial Planning", href: "#" },
  { label: "Credit Monitoring", href: "#" },
  { label: "Estate Planning", href: "#" },
];

const supportLinks: FooterLink[] = [
  { label: "Request a Demo", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Report a Bug", href: "#" },
  { label: "Report an Outage", href: "#" },
  { label: "Request a New Feature", href: "#" },
];

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="min-w-[220px]">
      <h4 className="text-xl font-semibold text-orange-400">{title}</h4>
      <div className="mt-3 h-px w-full bg-white/25" />
      <ul className="mt-6 space-y-4 text-white/70">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LandingFooter() {
  return (
    <footer className="relative w-full bg-[#0B0B0E] pt-24 pb-16">
      {/* subtle vignette like your page */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[420px_1fr] lg:items-start">
          {/* Left contact card */}
          <div
            className="
              rounded-3xl
            "
          >
            <h3 className="text-2xl font-semibold text-orange-400">
              Get in Touch
            </h3>

            <div className="mt-10 space-y-10">
              {/* <div className="flex gap-5">
                <MapPin className="mt-1 h-6 w-6 text-white/60" />
                <p className="text-lg leading-relaxed text-white/70">
                  8819 Ohio St. South Gate,
                  <br />
                  CA 90280
                </p>
              </div> */}

              <div className="flex gap-5">
                <Mail className="mt-1 h-6 w-6 text-white/60" />
                <p className="text-lg text-white/70">hello@finviro.app</p>
              </div>

              <div className="flex gap-5">
                <Phone className="mt-1 h-6 w-6 text-white/60" />
                <p className="text-lg text-white/70">+1 123-456-7891</p>
              </div>
            </div>
          </div>

          {/* Right columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
            <FooterColumn title="Quick Links" links={quickLinks} />
            <FooterColumn title="Product" links={productLinks} />
            <FooterColumn title="Support" links={supportLinks} />
          </div>
        </div>
      </div>
    </footer>
  );
}
