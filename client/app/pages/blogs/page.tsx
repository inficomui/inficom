import BlogSection from "@/components/mini/BlogSection";
import type { Metadata } from "next";
// import BlogSection from "@/components/mini/BlogSection";

export const metadata: Metadata = {
  title: "Inficom Solutions Blog | IT Software Insights, Web & Mobile Development, Cloud, Cybersecurity",
  description:
    "Explore the Inficom Solutions Blog for the latest updates in IT software, web development, mobile apps, cloud solutions, and cybersecurity. Stay ahead with expert insights from Aurangabad (Chhatrapati Sambhajinagar).",
  keywords: [
    "Inficom Solutions Blog",
    "IT Company Blog",
    "Software Development Blog Aurangabad",
    "Web Development Insights",
    "Cloud and Cybersecurity Blog",
    "Mobile App Development Tips",
  ],
  openGraph: {
    title: "Inficom Solutions Blog | IT Software Company in Aurangabad",
    description:
      "Latest IT trends, web & mobile development, cloud computing, and cybersecurity insights from Inficom Solutions, Aurangabad (Chhatrapati Sambhajinagar).",
    url: "https://inficomsolutions.in/pages/blogs",
    siteName: "Inficom Solutions",
    images: [
      {
        url: "https://inficomsolutions.in/blog-og-image.jpg", // replace with banner
        width: 1200,
        height: 630,
        alt: "Inficom Solutions Blog",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inficom Solutions Blog",
    description:
      "Insights on IT software, cloud, mobile apps, and web development from Inficom Solutions (Aurangabad, Chhatrapati Sambhajinagar).",
    images: ["https://inficomsolutions.in/blog-og-image.jpg"],
  },
  alternates: {
    canonical: "https://inficomsolutions.in/pages/blogs",
  },
};

export default function BlogPage() {
  return <BlogSection />;
}
