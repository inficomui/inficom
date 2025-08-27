import dynamic from 'next/dynamic';
const BookingForm = dynamic(() => import('@/components/ContactForm'), { ssr: false });

export default function Page() {
  return <BookingForm defaultService="Web Development" />;
}
