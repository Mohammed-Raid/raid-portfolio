import { useEffect, useRef } from "react";
import { getPerfTier } from "@/hooks/usePerf";

export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skip entirely on low/mid devices — biggest single perf win
    const tier = getPerfTier();
    if (tier !== "high") return;

    const el = ref.current;
    if (!el) return;

    let mx = -100;
    let my = -100;
    let x = -100;
    let y = -100;
    let rafId = 0;
    let activated = false;
    let lastInteractive = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!activated) {
        el.classList.add("active");
        activated = true;
      }
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [data-cursor='hover'], .interactive, input, textarea") !== null;
      if (isInteractive !== lastInteractive) {
        el.classList.toggle("hover", isInteractive);
        lastInteractive = isInteractive;
      }
    };

    const onLeave = () => {
      el.classList.remove("active");
      activated = false;
    };

    const tick = () => {
      const dx = mx - x;
      const dy = my - y;
      // Skip update if we're already at rest — saves frames
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        x = lerp(x, mx, 0.18);
        y = lerp(y, my, 0.18);
        el.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={ref} className="cursor-follow" aria-hidden="true" />;
}
