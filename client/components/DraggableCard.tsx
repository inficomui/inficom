'use client';

import React from "react";
import Image, { StaticImageData } from "next/image";
import { DraggableCardBody, DraggableCardContainer } from "./ui/draggable-card";

import team4 from "../public/team-4.png";
import team5 from "../public/team-5.png";
import team6 from "../public/team-6.png";
import team7 from "../public/team-7.png";

type TeamMember = {
  name: string;
  role: string;
  image: StaticImageData;
};

const members: TeamMember[] = [
  { name: "Pratibha Gaikwad", role: "Founder", image: team4 },
  { name: "Kiran Gaikwad", role: "Co-founder", image: team5 },
  { name: "Rugved Raikwar", role: "Senior Developer", image: team6 },
  { name: "Sarika Lokhande", role: "Junior Developer", image: team7 },
  { name: "Faiz", role: "Full-Stack Developer", image: team7 },
];

export function Team() {
  return (
<DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        Meet Our Amazing Team 🚀
      </p>

      {members.map((member, idx) => {
        // Spread out cards in a circular-ish layout
        const positions = [
          "top-10 left-[20%] rotate-[-5deg]",
          "top-40 left-[25%] rotate-[6deg]",
          "top-5 left-[45%] rotate-[3deg]",
          "top-32 left-[60%] rotate-[-7deg]",
          "top-20 right-[25%] rotate-[5deg]",
        ];

        return (
          <DraggableCardBody key={member.name} className={`absolute ${positions[idx % positions.length]}`}>
            <Image
              src={member.image}
              alt={member.name}
              className="pointer-events-none relative z-10 h-72 w-72 object-contain rounded-2xl shadow-lg"
            />
            <h3 className="mt-3 text-center text-xl font-bold text-neutral-200">
              {member.name}
            </h3>
            <p className="text-center text-sm text-neutral-400">{member.role}</p>
          </DraggableCardBody>
        );
      })}
    </DraggableCardContainer>
  );
}
