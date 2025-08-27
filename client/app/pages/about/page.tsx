import type { Metadata } from "next";
import AboutSection from "@/components/mini/AboutSection";

// ✅ SEO metadata for /about page
export const metadata: Metadata = {
  title: "About Us | Inficom Solutions - IT Software Company in Aurangabad (Chhatrapati Sambhajinagar)",
  description:
    "Inficom Solutions is a leading IT software company based in Aurangabad (Chhatrapati Sambhajinagar). We deliver web development, mobile apps, cloud, and cybersecurity solutions to help businesses grow digitally.",
  keywords: [
    "Inficom Solutions",
    "IT Company Aurangabad",
    "Software Company Chhatrapati Sambhajinagar",
    "Web Development Aurangabad",
    "Mobile App Development Aurangabad",
    "Cloud Solutions",
    "Cybersecurity Services",
  ],
  openGraph: {
    title: "Inficom Solutions | IT Software Company in Aurangabad (Chhatrapati Sambhajinagar)",
    description:
      "Trusted IT partner in Aurangabad (Chhatrapati Sambhajinagar). Inficom Solutions provides world-class IT services: web, mobile, cloud, and cybersecurity.",
    url: "https://inficomsolutions.in/pages/about",
    siteName: "Inficom Solutions",
    images: [
      {
        url: "https://inficomsolutions.in/og-image.jpg", // replace with your logo/banner
        width: 1200,
        height: 630,
        alt: "Inficom Solutions - IT Software Company in Aurangabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inficom Solutions - IT Software Company in Aurangabad",
    description:
      "Inficom Solutions offers IT services in Aurangabad (Chhatrapati Sambhajinagar): software, web, mobile apps, cloud, and cybersecurity.",
    images: ["https://inficomsolutions.in/og-image.jpg"], // replace
  },
  alternates: {
    canonical: "https://inficomsolutions.in/pages/about",
  },
};

export default function AboutPage() {
  return <AboutSection />;
}
