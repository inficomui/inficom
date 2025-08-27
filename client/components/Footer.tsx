'use client';

import { useMemo } from 'react';
import { Phone, Mail, MapPin, ArrowUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import logo from "@/public/black-logo.png"

const BLUE = '#004AAD';
const ORANGE = '#FF7A00';

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return <>
    <footer className="relative overflow-hidden">
      {/* Background: dark base + subtle animated gradient layer */}
      <div className="absolute inset-0 bg-[#1b2a47]" />
      <div className="absolute inset-0 opacity-[0.25] [background:radial-gradient(70%_50%_at_0%_0%,_rgba(0,74,173,0.35)_0%,_transparent_60%),radial-gradient(60%_40%_at_100%_30%,_rgba(255,122,0,0.28)_0%,_transparent_65%)] animate-[slow-pan_22s_ease-in-out_infinite]" />
      {/* Floating orbs */}
      <div className="pointer-events-none absolute -top-6 -left-6 h-48 w-48 rounded-full blur-2xl opacity-30"
           style={{ background: BLUE }} />
      <div className="pointer-events-none absolute -bottom-8 right-8 h-44 w-44 rounded-full blur-2xl opacity-30"
           style={{ background: ORANGE }} />

      {/* Animated top gradient bar */}
      <div className="relative z-10 h-[3px] w-full [background:linear-gradient(90deg,#004AAD,#FF7A00,#004AAD)] bg-[length:200%_100%] animate-[barShift_6s_linear_infinite]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Twinkling dust */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-screen"
             style={{
               backgroundImage: `
                 radial-gradient(1.25px 1.25px at 10% 20%, #fff 70%, transparent 71%),
                 radial-gradient(1.25px 1.25px at 35% 75%, #fff 70%, transparent 71%),
                 radial-gradient(1.25px 1.25px at 65% 30%, #fff 70%, transparent 71%),
                 radial-gradient(1.25px 1.25px at 85% 60%, #fff 70%, transparent 71%)
               `,
               backgroundRepeat: 'no-repeat',
             }}
        />

        {/* 4-column grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 text-white">
          {/* Brand / About */}
          <div>
           <Image width={300} height={300} src={logo} alt='logo'/>
            <p className="mt-4 text-white/80 leading-relaxed">
              Empowering businesses with innovative technology and exceptional IT services.
              Your trusted partner for digital transformation and growth.
            </p>

        
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-white/80">
              {['#home', '#services', '#about', '#contact'].map((href) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="hover:text-[#FF7A00] transition-colors"
                  >
                    {href.replace('#', '').replace(/^\w/, c => c.toUpperCase())}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="mt-5 space-y-3 text-white/80">
              {[
                'Web Development',
                'Mobile Apps',
                'Cloud Solutions',
                'Cybersecurity',
                'Custom Software',
                'Data Analytics',
              ].map((s) => (
                <li key={s}>
                  <a href="#services" className="hover:text-[#FF7A00] transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold">Contact</h4>
            <p className="mt-5 text-white/80 text-sm">
              Join our newsletter for insights and updates.
            </p>
            {/* <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const data = new FormData(form);
                const email = String(data.get('email') || '').trim();
                if (!email) return;
                alert('Thanks! We’ll keep you posted.');
                form.reset();
              }}
              className="mt-4"
            >
              <div className="flex overflow-hidden rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 bg-gradient-to-r from-[#004AAD] to-[#FF7A00] text-white text-sm font-semibold hover:brightness-110 transition"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-[11px] text-white/60">
                By subscribing, you agree to our Terms & Privacy.
              </p>
            </form> */}
                <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-white/90" />
                <a href="tel:+918888795875" className="hover:text-[#FF7A00] transition-colors">
                  +91 88887 95875
                </a>
              </p>
              <p className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-white/90" />
                <a href="mailto:info@inficomsolutions.com" className="hover:text-[#FF7A00] transition-colors">
                  info@inficomsolutions.com
                </a>
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white/90" />
                <span className="text-white/90">
                  AN-13, Prozone Trade Center, CIDCO, Chhatrapati Sambhajinagar
                </span>
              </p>
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/90 hover:text-white hover:border-white/30 hover:scale-105 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-white/70 text-sm">
            © {year} InficomSolutions. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a>

            <button
              onClick={scrollToTop}
              className="group grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15 transition"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Inline keyframes (kept local to this component) */}
      <style jsx global>{`
        @keyframes barShift {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes slow-pan {
          0% { background-position: 0% 0%, 100% 0%; }
          50% { background-position: 30% 10%, 70% 15%; }
          100% { background-position: 0% 0%, 100% 0%; }
        }
      `}</style>
    </footer>
  </>
}
