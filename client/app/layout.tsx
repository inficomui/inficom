
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
    title: 'InficomSolutions - Leading IT Solutions Provider',
    description: 'Transform your business with innovative technology solutions and exceptional IT services.',
    type: 'website',
    locale: 'en_US',
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