import React from "react";
import {motion} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { BLUE, CENTER, ORANGE } from '@/lib/theme';
import { Handshake, MonitorSmartphone, PieChart, TrendingUp } from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: 1,
    title: "Modern Renovate",
    description: "Inficom Solutions – Modern tools for growing agencies and businesses.",
    iconColor: "#ffc330",
 icon: <FontAwesomeIcon icon={faChartPie} className="text-4xl" />,
  },
  {
    id: 2,
    title: "Digital Marketing",
    description: "We create modern software solutions for businesses and agencies.",
    icon: <Image width={100} height={100} src="https://html.rrdevs.net/morat/assets/img/icon/service-2.png" alt="icon" className="w-10 h-10" />,
  },
  {
    id: 3,
    title: "Research Work",
    description: "Driving innovation through in-depth technology research.",
    iconColor: "#ff8c91",
    icon: <Image width={100} height={100} src="https://html.rrdevs.net/morat/assets/img/icon/service-3.png" alt="icon" className="w-10 h-10" />,
  },
  {
    id: 4,
    title: "Get Updates",
    description: "Stay informed with the latest from Inficom Solutions.",
    iconColor: "#a6e155",
    icon: <Image width={100} height={100} src="https://html.rrdevs.net/morat/assets/img/icon/service-1.png" alt="icon" className="w-10 h-10" />,
  },
];
// Optional: map ids -> icons if your data doesn't include React nodes
const iconByKey: Record<string, JSX.Element> = {
  renovate: <PieChart size={28} />,
  marketing: <TrendingUp size={28} />,
  research: <Handshake size={28} />,
  updates: <MonitorSmartphone size={28} />,
};

// Re-usable 3D icon orb
function IconOrb({
  color = BLUE,
  icon,
  size = 72,
}: {
  color?: string;
  icon: React.ReactNode;
  size?: number;
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* body (glossy + depth) */}
      <div
        className="absolute inset-0 rounded-full shadow-xl"
        style={{
          background: `
            radial-gradient(120% 120% at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 18%, rgba(255,255,255,0.12) 34%, rgba(0,0,0,0.08) 62%, rgba(0,0,0,0.18) 100%),
            radial-gradient(100% 100% at 70% 75%, ${color} 0%, ${color}CC 45%, ${color}99 72%, ${color}66 100%)
          `,
        }}
      />
      {/* rim highlight */}
      <div className="absolute inset-0 rounded-full ring-1 ring-white/50" />
      {/* top-left sheen */}
      <div className="absolute -top-1 -left-1 h-10 w-10 rounded-full bg-white/60 blur-md opacity-80" />
      {/* icon */}
      <div className="absolute inset-0 grid place-items-center text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]">
        {icon}
      </div>
    </div>
  );
}
const FeatureSection: React.FC = () => {
  return (
// Features Section
<section
  className={`relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[${ORANGE}] via-[${CENTER}] to-[${BLUE}] text-white overflow-hidden`}
>
  {/* soft backdrop */}
  <div className="absolute inset-0 bg-black/20" />

  {/* subtle pattern */}
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-[0.06]"
    style={{
      backgroundImage:
        "radial-gradient(1px 1px at 12% 20%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 76% 68%, #fff 1px, transparent 1px)",
      backgroundSize: "42px 42px",
    }}
  />

  <div className="relative container mx-auto px-4">
    {/* Heading */}
    <div className="text-center mb-10 sm:mb-14 md:mb-16">
      <h4 className="text-orange-300 text-xs sm:text-sm font-semibold tracking-wide">
        Our Features
      </h4>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mt-2">
        Power Your Business Features
      </h2>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {features.map((feature: any, index: number) => {
        const color = feature.iconColor || BLUE;
        const iconNode =
          feature.icon ?? iconByKey[feature.id as string] ?? <PieChart size={24} />;

        return (
          <motion.article
            key={feature.id ?? feature.title}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -3 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.05,
            }}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md 
                       ring-1 ring-white/15 p-4 sm:p-6 md:p-7 text-center shadow-lg md:shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
          >
            {/* top-right orb accent */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 sm:h-28 sm:w-28 rounded-full opacity-25 blur-2xl"
              style={{ backgroundColor: color }}
            />

            {/* icon */}
            <div className="mb-4 sm:mb-5 flex justify-center">
              <IconOrb color={color} icon={iconNode} size={56} />
            </div>

            <h3 className="text-lg sm:text-xl md:text-[22px] font-bold leading-snug">
              {feature.title}
            </h3>
            <p className="mt-2 text-white/80 text-xs sm:text-sm md:text-[15px] leading-relaxed">
              {feature.description}
            </p>
          </motion.article>
        );
      })}
    </div>

    {/* CTA */}
    <div className="text-center mt-10 sm:mt-12">
      <a
        href="/service"
        className="inline-flex items-center justify-center rounded-lg sm:rounded-xl 
                   bg-orange-500 px-5 py-2.5 sm:px-7 sm:py-3 
                   text-sm sm:text-base text-white font-semibold shadow-md sm:shadow-lg transition hover:bg-orange-600"
      >
        View All Features
        <svg
          viewBox="0 0 24 24"
          className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>

  );
};

export default FeatureSection;
