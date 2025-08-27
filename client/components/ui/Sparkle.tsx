// components/Sparkle.tsx
export default function Sparkle({ className = "" }) {
  return (
    <svg
      className={`w-4 h-4 text-white/80 ${className}`}
      viewBox="0 0 24 24" fill="none" aria-hidden
    >
      <path d="M12 2l1.6 4.3L18 8l-4.4 1.7L12 14l-1.6-4.3L6 8l4.4-1.7L12 2z"
        className="animate-sparkle" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
