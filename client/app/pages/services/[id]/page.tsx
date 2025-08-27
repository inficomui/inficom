// app/services/[id]/page.tsx
import { notFound } from "next/navigation";
import ServiceDetails from "@/components/ServicesDetails";
import type { Metadata } from "next";

const base = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function generateStaticParams() {
  if (!base) return [];
  const res = await fetch(`${base}/services`, { cache: "force-cache" });
  if (!res.ok) return [];
  const list: Array<{ _id: string }> = await res.json();
  return list.map((s) => ({ id: s._id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  if (!base || !params.id) return {};
  try {
    const res = await fetch(`${base}/services/${params.id}`, { cache: "force-cache" });
    if (!res.ok) return {};
    const service = await res.json();

    return {
      title: `${service.title} | Inficom Solutions Aurangabad`,
      description: service.description || `Learn more about ${service.title} offered by Inficom Solutions, Aurangabad.`,
      keywords: [
        `${service.title} Aurangabad`,
        `${service.title} Chhatrapati Sambhajinagar`,
        "Inficom Solutions",
        "IT Services",
      ],
      openGraph: {
        title: `${service.title} | Inficom Solutions`,
        description: service.description,
        url: `https://inficomsolutions.in/services/${service._id}`,
        siteName: "Inficom Solutions",
        type: "article",
        images: [
          {
            url: service.image || "https://inficomsolutions.in/og-service.jpg",
            width: 1200,
            height: 630,
            alt: service.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${service.title} | Inficom Solutions`,
        description: service.description,
        images: [service.image || "https://inficomsolutions.in/og-service.jpg"],
      },
    };
  } catch {
    return {};
  }
}

export default function Page({ params }: { params: { id: string } }) {
  if (!params.id) notFound();
  return <ServiceDetails id={params.id} />;
}
