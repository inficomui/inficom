'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ServiceDTO } from '@/types';

const BLUE = '#004AAD';
const ORANGE = '#FF7A00';


export default function MiniServicesSection({ items }: { items: ServiceDTO[] }) {
  return (
    <section className="relative py-16">
      {/* Light gradient background in theme */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${BLUE}15, ${ORANGE}15)`,
        }}
      />
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `${BLUE}33` }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `${ORANGE}33` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white bg-gradient-to-r from-[#004AAD] to-[#FF7A00] shadow-md">
            Our Flexibility Service
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Our Best Service Solution
          </h2>
          <p className="mt-2 text-gray-600">
            Empowering businesses with modern and scalable solutions
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <motion.article
              key={s.title + i}
              className="group relative overflow-hidden rounded-2xl border bg-white/80 shadow-md backdrop-blur-sm"
              style={{ borderColor: `${ORANGE}44` }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              {/* top shimmer */}
              <motion.div
                aria-hidden
                className="absolute left-0 top-0 h-[2px] w-full"
                style={{ background: `linear-gradient(90deg, ${BLUE}, ${ORANGE})` }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              />

              <div className="relative p-6">
                {/* Icon pill */}
                <div className="inline-flex items-center justify-center rounded-xl px-4 py-3 bg-gradient-to-r from-[#004AAD]/10 to-[#FF7A00]/10">
                  <div className="relative h-10 w-10">
                    <Image src={s.iconKey} alt={s.title} fill className="object-contain" sizes="40px" />
                  </div>
                </div>

                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {s.description}
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <a
                    href={'#'}
                    className="relative inline-flex items-center gap-2 text-[15px] font-medium text-gray-900 group"
                  >
                    <span
                      className="bg-clip-text text-transparent bg-gradient-to-r from-[#004AAD] to-[#FF7A00]"
                    >
                      Read More
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-800 transition-transform group-hover:translate-x-1" />
                    {/* underline */}
                    <span
                      className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 rounded-full bg-gradient-to-r from-[#004AAD] to-[#FF7A00]"
                    />
                  </a>
                </div>
              </div>

              {/* underline grow on hover */}
              <style jsx>{`
                article a:hover span:last-child {
                  width: 100%;
                  transition: width 220ms ease;
                }
              `}</style>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
