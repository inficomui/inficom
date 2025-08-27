'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StickyBanner } from '@/components/ui/sticky-banner';
import SocialFloat from '@/components/mini/SocialFloat';
import { BLUE, CENTER, ORANGE } from '@/lib/theme';
// import logo from '@/public/logo.png';


// Super light
// export const BLUE = '#96b8e4';
// export const ORANGE = '#ebccb6';
// export const CENTER = '#7e9c9e';

// medium light



// prev dark
// export const BLUE = '#004AAD';
// export const ORANGE = '#b3784e';
// export const CENTER = '#1C3334';



function SectionSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 min-h-[220px]">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.8s_infinite_linear]" />
      <style jsx>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%);  }
        }
      `}</style>
    </div>
  );
}

export function MountLoader() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background with theme colors */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom left, ${BLUE}, ${CENTER}, ${ORANGE})`,
        }}
      />

      {/* Aurora overlay */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen">
        <div
          className="absolute inset-0 animate-[aurora_16s_ease-in-out_infinite]"
          style={{
            background: `
              radial-gradient(600px 300px at 15% 25%, rgba(255,255,255,0.18), transparent 60%),
              radial-gradient(500px 260px at 85% 70%, rgba(255,255,255,0.12), transparent 60%)
            `,
          }}
        />
      </div>

      {/* Glint overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
        <div
          className="absolute inset-0 animate-[glint_12s_ease-in-out_infinite]"
          style={{
            background: `
              radial-gradient(1.2px 1.2px at 12% 20%, #fff, transparent 55%),
              radial-gradient(1.2px 1.2px at 46% 76%, #fff, transparent 55%),
              radial-gradient(1.2px 1.2px at 80% 30%, #fff, transparent 55%),
              radial-gradient(1.2px 1.2px at 30% 88%, #fff, transparent 55%)
            `,
          }}
        />
      </div>

      {/* Loader */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="grid place-items-center h-20 w-20 rounded-2xl bg-white/10 border border-white/20 shadow-lg">
          <Image
          width={100}
          height={100}
            src="/logo.png"
            alt="Inficom Solutions"
            className="h-12 w-12 object-contain"
          />
        </div>
        <div className="h-2 w-36 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full w-1/2 bg-white/60 animate-[loaderbar_1.6s_ease-in-out_infinite]" />
        </div>
        <p className="text-white/90 text-sm tracking-wide">
          Preparing your experience…
        </p>
      </div>

      <style jsx>{`
        @keyframes aurora {
          0% {
            background-position: 0% 0%, 100% 0%;
          }
          50% {
            background-position: 30% 10%, 70% 20%;
          }
          100% {
            background-position: 0% 0%, 100% 0%;
          }
        }
        @keyframes glint {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(8px) translateY(-6px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }
        @keyframes loaderbar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}



const Hero            = dynamic(() => import('@/components/Hero'),            { loading: () => <SectionSkeleton /> });
const Counter         = dynamic(() => import('@/components/Counter'),         { loading: () => <SectionSkeleton /> });
const FeatureSection  = dynamic(() => import('@/components/Features'),        { loading: () => <SectionSkeleton /> });
const AboutSection    = dynamic(() => import('@/components/About'),           { loading: () => <SectionSkeleton /> });
const Testimonial     = dynamic(() => import('@/components/Testimonal'),      { loading: () => <SectionSkeleton /> });
const Services        = dynamic(() => import('@/components/Services'),        { loading: () => <SectionSkeleton /> });
const TeamSection     = dynamic(() => import('@/components/Team'),            { loading: () => <SectionSkeleton /> });
const CompanyStory    = dynamic(() => import('@/components/CompanyStory'),    { loading: () => <SectionSkeleton /> });
const InfoSection     = dynamic(() => import('@/components/Info'),            { loading: () => <SectionSkeleton /> });
const BlogSection     = dynamic(() => import('@/components/Blog'),            { loading: () => <SectionSkeleton /> });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <MountLoader />;

  return (
  <div className="min-h-screen bg-white overflow-x-hidden">

      <Header />
   <>
      <main >
        
        {/* <Suspense fallback={<SectionSkeleton />}><Hero /></Suspense> */}
        <Suspense fallback={<SectionSkeleton />}><Hero /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><Counter /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><FeatureSection /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><AboutSection /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><Testimonial /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><Services /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><TeamSection /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><CompanyStory /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><InfoSection /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><BlogSection /></Suspense>
        
      </main>
      </>
       <SocialFloat />
      <Footer />
    </div>
  );
}
