import { motion, useScroll, useSpring } from "framer-motion";
import { getPerfTier } from "@/hooks/usePerf";

export function ScrollProgress() {
  const tier = getPerfTier();
  const { scrollYProgress } = useScroll();
  // Cheaper on lower tiers — skip spring smoothing, use raw progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: tier === "high" ? 100 : 200,
    damping: tier === "high" ? 30 : 40,
    restDelta: 0.001,
  });

  if (tier === "low") {
    // On low tier, hide entirely — one fewer rAF chain
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-signal-red origin-left z-50"
      style={{ scaleX }}
    />
  );
}
