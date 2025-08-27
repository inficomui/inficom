"use client"

import { BLUE, CENTER, ORANGE } from "@/lib/theme";
import Image from "next/image";

export function MountLoader() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background with theme colors */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom left, ${BLUE}, ${CENTER}, ${ORANGE})`,
        }}
      />

      {/* Aurora overlay */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen">
        <div
          className="absolute inset-0 animate-[aurora_16s_ease-in-out_infinite]"
          style={{
            background: `
              radial-gradient(600px 300px at 15% 25%, rgba(255,255,255,0.18), transparent 60%),
              radial-gradient(500px 260px at 85% 70%, rgba(255,255,255,0.12), transparent 60%)
            `,
          }}
        />
      </div>

      {/* Glint overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
        <div
          className="absolute inset-0 animate-[glint_12s_ease-in-out_infinite]"
          style={{
            background: `
              radial-gradient(1.2px 1.2px at 12% 20%, #fff, transparent 55%),
              radial-gradient(1.2px 1.2px at 46% 76%, #fff, transparent 55%),
              radial-gradient(1.2px 1.2px at 80% 30%, #fff, transparent 55%),
              radial-gradient(1.2px 1.2px at 30% 88%, #fff, transparent 55%)
            `,
          }}
        />
      </div>

      {/* Loader */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="grid place-items-center h-20 w-20 rounded-2xl bg-white/10 border border-white/20 shadow-lg">
          <Image
          width={100}
          height={100}
            src="/logo.png"
            alt="Inficom Solutions"
            className="h-12 w-12 object-contain"
          />
        </div>
        <div className="h-2 w-36 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full w-1/2 bg-white/60 animate-[loaderbar_1.6s_ease-in-out_infinite]" />
        </div>
        <p className="text-white/90 text-sm tracking-wide">
          Preparing your experience…
        </p>
      </div>

      <style jsx>{`
        @keyframes aurora {
          0% {
            background-position: 0% 0%, 100% 0%;
          }
          50% {
            background-position: 30% 10%, 70% 20%;
          }
          100% {
            background-position: 0% 0%, 100% 0%;
          }
        }
        @keyframes glint {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(8px) translateY(-6px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }
        @keyframes loaderbar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}
