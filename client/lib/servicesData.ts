import { Code, Globe, Server, Shield, ShoppingCart, Smartphone } from "lucide-react";
// types/service.ts
export type ServiceDTO = {
  id: number | string;
  title: string;
  iconKey: string;               // <- store "Globe", "Server", etc.
  description: string;
  details?: string;
  extraDescription?: string[];
  features: string[];
  included?: string[];
  notIncluded?: string[];
  terms?: string[];
  faqs?: { q: string; a: string }[];
};

// seeds/services.local.ts (optional seed)
export const services: ServiceDTO[] = [
  {
    id: 0,
    title: "Web Development",
    iconKey: "Globe",
    description: "Custom websites that are modern, fast, and SEO-friendly.",
    details:
      "We build high-performance websites tailored to your business, using the latest technologies like React, Next.js, and TailwindCSS.",
    extraDescription: [
      "Our web development solutions ensure responsiveness, scalability, and security.",
      "From landing pages to enterprise platforms, we deliver with precision.",
    ],
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Cross-Browser Compatibility"],
    included: ["UI/UX Design", "Frontend & Backend Development", "Deployment"],
    notIncluded: ["Hosting Fees", "Third-Party Licenses"],
    terms: [
      "Clear scope & milestones shared before development.",
      "Weekly updates with demo links.",
      "Post-launch support available as an add-on.",
    ],
    faqs: [
      { q: "How long does it take?", a: "Most projects take 2-6 weeks depending on scope." },
      { q: "Do you provide hosting?", a: "We guide you with hosting; fees are separate." },
    ],
  },
  {
    id: 1,
    title: "Mobile App Development",
    iconKey: "Smartphone",
    description: "Scalable mobile apps for Android and iOS.",
    details: "We create seamless mobile applications with modern UI/UX and optimized performance.",
    features: ["Cross-Platform Development", "Push Notifications", "Offline Support"],
    included: ["App Design", "Codebase", "Basic Testing"],
    notIncluded: ["App Store Publishing Fees", "Advanced Analytics"],
    terms: [
      "Support & maintenance available as an add-on.",
      "Test builds shared frequently through TestFlight / APK.",
    ],
    faqs: [
      { q: "Which frameworks do you use?", a: "React Native and Flutter." },
      { q: "Do you publish apps?", a: "Yes, publishing fees are separate." },
    ],
  },
  {
    id: 2,
    title: "E-Commerce Solutions",
    iconKey: "ShoppingCart",
    description: "Complete online store setup with secure checkout.",
    details: "From small shops to enterprise-grade e-commerce, we build reliable platforms.",
    features: ["Product Management", "Secure Payments", "Order Tracking"],
    included: ["Store Setup", "Payment Gateway Integration", "Admin Dashboard"],
    notIncluded: ["Transaction Fees", "Premium Plugins"],
    terms: [
      "Custom features may affect delivery time.",
      "Additional costs for premium themes/plugins.",
    ],
    faqs: [
      { q: "Shopify/WooCommerce?", a: "Yes—plus custom stacks where needed." },
      { q: "Is it scalable?", a: "We ensure the store can grow with your business." },
    ],
  },
  {
    id: 3,
    title: "Cloud Hosting & Servers",
    iconKey: "Server",
    description: "Reliable cloud hosting with 99.9% uptime guarantee.",
    details: "Managed hosting with top-tier performance and security.",
    features: ["99.9% Uptime", "Scalable Resources", "DDoS Protection"],
    included: ["Server Setup", "Basic Monitoring", "SSL Certificate"],
    notIncluded: ["Domain Name", "Email Hosting"],
    terms: ["Monthly/annual subscriptions apply.", "Support limited to chosen plan."],
    faqs: [
      { q: "Do you manage servers?", a: "Yes, managed hosting is included." },
      { q: "Which providers?", a: "AWS, DigitalOcean, Google Cloud." },
    ],
  },
  {
    id: 4,
    title: "Cybersecurity Services",
    iconKey: "Shield",
    description: "Protect your business from online threats.",
    details: "Vulnerability assessments, penetration testing, and hardening.",
    features: ["Firewall Setup", "Malware Protection", "24/7 Monitoring"],
    included: ["Basic Audit", "Security Report", "Recommendations"],
    notIncluded: ["Premium Security Tools", "Hardware Firewalls"],
    terms: [
      "Assessment timeline depends on project size.",
      "Follow-up fixes are scoped separately.",
    ],
    faqs: [
      { q: "Compliance reports?", a: "Yes, we assist with GDPR/HIPAA readiness." },
      { q: "24/7 monitoring?", a: "Included in premium plans." },
    ],
  },
  {
    id: 5,
    title: "Custom Software Development",
    iconKey: "Code",
    description: "Tailored software solutions for your unique needs.",
    details: "From automation tools to enterprise software, we build systems that scale.",
    features: ["Custom Integrations", "API Development", "Scalable Architecture"],
    included: ["Source Code", "Documentation", "Basic Training"],
    notIncluded: ["Third-Party API Costs", "Hardware"],
    terms: ["NDA signed upon request.", "Ongoing maintenance billed separately."],
    faqs: [
      { q: "Do you sign NDAs?", a: "Absolutely." },
      { q: "What stacks?", a: "Commonly Node.js, React, Python—chosen per project." },
    ],
  },
];
