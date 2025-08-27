'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CheckCircle, Star, Briefcase, Award, Play } from 'lucide-react';
import auther from "../public/counter-author.png";
import { BLUE, CENTER, ORANGE } from '@/lib/theme';

interface CounterItem {
  count: number;
  label: string;
  icon: React.ReactNode; // now a React component
  suffix?: string;
  color?: string; // optional color for styling
}

const counterData: CounterItem[] = [
  { count: 56, label: 'Happy Clients', icon: <CheckCircle size={32} />, suffix: 'k+' },
  { count: 322, label: 'Customer Ratings', icon: <Star size={32} />, suffix: 'k', color: '#f792ff' },
  { count: 79, label: 'Project Delivered', icon: <Briefcase size={32} />, suffix: 'k+', color: '#ff8c91' },
  { count: 186, label: 'Business Award', icon: <Award size={32} />, suffix: '+', color: '#a6e155' },
];

export default function Counter() {
  const [counters, setCounters] = useState(counterData.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    counterData.forEach((item, index) => {
      let current = 0;
      const increment = item.count / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= item.count) {
          current = item.count;
          clearInterval(timer);
        }

        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, stepDuration);
    });
  };

  return <>
  {/* from-[#ebccb6] via-[#7e9c9e] to-[#96b8e4] */}
<section
  ref={sectionRef}
  className={`counter-section relative bg-gradient-to-bl from-[${BLUE}] via-[${CENTER}] to-[${ORANGE}] text-white py-20`}
  // className="counter-section relative bg-gradient-to-bl from-[#6e99d1] via-[#5e7e81] to-[#d3aa8c] text-white py-20"
  // className="counter-section relative bg-gradient-to-bl from-[#b3784e] via-[#1C3334] to-[#004AAD] text-white py-20"
>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div className="space-y-6">
        <h4 className="text-orange-400 font-medium">Our Counter</h4>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Design as a Services To The Counter Now.
        </h2>
        <p className="text-gray-300">
          Business tailored it design, management & support services business agency elit, sed do eiusmod tempor.
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-orange-400">&#10003;</span> We a revolutionary
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-400">&#10003;</span> This software solution.
          </li>
        </ul>

        {/* Founder Card */}
        <div className="flex items-center gap-4 mt-6 p-4 bg-white/10 border-l-4 border-blue-500 shadow-md">
          <Image
            src={auther}
            alt="Founder"
            width={100}
            height={100}
            className="rounded-full border-2 border-blue-500"
          />
          <h4 className="text-lg font-semibold text-white">
            Pratibha Gaikwad <span className="font-normal text-gray-300">/ Founder</span>
          </h4>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-4">
          <a
            href="/contact"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition"
          >
            Contact Now
          </a>

          <a
            href="https://youtu.be/iyd7qUH3oH0"
            target="_blank"
            className="flex items-center gap-2 relative"
          >
            {/* Ripple Wrapper */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full bg-blue-500 opacity-30 animate-wave"></div>
              <div className="absolute w-full h-full rounded-full bg-blue-500 opacity-30 animate-wave delay-200"></div>
              <div className="absolute w-full h-full rounded-full bg-blue-500 opacity-30 animate-wave delay-400"></div>

              <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                <Play className="text-white" size={20} />
              </div>
            </div>
            Watch Video
          </a>
        </div>

        <style jsx>{`
          @keyframes wave {
            0% {
              transform: scale(0.5);
              opacity: 0.6;
            }
            100% {
              transform: scale(2.5);
              opacity: 0;
            }
          }
          .animate-wave {
            animation: wave 1.5s infinite;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-400 {
            animation-delay: 0.4s;
          }
        `}</style>
      </div>

      {/* Right Counters */}
   {/* Right Counters */}
<div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
 {counterData.map((item, index) => {
  const fallbackIcons = [<Rocket size={28} />, <ShieldCheck size={28} />, <Cloud size={28} />, <Code2 size={28} />];
  const icon = item.icon ?? fallbackIcons[index % fallbackIcons.length];

  return (
    <CounterCard
      key={item.label}
      label={item.label}
      value={counters[index]}
      suffix={item.suffix}
      color={item.color || "#004AAD"}   // keep your color support
      icon={icon}
    />
  );
})}

</div>

    </div>
  </div>
</section>
</>
}


import { motion } from "framer-motion";
import { Code2, ShieldCheck, Cloud, Rocket } from "lucide-react"; 

function CounterCard({
  label,
  value,
  suffix = "",
  color = "#004AAD",
  icon = <Code2 size={28} />,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  color?: string;
  icon?: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
    >
      {/* glow ring */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.18), rgba(255,255,255,0.02), rgba(255,255,255,0.18))",
          filter: "blur(10px)",
        }}
      />

      {/* icon orb (3D style) */}
      <div className="relative mx-auto mb-4 h-16 w-16 sm:h-20 sm:w-20">
        <div
          className="absolute inset-0 rounded-full shadow-lg"
          style={{
            background: `radial-gradient(120% 120% at 30% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 18%, rgba(255,255,255,0.1) 32%, rgba(0,0,0,0.06) 60%, rgba(0,0,0,0.18) 100%), radial-gradient(100% 100% at 70% 75%, ${color} 0%, ${color}CC 40%, ${color}99 70%, ${color}66 100%)`,
          }}
        />
        {/* rim highlight */}
        <div className="absolute inset-0 rounded-full ring-1 ring-white/40" />
        {/* top-left glass highlight */}
        <div className="absolute -top-1 -left-1 h-8 w-8 rounded-full bg-white/60 blur-md opacity-70" />
        {/* icon */}
        <div className="absolute inset-0 grid place-items-center text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
          {icon}
        </div>
      </div>

      {/* numbers */}
      <div className="text-center">
        <div className="text-3xl sm:text-4xl font-bold tracking-tight">
          {value}
          <span className="ml-0.5">{suffix}</span>
        </div>
        <p className="mt-1 text-white/80 text-sm sm:text-base">{label}</p>
      </div>

      {/* bottom sheen */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 translate-y-10 bg-gradient-to-t from-white/10 to-transparent group-hover:translate-y-0 transition-transform duration-500" />
    </motion.div>
  );
}
