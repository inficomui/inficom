"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState, useId } from "react";
import { IconArrowNarrowRight } from "@tabler/icons-react";

type TeamMember = {
  name: string;
  role: string;
  image: StaticImageData | string;
};

function MemberCard({ m }: { m: TeamMember }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center text-white">
      <div className="mx-auto h-36 w-36 sm:h-40 sm:w-40 rounded-lg overflow-hidden bg-black/20">
        {typeof m.image === "string" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={m.image} alt={m.name} className="h-full w-full object-contain" />
        ) : (
          <Image
            src={m.image}
            alt={m.name}
            width={256}
            height={256}
            className="h-full w-full object-contain"
            priority={false}
          />
        )}
      </div>
      <h3 className="mt-3 text-base sm:text-lg font-semibold">{m.name}</h3>
      <p className="text-xs sm:text-sm text-white/70">{m.role}</p>
    </div>
  );
}

const ArrowBtn = ({
  dir,
  onClick,
  title,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  title: string;
}) => (
  <button
    className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center mx-2 rounded-full bg-white/15 border border-white/20 text-white hover:bg-white/25 transition ${dir === "prev" ? "rotate-180" : ""}`}
    onClick={onClick}
    title={title}
    aria-label={title}
  >
    <IconArrowNarrowRight size={18} />
  </button>
);

/** Decide how many cards per page based on viewport (1 / 2 / 4) */
function usePerPage() {
  const [perPage, setPerPage] = useState(1);
  useEffect(() => {
    const mq2 = window.matchMedia("(min-width: 640px)");  // >= sm -> 2
    const mq4 = window.matchMedia("(min-width: 1024px)"); // >= lg -> 4
    const update = () => setPerPage(mq4.matches ? 4 : mq2.matches ? 2 : 1);
    update();
    mq2.addEventListener("change", update);
    mq4.addEventListener("change", update);
    return () => {
      mq2.removeEventListener("change", update);
      mq4.removeEventListener("change", update);
    };
  }, []);
  return perPage;
}

export function TeamCarousel({ members }: { members: TeamMember[] }) {
  const id = useId();
  const perPage = usePerPage();

  // Split members into pages of size "perPage"
  const pages = useMemo(() => {
    const chunks: TeamMember[][] = [];
    if (!members?.length) return chunks;
    for (let i = 0; i < members.length; i += perPage) {
      chunks.push(members.slice(i, i + perPage));
    }
    return chunks;
  }, [members, perPage]);

  const [page, setPage] = useState(0);
  useEffect(() => {
    // if perPage changes (resize), clamp page
    setPage((p) => Math.min(p, Math.max(0, pages.length - 1)));
  }, [pages.length]);

  if (!members?.length) return null;

  const total = pages.length || 1;
  const prev = () => setPage((p) => (p - 1 + total) % total);
  const next = () => setPage((p) => (p + 1) % total);
  const go = (i: number) => setPage(i);

  return (
    <div className="relative mx-auto w-full max-w-5xl" aria-labelledby={`team-carousel-${id}`}>
      {/* Track (each page = 100% width) */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${page * 100}%)`, width: `${total * 100}%` }}
        >
          {pages.map((group, idx) => (
            <div key={idx} className="w-full shrink-0 px-1">
              <div
                className={
                  perPage === 4
                    ? "grid grid-cols-4 gap-4 sm:gap-6"
                    : perPage === 2
                    ? "grid grid-cols-2 gap-4 sm:gap-6"
                    : "grid grid-cols-1 gap-4 sm:gap-6"
                }
              >
                {group.map((m) => (
                  <MemberCard key={`${m.name}-${m.role}`} m={m} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {total > 1 && (
        <>
          <div className="mt-5 flex items-center justify-center">
            <ArrowBtn dir="prev" onClick={prev} title="Previous" />
            <ArrowBtn dir="next" onClick={next} title="Next" />
          </div>

          {/* Dots */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  page === i
                    ? "w-6 bg-gradient-to-r from-[#004AAD] to-[#FF7A00]"
                    : "w-2.5 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
