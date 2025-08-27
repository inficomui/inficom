'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import authorImg from "../public/about-author-2 (1).jpg";
import aboutImg from "../public/about-img-5.png";
import ctaBg from "../public/cta-info-bg-2.png";
import ctaIcon from "../public/cta-icon.png";
import { BLUE, CENTER, ORANGE } from '@/lib/theme';
// import { BLUE, CENTER, ORANGE } from '@/app/page';

const features = [
  "We are revolutionary",
  "Software solution",
  "Video Dedicated Support",
  "Business Team Support",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // stagger list items
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 20 } // spring is valid
  },
};
export default function AboutSection() {
  const counters = [
    { label: 'Complete Projects', value: 2683, suffix: 'k+' },
  ];

  const skills = [
    { label: 'Development', value: 73 },
  ];

  return (
 // About Section
<section className="relative text-white overflow-hidden">
    {/* <div className="absolute inset-0 bg-gradient-to-bl from-[#b3784e] via-[#1C3334] to-[#004AAD]" /> */}
    {/* <div className="absolute inset-0 bg-gradient-to-bl from-[#004AAD] via-[#1C3334] to-[#b3784e]" /> */}
    {/* from-[#ebccb6] via-[#7e9c9e] to-[#96b8e4] */}
    {/* <div className={`absolute inset-0 bg-gradient-to-bl from-[#96b8e4] via-[#7e9c9e] to-[#ebccb6]`} /> */}
    <div className={`absolute inset-0 bg-gradient-to-bl from-[${BLUE}] via-[${CENTER}] to-[${ORANGE}]`} />

      <div className="relative container mx-auto px-4 py-20">
        <div className="lg:flex lg:gap-12 items-center">
          {/* Left Image + Counter */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute top-4 left-4 p-6 bg-teal-600/20 rounded-lg flex items-center gap-4 backdrop-blur-md"
              >
                <div className="text-3xl">
                  <i className="fa-sharp fa-light fa-circle-check"></i>
                </div>
                {counters.map((counter) => (
                  <div key={counter.label}>
                    <h3 className="text-2xl font-bold">
                      {counter.value}
                      {counter.suffix}
                    </h3>
                    <span>{counter.label}</span>
                  </div>
                ))}
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  <Image src={authorImg} alt="author" className="object-cover" />
                </div>
              </motion.div>
              <Image src={aboutImg} alt="About" className="rounded-xl shadow-lg" />
            </div>
          </div>

          {/* Right Info */}
      <div className="lg:w-1/2 mt-12 lg:mt-0">
  <motion.div
    initial={{ x: 50, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="space-y-6"
  >
    {/* Small heading now orange */}
    <h4 className="text-orange-400 font-medium">Our About Us</h4>

    <h2 className="text-2xl md:text:4xl font-bold">
      Complete Managing About Software Business
    </h2>
    <p className="text-gray-300 text-sm md:text-md">
      We provide end-to-end software solutions to manage and grow your business. From planning to deployment, we handle every aspect of your software needs.
    </p>

    {/* Features list */}
    <motion.ul
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {features.map((text, idx) => (
        <motion.li
          key={idx}
          variants={itemVariants}
          className="flex items-center gap-3 bg-white/10 p-3 rounded-lg shadow-md hover:bg-orange-500/20 cursor-pointer transform transition hover:scale-105"
        >
          <i className="fa-solid fa-circle-check text-blue-400 text-xl"></i>
          <span className="text-white font-medium">{text}</span>
        </motion.li>
      ))}
    </motion.ul>

    {/* Skill bars */}
  <div className="mt-6 space-y-4">
  {skills.map((skill) => (
    <div key={skill.label}>
      <div className="flex justify-between mb-1 text-xs sm:text-sm md:text-base">
        <h4 className="font-medium">{skill.label}</h4>
        <span>{skill.value}%</span>
      </div>

      <div className="w-full h-2 sm:h-2.5 md:h-3 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.value}%` }}
          transition={{ duration: 1.5 }}
          className="relative h-2 sm:h-2.5 md:h-3 bg-blue-500"
        >
          <div className="absolute -right-1.5 sm:-right-2 -top-1 sm:-top-1.5 
                          w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 
                          bg-orange-400 rounded-full animate-pulse">
          </div>
        </motion.div>
      </div>
    </div>
  ))}
</div>


    {/* Button */}
    <a
      href="about.html"
      className="inline-block mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 font-medium transition rounded-lg"
    >
      About More
    </a>
  </motion.div>
</div>

        </div>
      </div>

      {/* CTA */}
<div
  className="mt-2 relative bg-cover bg-center py-3 md:py-14 px-5 flex flex-col md:flex-row items-center justify-between rounded-full shadow-lg max-w-5xl mx-auto"
  style={{ backgroundImage: `url(${ctaBg.src})` }}
>
  <div className="flex items-center gap-3 md:gap-4">
    <Image
      src={ctaIcon}
      alt="CTA Icon"
      width={50}
      height={50}
      className="object-cover"
    />
    <div>
      <h3 className="text-md md:text-xl font-semibold">
        Try Our Free Support Solution
      </h3>
      <p className="text-xs md:text-base mt-1 text-gray-100">
        Digital Conference Call:{" "}
        <a
          href="tel:+918888795875"
          className="text-orange-400 font-medium hover:text-orange-300"
        >
          +91 8888795875
        </a>
      </p>
    </div>
  </div>

  <a
    href="contact.html"
    className="mt-3 md:mt-0 px-4 py-1 md:px-6 md:py-2.5 bg-blue-600 hover:bg-blue-700 font-medium text-sm md:text-base transition-all rounded-full shadow-md text-white"
  >
    Contact Now
  </a>
</div>



    </section>
  );
}
