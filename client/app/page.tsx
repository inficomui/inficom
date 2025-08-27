import Home from "@/components/Home";
import type { Metadata } from "next";
import Script from "next/script";


export const metadata: Metadata = {
  title: "Inficom Solutions | IT Company in Aurangabad (Chhatrapati Sambhajinagar)",
  description:
    "Inficom Solutions is a leading IT software company in Aurangabad (Chhatrapati Sambhajinagar), delivering web development, mobile apps, cloud solutions, cybersecurity, and custom software.",
  keywords: [
    "IT company Aurangabad",
    "Inficom Solutions",
    "software company Chhatrapati Sambhajinagar",
    "web development Aurangabad",
    "cloud solutions Aurangabad",
    "IT services Maharashtra",
  ],
  openGraph: {
    title: "Inficom Solutions | IT Services in Aurangabad",
    description:
      "Explore Inficom Solutions’ IT services in Aurangabad (Chhatrapati Sambhajinagar). From web and mobile apps to cloud and security solutions.",
    url: "https://inficomsolutions.in/",
    siteName: "Inficom Solutions",
    images: [
      {
        url: "https://inficomsolutions.in/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Inficom Solutions - IT Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inficom Solutions | IT Services in Aurangabad",
    description:
      "Partner with Inficom Solutions for reliable IT solutions in Aurangabad (Chhatrapati Sambhajinagar).",
    images: ["https://inficomsolutions.in/og-home.jpg"],
  },
  metadataBase: new URL("https://inficomsolutions.in"),
};

export default function HomePage() {
  return  <>
      <Home />
      <Script
        id="ld-json-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Inficom Solutions",
            url: "https://inficomsolutions.in",
            logo: "https://inficomsolutions.in/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-8888795875",
              contactType: "Customer Service",
              areaServed: "IN",
              availableLanguage: ["en", "hi", "mr"]
            },
            sameAs: [
              "https://www.facebook.com/inficomsolutions/",
              "https://x.com/inficomsolutio",
              "https://www.linkedin.com/company/inficom-solutions-private-limited/"
            ]
          }),
        }}
      />
    </>
}
