// components/JustdialRatingBar.tsx
"use client";
import React from "react";

type Props = {
  rating?: number;       // e.g., 4.8
  reviews?: number;      // e.g., 123815
  city?: string;         // e.g., "Aurangabad"
  verdict?: string;      // e.g., "Top-rated"
  linkHref?: string;     // link to your Justdial profile
};

const JD_BLUE = "#0A6EBE";   // Justdial blue-ish
const JD_ORANGE = "#F37321"; // Justdial orange

function StarBox({ fill = 100, size = 30 }: { fill?: number; size?: number }) {
  return (
    <div
      className="relative rounded-[4px] overflow-hidden bg-gray-200 dark:bg-white/15 shadow-sm"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Fill layer */}
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: `${Math.max(0, Math.min(100, fill))}%`,
          background: JD_ORANGE,
        }}
      />
      {/* White star glyph */}
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 m-auto"
        style={{ width: size * 0.65, height: size * 0.65 }}
      >
        <path
          d="M12 3.75l2.384 4.83 5.333.775-3.858 3.76.91 5.305L12 16.98l-4.77 2.44.91-5.305-3.858-3.76 5.333-.775L12 3.75z"
          fill="#fff"
        />
      </svg>
    </div>
  );
}

export default function JustdialRatingBar({
  rating = 4.8,
  reviews = 123815,
  city = "Aurangabad",
  verdict = "Top-rated",
  linkHref = "#",
}: Props) {
  const full = Math.floor(rating);
  const fractional = Math.round((rating - full) * 100);
  const fills = Array.from({ length: 5 }).map((_, i) => {
    if (i < full) return 100;
    if (i === full && fractional > 0) return fractional;
    return 0;
  });

  const reviewsFormatted = new Intl.NumberFormat("en-IN").format(reviews);

  return (
   <section className="w-full py-6 md:py-8">
  <div className="mx-auto max-w-6xl px-4">
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8 text-center md:text-left">
      {/* Left badge */}
      <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
        <span
          className="inline-flex items-center rounded-full px-3 py-1.5 text-sm md:text-base font-semibold text-white shadow-sm"
          style={{ backgroundColor: JD_BLUE }}
        >
          {verdict} in {city}
        </span>

        {/* “on justdial” with high-contrast chip */}
        <span className="text-base md:text-lg font-medium">
          on{" "}
          <span className="inline-flex items-center rounded-md px-2 py-1 align-middle
                           bg-white/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm
                           ring-1 ring-black/5 shadow-sm">
            <strong className="font-extrabold leading-none">
              <span style={{ color: JD_BLUE }}>just</span>
              <span style={{ color: JD_ORANGE }}>dial</span>
            </strong>
          </span>
        </span>
      </div>

      {/* Stars (slightly larger + shadow for clarity) */}
      <div className="flex items-center gap-1.5 md:gap-2">
        {fills.map((f, i) => (
          <div key={i} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            <StarBox fill={f} size={26} />
          </div>
        ))}
      </div>

      {/* Rating text */}
      <p className="text-sm md:text-lg text-slate-900/95 dark:text-slate-100">
        <span className="font-semibold">{rating.toFixed(1)}</span> / 5 based on{" "}
        <a
          href={linkHref}
          className="font-semibold underline-offset-2 hover:underline text-[color:var(--jdLink)]"
          style={{ ["--jdLink" as any]: JD_BLUE }}
        >
          {reviewsFormatted}+ reviews
        </a>
      </p>

      {/* CTA (outlined -> filled on hover; adds contrast) */}
     <a
  href={linkHref}
  className="inline-flex items-center rounded-full border px-4 py-2 text-sm md:text-base font-medium
             transition-colors duration-300 shadow-sm mt-2 md:mt-0"
  style={{
    borderColor: JD_BLUE,
    color: JD_BLUE,
    backgroundColor: "rgba(255,255,255,0.8)",
  }}
  onMouseEnter={(e) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = JD_BLUE;
    (e.currentTarget as HTMLElement).style.color = "#fff";
    (e.currentTarget as HTMLElement).style.borderColor = "transparent";
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.8)";
    (e.currentTarget as HTMLElement).style.color = JD_BLUE;
    (e.currentTarget as HTMLElement).style.borderColor = JD_BLUE;
  }}
  aria-label="View our Justdial profile"
>
  View on Justdial →
</a>

    </div>
  </div>
</section>


  );
}
