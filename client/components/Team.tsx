'use client';

import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// --- Team data ---



import { BLUE, CENTER, ORANGE } from '@/lib/theme';
import {  TeamMember } from '@/lib/teamData';
import { useGetServicesQuery } from '@/redux/apis/servicesApi';
import { useGetTeamMembersQuery } from '@/redux/apis/teamApi';






export function TeamCard({ m }: { m: TeamMember }) {

  return (
    <div className="relative p-3">
      {/* Animated glow behind each card */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-3xl blur-xl"
        style={{
          background:
            'radial-gradient(220px 140px at 20% 20%, rgba(0,74,173,0.28), transparent 60%), radial-gradient(220px 140px at 80% 50%, rgba(255,122,0,0.25), transparent 60%)',
        }}
        animate={{ x: [-8, 8, -8], y: [-6, 6, -6], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Card */}
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,.25)] bg-transparent">
  {/* animated cloudy background */}
  <motion.div
    aria-hidden
    className="absolute inset-0"
    style={{
      background: `
        radial-gradient(80% 60% at 20% 30%, rgba(255,255,255,0.07), transparent 60%),
        radial-gradient(80% 60% at 80% 70%, rgba(255,255,255,0.05), transparent 60%),
        linear-gradient(135deg, rgba(0,74,173,0.25), rgba(255,122,0,0.2))
      `,
    }}
    animate={{
      backgroundPosition: [
        "0% 0%, 100% 0%, 0% 0%",
        "30% 20%, 70% 40%, 100% 100%",
        "0% 0%, 100% 0%, 0% 0%",
      ],
    }}
    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* subtle sweep (shine effect) */}
  <motion.span
    aria-hidden
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        "linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.08) 50%, transparent 80%)",
    }}
    animate={{ x: ["-30%", "130%"] }}
    transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
  />

  {/* Image */}
  <div className="relative h-56 sm:h-60">
    <Image
      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${m.image}`}
      alt={m.name}
      fill
      className="object-contain"
      sizes="(min-width: 1024px) 320px, 100vw"
      priority={false}
    />
  </div>

  {/* Text */}
  <div className="px-6 pt-4 pb-6 text-center relative z-10">
    <h3 className="text-white font-semibold text-base sm:text-lg">{m.name}</h3>
    <span className="text-white/80 text-xs sm:text-sm">{m.role}</span>
  </div>
</div>

   
    </div>
  );
}

// --- Section ---
export default function TeamSectionLikeThat() {
  const {data:members}= useGetTeamMembersQuery()
    const {data}= useGetServicesQuery()
  const services = data
  return (
    <section className="relative  overflow-hidden ">
      {/* THEME BACKGROUND */}
      {/* <div className="absolute inset-0 bg-gradient-to-bl from-[#004AAD] via-[#1C3334] to-[#b3784e]" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#b3784e] via-[#1C3334] to-[#004AAD]" /> */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[${ORANGE}] via-[${CENTER}] to-[${BLUE}]`}/>
      {/* from-[#ebccb6] via-[#7e9c9e] to-[#96b8e4] */}
      {/* Soft animated aurora on top */}
      {/* <motion.div
        className="absolute inset-0 mix-blend-screen pointer-events-none"
        style={{
          background:
            'radial-gradient(600px 300px at 12% 20%, rgba(0,74,173,0.18), transparent 60%), radial-gradient(500px 260px at 88% 10%, rgba(255,122,0,0.16), transparent 60%)',
        }}
        animate={{
          backgroundPosition: ['0% 0%, 100% 0%', '35% 15%, 65% 8%', '0% 0%, 100% 0%'],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      /> */}

      <div className="relative z-10 container mx-auto max-w-7xl px-4 ">
        {/* Heading */}
        <div className="section-heading text-center">
          <h4 className="sub-heading text-orange-300 text-xs sm:text-sm md:text-base font-medium tracking-[0.18em] uppercase">
            Our Team Member
          </h4>
          <h2 className="section-title mt-2 text-white text-3xl md:text-4xl font-bold">
            Meet The Team Member Meeting
          </h2>
        </div>

        {/* Swiper Carousel */}
        <div className="mt-10">
          <Swiper
            modules={[Pagination, A11y, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="team-carousel-2"
          >
            {members && members.map((m) => (
              <SwiperSlide key={`${m.name}-${m.role}`}>
                <TeamCard m={m} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Services under carousel */}
      {/* Services under carousel */}


      </div>

      {/* Swiper pagination theming */}
      <style jsx global>{`
        .team-carousel-2 .swiper-pagination-bullets {
          margin-top: 16px;
          position: static;
        }
        .team-carousel-2 .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.55);
          opacity: 1;
        }
        .team-carousel-2 .swiper-pagination-bullet-active {
          background: linear-gradient(90deg, #004AAD, #FF7A00);
        }
      `}</style>
    </section>
  );
}
