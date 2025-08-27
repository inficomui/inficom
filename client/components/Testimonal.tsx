"use client";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image, { StaticImageData } from "next/image";
import  logo from "@/public/logo.png";
import { GlareCard } from "./ui/glare-card";
import { BLUE, CENTER, ORANGE } from '@/lib/theme';
import { testimonials  } from "@/lib/testimonalData";
import { useGetTestimonialQuery, useGetTestimonialsQuery } from "@/redux/apis/testimonialsApi";

// Import Swiper styles


export default function MultiCarousel() {
  const {data}= useGetTestimonialsQuery()
 
  
  return (
    <section className="relative py-24 overflow-hidden">
    {/* Gradient Background */}
  <div className={`absolute inset-0 bg-gradient-to-br from-[${ORANGE}] via-[${CENTER}] to-[${BLUE}]`} />
    {/* from-[#ebccb6] via-[#7e9c9e] to-[#96b8e4] */}
  {/* <div className="absolute inset-0 bg-gradient-to-br from-[#b3784e] via-[#1C3334] to-[#004AAD]" /> */}
  {/* <div className="absolute inset-0 bg-gradient-to-bl from-[#004AAD] via-[#1C3334] to-[#b3784e]" /> */}

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="text-center mb-16">
        <h4 className="text-teal-400 text-sm md:text-base font-medium uppercase mb-3 tracking-wider">
          Our Testimonial Say
        </h4>
        <h2 className="text-white text-3xl md:text-4xl font-bold leading-snug">
          What Clients Say About Our Digital Services
        </h2>
      </div>

      {/* Swiper Carousel */}
<Swiper
  modules={[Navigation, Pagination, A11y]}
  spaceBetween={30}
  loop={true}
  grabCursor={true}
  pagination={{
    clickable: true,
    el: '.swiper-pagination',
  }}
  centeredSlides={true}
  breakpoints={{
    0: { slidesPerView: "auto" },
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  className="!flex justify-center pb-12" // 👈 add padding bottom for space
>
  {data && data.map((testimonial) => (
    <SwiperSlide
      key={testimonial._id}
      className="!flex justify-center !w-auto"  // ✅ force center + no full width
    >
      <GlareCard
        className="flex flex-col justify-between p-6 md:p-8 
        rounded-3xl shadow-xl transition hover:scale-[1.03] duration-300 
        bg-white/10  max-w-xs w-full"
      >
        {/* Stars Rating */}
        <div className="flex items-center gap-2 mb-4">
          <ul className="flex text-orange-400 text-lg">
            {Array.from({ length: 5 }).map((_, i) => {
              const full = i < Math.floor(testimonial.stars);
              const half = i === Math.floor(testimonial.stars) && testimonial.stars % 1 !== 0;

              return (
                <li key={i}>
                  {full ? (
                    <FaStar />
                  ) : half ? (
                    <FaStarHalfAlt />
                  ) : (
                    <FaRegStar className="text-gray-500" />
                  )}
                </li>
              );
            })}
          </ul>
          <span className="text-gray-300 text-sm">
            ({testimonial.stars.toFixed(1)} / 5)
          </span>
        </div>

        {/* Quote */}
        <div className="text-orange-400 text-4xl mb-4">
          <i className="fas fa-quote-left"></i>
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-200 text-base mb-6">{testimonial.text}</p>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <Image
           src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${testimonial.image}`}
            // src={testimonial.image}
            alt={testimonial.name}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div>
            <h3 className="text-white font-semibold">{testimonial.name}</h3>
            <span className="text-black font-semibold text-sm">{testimonial.role}</span>
          </div>
        </div>

        {/* Decorative Shape */}
        
      </GlareCard>
    </SwiperSlide>
  ))}
</Swiper>


    </div>
  </section>

  );
}
