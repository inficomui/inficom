'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Header from './Header';
import ReCAPTCHA from "react-google-recaptcha";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

// console.log("RECAPTCHA_SITE_KEY: ", RECAPTCHA_SITE_KEY );

import {
  Modal,
  ModalBody,
    useModal,
} from "@/components/ui/animated-model"
import { VerifyOtpModalContent } from './mini/OtpModel';
import { Button } from './ui/stateful-button';
import { useGetServiceQuery, useGetServicesQuery } from '@/redux/apis/servicesApi';
import { useParams, useSearchParams } from 'next/navigation';
import { BLUE, CENTER, ORANGE } from '@/lib/theme';
// import { ReadonlyURLSearchParams } from 'next/navigation';






const THIS_BLUE = '#004AAD';
const THIS_ORANGE = '#FF7A00';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string; // HTML date input returns string
  time: string; // HTML time input returns string
  message: string;
  agree: boolean;
};

const schema = yup
  .object({
    name: yup.string().trim().min(2, 'Please enter your full name.').required('Full name is required.'),
    email: yup.string().trim().email('Enter a valid email.').required('Email is required.'),
    phone: yup
      .string()
      .trim()
      .matches(/^[0-9+\-() ]*$/, 'Only digits and + - ( ) are allowed.')
      .optional()
      .required(),
    service: yup.string().trim().required('Please select a service.'),
    date: yup.string().required('Choose a date.'),
    time: yup.string().required('Choose a time.'),
    message: yup.string().trim().min(10, 'Tell us a bit more (min 10 chars).').required('Message is required.'),
    agree: yup.boolean().oneOf([true], 'You must accept the terms.').required(),
  })
  .required();

const SERVICES = [
  'Web Development',
  'Mobile Apps',
  'Cloud Solutions',
  'Cybersecurity',
  'Custom Software',
  'Data Analytics',
];

export default function BookingForm({
  defaultService,
  className = '',
}: {
  defaultService?: string;
  className?: string;
}) {
const searchParams = useSearchParams();
const id = searchParams?.get("id") ?? "";
 
  

    const { data} = useGetServiceQuery(id);
    // console.log("data from form ", data);
    
  const [submitted, setSubmitted] = useState(false);
const [captchaToken, setCaptchaToken] = useState<string | null>(null);
const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting,isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: data && data.title || '',
      date: '',
      time: '',
      message: '',
      agree: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
// console.log("for data ", data);

    reset({ ...data, message: '', agree: false }); // keep some fields if you like
  };
 
  const handleClick = async () => {
  if (!isValid) {
    alert("Please fill the form");
    return;
  }
  if (!captchaToken) {
    alert("Please complete the captcha");
    return;
  }

  // verify token server-side
  const res = await fetch("/api/verify-recaptcha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: captchaToken }),
  });

  const data = await res.json();
  if (!data.success) {
    alert("Captcha verification failed. Please try again.");
    recaptchaRef.current?.reset();
    setCaptchaToken(null);
    return;
  }

  // ✅ captcha ok — proceed (e.g., open OTP modal or submit)
  return new Promise((resolve) => setTimeout(resolve, 4000));
};

  return <Modal>
  <Header/>
    <section className={`relative py-24 sm:py-28 ${className} overflow-hidden`} >
      {/* Page bg in your theme */}
      {/* <div className="absolute inset-0 bg-[#1c1e34]" /> */}
          <div className={`absolute inset-0 bg-gradient-to-bl from-[${BLUE}] via-[${CENTER}] to-[${ORANGE}]`} />
      
      {/* soft blue/orange glows */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-[#004AAD]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-[#FF7A00]/25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
            Book a slot
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Schedule Your Consultation</h2>
          <p className="mt-2 text-white/70">
            Pick a time that works for you. We’ll confirm and send a calendar invite.
          </p>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
       {/* animated shimmer line */}
        <motion.div 
              aria-hidden 
              className="absolute left-0 top-0 h-[2px] w-full" 
              style={{ background: `linear-gradient(90deg, ${BLUE}, ${ORANGE})` }} 
              initial={{ x: '-100%' }} 
              animate={{ x: '100%' }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }} 
        />
        
<motion.div
  aria-hidden
  className="absolute right-0 top-0 h-full w-[2px]"
  style={{ background: `linear-gradient(180deg, ${BLUE}, ${ORANGE})` }}
  initial={{ y: "-100%" }}
  animate={{ y: "100%" }}
  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.6 }}
/>

<motion.div
  aria-hidden
  className="absolute bottom-0 left-0 h-[2px] w-full"
  style={{ background: `linear-gradient(270deg, ${BLUE}, ${ORANGE})` }}
  initial={{ x: "100%" }}
  animate={{ x: "-100%" }}
  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.2 }}
/>

<motion.div
  aria-hidden
  className="absolute left-0 top-0 h-full w-[2px]"
  style={{ background: `linear-gradient(0deg, ${BLUE}, ${ORANGE})` }}
  initial={{ y: "100%" }}
  animate={{ y: "-100%" }}
  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.8 }}
/>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            {/* Form */}
         <form
  onSubmit={handleSubmit(onSubmit)}
  className="lg:col-span-7 space-y-5 sm:space-y-6 w-full max-w-[520px] mx-auto sm:max-w-none"
>
  {/* Row 1 */}
  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
    <div>
      <label className="block text-white/90 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
        Full Name
      </label>
     <input
  {...register('name')}
  placeholder="John Doe"
  className="w-full rounded-lg bg-white/10 border border-white/20
             px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base
             text-white placeholder-white/60 
             outline-none focus:outline-none focus:border-blue-600"
/>

      {errors.name && (
        <p className="mt-1 text-xs sm:text-sm text-red-300">{errors.name.message}</p>
      )}
    </div>
    <div>
      <label className="block text-white/90 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
        Email
      </label>
      <input
        type="email"
        {...register('email')}
        placeholder="john@example.com"
        className="w-full rounded-lg bg-white/10 border border-white/20
                   px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base
                   text-white placeholder-white/60 outline-none focus:border-white/50"
      />
      {errors.email && (
        <p className="mt-1 text-xs sm:text-sm text-red-300">{errors.email.message}</p>
      )}
    </div>
  </div>

  {/* Row 2 */}
  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
    <div>
      <label className="block text-white/90 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
        Phone 
      </label>
      <input
        {...register('phone')}
        placeholder="+1 234 567 890"
        className="w-full rounded-lg bg-white/10 border border-white/20
                   px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base
                   text-white"
      />
      {errors.phone && (
        <p className="mt-1 text-xs sm:text-sm text-red-300">{errors.phone.message}</p>
      )}
    </div>
    <div>
      <label className="block text-white/90 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
        Service
      </label>
     {/* Show the service title as plain text */}
<p className="w-full rounded-lg bg-white/10 border border-white/20
              px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base
              text-white">
  {data?.title}
</p>

{/* Hidden input so it's still submitted with the form */}
<input
  type="hidden"
  value={data?.title || ""}
  {...register("service")}
/>

      {errors.service && (
        <p className="mt-1 text-xs sm:text-sm text-red-300">{errors.service.message}</p>
      )}
    </div>
  </div>

  {/* Row 3 */}
  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
    <div>
      <label className="block text-white/90 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
        Preferred Date
      </label>
      <input
        type="date"
        {...register('date')}
        className="w-full rounded-lg bg-white/10 border border-white/20
                   px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base
                   text-white outline-none focus:border-white/50"
      />
      {errors.date && (
        <p className="mt-1 text-xs sm:text-sm text-red-300">{errors.date.message}</p>
      )}
    </div>
    <div>
      <label className="block text-white/90 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
        Preferred Time
      </label>
      <input
        type="time"
        {...register('time')}
        className="w-full rounded-lg bg-white/10 border border-white/20
                   px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base
                   text-white outline-none focus:border-white/50"
      />
      {errors.time && (
        <p className="mt-1 text-xs sm:text-sm text-red-300">{errors.time.message}</p>
      )}
    </div>
  </div>

  {/* Message */}
  <div>
    <label className="block text-white/90 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
      Project Details
    </label>
    <textarea
      rows={4}
      {...register('message')}
      placeholder="Tell us about your goals, timeline, budget range, and any must-have features…"
      className="w-full rounded-lg bg-white/10 border border-white/20
                 px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base
                 text-white placeholder-white/60 outline-none focus:border-white/50 resize-none"
    />
    {errors.message && (
      <p className="mt-1 text-xs sm:text-sm text-red-300">{errors.message.message}</p>
    )}
  </div>

  {/* Terms */}
  <label className="flex items-start gap-3 text-white/80">
    <input
      type="checkbox"
      {...register('agree')}
      className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/10 accent-[#FF7A00]"
    />
    <span className="text-xs sm:text-sm">
      I agree to the{' '}
      <a href="/terms" className="underline decoration-dotted hover:text-white">Terms & Conditions</a>{' '}
      and consent to be contacted.
    </span>
  </label>
  {errors.agree && (
    <p className="text-xs sm:text-sm text-red-300">{errors.agree.message}</p>
  )}

  {/* Submit */}
  <div className="pt-1.5 sm:pt-2">
      <div className="mb-3">
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={RECAPTCHA_SITE_KEY}
      onChange={(token:any) => setCaptchaToken(token)}
      theme="light"            // or "dark" to match your UI
      size="normal"            // "compact" for tight spaces
    />
  </div>

  <Button onClick={handleClick}>Send message</Button>

    {submitted && (
      <p className="mt-3 text-xs sm:text-sm text-green-300">
        Thanks! We’ve received your request and will confirm your slot shortly.
      </p>
    )}
  </div>
</form>


            {/* Right Side – Info / Perks */}
            <div className="lg:col-span-5">
              <div className="h-full rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-white font-semibold text-lg">What happens next?</h3>
                <ul className="mt-3 space-y-3 text-white/80">
                  {[
                    'We review your details and check availability.',
                    'You get a confirmation + calendar invite.',
                    'We join the call and scope your goals.',
                    'You receive a plan & next steps within 24h.',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-[7px] h-2 w-2 rounded-full" style={{ background: ORANGE }} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="text-white font-medium">Why book with us?</h4>
                  <ul className="mt-2 grid sm:grid-cols-2 gap-2 text-sm text-white/75">
                    <li>• Senior engineers</li>
                    <li>• Clear milestones</li>
                    <li>• Fast responses</li>
                    <li>• Security best practices</li>
                  </ul>
                </div>

                <div className="mt-6 text-white/70 text-sm">
                  By booking you agree to our{' '}
                  <a href="/privacy" className="underline decoration-dotted hover:text-white">
                    Privacy Policy
                  </a>
                  .
                </div>
  



{/* model start */}

       <div className="py-40  flex items-center justify-center t-24">
          <>
             
 <ModalBody>
      <VerifyOtpModalContent
        title="Inficom Solutions"
        subtitle="Enter the 6-digit OTP sent to your number/email."
        length={6}
        onVerify={async (code) => {
          // TODO: call your API; return true/false
          // const res = await fetch('/api/verify-otp', { method:'POST', body: JSON.stringify({ code })});
          // return res.ok;
          return code === "123456"; // demo
        }}
        onResend={async () => {
          // TODO: call your resend API
          // await fetch('/api/send-otp', { method:'POST' })
        }}
      />
    </ModalBody>
            </>
          </div>
          {/* modelendstart */}
              </div>
            </div>
          </div>
        </div>
      </div> 




    </section>
</Modal>
}


