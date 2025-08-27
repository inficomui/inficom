'use client';

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import MiniServicesSection from "@/components/mini/Services";
import { useGetServicesQuery } from "@/redux/apis/servicesApi";

// import MiniServicesSection from "@/components/mini/Services";
// import Image from 'next/image';

type Sponsor = {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
};

const DEFAULT_SPONSORS: Sponsor[] = [
  { src: 'https://html.rrdevs.net/morat/assets/img/sponsor/sponsor-1.png', alt: 'Sponsor 1' },
  { src: 'https://html.rrdevs.net/morat/assets/img/sponsor/sponsor-2.png', alt: 'Sponsor 2' },
  { src: 'https://html.rrdevs.net/morat/assets/img/sponsor/sponsor-3.png', alt: 'Sponsor 3' },
  { src: 'https://html.rrdevs.net/morat/assets/img/sponsor/sponsor-4.png', alt: 'Sponsor 4' },
  { src: 'https://html.rrdevs.net/morat/assets/img/sponsor/sponsor-5.png', alt: 'Sponsor 5' },
];

export default function AboutSection({
  sponsors = DEFAULT_SPONSORS,
  className = '',
  speed = 28, // lower = faster (seconds per loop)
}: {
  sponsors?: Sponsor[];
  className?: string;
  speed?: number;
})  {
  const {data:services}= useGetServicesQuery()
  const [activeTab, setActiveTab] = useState<"solution" | "mission" | "support">("solution");
  const items = [...sponsors, ...sponsors];
  return <>
  <Header/>
    <section className="relative py-20 bg-[#1C3334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Images + Counters */}
          <div className="relative">
            {/* Counters */}
            <div className="absolute -top-8 -left-6 bg-[#004AAD] text-white rounded-2xl p-4 shadow-lg">
              <h3 className="text-3xl font-bold">29+</h3>
              <p className="text-sm opacity-80">Expressions Challenge</p>
            </div>

            <div className="absolute -bottom-10 left-10 bg-[#FF7A00] text-white rounded-2xl p-4 shadow-lg">
              <h3 className="text-3xl font-bold">2.6k+</h3>
              <p className="text-sm opacity-80">Completed Projects</p>
            </div>

            <Image
              src="https://html.rrdevs.net/morat/assets/img/images/about-img-8.png"
              alt="About"
              width={500}
              height={500}
              className="rounded-2xl relative z-10"
            />
          </div>

          {/* Right - Content */}
          <div>
            <div className="mb-6">
              <h4 className="text-[#FF7A00] font-semibold">About Us</h4>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                Complete Managing About Software Business
              </h2>
              <p className="text-white/80 mt-4">
                We offer complete software management solutions for your business.
                From development to support, we handle everything end-to-end.
              </p>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex gap-4 mb-4">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === "solution"
                      ? "bg-gradient-to-r from-[#004AAD] to-[#FF7A00] text-white"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                  onClick={() => setActiveTab("solution")}
                >
                  Our Solution
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === "mission"
                      ? "bg-gradient-to-r from-[#004AAD] to-[#FF7A00] text-white"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                  onClick={() => setActiveTab("mission")}
                >
                  Our Mission
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === "support"
                      ? "bg-gradient-to-r from-[#004AAD] to-[#FF7A00] text-white"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                  onClick={() => setActiveTab("support")}
                >
                  Support
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-white/80">
                {activeTab === "solution" && (
                  <>
                    <p>
                      Innovative software solutions tailored to your business needs.
                      We deliver reliable, scalable, and efficient digital products.
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-[#FF7A00] h-5 w-5" /> We are revolutionary
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-[#FF7A00] h-5 w-5" /> This software solution
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === "mission" && (
                  <>
                    <p>
                      Empowering businesses with innovative and reliable software solutions.
                      We strive to drive growth, efficiency, and digital transformation.
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-[#FF7A00] h-5 w-5" /> Revolutionizing industries
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-[#FF7A00] h-5 w-5" /> Trusted software partner
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === "support" && (
                  <>
                    <p>
                      Reliable support whenever you need it. We’re here to help
                      you keep your business running smoothly.
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-[#FF7A00] h-5 w-5" /> 24/7 Availability
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="text-[#FF7A00] h-5 w-5" /> Dedicated support engineers
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mt-8">
              <Image
                src="https://html.rrdevs.net/morat/assets/img/images/about-author.jpg"
                alt="author"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="text-white font-semibold">Kiran Gaikwad</h3>
                <p className="text-white/60 text-sm">Co-Founder</p>
              </div>
              <Image
                src="https://html.rrdevs.net/morat/assets/img/images/sign.png"
                alt="sign"
                width={120}
                height={60}
              />
            </div>
          </div>
        </div>
      </div>
    </section>

       <section className={`relative py-16 ${className} overflow-hidden` }>
      {/* theme background */}
      <div className="absolute inset-0 bg-[#1C3334]" />
      {/* soft glows */}
      <div className="pointer-events-none absolute -top-20 -right-24 h-72 w-72 rounded-full bg-[#004AAD]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-24 h-72 w-72 rounded-full bg-[#FF7A00]/25 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* strip container with fade masks at edges */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {/* side masks */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#1C3334] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#1C3334] to-transparent" />

          {/* marquee track */}
          <div
            className="group relative flex gap-10 items-center will-change-transform"
            style={{
              animation: `scroll ${speed}s linear infinite`,
            }}
          >
            {items.map((s, i) => {
              const logo = (
                <div
                  key={`${s.src}-${i}`}
                  className="shrink-0 px-6 py-6 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="relative h-12 sm:h-14 w-[140px] sm:w-[170px]">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 640px) 160px, 180px"
                      className="object-contain"
                    />
                  </div>
                </div>
              );
              return s.href ? (
                <a
                  key={`${s.src}-link-${i}`}
                  href={s.href}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF7A00]/60 rounded"
                  aria-label={s.alt}
                >
                  {logo}
                </a>
              ) : (
                logo
              );
            })}
          </div>
        </div>
      </div>
      <MiniServicesSection items={services as any}/>

      {/* keyframes + pause-on-hover */}
      <style jsx>{`
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* because we duplicated the list */
        }
        /* pause when hovering the strip container */
        .group:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
</>
}
