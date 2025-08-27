// components/ScrollSpeedController.tsx
'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** How much faster than native. Try 1.05–1.6 */
  multiplier?: number;
  /** 0–1 decay per frame; lower = longer glide */
  friction?: number;
  /** disable on small screens to avoid touch jank */
  minWidth?: number;
};

export default function ScrollSpeedController({
  multiplier = 1.2,
  friction = 0.08,
  minWidth = 1024,
}: Props) {
  const velRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    // Respect users and weaker devices
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < minWidth;
    if (prefersReduced || small) return;

    // normalize deltas (mouse vs trackpad)
    const normalize = (e: WheelEvent) => {
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16; // line → px
      if (e.deltaMode === 2) dy *= window.innerHeight; // page → px
      return dy;
    };

    const isEditable = (el: Element | null) =>
      !!el && (el as HTMLElement).isContentEditable ||
      ['INPUT', 'TEXTAREA', 'SELECT'].includes((el?.nodeName ?? '').toUpperCase());

    // Skip if scrolling inside a nested scroll area
    const hasScrollableAncestor = (el: Element | null): boolean => {
      let node: Element | null = el;
      while (node && node !== document.body) {
        const style = window.getComputedStyle(node as HTMLElement);
        const oy = style.overflowY;
        const canScroll = (oy === 'auto' || oy === 'scroll') && (node as HTMLElement).scrollHeight > (node as HTMLElement).clientHeight;
        if (canScroll) return true;
        node = node.parentElement;
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      // Let browser handle if user interacts with inputs or nested scrollables, or modifier keys
      if (isEditable(e.target as Element)) return;
      if (hasScrollableAncestor(e.target as Element)) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      const dy = normalize(e);
      // Slightly scale trackpad small deltas too
      velRef.current += dy * multiplier;
      startLoop();
    };

    const step = () => {
      const v = velRef.current;
      if (Math.abs(v) < 0.1) {
        velRef.current = 0;
        activeRef.current = false;
        rafRef.current = null;
        return;
      }
      // Move
      window.scrollTo({ top: window.scrollY + v, behavior: 'instant' as ScrollBehavior });
      // Decay
      velRef.current = v * (1 - friction);
      rafRef.current = requestAnimationFrame(step);
    };

    const startLoop = () => {
      if (activeRef.current) return;
      activeRef.current = true;
      rafRef.current = requestAnimationFrame(step);
    };

    // passive:false so we can preventDefault
    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [multiplier, friction, minWidth]);

  return null;
}
