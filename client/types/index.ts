export interface FeatureDTO {
  _id: number | string;
  title: string;
  desc: string;
  iconKey: string;

}

export interface Testimonial {
  _id: number;
  name: string;
  role: string;
  text: string;
  image: string;
  stars: number;
  size: "small" | "large";
}

export interface ServiceDTO {
  _id: number | string;
  title: string;
  iconKey: string;
  description: string;
  details?: string;
  extraDescription?: string[];
  features: string[];
  included?: string[];
  notIncluded?: string[];
  terms?: string[];
  faqs?: { q: string; a: string }[];
}

export interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  image: string;
}

export interface Post {
  _id: number | string;
  title: string;
  category: string;
  author: string;
  date: string;
  comments: number;
  rating: number;
  desc: string;
  href: string;
  image: string;
}

export interface NotificationBanner {
  id: number | string;
  message: string;
  link?: string;
  color: string;
  isActive: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}