export type Post = {
  title: string;
  category: string;
  author: string;
  date: string;
  comments: number;
  rating: number; // 0–5
  desc: string;
  href: string;
  image: string; // remote or public path
};

// const BLUE = '#004AAD';
// const ORANGE = '#FF7A00';

export const posts: Post[] = [
  {
    title: 'How digital marketing can increase your profit!',
    category: 'Solution',
    author: 'Admin',
    date: 'May 02, 2025',
    comments: 2,
    rating: 5,
    desc: 'We business standard chunk ofI nibh velit auctor aliquet sollicitudin.',
    href: '/blog/how-digital-marketing-increase-profit',
    image: 'https://html.rrdevs.net/morat/assets/img/blog/post-1.jpg',
  },
  {
    title: 'We should be descriptive this business',
    category: 'Solution',
    author: 'Admin',
    date: 'May 02, 2025',
    comments: 2,
    rating: 5,
    desc: 'We business standard chunk ofI nibh velit auctor aliquet sollicitudin.',
    href: '/blog/descriptive-business',
    image: 'https://html.rrdevs.net/morat/assets/img/blog/post-2.jpg',
  },
  {
    title: 'Business rules of running web solutions',
    category: 'Solution',
    author: 'Admin',
    date: 'May 02, 2025',
    comments: 2,
    rating: 5,
    desc: 'We business standard chunk ofI nibh velit auctor aliquet sollicitudin.',
    href: '/blog/rules-of-web-solutions',
    image: 'https://html.rrdevs.net/morat/assets/img/blog/post-3.jpg',
  },
  {
    title: 'Get latest updates: best blog in business',
    category: 'Solution',
    author: 'Admin',
    date: 'May 02, 2025',
    comments: 2,
    rating: 5,
    desc: 'We business standard chunk ofI nibh velit auctor aliquet sollicitudin.',
    href: '/blog/latest-updates',
    image: 'https://html.rrdevs.net/morat/assets/img/blog/post-5.jpg',
  },
];