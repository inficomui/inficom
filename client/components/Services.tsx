'use client';

import { useState, useEffect, useRef } from 'react';
import { CometCard } from './ui/comet-card';
import Link from 'next/link';
import { services } from '@/lib/servicesData';
import { BLUE, CENTER, ORANGE } from '@/lib/theme';
// import { getIcon } from '@/lib/IconsREgistery';
import { useGetServicesQuery } from '@/redux/apis/servicesApi';
import { getIcon } from '@/lib/IconsRegistery';
// import { getIcon } from '@/lib/IconsRegistery';



export default function Services() {
  const {data}= useGetServicesQuery()
  // console.log("data", data);
  
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative py-20 lg:py-32" ref={sectionRef}>
      {/* Background Gradient */}
    <div className={`absolute inset-0 bg-gradient-to-bl from-[${BLUE}] via-[${CENTER}] to-[${ORANGE}]`} />
      {/* from-[#ebccb6] via-[#7e9c9e] to-[#96b8e4] */}
    {/* <div className="absolute inset-0 bg-gradient-to-bl from-[#004AAD] via-[#1C3334] to-[#b3784e]" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#b3784e] via-[#1C3334] to-[#004AAD]" /> */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-white font-medium">Our Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Comprehensive IT Solutions
          </h2>

         <p className="text-lg text-gray-200 max-w-3xl mx-auto">
  We deliver end-to-end technology solutions that help businesses thrive in the digital age. 
  From web development to cloud infrastructure, we&rsquo;ve got you covered.
</p>

        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
       {data && data.map((service, index) => {
         const Icon = getIcon(service.iconKey);
        return <>
             <CometCard key={service.title}>
  <article
    data-index={index}
    className={`
      group relative h-full rounded-2xl p-5 sm:p-6
      bg-white/10 
      ring-1 ring-white/10 shadow-[0_8px_28px_rgba(0,0,0,0.18)]
      transition-all duration-300
      
      w-full max-w-md mx-auto
    `}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    {/* animated glow border on hover */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
      style={{
        padding: 1,
        background:
          "linear-gradient(120deg, rgba(255,255,255,0.55), rgba(255,255,255,0.1) 35%, rgba(255,255,255,0.4))",
        WebkitMask:
          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />

    {/* top-right soft orb accent */}
    <span
      aria-hidden
      className="absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-25 blur-2xl"
      style={{ background: "linear-gradient(135deg, #004AAD, #FF7A00)" }}
    />

    {/* header: icon + title */}
    <header className="flex items-start gap-4">
      {/* 3D-ish icon chip */}
      <div className="relative">
        <div className="grid h-12 w-12 place-items-center rounded-xl
                        ring-1 ring-white/30 shadow-xl
                        bg-[radial-gradient(120%_120%_at_30%_25%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.35)_25%,rgba(255,255,255,0.08)_60%,rgba(0,0,0,0.14)_100%),radial-gradient(100%_100%_at_70%_75%,#2563eb_0%,#1d4ed8_60%)]">
          <Icon className="h-6 w-6 text-white drop-shadow" />
        </div>
        <span className="absolute -inset-1 rounded-xl bg-white/40 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
      </div>

      <div className="min-w-0">
        <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
          {service.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-white/80 leading-relaxed">
          {service.description}
        </p>
      </div>
    </header>

    {/* features */}
    <ul className="mt-4 space-y-2">
      {service.features.map((feature) => (
        <li key={feature} className="flex items-center gap-2 text-white/85 text-xs sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    {/* CTA */}
    <footer className="mt-5 pt-4 border-t border-white/10">
      <Link
        href={`pages//services/${service._id}`}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600/90 hover:bg-blue-600
                   px-3.5 py-2 text-xs sm:text-sm font-semibold text-white transition-colors"
      >
        Learn More
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </Link>
    </footer>
  </article>
</CometCard>
        </>
       })}

        </div>
      </div>
    </section>
  );
}
