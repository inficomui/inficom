
import { store } from '@/redux/store';
import './globals.css';
import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import Providers from './Provider';


const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Inficom Solutions - Leading IT Solutions & Software Development Company',
  description: 'Transform your business with cutting-edge technology solutions. Web development, mobile apps, cloud solutions, cybersecurity & custom software development services.',
  keywords: 'IT solutions, software development, web development, mobile apps, cloud solutions, cybersecurity, custom software',
  authors: [{ name: 'InficomSolutions' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
 openGraph: {
  title: "Inficom Solutions - Leading IT Solutions & Software Development Company",
  description: "Web, mobile, cloud, cybersecurity & custom software development in Aurangabad (Chhatrapati Sambhajinagar).",
  url: "https://inficomsolutions.in",
  siteName: "Inficom Solutions",
  images: [
    {
      url: "https://inficomsolutions.in/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Inficom Solutions - IT Services",
    },
  ],
  locale: "en_IN",
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "Inficom Solutions - IT Company in Aurangabad",
  description: "Software & IT services including web, mobile, cloud, cybersecurity, and more.",
  images: ["https://inficomsolutions.in/og-image.jpg"],
  creator: "@inficomsolutio",
},
 metadataBase: new URL("https://inficomsolutions.in"),
  alternates: {
    canonical: "https://inficomsolutions.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="../favicon.ico" />
        <meta name="theme-color" content="#376E6F" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
        {/* <HoverBallLayout/> */}
        {children}
        </Providers>
      </body>
    </html>
  );
}