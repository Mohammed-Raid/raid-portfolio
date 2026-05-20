import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Circle } from "lucide-react";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";
import { SectionTitle } from "@/components/SectionTitle";
import { Marquee } from "@/components/Marquee";
import { Magnetic } from "@/components/Magnetic";
import { HeroOscilloscope } from "@/components/HeroOscilloscope";
import { KineticText } from "@/components/KineticText";
import { RollingNumber } from "@/components/RollingNumber";
import { WORK, CONTACT } from "@/data/portfolio";
import { getPerfTier } from "@/hooks/usePerf";

export function Home() {
  const tier = getPerfTier();
  const heavyEffects = tier === "high";

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  // Always create the transforms, but only apply on high tier
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Velocity must always be called for hook order — but pass undefined if not used
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col justify-between pt-32 md:pt-40 pb-12 overflow-hidden"
      >
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-12 md:mb-20"
          >
            <span className="flex items-center gap-2 mono-label">
              {heavyEffects ? (
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  <Circle size={6} className="fill-signal-red text-signal-red" />
                </motion.span>
              ) : (
                <Circle size={6} className="fill-signal-red text-signal-red" />
              )}
              Disponible · Alternance · Sept. 2026
            </span>
            <span className="hidden sm:block mono-label text-ink-500 dark:text-ink-400">
              Grenoble · Chambéry · Annecy
            </span>
            {heavyEffects && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="ml-auto hidden md:flex items-center gap-2 mono-label text-ink-500 dark:text-ink-400"
              >
                <span>SCROLL</span>
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.span>
              </motion.span>
            )}
          </motion.div>

          <motion.div
            style={
              heavyEffects ? { y: heroY, opacity: heroOpacity, scale: heroScale } : undefined
            }
          >
            <h1
              className="editorial-display text-[clamp(56px,15vw,260px)] leading-[0.84] tracking-mega text-balance"
              style={{ viewTransitionName: "hero-title" }}
            >
              {["Embedded", "engineer", "—", "signal"].map((w, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.18em] last:mr-0">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {w === "—" ? <span className="text-signal-red">—</span> : w}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden mr-[0.18em]">
                <motion.span
                  className="inline-block italic"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  craftsman.
                </motion.span>
              </span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-12 gap-y-8 gap-x-6 mt-16 md:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 md:col-span-6 lg:col-span-5"
            >
              <p className="text-lg md:text-xl leading-snug text-pretty">
                Mohamed Raid Abadou — M2 ESET à l'Université Savoie Mont Blanc. Je conçois du firmware
                temps-réel, des nœuds IoT, des chaînes RF et de la vision embarquée — du schéma KiCad
                au déploiement terrain industriel.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Magnetic>
                  <ViewTransitionLink
                    to="/work"
                    className="inline-flex items-center gap-3 px-5 py-3 bg-signal-red text-signal-cream mono-label hover:bg-ink dark:hover:bg-signal-cream dark:hover:text-ink"
                  >
                    Voir les projets <ArrowUpRight size={14} />
                  </ViewTransitionLink>
                </Magnetic>
                <Magnetic>
                  <ViewTransitionLink
                    to="/contact"
                    className="inline-flex items-center gap-3 px-5 py-3 border hairline mono-label hover:bg-ink hover:text-signal-cream dark:hover:bg-signal-cream dark:hover:text-ink"
                  >
                    Open channel
                  </ViewTransitionLink>
                </Magnetic>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 md:col-span-6 lg:col-span-7 lg:pl-12 lg:border-l hairline grid grid-cols-2 sm:grid-cols-4 gap-y-6"
            >
              {[
                { l: "Focus", v: "Firmware · AI", s: "FreeRTOS · ESP32 · Edge" },
                { l: "Zone", v: "GRE · CMB · LYO", s: "Auvergne-Rhône-Alpes" },
                { l: "Langues", v: "AR · FR · EN", s: "Natif · B2 · C1+" },
                { l: "Degree", v: "M2 ESET ’26", s: "Univ. Savoie Mont Blanc" },
              ].map((m, i) => (
                <motion.div
                  key={m.l}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mono-label text-ink-500 dark:text-ink-400">{m.l}</div>
                  <div className="editorial-display text-2xl md:text-3xl mt-1 leading-none">
                    {m.v}
                  </div>
                  <div className="mono-label text-ink-500 dark:text-ink-400 mt-1 normal-case">
                    {m.s}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Oscilloscope — keep but it's a one-shot draw */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12 mt-12 relative z-10"
        >
          <div className="border-t hairline pt-4">
            <HeroOscilloscope />
          </div>
        </motion.div>
      </section>

      <Marquee
        items={["Firmware temps-réel", "IoT", "RF", "DSP signal", "AI · edge", "Hardware"]}
        separator="✦"
        velocity={heavyEffects ? velocityFactor : undefined}
      />

      <section className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12 py-24 md:py-40">
        <div className="grid grid-cols-12 gap-y-10 gap-x-6">
          <div className="col-span-12 md:col-span-3">
            <div className="sticky top-32">
              <div className="mono-label text-signal-red mb-2">§ 01 — Manifesto</div>
              <div className="mono-label text-ink-500 dark:text-ink-400">What I work on</div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <KineticText
              emphasis="unseen"
              className="editorial-display text-[clamp(28px,4vw,56px)] leading-[1.05] tracking-tight text-balance"
            >
              I build the unseen layer — the firmware between sensor and signal, the protocol between bus and broker, the timing between interrupt and acknowledgment. Code that runs when no one is watching, at the speed of an oscillator.
            </KineticText>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-lg md:text-xl text-pretty text-ink-700 dark:text-ink-300 max-w-prose"
            >
              Stage actuel chez GS Maintenance sur un système MC68000. Disponible pour une
              alternance ingénieur dès septembre 2026 — Auvergne-Rhône-Alpes.
            </motion.p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-12 border-t hairline">
              {[
                { v: 5, suffix: "+", l: "Years C/C++" },
                { v: 7, l: "Projects shipped" },
                { v: 80, suffix: "+", l: "Stack entries" },
                { v: 3, l: "Internships" },
              ].map((m) => (
                <motion.div
                  key={m.l}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="editorial-display text-5xl md:text-6xl leading-none tabular-nums">
                    <RollingNumber value={m.v} suffix={m.suffix} />
                  </div>
                  <div className="mono-label text-ink-500 dark:text-ink-400 mt-2">{m.l}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12 py-12 md:py-24">
        <SectionTitle index="02" kicker="Sélection · 7 projets" emphasis="projects.">
          Featured projects.
        </SectionTitle>

        <div className="mt-16 md:mt-24 divide-y hairline border-t border-b hairline">
          {WORK.map((w, i) => (
            <motion.div
              key={w.slug}
              initial={
                heavyEffects ? { opacity: 0, y: 50, filter: "blur(6px)" } : { opacity: 0, y: 30 }
              }
              whileInView={
                heavyEffects
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: heavyEffects ? 0.9 : 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <ViewTransitionLink
                to={`/work/${w.slug}`}
                className="group block py-8 md:py-12 transition-all duration-700 hover:pl-4 md:hover:pl-8"
              >
                <div className="grid grid-cols-12 gap-y-3 gap-x-6 items-baseline">
                  <span className={`col-span-2 md:col-span-1 mono-label ${w.accentClass}`}>
                    {w.index}
                  </span>
                  <div className="col-span-10 md:col-span-7">
                    <div className="editorial-display text-[clamp(28px,5vw,72px)] leading-[0.95] tracking-tight">
                      {heavyEffects
                        ? w.title.split(" ").map((word, idx) => (
                            <span
                              key={idx}
                              className="inline-block mr-[0.18em] transition-transform duration-700 group-hover:-translate-y-1"
                              style={{ transitionDelay: `${idx * 30}ms` }}
                            >
                              {word}
                            </span>
                          ))
                        : w.title}
                    </div>
                    <p className="mono-label text-ink-500 dark:text-ink-400 mt-3 normal-case tracking-normal">
                      {w.subtitle}
                    </p>
                  </div>
                  <span className="hidden md:block col-span-2 mono-label text-ink-500 dark:text-ink-400 normal-case">
                    {w.year}
                  </span>
                  <span className="hidden md:flex col-span-2 mono-label text-ink-500 dark:text-ink-400 items-center justify-end gap-2 group-hover:text-signal-red transition-colors">
                    {w.status}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </ViewTransitionLink>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <ViewTransitionLink
            to="/work"
            className="mono-label link-edit inline-flex items-center gap-2"
          >
            Voir tous les projets <ArrowUpRight size={14} />
          </ViewTransitionLink>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12 py-24 md:py-40">
        <div className="grid grid-cols-12 gap-y-10 gap-x-6">
          <div className="col-span-12 md:col-span-4">
            <div className="mono-label text-signal-red mb-3">§ 03 — Contact</div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-display text-[clamp(40px,7vw,120px)] leading-[0.88] tracking-mega text-balance"
            >
              On peut <em className="italic text-signal-red">collaborer</em>.
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-12">
              {[
                { l: "Email", v: CONTACT.email, h: `mailto:${CONTACT.email}` },
                { l: "Phone", v: CONTACT.phone, h: `tel:${CONTACT.phone.replace(/\s/g, "")}` },
                { l: "LinkedIn", v: CONTACT.linkedinLabel, h: CONTACT.linkedin },
                { l: "Location", v: CONTACT.location, h: "https://maps.google.com/?q=Chambéry,France" },
              ].map((c, i) => (
                <motion.a
                  key={c.l}
                  href={c.h}
                  target={c.h.startsWith("http") ? "_blank" : undefined}
                  rel={c.h.startsWith("http") ? "noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center justify-between gap-4 py-4 border-b hairline transition-all hover:px-2"
                >
                  <div>
                    <div className="mono-label text-ink-500 dark:text-ink-400">{c.l}</div>
                    <div className="text-base md:text-lg font-mono mt-1">{c.v}</div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-ink-500 dark:text-ink-400 transition-all duration-500 group-hover:text-signal-red group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
