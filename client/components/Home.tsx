'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StickyBanner } from '@/components/ui/sticky-banner';
import SocialFloat from '@/components/mini/SocialFloat';

import { MountLoader } from '@/components/mini/MountLoader';




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
