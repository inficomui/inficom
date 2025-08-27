'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { useGetPostsQuery } from '@/redux/apis/blogApi';
import { Post } from '@/types';
import { BLUE, CENTER, ORANGE } from '@/lib/theme';

export default function BlogSection() {
  const { data: res, isLoading } = useGetPostsQuery();

  // Normalize to Post[]
  const posts: Post[] = Array.isArray(res) ? res : (res ?? []);

  return (
    <>
      <Header />
      <section className="relative py-14 sm:py-16">
        {/* Theme background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${BLUE}, ${CENTER}, ${ORANGE})`,
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* Heading */}
          <div className="text-center">
            <h4 className="text-teal-300/90 text-xs sm:text-sm font-medium tracking-[0.18em] uppercase">
              Our News & Blogs
            </h4>
            <h2 className="mt-2 text-white text-2xl sm:text-3xl md:text-4xl font-bold">
              Latest Articles
            </h2>
          </div>

          {/* Grid list (no carousel) */}
          <div className="mt-8 sm:mt-10">
            {isLoading ? (
              <p className="text-white/80 text-center">Loading...</p>
            ) : posts.length === 0 ? (
              <p className="text-white/80 text-center">No posts yet.</p>
            ) : (
              <ul
                className="
                  grid gap-4 sm:gap-6
                  grid-cols-1
                  xs:grid-cols-2
                  md:grid-cols-3
                "
              >
                {posts.map((p, i) => (
                  <li key={p._id ?? p.title}>
                    <BlogCard post={p} index={i} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function BlogCard({ post, index = 0 }: { post: Post; index?: number }) {
  const src =
    post.image?.startsWith('http')
      ? post.image
      : `${process.env.NEXT_PUBLIC_BACKEND_URL ?? ''}${post.image ?? ''}`;

  return (
    <article
      data-index={index}
      className="
        group relative h-full rounded-xl sm:rounded-2xl
        p-3 sm:p-5
        bg-white/10 ring-1 ring-white/30
        shadow-[0_8px_28px_rgba(0,0,0,0.18)]
        transition-all duration-300
      "
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* animated glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-3 sm:-inset-4 rounded-2xl blur-xl"
        style={{
          background: `radial-gradient(200px 120px at 20% 20%, ${BLUE}33, transparent 60%),
                       radial-gradient(200px 120px at 80% 50%, ${ORANGE}33, transparent 60%)`,
        }}
        animate={{ x: [-6, 6, -6], y: [-4, 4, -4], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Thumb (shorter on mobile for small-card feel) */}
      <div className="relative h-36 sm:h-48 overflow-hidden rounded-lg">
        <Image
          src={src || '/placeholder.png'}
          alt={post.title}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          priority={false}
        />
        {post.category && (
          <span className="absolute left-2 top-2 inline-flex items-center rounded-full bg-blue-400 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-[#0b1220]">
            {post.category}
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative pt-3 sm:pt-4">
        {/* Meta (compact on mobile) */}
        <ul className="mb-1.5 sm:mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-sm text-black/70">
          {(post.author || post.date) && (
            <li>
              {post.author && (
                <>
                  By: <span className="text-black font-medium">{post.author}</span>
                </>
              )}
              {post.author && post.date ? ', ' : ''}
              {post.date}
            </li>
          )}
          {typeof post.comments !== 'undefined' && (
            <li>Comments ({String(post.comments).padStart(2, '0')})</li>
          )}
        </ul>

        {/* Title */}
        <h3 className="text-black text-base sm:text-lg font-semibold leading-snug line-clamp-2">
          <a href={post.href} className="hover:text-white/90">
            {post.title}
          </a>
        </h3>

        {/* Desc (tighter + bolder on mobile) */}
        {post.desc && (
          <p className="mt-1.5 sm:mt-2 text-black/70 text-xs sm:text-sm leading-relaxed font-semibold line-clamp-3">
            {post.desc}
          </p>
        )}

        {/* Footer: CTA only (rating removed for tighter small-card UI; add back if needed) */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <a
            href={post.href}
            className="
              inline-flex items-center gap-2 rounded-full
              bg-blue-600 px-3 py-1.5 sm:px-4 sm:py-2
              text-xs sm:text-xs font-semibold text-white shadow
              hover:opacity-95 transition
            "
          >
            Read More
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* subtle shine */}
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
