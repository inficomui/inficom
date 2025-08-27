// app/pages/services/page.tsx
import ServicesSection from "@/components/mini/ServicesSection";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "IT Services in Aurangabad | Inficom Solutions",
  description:
    "Explore Inficom Solutions' comprehensive IT services in Aurangabad (Chhatrapati Sambhajinagar) — from web development and mobile apps to cloud solutions and cybersecurity.",
  keywords: [
    "IT services Aurangabad",
    "Chhatrapati Sambhajinagar software company",
    "web development Aurangabad",
    "cloud solutions Aurangabad",
    "cybersecurity Aurangabad",
    "Inficom Solutions",
  ],
  openGraph: {
    title: "Inficom Solutions | IT Services in Aurangabad",
    description:
      "We deliver end-to-end IT solutions in Aurangabad (Chhatrapati Sambhajinagar). Partner with Inficom Solutions for web, mobile, cloud, and security services.",
    url: "https://inficomsolutions.in/pages/services",
    siteName: "Inficom Solutions",
    type: "website",
    images: [
      {
        url: "https://inficomsolutions.in/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Inficom Solutions - IT Services in Aurangabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inficom Solutions | IT Services in Aurangabad",
    description:
      "Discover software and IT services in Aurangabad (Chhatrapati Sambhajinagar) with Inficom Solutions.",
    images: ["https://inficomsolutions.in/og-services.jpg"],
  },
};

export default function ServicesPage() {
  return <ServicesSection />;
}
