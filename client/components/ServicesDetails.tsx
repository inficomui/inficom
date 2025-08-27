// app/services/[id]/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {

  Sparkles, Info, AlertTriangle, Check, ChevronLeft, HelpCircle
} from 'lucide-react';
import Header from './Header';
import { services } from '@/lib/servicesData';
import { getIcon } from '@/lib/IconsRegistery';
import { useGetServiceQuery } from '@/redux/apis/servicesApi';
import { MountLoader } from './mini/MountLoader';
// import { MountLoader } from '@/app/page';

// for dark theme prev
// const DETAIL_SERVICES_BG_COLOR = "#1c1e34"

// Super Light
// const DETAIL_SERVICES_BG_COLOR = "#74a4ca"


/* ---------- tiny UI helpers ---------- */
const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
    <Sparkles className="h-3.5 w-3.5" />
    {children}
  </span>
);

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-2xl bg-gradient-to-b from-white/5 to-transparent p-4 border border-white/10">
    <p className="text-xs uppercase tracking-wider text-white/60">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
  </div>
);

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2">
      <Info className="h-5 w-5 text-blue-400" />
      {title}
    </h2>
    {subtitle && <p className="text-white/70 mt-1">{subtitle}</p>}
  </div>
);

/* ---------- data ---------- */

type TabType = 'overview' | 'features' | 'includes' | 'faqs';

export default function ServiceDetails({ id }: { id: string }) {
  const router = useRouter();
const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { data, isLoading, error } = useGetServiceQuery(id);
// console.log("data from details ", data);

  if (isLoading) return <MountLoader/>
  if (error)     return <div className="p-8">Failed to load.</div>;
  if (!data)     return <div className="p-8">Service not found.</div>;
//   const id = Number(params.id) || 0;
  // const service = useMemo(() => services[id], [id]);
  const service = data
  // const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Service not found</p>
      </div>
    );
  }
const Icon = getIcon(service.iconKey);
const bookNow = () => {
  router.push(`/pages/contact/booking-contact?id=${id}`);
};
  return (
    <>
      <Header />

      {/* BG */}
      <div className="pointer-events-none fixed inset-0 -z-10">
   <div className="absolute inset-0 bg-[#74a4ca]" />  
   {/* <div className={`absolute inset-0 bg-[${DETAIL_SERVICES_BG_COLOR}]`} />  */}
         <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <button
          onClick={() => router.push('/')}
          className="group inline-flex items-center gap-2 text-white/80 hover:text-white transition"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Services
        </button>
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* left */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  {service.title}
                </h1>
                <p className="mt-2 text-white/70 max-w-2xl">{service.description}</p>
              </div>
            </div>

            {/* badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>High Performance</Badge>
              <Badge>Modern Stack</Badge>
              <Badge>Scalable & Secure</Badge>
            </div>

            {/* cover / banner */}
           {/* Benefits Section (instead of cover/banner) */}
<div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
  <SectionTitle 
    title="Benefits of this Service" 
    subtitle="Why this solution adds value to your business" 
  />
  <ul className="grid sm:grid-cols-2 gap-4">
    {[
      "Boosts productivity with streamlined workflows",
      "Ensures security and reliability from day one",
      "Scales easily as your business grows",
      "Delivers modern user experiences",
      "Backed by expert support and guidance",
      "Reduces long-term maintenance costs",
    ].map((benefit, i) => (
      <li 
        key={i} 
        className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
      >
        <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
        <span className="text-white/90">{benefit}</span>
      </li>
    ))}
  </ul>
</div>

          </div>

          {/* right sticky actions (no price) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
                <h3 className="text-white font-semibold text-lg">Quick Actions</h3>
                <p className="text-white/70 text-sm mt-1">
                  Share your requirements—we’ll respond within 24 hours with a tailored plan.
                </p>

                <ul className="mt-4 space-y-2 text-white/80">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Clear milestones & roadmap
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Dedicated project manager
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Quality-assured delivery
                  </li>
                </ul>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={bookNow}
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-2.5 font-medium text-white shadow hover:opacity-90 transition"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => router.push('/contact?intent=talk')}
                    className="rounded-xl border border-white/20 px-4 py-2.5 font-medium text-white/90 hover:bg-white/10 transition"
                  >
                    Talk to us
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
                  <AlertTriangle className="h-4 w-4" />
                  No hidden fees. Scope approved before build.
                </div>
              </div>

              {/* quick stats */}
              <div className="grid grid-cols-3 gap-3">
                <Stat label="Uptime" value="99.9%" />
                <Stat label="Avg. NPS" value="9.1/10" />
                <Stat label="Projects" value="250+" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-6xl px-6 mt-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
          <div className="flex gap-2">
            {([
              { id: 'overview', label: 'Overview' },
              { id: 'features', label: 'Features' },
              { id: 'includes', label: 'Included' },
              { id: 'faqs', label: 'FAQs' },
            ] as const).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  activeTab === t.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <SectionTitle title="What you get" subtitle={service.details} />
                {service.extraDescription?.length ? (
                  <div className="space-y-3 text-white/70">
                    {service.extraDescription.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/70">{service.description}</p>
                )}

                {/* Process */}
                <div className="mt-6">
                  <SectionTitle title="Our process" subtitle="Transparent milestones for predictable delivery" />
                  <ol className="relative border-s border-white/10 ps-6 space-y-6">
                    {[
                      'Discovery & scope',
                      'Design & architecture',
                      'Development sprints',
                      'QA & hardening',
                      'Launch & handover',
                    ].map((step, i) => (
                      <li key={i} className="ms-4">
                        <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border border-white/20 bg-white/10" />
                        <h4 className="text-white font-medium">{step}</h4>
                        <p className="text-white/60 text-sm">
                          We keep you in the loop with weekly demos and progress reports.
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <SectionTitle title="Key features" subtitle="Crafted to drive outcomes" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {service.features?.map((f: string) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-orange-400" />
                      <span className="text-white/90">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'includes' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <SectionTitle title="Included" />
                  <ul className="space-y-2">
                    {service.included?.map((item: string) => (
                      <li key={item} className="flex items-start gap-2 text-white/90">
                        <Check className="h-4 w-4 mt-0.5 text-green-400" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <SectionTitle title="Not included" />
                  <ul className="space-y-2">
                    {service.notIncluded?.map((item: string) => (
                      <li key={item} className="flex items-start gap-2 text-white/70">
                        <AlertTriangle className="h-4 w-4 mt-0.5 text-red-400" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div>
                <SectionTitle title="Frequently asked questions" />
                <div className="divide-y divide-white/10 rounded-xl border border-white/10">
                  {service.faqs?.map((faq: { q: string; a: string }, i: number) => (
                    <details key={i} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between bg-white/5 p-4 text-left text-white/90 hover:bg-white/10">
                        <span className="flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-purple-400" />
                          Q: {faq.q}
                        </span>
                        <span className="text-white/60 group-open:rotate-180 transition">▾</span>
                      </summary>
                      <div className="p-4 text-white/70">A: {faq.a}</div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Terms & Conditions (always visible and concise) */}
      <section className="mx-auto max-w-6xl px-6 mt-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <SectionTitle title="Terms & Conditions" subtitle="Simple, transparent engagement" />
          <ul className="list-disc list-inside text-white/75 space-y-2">
            {(service.terms?.length ? service.terms : [
              'Project begins after scope sign-off.',
              'Source code ownership is transferred on final payment.',
              'Change requests are estimated and approved before work.',
              'We follow security and privacy best practices.',
            ]).map((t: string, i: number) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={bookNow}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-medium text-white shadow hover:opacity-90 transition"
            >
              Book Now
            </button>
            <button
              onClick={() => router.push('/contact?intent=proposal')}
              className="rounded-xl border border-white/20 px-5 py-3 font-medium text-white/90 hover:bg-white/10 transition"
            >
              Request Proposal
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 mt-12 mb-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-600/20 via-blue-600/20 to-transparent p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-white">
                Ready to start {service.title}?
              </h3>
              <p className="text-white/70 mt-1">Book a slot and get a plan within 24 hours.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={bookNow}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-medium text-white shadow hover:opacity-90 transition"
              >
                Book Now
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="rounded-xl border border-white/20 px-5 py-3 font-medium text-white/90 hover:bg-white/10 transition"
              >
                Talk to us
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
