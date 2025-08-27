import type { Metadata } from "next";
import ContactSection from "@/components/mini/ContactSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact Us | Inficom Solutions - IT Software Company in Aurangabad (Chhatrapati Sambhajinagar)",
  description:
    "Get in touch with Inficom Solutions, a leading IT software company in Aurangabad (Chhatrapati Sambhajinagar). Contact us for web development, mobile apps, cloud, cybersecurity, and software solutions.",
  keywords: [
    "Contact Inficom Solutions",
    "IT Company Aurangabad",
    "Software Company Chhatrapati Sambhajinagar",
    "Web Development Aurangabad",
    "Mobile App Development",
    "Cloud Solutions",
    "Cybersecurity Services"
  ],
  openGraph: {
    title: "Contact Inficom Solutions | IT Software Company in Aurangabad",
    description:
      "Reach out to Inficom Solutions in Aurangabad (Chhatrapati Sambhajinagar) for IT solutions: web, mobile apps, cloud, cybersecurity.",
    url: "https://inficomsolutions/pages/contact",
    siteName: "Inficom Solutions",
    images: [
      {
        url: "https://inficomsolutions/contact-og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Inficom Solutions Contact",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Inficom Solutions",
    description:
      "Get in touch with Inficom Solutions, your IT partner in Aurangabad (Chhatrapati Sambhajinagar).",
    images: ["https://inficomsolutions/contact-og-image.jpg"],
  },
  alternates: {
    canonical: "https://inficomsolutions/pages/contact",
  },
};

export default function ContactPage() {
  return <>
<Script
  id="ld-json-contact"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Inficom Solutions",
      url: "https://inficomsolutions.in",
      telephone: "+91-8888795875",
      email: "info@inficomsolutions.com",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Prozone Trade Center, AN13, API Rd, MIDC Industrial Area, Chilkalthana",
        addressLocality: "Chhatrapati Sambhajinagar",
        addressRegion: "Maharashtra",
        postalCode: "431007",
        addressCountry: "IN",
      },
      openingHours: [
        "Mo-Fr 09:00-18:30",
        "Sa 10:00-16:00",
      ],
      image: "https://inficomsolutions.in/logo.png", 
      sameAs: [
        "https://www.facebook.com/inficomsolutions/",
        "https://x.com/inficomsolutio",
        "https://www.linkedin.com/company/inficom-solutions-private-limited/",
      ],
      priceRange: "₹₹", // optional but useful
    }),
  }}
/>

  <ContactSection />;
  </> 
}
