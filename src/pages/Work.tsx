import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";
import { SectionTitle } from "@/components/SectionTitle";
import { WORK } from "@/data/portfolio";
import type { WorkItem } from "@/data/portfolio";
import { getPerfTier } from "@/hooks/usePerf";

export function Work() {
  return (
    <div className="pt-32 md:pt-40 pb-24">
      <section className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-8">
            <SectionTitle index="01" kicker="6 dossiers · 2023 → 2026" emphasis="signal.">
              Selected work, end-to-end signal.
            </SectionTitle>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-4 md:pl-8 md:border-l hairline self-end"
          >
            <p className="text-base md:text-lg leading-snug text-pretty">
              Du schéma KiCad au déploiement industriel — chaque projet a vécu sur du hardware
              physique, traversé une chaîne RF, ou été poussé en production chez un client réel.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {WORK.map((w, i) => (
            <WorkCard key={w.slug} w={w} index={i} large={i % 3 === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}

function WorkCard({ w, index, large }: { w: WorkItem; index: number; large: boolean }) {
  const tier = getPerfTier();
  // Tilt + glare disabled on mid/low — pure CSS hover instead
  if (tier !== "high") return <FlatCard w={w} index={index} large={large} />;
  return <TiltCard w={w} index={index} large={large} />;
}

function FlatCard({ w, index, large }: { w: WorkItem; index: number; large: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative ${large ? "md:row-span-2" : ""}`}
    >
      <CardInner w={w} />
    </motion.article>
  );
}

function TiltCard({ w, index, large }: { w: WorkItem; index: number; large: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  const rotX = useTransform(sy, [-50, 50], [4, -4]);
  const rotY = useTransform(sx, [-50, 50], [-4, 4]);
  const glareX = useTransform(sx, [-50, 50], [10, 90]);
  const glareY = useTransform(sy, [-50, 50], [10, 90]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]: number[]) =>
      `radial-gradient(circle 280px at ${gx}% ${gy}%, rgba(255, 59, 31, 0.20), transparent 70%)`
  );

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - (r.left + r.width / 2));
    y.set(e.clientY - (r.top + r.height / 2));
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1400 }}
      className={`group relative ${large ? "md:row-span-2" : ""}`}
    >
      <CardInner w={w} glareBg={glareBg} />
    </motion.article>
  );
}

function CardInner({ w, glareBg }: { w: WorkItem; glareBg?: any }) {
  return (
    <ViewTransitionLink
      to={`/work/${w.slug}`}
      className="block h-full bg-ink-100 dark:bg-ink-800 border hairline p-6 md:p-10 hover:bg-ink hover:text-signal-cream dark:hover:bg-signal-cream dark:hover:text-ink relative overflow-hidden"
    >
      {glareBg && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glareBg }}
        />
      )}

      <div className="flex justify-between items-start mb-8 relative">
        <span className={`mono-label ${w.accentClass} group-hover:text-current`}>
          {w.index} / {WORK.length.toString().padStart(2, "0")}
        </span>
        <span className="mono-label text-ink-500 dark:text-ink-400 group-hover:text-current">
          {w.status}
        </span>
      </div>

      <h3 className="editorial-display text-[clamp(26px,3.4vw,52px)] leading-[0.95] tracking-tight text-balance relative">
        {w.title}
      </h3>

      <p className="text-sm md:text-base mt-4 leading-snug text-ink-700 dark:text-ink-300 group-hover:text-current text-pretty relative">
        {w.summary}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-6 relative">
        {w.stack.slice(0, 5).map((s) => (
          <span
            key={s}
            className="mono-label px-2 py-1 border hairline group-hover:border-current"
          >
            {s}
          </span>
        ))}
        {w.stack.length > 5 && (
          <span className="mono-label px-2 py-1 text-ink-500 dark:text-ink-400 group-hover:text-current">
            +{w.stack.length - 5}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t hairline group-hover:border-current relative">
        {w.metrics.map((m) => (
          <div key={m.label}>
            <div className="editorial-display text-2xl md:text-3xl leading-none">
              {m.value}
            </div>
            <div className="mono-label text-ink-500 dark:text-ink-400 mt-1 group-hover:text-current">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-baseline mt-8 relative">
        <span className="mono-label text-ink-500 dark:text-ink-400 group-hover:text-current">
          {w.year} · {w.client}
        </span>
        <ArrowUpRight
          size={20}
          className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
    </ViewTransitionLink>
  );
}
