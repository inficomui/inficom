import team4 from '@/public/team-4.png';
import team5 from '@/public/team-5.png';
import team6 from '@/public/team-6.png';
import team7 from '@/public/team-7.png';
import { StaticImageData } from 'next/image';
export type TeamMember = {
  name: string;
  role: string;
  image:StaticImageData| string;
};
export const members: TeamMember[] = [
  { name: 'Pratibha Gaikwad', role: 'Founder',          image: team4 },
  { name: 'Kiran Gaikwad',    role: 'Co-founder',       image: team5 },
  { name: 'Rugved Raikwar',   role: 'Senior Developer', image: team6 },
  { name: 'Sarika Lokhande',  role: 'Junior Developer', image: team7 },
  { name: 'Kiran Gaikwad',    role: 'Co-founder',       image: team5 },
  { name: 'Rugved Raikwar',   role: 'Senior Developer', image: team6 },
];