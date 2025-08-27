'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import robotImage from '@/public/robot.png';
import bulbIcon from '@/public/bulb-black.png';
import { BLUE, CENTER, ORANGE } from '@/lib/theme';

export default function InfoSection() {
  return (
    <section className="relative py-8 sm:py-10">
 
      <div className={`absolute inset-0 bg-gradient-to-br from-[${ORANGE}] via-[${CENTER}] to-[${BLUE}]`} />
        {/* from-[#ebccb6] via-[#7e9c9e] to-[#96b8e4] */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#b3784e] via-[#1C3334] to-[#004AAD]" /> */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
  
        <div
          className="relative mx-auto overflow-hidden rounded-[28px]"
          style={{ width: 'calc(100% - 100px)' }}
        >
         
          <div className="absolute inset-0 bg-[conic-gradient(from_220deg_at_20%_40%,#004AAD_0%,#1C3334_35%,#FF7A00_70%,#004AAD_100%)]" />

         
          <motion.div
            className="absolute inset-0 mix-blend-screen"
            style={{
              background:
                'radial-gradient(500px_260px_at_15%_30%, rgba(0,74,173,0.30), transparent 65%), radial-gradient(420px_220px_at_85%_70%, rgba(255,122,0,0.25), transparent 60%)',
              filter: 'saturate(1.05)',
            }}
            animate={{
              backgroundPosition: ['0% 0%, 100% 0%', '30% 20%, 70% 15%', '0% 0%, 100% 0%'],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />

      
          <div
            className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '28px 28px, 28px 28px',
              backgroundPosition: '0 0, 0 0',
            }}
          />


          <motion.div
            className="absolute -inset-10 opacity-[0.13] pointer-events-none"
            style={{
              background:
                'linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)',
            }}
            animate={{ x: ['-25%', '125%'] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
         
            <motion.div
              className="absolute inset-0 opacity-50 mix-blend-screen"
              style={{
                backgroundImage: `
                  radial-gradient(1.6px 1.6px at 12% 26%, rgba(255,255,255,0.95), transparent 55%),
                  radial-gradient(1.6px 1.6px at 40% 68%, rgba(0,74,173,0.95), transparent 55%),
                  radial-gradient(1.6px 1.6px at 74% 32%, rgba(255,122,0,0.95), transparent 55%),
                  radial-gradient(1.6px 1.6px at 22% 82%, rgba(255,255,255,0.85), transparent 55%),
                  radial-gradient(1.6px 1.6px at 90% 66%, rgba(0,74,173,0.9), transparent 55%)
                `,
              }}
              animate={{
                backgroundPosition: [
                  '0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%',
                  '10% 8%, -6% 10%, 8% -6%, -8% 10%, 6% -10%',
                  '0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%',
                ],
              }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            />
     
            <div
              className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
              }}
            />
          </div>

      
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-4 px-6 sm:px-8 py-5 lg:py-6">
   
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-white text-xs font-semibold tracking-wide backdrop-blur-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-[#FFD22E]" />
                Growth Strategy
              </div>

              <h2 className="mt-2 text-white text-2xl sm:text-3xl lg:text-[32px] font-extrabold leading-snug drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
                Ready To Get Started With
                <br className="hidden sm:block" /> Smart Strategy Business.
              </h2>

              <p className="mt-2 max-w-2xl text-white/90 text-[13.5px] sm:text-[15px]">
                Kickstart your business with scalable strategies and bold execution.
                We turn ideas into products people love.
              </p>

              <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/20 backdrop-blur-sm px-3 py-2 shadow-sm">
                <div className="relative h-8 w-8">
                  <Image src={bulbIcon} alt="bulb" fill className="object-contain" />
                </div>
                <div className="leading-tight">
                  <h3 className="text-white font-semibold text-[14px]">
                    Manage Your Software
                  </h3>
                  <p className="text-white/70 text-xs">App Design, Website</p>
                </div>
              </div>
            </div>

            {/* Right: CTA + robot (parallax) */}
            <div className="lg:col-span-5 relative">
              {/* floating badge */}
              <motion.div
                className="absolute -top-4 right-2 hidden sm:flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[#0b1220] text-xs font-bold shadow-md"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-[#00D084]" />
                Live Projects
              </motion.div>

              <div className="flex justify-start lg:justify-end">
                <a
                  href="/pages/contact"
                  className="inline-flex h-10 items-center rounded-full bg-[#FFD22E] px-5 text-[#0b1220] font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.18)] hover:brightness-95 active:translate-y-[1px] transition"
                >
                  Get Started Now
                </a>
              </div>

             <div className="relative mt-3">
  {/* parallax container */}
  <div className="relative mx-auto lg:ml-auto lg:mr-0 w-[190px] sm:w-[220px] md:w-[250px] lg:w-[270px]">
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative z-20" // ensure robot is above
    >
      <Image
        src={robotImage}
        alt="robot"
        priority
        className="h-auto w-full object-contain"
      />
    </motion.div>

    {/* accent glows → z-0 (behind robot) */}
    <div className="pointer-events-none absolute z-0 -bottom-6 -left-5 h-20 w-20 rounded-full bg-[#004AAD]/80 blur-[2px]" />
    <div className="pointer-events-none absolute z-0 -bottom-4 right-2 h-16 w-16 rounded-full bg-[#FF7A00]/70 blur-[2px]" />
  </div>
</div>

            </div>
          </div>

          {/* chrome edge ring + subtle inner shadow */}
          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/20" />
          <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_-10px_40px_rgba(0,0,0,0.15)]" />
        </div>
      </div>
    </section>
  );
}
