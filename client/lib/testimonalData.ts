interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
  stars: number;
  size: "small" | "large";
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophia Martinez",
    role: "CEO, BrightTech Solutions",
    text: "Partnering with this team completely transformed our online presence. The website they built is fast, modern, and delivers an excellent user experience. We’ve seen a 40% increase in conversions since launch.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 5,
    size: "small",
  },
  {
    id: 2,
    name: "James Anderson",
    role: "Head of Marketing, EcoGrocers",
    text: "Their digital marketing strategies helped us reach new audiences. Within 3 months, our organic traffic doubled, and customer engagement skyrocketed. Professional, creative, and reliable team!",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    stars: 5,
    size: "large",
  },
  {
    id: 3,
    name: "Aisha Khan",
    role: "Founder, EduNext Academy",
    text: "The mobile app they developed for our e-learning platform is intuitive and beautifully designed. Our students love it! It’s streamlined learning for thousands of users worldwide.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    stars: 4.5,
    size: "small",
  },
  {
    id: 4,
    name: "Daniel Roberts",
    role: "CTO, FinCore Analytics",
    text: "Security was our top priority, and they delivered. Their cybersecurity solutions safeguarded our infrastructure and gave us peace of mind. The 24/7 support is outstanding.",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    stars: 5,
    size: "large",
  },
  {
    id: 5,
    name: "Emily Johnson",
    role: "Product Manager, ShopSphere",
    text: "We needed a reliable e-commerce solution and they went above and beyond. The platform is smooth, scalable, and easy to manage. Sales have grown consistently month after month.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    stars: 4.8,
    size: "large",
  },
  {
    id: 6,
    name: "Michael Chen",
    role: "Director, HealthFirst Clinics",
    text: "They developed a custom software system for our clinics that streamlined patient management. It has saved us countless hours and improved service quality for our patients.",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    stars: 5,
    size: "small",
  },
];
