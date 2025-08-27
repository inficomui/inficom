// components/WhyChooseUs.tsx
"use client";

import { ReactNode } from "react";
import { motion, type Variants  } from "framer-motion";

import { FeatureDTO, features } from "@/lib/whyChooseData";
import { getIcon } from "@/lib/IconsRegistery";
import { useGetFeaturesQuery } from "@/redux/apis/featuresApi";

// Solid brand colors (no gradients)
import { BLUE, CENTER, ORANGE } from '@/lib/theme';

type Feature = {
  title: string;
  desc: string;
  icon: ReactNode;
  color?: string; // optional per-item chip color
};

// const FEATURES: Feature[] = [
//   { title: "Lightning-Fast Websites", desc: "Super-quick page loads", icon: <Zap size={18} /> },
//   { title: "Free cPanel", desc: "Hosting management simplified", icon: <MonitorSmartphone size={18} /> },
//   { title: "SNI Enabled", desc: "SSL certificate installation easy", icon: <Lock size={18} /> },
//   { title: "24×7 Support", desc: "Your websites are our priority", icon: <Headset size={18} /> },
//   { title: "Easy 1-click Installer", desc: "400+ ready-to-install apps", icon: <Wrench size={18} /> },
//   { title: "Easy Upgrades", desc: "Increase resources as needed", icon: <ArrowUpRight size={18} /> },
//   { title: "Free Backup", desc: "We provide free backups", icon: <Database size={18} /> },
//   { title: "Enhanced Security", desc: "Cloudflare protection", icon: <ShieldCheck size={18} /> },
//   { title: "Free Website Migrations", desc: "Move your hosting to us", icon: <ArrowLeftRight size={18} /> },
// ];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 22 },
  },
};
export default function WhyChooseUs({
  items = features,
  badgeText = "All plans include",
  heading = "Why choose?",
}: {
  items?:  FeatureDTO[];
  badgeText?: string;
  heading?: string;
}) {
  const { data: featuresData, isLoading } = useGetFeaturesQuery();
  // console.log("data", featuresData);
  
  return (
    <section
      className="relative py-14 sm:py-16"
      style={{ background: "rgba(0,0,0,0.02)" }} // soft tint; no gradients
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: BLUE }} // solid
          >
            {badgeText}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            {heading}
          </h2>
        </div>

        {/* Grid with animations */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {featuresData && featuresData.map((f, i) => {
             const Icon = getIcon(f.iconKey);
return <>
  <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -4, rotateX: 1.5 }}
              className="group relative flex items-start gap-4 rounded-2xl bg-white p-4 sm:p-5
                         ring-1 ring-slate-200 shadow-sm transition will-change-transform"
            >
              {/* Icon chip (solid color, tiny pulse on hover) */}
                 <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="shrink-0 grid place-items-center h-10 w-10 rounded-full text-white shadow"
                  style={{ backgroundColor:  ORANGE }}
                >
                  <Icon size={18} />
                </motion.div>

              {/* Texts */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
              </div>

              {/* subtle focus ring on hover (no gradient) */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-blue-500/0 group-hover:ring-2 group-hover:ring-blue-500/15 transition" />
            </motion.div>
</>

          })}
        </motion.div>
      </div>
    </section>
  );
}
