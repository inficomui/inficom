'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypingEffect from './AnimatedTyping';
import Sparkle from './ui/Sparkle';
import { motion } from "framer-motion"; // ✅ FIXED
import heroImage from '../public/hero-image-new.png';
import Image from 'next/image';
import { FlipWords } from './ui/flip-words';
import ScrollSpeedController from './ui/smoothScroll';
import { BLUE, CENTER, ORANGE } from '@/lib/theme';
import JustdialRatingBar from './mini/JustdialRatingBar';
import WhyChooseUs from './WhyChooseUs';
// import SocialProofBar from './mini/SocialProofBar';



export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  
  // 🔤 Flip words sets
  const badgeWords = [
    'Leading IT Solutions Provider',
    'Trusted Tech Partner',
    'Enterprise-Grade Services',
    'Modern Engineering Team',
    'Result-Driven Experts',
    'Scalable Solutions',
  ];

  const buildWords = [
    'Digital Software Build',
    'High-Performance Apps',
    'Robust Web Platforms',
    'Secure Cloud Systems',
    'Mobile Experiences',
    'Custom Integrations',
  ];

  const solutionWords = [
    'Innovative Solution.',
    'Future-Ready Tech.',
    'Reliable Delivery.',
    'Seamless UX.',
    'Faster Go-Live.',
    'Measurable Impact.',
  ];


  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <>
        <ScrollSpeedController multiplier={0.1} friction={0.1} />
  <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-10 md:pt-7"
    >
    
      {/* Gradient Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#004AAD] via-[#1C3334] to-[#b3784e]" /> */}
      {/* dark prev */} 
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#b3784e] via-[#1C3334] to-[#004AAD]" /> */}
      {/* medium  */}
           {/* <div className="absolute inset-0 bg-gradient-to-br from-[#d3aa8c] via-[#5e7e81] to-[#6e99d1]" /> */}
      {/* light  */}

      <div className={`absolute inset-0 bg-gradient-to-br from-[${ORANGE}] via-[${CENTER}] to-[${BLUE}]`} />

      {/* Floating Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-2xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/10 to-transparent rounded-full animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
           <div
            className={`space-y-8 transition-all duration-1000 text-center lg:text-left flex flex-col items-center lg:items-start ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Badge with FlipWords */}
            <div
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2"
              style={{ color: 'white' }}
            >
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              {/* If FlipWords supports className, keep it here; otherwise wrap it with a <span> */}
              <FlipWords
                words={badgeWords}
                className="text-sm font-medium "
              />
            </div>

            {/* Heading with two FlipWords blocks */}
       <h1
  className="relative text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight overflow-hidden"
>
  <div className="inline-flex items-center relative z-10">
    <FlipWords words={buildWords} className="inline-block" />
    <Sparkle className="w-6 h-6 mr-2 opacity-60" />
  </div>

  <br className="hidden sm:block" />
  <span className="relative block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 z-10">
    <FlipWords words={solutionWords} className="inline-block" />
  </span>

  {/* Shiny overlay */}
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
</h1>



            {/* Typing line under heading (kept) */}
            <TypingEffect />

            <p className="sm:text-xl text-gray-200 max-w-2xl leading-relaxed">
              We are tailored IT design, management & support services, delivering modern software solutions for
              businesses worldwide.
            </p>

            {/* CTAs */}
           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  {/* CTA */}
  <Button
    onClick={scrollToContact}
    className="w-full sm:w-auto px-6 py-3 font-semibold rounded-xl text-white
               bg-blue-600 hover:bg-blue-700 transition-all hover:scale-[1.02] shadow-lg"
  >
    Start Your Project
    <ArrowRight className="ml-2 h-5 w-5" />
  </Button>

  {/* Contacts */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-white/90 sm:ml-6">
    <a
      href="tel:+918888795875"
      className="hover:text-white sm:whitespace-nowrap"
    >
      +91 88887 95875
    </a>

    {/* Dot divider only on desktop */}
    <span className="hidden sm:inline opacity-40">•</span>

    <a
      href="mailto:info@inficomsolutions.com"
      className="hover:text-white break-all sm:break-normal sm:whitespace-nowrap"
    >
      info@inficomsolutions.com
    </a>
  </div>
</div>

          </div>

          {/* Right Column - Hero Image */}
         <div className="flex justify-center lg:justify-end">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -15, 0] }} // floating up and down
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 200 },
        }}
        className="relative"
      >
        <Image
          src={heroImage}
          alt="hero"
          width={700}
          height={700}
          className="w-72 sm:w-96 md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto mx-auto lg:mx-0 drop-shadow-2xl"
          priority
        />

        {/* Glowing animated accent behind image */}
        <motion.div
          aria-hidden
          className="absolute -inset-10 rounded-full bg-gradient-to-r from-[#004AAD]/40 via-transparent to-[#FF7A00]/40 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
        </div>
 <JustdialRatingBar
        rating={4.8}
        reviews={123815}
        city="Aurangabad"
        verdict="Top-rated"
        linkHref="https://www.justdial.com/..." // your JD profile URL
      />

      <WhyChooseUs heading="Why choose Inficom?" badgeText="Every plan includes" />
        {/* Contact Details */}
          {/* <SocialProofBar rating={4.6} reviews={123815} /> */}
      </div>
         {/* Tiny animation helpers */}
      <style jsx global>{`
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 9.5s ease-in-out 0.6s infinite;
        }
        .animate-pulse-slow {
          animation: pulser 6s ease-in-out infinite;
        }
        .animate-float-soft {
          animation: floatSoft 7s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) }
          50% { transform: translateY(-14px) }
        }
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
        }
        @keyframes pulser {
          0%, 100% { opacity: 0.45; transform: scale(1) }
          50% { opacity: 0.7; transform: scale(1.05) }
        }
      `}</style>
    </section>
</>
}
