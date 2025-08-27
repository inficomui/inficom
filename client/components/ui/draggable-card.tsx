"use client";
import React, { useRef, useContext, createContext } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

/* ---------- Context to share container ref ---------- */
const DragConstraintsCtx = createContext<React.RefObject<HTMLDivElement> | null>(null);

/* ---------- Card Body (draggable, constrained to container) ---------- */
export const DraggableCardBody = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useContext(DragConstraintsCtx); // <-- parent container

  const spring = { stiffness: 100, damping: 20, mass: 0.5 };

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [ 25, -25]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-25,  25]), spring);
  const opacity  = useSpring(useTransform(mouseX, [-300, 0, 300], [0.9, 1, 0.9]), spring);
  const glareOpacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.18, 0, 0.18]), spring);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraintsRef!}  // ✅ stay within container
      dragElastic={0.2}
      dragMomentum={false}
      onDragStart={() => (document.body.style.cursor = "grabbing")}
      onDragEnd={() => (document.body.style.cursor = "default")}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, opacity, willChange: "transform" }}
      className={cn(
        "relative min-h-96 w-80 overflow-hidden rounded-md bg-neutral-100 p-6 shadow-2xl transform-3d",
        "cursor-grab active:cursor-grabbing dark:bg-neutral-900",
        className
      )}
    >
      {children}

      {/* soft glare layer */}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 bg-white/40 select-none mix-blend-overlay"
      />
    </motion.div>
  );
};

/* ---------- Card Container (provides constraints) ---------- */
export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <DragConstraintsCtx.Provider value={ref}>
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden [perspective:3000px]", // ✅ overflow-hidden keeps bounds visible
          "touch-none", // better drag on touch devices
          className
        )}
      >
        {children}
      </div>
    </DragConstraintsCtx.Provider>
  );
};
