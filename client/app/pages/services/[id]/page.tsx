// app/services/[id]/page.tsx
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const ServiceDetails = dynamic(() => import('@/components/ServicesDetails'), { ssr: false });

// With output: 'export', dynamic routes must be prebuilt via generateStaticParams
export async function generateStaticParams() {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) return []; // if env is missing, no params -> no detail pages

  // This runs at build time. The endpoint must be reachable then.
  const res = await fetch(`${base}/services`, { cache: 'force-cache' });
  if (!res.ok) return [];

  const list: Array<{ _id: string }> = await res.json();
  return list.map(s => ({ id: s._id })); // param key MUST be "id" to match [id]
}

export default function Page({ params }: { params: { id: string } }) {
  if (!params.id) notFound();
  return <ServiceDetails id={params.id} />;
}
