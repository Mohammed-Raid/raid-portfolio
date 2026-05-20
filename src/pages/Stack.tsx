import { motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { STACK } from "@/data/portfolio";
import { useMemo, useState } from "react";

const CATS = ["ALL", "LANG", "MCU", "RTOS", "SBC", "DSP", "FPGA", "RF", "NET", "BUS", "EDA", "LAB"];

export function Stack() {
  const [filter, setFilter] = useState("ALL");
  const filtered = useMemo(
    () => (filter === "ALL" ? STACK : STACK.filter((s) => s.cat === filter)),
    [filter]
  );

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <section className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-8">
            <SectionTitle index="02" kicker="Inventaire technique" emphasis="craft.">
              Tools of the craft.
            </SectionTitle>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-4 md:pl-8 md:border-l hairline self-end"
          >
            <p className="text-base md:text-lg leading-snug text-pretty">
              Ce que j'utilise au quotidien — du langage bas-niveau aux instruments de laboratoire.
              Filtrer par catégorie pour zoomer.
            </p>
          </motion.div>
        </div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`mono-label px-3 py-1.5 border hairline transition-colors ${
                filter === c
                  ? "bg-signal-red text-signal-cream border-signal-red"
                  : "hover:bg-ink hover:text-signal-cream dark:hover:bg-signal-cream dark:hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Inventory rows */}
        <div className="border-t hairline">
          {filtered.map((s, i) => (
            <motion.div
              key={s.ref}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-12 gap-x-4 gap-y-2 items-baseline py-4 md:py-6 border-b hairline transition-colors hover:bg-ink-100 dark:hover:bg-ink-800"
            >
              <span className="col-span-3 sm:col-span-2 mono-label text-ink-500 dark:text-ink-400">
                {s.ref}
              </span>
              <span className="col-span-2 sm:col-span-1 mono-label text-signal-red">{s.cat}</span>
              <span className="col-span-7 sm:col-span-4 editorial-display text-2xl md:text-3xl leading-none">
                {s.name}
              </span>
              <span className="hidden sm:block sm:col-span-3 mono-label text-ink-500 dark:text-ink-400 normal-case tracking-normal">
                {s.note}
              </span>
              <span className="col-span-12 sm:col-span-2 flex items-center sm:justify-end gap-1.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <span
                    key={k}
                    className={`block w-4 h-1.5 ${
                      k < s.level
                        ? "bg-signal-red"
                        : "bg-ink-200 dark:bg-ink-700"
                    }`}
                  />
                ))}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
