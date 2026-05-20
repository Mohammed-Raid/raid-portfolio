import { motion } from "framer-motion";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";
import { SectionTitle } from "@/components/SectionTitle";
import { TIMELINE, PROFILE, SECTORS } from "@/data/portfolio";

export function About() {
  return (
    <div className="pt-32 md:pt-40 pb-24">
      <section className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-8">
            <SectionTitle index="03" kicker="Profil" emphasis="background.">
              Engineer, in background.
            </SectionTitle>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12 mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-8 lg:col-span-7"
          >
            <p className="editorial-display text-[clamp(24px,3.5vw,48px)] leading-[1.1] tracking-tight text-balance">
              Né en <em className="italic text-signal-red">Algérie</em>, formé en classe prépa
              (rang 291 / 1800 au concours national), j'ai migré vers la France pour me spécialiser
              en systèmes embarqués à l'<em className="italic">Université Savoie Mont Blanc</em>.
            </p>
            <p className="mt-8 text-base md:text-lg leading-relaxed text-ink-700 dark:text-ink-300 text-pretty max-w-prose">
              Aujourd'hui en M2 ESET, je termine un stage de quatre mois chez GS Maintenance autour
              d'un système MC68000. Mon parcours mélange théorie rigoureuse (signal processing,
              archi RISC-V, RF) et terrain (radar ENNA, qualité IRIS, FRAM/RTC en exploitation
              chez SE60).
            </p>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-700 dark:text-ink-300 text-pretty max-w-prose">
              Ce qui me motive : les systèmes qui durent. Un firmware bien écrit tient dix ans dans
              un boîtier d'éclairage public. C'est cette permanence qui m'intéresse — l'opposé du
              jetable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-4 lg:col-span-5 md:pl-8 md:border-l hairline"
          >
            <div className="mono-label text-signal-red mb-4">§ Numbers</div>
            <div className="grid grid-cols-2 gap-y-8">
              {[
                { v: "5+", l: "Years C/C++", s: "embedded" },
                { v: "3", l: "Internships", s: "RF · QA · IoT" },
                { v: "7", l: "Major projects", s: "shipped" },
                { v: "3", l: "Languages", s: "AR · FR · EN" },
              ].map((m) => (
                <div key={m.l}>
                  <div className="editorial-display text-5xl md:text-6xl leading-none">{m.v}</div>
                  <div className="mono-label text-ink-500 dark:text-ink-400 mt-2">{m.l}</div>
                  <div className="mono-label text-ink-500 dark:text-ink-400 normal-case tracking-normal">
                    {m.s}
                  </div>
                </div>
              ))}
            </div>

            <div className="mono-label text-signal-red mb-3 mt-10">§ Languages</div>
            <ul className="space-y-2">
              {PROFILE.languages.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between border-b hairline pb-2">
                  <span className="font-mono text-sm">{l.name}</span>
                  <span className="mono-label text-ink-500 dark:text-ink-400">{l.level}</span>
                </li>
              ))}
            </ul>

            <div className="mono-label text-signal-red mb-3 mt-10">§ Credentials</div>
            <ul className="space-y-2">
              {PROFILE.credentials.map((c) => (
                <li key={c} className="flex items-baseline gap-3">
                  <span className="mono-label text-ink-500 dark:text-ink-400">→</span>
                  <span className="font-mono text-sm">{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mb-12">
          <div className="mono-label text-signal-red mb-2">§ Targeted sectors</div>
          <h2 className="editorial-display text-4xl md:text-6xl leading-none mb-3 tracking-tight">
            Where I want to <em className="italic text-signal-red">build</em>.
          </h2>
          <p className="text-base md:text-lg text-ink-700 dark:text-ink-300 max-w-prose mt-4">
            Cinq domaines où mon profil — firmware, RF, signal, hardware, AI — apporte le plus
            de valeur. Recherche : alternance M2 dès septembre 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-24 md:mb-40">
          {SECTORS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="border hairline p-5 md:p-6 bg-ink-100 dark:bg-ink-800"
            >
              <div className="mono-label text-signal-red mb-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="editorial-display text-2xl md:text-3xl leading-tight tracking-tight">
                {s.label}
              </h3>
              <p className="text-sm mt-2 text-ink-700 dark:text-ink-300">{s.sub}</p>
              <div className="mt-4 pt-4 border-t hairline mono-label text-ink-500 dark:text-ink-400 normal-case tracking-normal">
                Angle technique
              </div>
              <p className="text-sm mt-1 font-mono">{s.angle}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-24 md:mb-40 grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <div className="mono-label text-signal-red mb-2">§ Soft skills</div>
            <h2 className="editorial-display text-4xl md:text-5xl leading-none tracking-tight">
              How I work.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8">
            <ul className="space-y-4">
              {PROFILE.softSkills.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-4 border-b hairline pb-4"
                >
                  <span className="mono-label text-signal-red shrink-0 mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base md:text-lg text-pretty">{s}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <div className="mono-label text-signal-red mb-2">§ Timeline</div>
          <h2 className="editorial-display text-4xl md:text-6xl leading-none mb-12 tracking-tight">
            Path so far.
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <div className="relative">
              <div className="absolute left-0 sm:left-32 top-0 bottom-0 w-px bg-ink-200 dark:bg-ink-700" />
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.hash}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-8 sm:pl-44 py-6 sm:py-8 border-b hairline last:border-b-0"
                >
                  <span
                    className={`absolute left-[-5px] sm:left-[124px] top-8 sm:top-10 block w-[11px] h-[11px] rounded-full ${
                      t.status === "HEAD"
                        ? "bg-signal-red ring-4 ring-signal-red/20"
                        : t.status === "ACTIVE"
                        ? "bg-signal-cobalt"
                        : "bg-ink-300 dark:bg-ink-600"
                    }`}
                  />
                  <div className="absolute left-0 sm:left-0 top-6 sm:top-8 sm:w-28 mono-label text-ink-500 dark:text-ink-400 hidden sm:block">
                    {t.when}
                  </div>
                  <div className="sm:hidden mono-label text-ink-500 dark:text-ink-400 mb-2">
                    {t.when}
                  </div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <span
                      className={`mono-label ${
                        t.kind === "WORK" ? "text-signal-red" : "text-signal-cobalt"
                      }`}
                    >
                      [{t.kind}]
                    </span>
                    <span className="mono-label text-ink-500 dark:text-ink-400">
                      {t.hash} · {t.status}
                    </span>
                  </div>
                  <h3 className="editorial-display text-2xl md:text-3xl leading-tight tracking-tight">
                    {t.title}
                  </h3>
                  <div className="mono-label text-ink-500 dark:text-ink-400 mt-2 normal-case tracking-normal">
                    {t.org} · {t.loc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 md:mt-40 border-t hairline pt-12 grid grid-cols-12 gap-x-6 gap-y-6 items-end">
          <div className="col-span-12 md:col-span-9">
            <h3 className="editorial-display text-[clamp(32px,6vw,96px)] leading-[0.9] tracking-mega text-balance">
              Curieux de la <em className="italic text-signal-red">suite</em> ?
            </h3>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <ViewTransitionLink
              to="/contact"
              className="inline-flex items-center gap-3 px-5 py-3 bg-signal-red text-signal-cream mono-label hover:bg-ink dark:hover:bg-signal-cream dark:hover:text-ink transition-colors"
            >
              Open channel →
            </ViewTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
