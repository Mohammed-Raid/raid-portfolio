import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function HeroOscilloscope() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const W = 2400;
    const H = 120;
    const steps = 480;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * W;
      const t = (i / steps) * Math.PI * 16;
      const y =
        H / 2 +
        Math.sin(t) * 26 +
        Math.sin(t * 2.7) * 8 +
        Math.sin(t * 4.1 + 1.2) * 4 +
        (Math.random() - 0.5) * 1.8;
      d += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
    }
    pathRef.current.setAttribute("d", d);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-[80px] md:h-[120px] block"
      >
        <defs>
          <linearGradient id="trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="var(--signal)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--signal)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          ref={pathRef}
          d=""
          fill="none"
          stroke="url(#trace-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        />
      </svg>
      <div className="absolute top-2 left-3 mono-label text-[9px] text-ink-500 dark:text-ink-400 flex gap-3">
        <span>CH1 · FW.SIG</span>
        <span className="text-signal-red">2.5 V/DIV</span>
        <span>100 ms/DIV</span>
      </div>
      <div className="absolute bottom-2 right-3 mono-label text-[9px] text-ink-500 dark:text-ink-400">
        TRIG ⏵ AUTO
      </div>
    </div>
  );
}
