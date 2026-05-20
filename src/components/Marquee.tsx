import { motion, useScroll, useTransform, useMotionValue, MotionValue } from "framer-motion";
import { useRef } from "react";
import { getPerfTier } from "@/hooks/usePerf";

type Props = {
  items: string[];
  speed?: "fast" | "slow";
  separator?: string;
  reverse?: boolean;
  velocity?: MotionValue<number>;
};

export function Marquee({ items, speed = "slow", separator = "✦", reverse = false, velocity }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const tier = getPerfTier();
  const enableEffects = tier === "high";

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xBase = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? ["-15%", "15%"] : ["15%", "-15%"]
  );

  const fallback = useMotionValue(0);
  const source = enableEffects && velocity ? velocity : fallback;
  const skewVal = useTransform(source, (v) => v * (reverse ? -0.6 : 0.6));
  const skewTransform = useTransform(skewVal, (v) => `skewX(${v}deg)`);

  // Repeat fewer copies on low/mid (less DOM and paint work)
  const repeat = tier === "low" ? 2 : tier === "mid" ? 2 : 3;
  const repeated = Array.from({ length: repeat }, () => items).flat();

  return (
    <div ref={ref} className="overflow-hidden whitespace-nowrap py-4 select-none">
      <motion.div
        style={enableEffects ? { x: xBase } : undefined}
        className={`flex items-center gap-10 ${
          speed === "fast" ? "animate-marquee" : "animate-marquee-slow"
        }`}
      >
        {repeated.map((it, i) => (
          <span key={i} className="flex items-center gap-10 shrink-0">
            <motion.span
              style={enableEffects ? { transform: skewTransform } : undefined}
              className="editorial-display text-[clamp(48px,10vw,160px)] leading-none tracking-mega inline-block"
            >
              {it}
            </motion.span>
            <span className="editorial-display italic text-signal-red text-[clamp(48px,10vw,160px)] leading-none">
              {separator}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
