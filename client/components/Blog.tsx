'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import { BLUE, CENTER, ORANGE } from '@/lib/theme';
import { Post } from '@/lib/blogsData';
import { useGetPostsQuery } from '@/redux/apis/blogApi';



export default function BlogSection() {
  const {data}= useGetPostsQuery()
  // console.log("dataa", data);
  
  return (
    <section className="relative py-20">
      {/* Theme background */}
      <div className={`absolute inset-0 bg-gradient-to-bl from-[${BLUE}] via-[${CENTER}] to-[${ORANGE}]`} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <h4 className="text-teal-300/90 text-xs sm:text-sm md:text-base font-medium tracking-[0.18em] uppercase">
            Our News & Blogs
          </h4>
          <h2 className="mt-2 text-white text-3xl md:text-4xl font-bold">
            Largest The News & Blog
          </h2>
        </div>

        {/* Carousel */}
        <div className="mt-10">
          <Swiper
            modules={[Pagination, A11y, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            loop
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
              {data && data.map((p, i) => (
                          <SwiperSlide key={p.title}>
                            <BlogCard key={p._id} post={p} index={i} />
                          </SwiperSlide>
                        ))}
          </Swiper>
        </div>
      </div>

      {/* Style Swiper bullets to match theme */}
      <style jsx global>{`
        .swiper-pagination-bullets {
          position: static !important;
          margin-top: 10px;
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(90deg, ${BLUE}, ${ORANGE}) !important;
        }
      `}</style>
    </section>
  );
}

function BlogCard({ post,  index = 0 }: { post: Post; index?: number }){
    const src = post.image?.startsWith('http')
    ? post.image
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${post.image}`;

  return (
      <article
        data-index={index}
        className={`
          group relative h-full rounded-2xl p-5 sm:p-6
          bg-white/10 
          ring-1 ring-white/30 shadow-[0_8px_28px_rgba(0,0,0,0.18)]
          transition-all duration-300
          
          w-full max-w-md mx-auto
        `}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
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
          {/* Animated glow behind card (same spirit as Services) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-4 rounded-3xl blur-xl"
            style={{
              background: `radial-gradient(220px 140px at 20% 20%, ${BLUE}33, transparent 60%),
                           radial-gradient(220px 140px at 80% 50%, ${ORANGE}33, transparent 60%)`,
            }}
            animate={{ x: [-8, 8, -8], y: [-6, 6, -6], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
    
          {/* Thumb */}
          <div className="relative h-56 overflow-hidden">
            {/* If you use static export, keep unoptimized below OR switch to <img /> */}
            <Image
              src={src}
              alt={post.title}
              fill
              unoptimized
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width:1024px) 33vw, 100vw"
              priority={false}
            />
            <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-blue-400 px-3 py-1 text-[11px] font-semibold text-[#0b1220]">
              {post.category}
            </span>
            {/* gradient top for readability */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/30 to-transparent" />
          </div>
    
          {/* Content */}
          <div className="relative p-6 ">
            {/* Meta */}
            <ul className="mb-2 flex flex-wrap items-center gap-3 text-sm text-black/70">
              <li>
                By: <span className="text-black">{post.author}</span>, {post.date}
              </li>
              <li>Comments ({String(post.comments).padStart(2, '0')})</li>
            </ul>
    
            {/* Title */}
            <h3 className="text-black text-lg sm:text-xl font-semibold leading-snug">
              <a href={post.href} className="hover:text-white/90">
                {post.title}
              </a>
            </h3>
    
            {/* Desc */}
            <p className="mt-2 text-black/70 text-sm leading-relaxed font-semibold line-clamp-3">{post.desc}</p>
    
            {/* Footer: rating + CTA */}
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <ul className="flex items-center gap-1 text-orange-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className={i < post.rating ? 'opacity-100' : 'opacity-30'}>
                    <FaStar size={14} />
                  </li>
                ))}
                <li className="ml-2 text-xs text-white/60">
                  ({String(post.rating).padStart(2, '0')})
                </li>
              </ul>
    
              <a
                href={post.href}
                className="inline-flex items-center gap-2 rounded-full
                           bg-blue-600
                           px-4 py-2 text-xs font-semibold text-white shadow
                           hover:opacity-95 transition"
              >
                Read More
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
    
          {/* subtle sweep shine */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%)',
            }}
            animate={{ x: ['-30%', '130%'] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'linear' }}
          />
        </article>
  );
}
