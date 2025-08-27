'use client';

import { BLUE, CENTER, ORANGE } from '@/lib/theme';
import { motion } from 'framer-motion';

type StoryItem = {
  year: number;
  dateTop: string;
  textTop: string;
  dateBottom: string;
  textBottom: string;
};

const stories: StoryItem[] = [
  {
    year: 2020,
    dateTop: '25 March 2020',
    textTop: 'We denounce with righteous and dislike men are so beguiled.',
    dateBottom: '25 March 2020',
    textBottom: 'The journey began with bold steps and determination.',
  },
  {
    year: 2021,
    dateTop: '25 March 2021',
    textTop: 'We launched our first large-scale project and grew the team.',
    dateBottom: '25 March 2021',
    textBottom: 'New partnerships helped us expand capabilities.',
  },
  {
    year: 2022,
    dateTop: '25 March 2022',
    textTop: 'Platform revamp delivered faster performance and stability.',
    dateBottom: '25 March 2022',
    textBottom: 'Customer satisfaction hit an all-time high.',
  },
  {
    year: 2025,
    dateTop: '25 March 2025',
    textTop: 'AI-powered tooling rolled out across products.',
    dateBottom: '25 March 2025',
    textBottom: 'Going global with new regions and support.',
  },
];

export default function CompanyStory() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-bl from-[${BLUE}] via-[${CENTER}] to-[${ORANGE}]`} />
           {/* from-[#ebccb6] via-[#7e9c9e] to-[#96b8e4] */}
      {/* <div className="absolute inset-0 bg-gradient-to-bl from-[#004AAD] via-[#1C3334] to-[#b3784e]" /> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <motion.h4
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className="text-orange-400 text-xs sm:text-sm md:text-base font-medium tracking-[0.2em] uppercase"
          >
            Our Company Story
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-white text-3xl md:text-4xl font-bold"
          >
            Company Brand Story Examples
          </motion.h2>
        </div>

        {/* Timeline Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, idx) => (
            <StoryCard key={story.year} story={story} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryCard({ story, idx }: { story: StoryItem; idx: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: idx * 0.05 }}
      className="relative flex h-full flex-col rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden shadow-xl"
    >
      {/* Top content */}
      <div className="relative p-5">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-orange-400" />
          <span className="text-white/80 text-sm">{story.dateTop}</span>
        </div>
        <p className="mt-3 text-white/80 text-sm leading-relaxed">{story.textTop}</p>
        <a
          href="#"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition"
        >
          Read More
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Center year band */}
  {/* Center year band */}
<div className="relative grid place-items-center py-6 
                bg-white/10 backdrop-blur-xl border-y border-white/20 
                overflow-hidden">

  {/* Glow border effect */}
  <div className="absolute inset-0 rounded-none border-y border-white/90 
                  shadow-[inset_0_1px_8px_rgba(255,255,255,0.3)] pointer-events-none" />

  {/* Cloudy shimmer with visible blue tint */}
  <div
  className="
    absolute inset-0 animate-cloudy
    [background:
      radial-gradient(900px_500px_at_50%_50%,rgba(0,74,173,0.15),transparent 70%)
    ]
    pointer-events-none
    "
  />

  {/* Year text */}
  <h4 className="relative z-10 text-2xl md:text-3xl font-extrabold 
                 text-white drop-shadow-xl tracking-wide">
    {story.year} Years
  </h4>
</div>



      {/* Bottom content */}
      <div className="relative p-5 mt-auto">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-orange-400" />
          <span className="text-white/80 text-sm">{story.dateBottom}</span>
        </div>
        <p className="mt-3 text-white/80 text-sm leading-relaxed">{story.textBottom}</p>
        <a
          href="#"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition"
        >
          Read More
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}
