'use client';

import { useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from '@/components/Header';

const BLUE = '#004AAD';
const ORANGE = '#FF7A00';

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  name: yup.string().trim().min(2, 'Please enter your full name').required('Full name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup
    .string()
    .optional()
    .matches(/^[\d+()\-\s]*$/, 'Only numbers and + ( ) - are allowed')
    .max(20, 'Too long'),
  service: yup.string().required('Please pick a service'),
  message: yup.string().trim().min(10, 'Please describe your project (10+ chars)').required('Message is required'),
}) as yup.ObjectSchema<FormValues>;


export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '', service: '', message: '' },
  });

  const onSubmit = async (data: FormValues) => {
    // simulate API latency
    await new Promise((r) => setTimeout(r, 1400));
    // TODO: send `data` to your API
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 2500);
  };

  const fieldBase =
    'w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 border transition-colors outline-none';
  const fieldRing = 'focus:ring-2 focus:ring-offset-0 focus:ring-[color:var(--ring)]';
  const fieldBorder = 'border-white/20 focus:border-white/40';
  const errorText = 'mt-1 text-sm text-red-300';

  return <>
  <Header/>
    <section className="relative py-24 lg:py-28 overflow-hidden">
      {/* Theme gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#004AAD] via-[#1C3334] to-[#b3784e]" />

      {/* Ambient animated aurora */}
      <motion.div
        aria-hidden
        className="absolute inset-0 mix-blend-screen opacity-70"
        style={{
          background:
            'radial-gradient(600px 280px at 12% 18%, rgba(0,74,173,0.25), transparent 60%), radial-gradient(520px 260px at 88% 14%, rgba(255,122,0,0.22), transparent 60%)',
        }}
        animate={{ backgroundPosition: ['0% 0%, 100% 0%', '30% 15%, 70% 10%', '0% 0%, 100% 0%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ORANGE }} />
            <span className="text-white font-medium">Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="mt-4 text-lg text-white/85 max-w-3xl mx-auto">
            Let’s discuss how our innovative IT solutions can drive growth. Contact us for a free consultation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-7"
          >
            {[
              {
                icon: <Phone className="w-6 h-6 text-white" />,
                title: 'Call Us Now',
                line1: <a href="tel:+1234567890" className="hover:text-white/90">+1 (234) 567-890</a>,
                note: 'Available 24/7 for emergencies',
              },
              {
                icon: <Mail className="w-6 h-6 text-white" />,
                title: 'Email Us',
                line1: <a href="mailto:info@inficomsolutions.com" className="hover:text-white/90">info@inficomsolutions.com</a>,
                note: 'We usually respond within 2 hours',
              },
              {
                icon: <MapPin className="w-6 h-6 text-white" />,
                title: 'Visit Our Office',
                line1: <>123 Tech Street, Suite 100</>,
                note: 'New York, NY 10001',
              },
              {
                icon: <Clock className="w-6 h-6 text-white" />,
                title: 'Business Hours',
                line1: <>Mon–Fri: 9:00 AM – 6:00 PM</>,
                note: 'Sat: 10:00 AM – 4:00 PM • Sun: Closed',
              },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 grid place-items-center w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md border border-white/15">
                  {row.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{row.title}</h3>
                  <p className="text-white/90 text-lg">{row.line1}</p>
                  <p className="text-white/70 text-sm mt-1">{row.note}</p>
                </div>
              </div>
            ))}

            {/* Quick CTAs */}
            <div className="pt-4 grid sm:grid-cols-2 gap-4">
              <a href="tel:+1234567890">
                <button
                  className="w-full py-3.5 rounded-xl font-semibold bg-white text-[#0b1220] hover:bg-gray-100 transition shadow"
                >
                  Call Now
                </button>
              </a>
              <a href="#contact-form">
                <button
                  className="w-full py-3.5 rounded-xl font-semibold border-2 border-white/80 text-white hover:bg-white hover:text-[#0b1220] transition"
                >
                  Free Consultation
                </button>
              </a>
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="relative rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 sm:p-8 overflow-hidden"
          >
            {/* subtle animated glow behind */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-3xl blur-2xl"
              style={{
                background: `radial-gradient(280px 180px at 20% 30%, ${BLUE}33, transparent 70%), radial-gradient(300px 200px at 80% 60%, ${ORANGE}33, transparent 70%)`,
              }}
              animate={{ x: [-8, 8, -6], y: [-6, 6, -6], opacity: [0.35, 0.5, 0.35] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />

            <form id="contact-form" ref={formRef} onSubmit={handleSubmit(onSubmit)} className="relative space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name</label>
                  <input
                    {...register('name')}
                    aria-invalid={!!errors.name}
                    placeholder="John Doe"
                    className={`${fieldBase} ${fieldBorder} ${fieldRing}`}
                    style={{ ['--ring' as any]: ORANGE }}
                  />
                  {errors.name && <p className={errorText}>{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    {...register('email')}
                    aria-invalid={!!errors.email}
                    placeholder="john@example.com"
                    className={`${fieldBase} ${fieldBorder} ${fieldRing}`}
                    style={{ ['--ring' as any]: ORANGE }}
                  />
                  {errors.email && <p className={errorText}>{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Phone Number</label>
                  <input
                    {...register('phone')}
                    placeholder="+1 (234) 567-890"
                    className={`${fieldBase} ${fieldBorder} ${fieldRing}`}
                    style={{ ['--ring' as any]: ORANGE }}
                  />
                  {errors.phone && <p className={errorText}>{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Service Needed</label>
                  <select
                    {...register('service')}
                    aria-invalid={!!errors.service}
                    className={`${fieldBase} ${fieldBorder} ${fieldRing}`}
                    style={{ ['--ring' as any]: ORANGE }}
                    defaultValue=""
                  >
                    <option value="" className="text-gray-900">Select a service</option>
                    <option value="web-development" className="text-gray-900">Web Development</option>
                    <option value="mobile-apps" className="text-gray-900">Mobile Apps</option>
                    <option value="cloud-solutions" className="text-gray-900">Cloud Solutions</option>
                    <option value="cybersecurity" className="text-gray-900">Cybersecurity</option>
                    <option value="custom-software" className="text-gray-900">Custom Software</option>
                    <option value="data-analytics" className="text-gray-900">Data Analytics</option>
                  </select>
                  {errors.service && <p className={errorText}>{errors.service.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  {...register('message')}
                  aria-invalid={!!errors.message}
                  placeholder="Tell us about your project requirements..."
                  className={`${fieldBase} ${fieldBorder} ${fieldRing} resize-none`}
                  style={{ ['--ring' as any]: ORANGE }}
                />
                {errors.message && <p className={errorText}>{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`group w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                  isSubmitting
                    ? 'bg-white/40 text-[#0b1220] cursor-not-allowed'
                    : 'text-white'
                }`}
                style={{
                  background: isSubmitting
                    ? undefined
                    : `linear-gradient(90deg, ${BLUE}, ${ORANGE})`,
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-white/80 border-t-transparent animate-spin" />
                    Sending…
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-3 transition-transform group-hover:translate-x-1" size={20} />
                  </>
                )}
              </button>

              {/* success toast-ish chip */}
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-center"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[#0b1220] font-semibold shadow">
                    ✅ Thank you! We’ll get back to you soon.
                  </span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
</>
}

// e.g. app/contact/page.tsx

