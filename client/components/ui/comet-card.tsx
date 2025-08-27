"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { cn } from "@/lib/utils";

export const CometCard = ({
  rotateDepth = 8,         // ↓ was 17.5
  translateDepth = 8,      // ↓ was 20
  intensity = 0.8,         // new: 0–1 multiplier to scale the effect
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  intensity?: number;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer springs (less bouncy, smaller motion)
  const mouseXSpring = useSpring(x, { stiffness: 90, damping: 18, mass: 0.8 });
  const mouseYSpring = useSpring(y, { stiffness: 90, damping: 18, mass: 0.8 });

  // Narrower input range so it never reaches extreme angles
  const inputRange = [-0.35, 0.35];

  const rotateX = useTransform(
    mouseYSpring,
    inputRange,
    [`-${rotateDepth * intensity}deg`, `${rotateDepth * intensity}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    inputRange,
    [`${rotateDepth * intensity}deg`, `-${rotateDepth * intensity}deg`]
  );

  const translateX = useTransform(
    mouseXSpring,
    inputRange,
    [`-${translateDepth * intensity}px`, `${translateDepth * intensity}px`]
  );
  const translateY = useTransform(
    mouseYSpring,
    inputRange,
    [`${translateDepth * intensity}px`, `-${translateDepth * intensity}px`]
  );

  const glareX = useTransform(mouseXSpring, inputRange, [10, 90]);
  const glareY = useTransform(mouseYSpring, inputRange, [10, 90]);

  // Subtler glare (smaller bright core + lower alpha)
  const glareBackground = useMotionTemplate`
    radial-gradient(
      circle at ${glareX}% ${glareY}%,
      rgba(255,255,255,0.5) 6%,
      rgba(255,255,255,0.25) 16%,
      rgba(255,255,255,0) 60%
    )
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={cn("perspective-distant transform-3d", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          boxShadow:
            "rgba(0,0,0,0.02) 0px 240px 80px 0px, rgba(0,0,0,0.06) 0px 120px 60px 0px, rgba(0,0,0,0.16) 0px 40px 40px 0px, rgba(0,0,0,0.18) 0px 10px 24px 0px",
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{
          scale: 1.02,  // ↓ was 1.05
          z: 20,        // ↓ was 50
          transition: { duration: 0.18 },
        }}
        className="relative rounded-2xl"
      >
        {children}

        <motion.div
          className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay"
          style={{
            background: glareBackground,
            opacity: 0.22, // ↓ was 0.6
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  );
};
