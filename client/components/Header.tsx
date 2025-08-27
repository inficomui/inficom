'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import logo from '../public/black-logo.png';
import blackLogo from '../public/logo.png';
import {AnimatePresence, motion} from "framer-motion"
import Link from 'next/link';
import { StickyBanner } from './ui/sticky-banner';
type NavItem = { name: string; href: string };

const BLUE = '#004AAD';
const ORANGE = '#FF7A00';

export default function Header() {
  // const [showBanner, setShowBanner]= useState(true)
    const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
const [isSidebarOpen,setIsSidebarOpen ]=useState(false)
  // Close on ESC
  useEffect(() => {
    if (!isSidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSidebarOpen, setIsSidebarOpen]);

  // Optional: lock body scroll while open
  useEffect(() => {
    if (!isSidebarOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isSidebarOpen]);

  // Click outside to close
  const onBackdropClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      setIsSidebarOpen(false);
    }
  };
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string>('#home');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ✅ Use real routes (no /pages prefix)
  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },            // or '/#home' if you want to force scroll on homepage
    { name: 'Our Services', href: '/pages/services' },
    { name: 'Blogs', href: '/pages/blogs' },
    { name: 'About', href: '/pages/about' },
    { name: 'Contact', href: '/pages/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section highlight (kept for hash sections on the same page)
  useEffect(() => {
    const ids = ['home', 'services', 'about', 'contact'];
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { threshold: [0.3, 0.6], rootMargin: '-80px 0px -40% 0px' }
    );

    sections.forEach(sec => observerRef.current!.observe(sec));
    return () => observerRef.current?.disconnect();
  }, []);

  // ✅ Navigate smartly: hash → smooth scroll, path → router.push
  const handleNav = (href: string) => {
    // 1) If it's a pure hash like "#services"
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsSidebarOpen(false);
      return;
    }

    // 2) If it includes a hash with a path, e.g. "/#home" or "/about#team"
    const [path, hash] = href.split('#');

    // If we are already on the same path, try to smooth-scroll to the hash
    if (path === pathname || (path === '' && pathname === '/')) {
      if (hash) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // No hash → just stay (or scroll to top)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setIsSidebarOpen(false);
      return;
    }

    // 3) Otherwise, normal navigation
    router.push(href);
    setIsSidebarOpen(false);
  };
  function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        setH(Math.round(height));
      }
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return { ref, height: h };
}

const [showBanner, setShowBanner] = useState(true);
const { ref: bannerRef, height: bannerH } = useElementHeight<HTMLDivElement>();

// comfortable gap below banner (16px)
const headerTop = (showBanner ? bannerH : 0) + 16; // px

// useEffect(() => {
//   if (bannerRef.current) {
//     setBannerHeight(bannerRef.current.offsetHeight);
//   }
// }, [showBanner]);
  return (
    <>
{/* measure wrapper */}
<div ref={bannerRef}>
  {showBanner && (
    <StickyBanner
      hideOnScroll
      showBanner={setShowBanner}
      className="bg-gradient-to-b from-blue-500 to-blue-600 py-2"
    >
     <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
  Transforming ideas into <strong>powerful digital solutions</strong>.{" "}
  <a href="/services" className="transition duration-200 hover:underline">
    Explore our services →
  </a>
</p>

    </StickyBanner>
  )}
</div>


  <header
  className={`fixed top-4 left-1/2 z-50 w-[92%] max-w-7xl transform -translate-x-1/2 
    transition-all duration-300 rounded-2xl border backdrop-blur-md     ${showBanner ? "top-24 lg:top-12" : "top-4"} 
    ${isScrolled
      ? "bg-white/70 border-white/40 shadow-lg"
      : "bg-white/10 border-white/10 shadow-sm"
    } `}   // 👈 margin-bottom
  style={{ WebkitBackdropFilter: "blur(12px)" }}
>
      

  <div className="px-6 sm:px-8 ">
    <div className="flex items-center justify-between h-16 lg:h-20">
      
      {/* Logo */}
   <Link href={"/"} className="flex-shrink-0">
  <Image
    src={isScrolled ? blackLogo : logo}
    height={200}
    width={200}
    alt="Inficom Solutions Logo"
    className="h-8 w-auto sm:h-9 md:h-10 lg:h-12 transition-all duration-300"
    priority
  />
</Link>


      {/* Desktop Nav */}
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActivePath = pathname === item.href;
            return (
              <li key={item.name} className="relative group">
                <motion.button
                  onClick={() => handleNav(item.href)}
                  aria-current={isActivePath ? "page" : undefined}
                  className={`relative font-semibold tracking-[0.01em] focus:outline-none
                    ${isScrolled ? "text-[#004AAD]" : "text-white"}`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span
                    className={`relative z-10 ${
                      isScrolled ? "text-[#004AAD]" : "text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                  <motion.span
                    aria-hidden
                    className="absolute left-0 -bottom-1 h-[2px] w-full"
                    initial={{ scaleX: isActivePath ? 1 : 0 }}
                    animate={{ scaleX: isActivePath ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    style={{
                      transformOrigin: "left",
                      background: isScrolled
                        ? "linear-gradient(90deg,#004AAD,#004AAD)"
                        : "linear-gradient(90deg,rgba(255,255,255,0),#fff,rgba(255,255,255,0))",
                    }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                  />
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right: Contact + CTA */}
     {/* Right: Contact + CTA */}
<div className="hidden lg:flex items-center gap-5">
  {/* Phone icon only */}
  <a
    href="tel:+918888795875"
    className="flex items-center justify-center w-10 h-10 rounded-full"
    style={
      isScrolled
        ? { color: "#004AAD", backgroundColor: "rgba(0,74,173,0.08)" }
        : { color: "#FFFFFF", backgroundColor: "rgba(255,255,255,0.1)" }
    }
  >
    <Phone size={18} />
  </a>

  {/* WhatsApp icon */}
  <a
    href="https://wa.me/918888795875"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-10 h-10 rounded-full"
    style={
      isScrolled
        ? { color: "#25D366", backgroundColor: "rgba(37,211,102,0.08)" }
        : { color: "#25D366", backgroundColor: "rgba(255,255,255,0.1)" }
    }
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12.001 2.002c-5.514 0-10 4.486-10 10 0 1.766.464 3.49 1.345 5.01L2 22l5.104-1.335c1.47.801 3.125 1.223 4.897 1.223h.001c5.514 0 10-4.486 10-10s-4.486-9.998-10.001-9.998zm5.479 14.646c-.229.647-1.345 1.229-1.85 1.308-.496.072-1.109.104-1.792-.111-.413-.132-.943-.307-1.633-.6-2.873-1.242-4.739-4.146-4.88-4.34-.143-.193-1.163-1.545-1.163-2.946 0-1.401.737-2.091.998-2.379.26-.288.57-.361.76-.361.191 0 .382.002.548.01.178.007.414-.067.647.493.229.55.777 1.901.846 2.04.07.14.117.303.023.497-.094.193-.141.303-.276.464-.14.164-.295.366-.421.493-.14.14-.285.293-.122.574.163.28.725 1.195 1.557 1.933 1.07.953 1.973 1.249 2.254 1.388.28.14.445.117.61-.07.166-.188.7-.82.889-1.099.188-.28.377-.233.637-.14.26.094 1.647.776 1.928.916.28.14.467.21.537.328.07.117.07.682-.159 1.329z" />
    </svg>
  </a>

  {/* CTA button */}
  <button
    onClick={() => handleNav("/pages/contact")}
    className="px-5 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-blue-700"
  >
    Get Quote
  </button>
</div>


      {/* Mobile: Hamburger */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`lg:hidden p-2 rounded-md transition-colors ${
          isScrolled
            ? "text-gray-800 hover:bg-gray-100"
            : "text-white hover:bg-white/10"
        }`}
        aria-label="Open menu"
        aria-expanded={isSidebarOpen}
      >
        <Menu size={24} />
      </button>
    </div>
  </div>
 
</header>


      {/* Sidebar Overlay */}
      <AnimatePresence>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={onBackdropClick}
            aria-hidden
          />

          {/* Floating sheet (top dropdown) */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            ref={panelRef}
            className="pointer-events-auto absolute left-0 right-0
                       top-[calc(env(safe-area-inset-top,0px)+16px)]
                       mx-4 rounded-2xl border border-white/60
                       bg-white/90 backdrop-blur-xl shadow-2xl
                       max-h-[70vh] overflow-y-auto"
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Top gradient hairline */}
            <div
              className="h-1 w-full rounded-t-2xl"
              style={{
                background: "linear-gradient(90deg, #004AAD 0%, #FF7A00 100%)",
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div className="flex items-center gap-3">
                <div/>
             
                <Image src={blackLogo} width={200}  height={200} alt='logo' />
              </div>

              <button
                ref={closeBtnRef}
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="px-3 py-2">
              <ul className="space-y-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * index }}
                    >
                      <button
                        onClick={() => {
                          handleNav(item.href);
                          setIsSidebarOpen(false);
                        }}
                        className={`group w-full flex items-center justify-between gap-3
                                    rounded-xl px-4 py-3 transition-all duration-200
                                    ${isActive
                                      ? "bg-gradient-to-r from-[#004AAD]/10 to-[#FF7A00]/10"
                                      : "hover:bg-gray-50"
                                    }`}
                      >
                        <span
                          className={`font-medium tracking-[0.01em]
                                      ${isActive
                                        ? "text-transparent bg-clip-text bg-gradient-to-r from-[#004AAD] to-[#FF7A00]"
                                        : "text-gray-800"
                                      }`}
                        >
                          {item.name}
                        </span>

                        <div className="flex items-center gap-2">
                          {/* Active underline pill */}
                          <span
                            className={`h-[2px] w-10 rounded-full
                                      ${isActive
                                        ? "bg-gradient-to-r from-[#004AAD] to-[#FF7A00]"
                                        : "bg-transparent group-hover:bg-gray-200"
                                      }`}
                          />
                          <ChevronRight
                            size={18}
                            className={`transition-transform
                                      ${isActive ? "text-[#004AAD]" : "text-gray-400"}
                                      group-hover:translate-x-0.5`}
                          />
                        </div>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions / Contacts */}
            <div className="px-5 pb-[calc(env(safe-area-inset-bottom,0px)+14px)] pt-2 space-y-3 border-t">
              <div className="grid grid-cols-1 gap-3">
                <a
                  href="tel:+918888795875"
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <Phone size={20} style={{ color: BLUE }} />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-600">Call us</p>
                    <p className="font-semibold text-gray-900 truncate">
                      +91 88887 95875
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:info@inficomsolutions.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <Mail size={20} style={{ color: ORANGE }} />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900 truncate">
                      info@inficomsolutions.com
                    </p>
                  </div>
                </a>
              </div>

              <button
                onClick={() => {
                  handleNav("/contact");
                  setIsSidebarOpen(false);
                }}
                className="w-full text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-[1.015]
                           bg-gradient-to-r from-[#004AAD] to-[#FF7A00]"
              >
                Get Free Consultation
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
