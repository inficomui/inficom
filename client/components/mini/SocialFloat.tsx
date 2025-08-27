import { motion } from "framer-motion";

type Item = {
  name: string;
  href: string;
  bg: string;        // Tailwind color class
  delay: number;     // small staggering for the bob
  icon: JSX.Element; // inline SVG
};

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="h-9 w-9 rounded-full flex items-center justify-center text-white shadow-lg shadow-black/20 hover:shadow-xl transition-transform duration-200 group-hover:scale-105">
    {children}
  </div>
);

export default function SocialFloat() {
  const items: Item[] = [
    {
      name: "Facebook",
      href: "https://facebook.com/yourpage",
      bg: "bg-[#1877F2]",
      delay: 0,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.01 3.66 9.16 8.44 9.93v-7.02H7.9v-2.9h2.4V9.41c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.63l-.42 2.9h-2.21V22c4.78-.77 8.44-4.92 8.44-9.93Z"/>
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: "https://pinterest.com/yourpage",
      bg: "bg-[#E60023]",
      delay: 0.15,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M12.04 2C6.59 2 3.5 5.41 3.5 9.36c0 2.28.85 4.31 2.68 5.07.3.12.57 0 .65-.33.06-.23.2-.81.26-1.05.08-.33.05-.44-.18-.73-.53-.64-.86-1.46-.86-2.63 0-3.39 2.55-6.43 6.64-6.43 3.62 0 5.61 2.21 5.61 5.16 0 3.88-1.72 7.16-4.27 7.16-1.41 0-2.47-1.16-2.13-2.58.41-1.74 1.2-3.61 1.2-4.86 0-1.12-.6-2.05-1.84-2.05-1.46 0-2.64 1.51-2.64 3.53 0 1.29.44 2.16.44 2.16l-1.77 7.5c-.52 2.19.06 4.88.11 5.14.06.18.22.23.33.09.18-.23 2.47-3.57 3.09-5.76.21-.74 1.19-4.54 1.19-4.54.59 1.12 2.3 2.11 4.12 2.11 3.61 0 6.06-3.42 6.06-7.6C20.95 5.63 17.38 2 12.04 2Z"/>
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/yourhandle",
      bg: "bg-black",
      delay: 0.3,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M18.244 2H21l-6.49 7.41L22 22h-6.828l-4.67-6.088L4.96 22H2.2l6.94-7.92L2 2h6.913l4.218 5.632L18.244 2Zm-1.197 18.4h1.69L7.03 3.52H5.26l11.787 16.88Z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/yourhandle",
      bg: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
      delay: 0.45,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/>
        </svg>
      ),
    },
  ];

  return (
   <div
  className="fixed right-4 bottom-4 z-[60] flex flex-col gap-3 overflow-hidden p-5"
  aria-label="Social links"
>

  {items.map((item) => (
    <motion.a
      key={item.name}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.name}
      className={`group ${item.bg} rounded-full`}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: [0, -4, 0], opacity: [0.9, 1, 0.9] }}
      transition={{
        duration: 2.2,
        delay: item.delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      whileHover={{
        y: -6,
        scale: 1.05,
        opacity: 1,
        transition: { duration: 0.15 },
      }}
    >
      <IconWrap>{item.icon}</IconWrap>
    </motion.a>
  ))}
</div>

  );
}
