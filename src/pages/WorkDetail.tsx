import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";
import { WORK } from "@/data/portfolio";

export function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = WORK.find((w) => w.slug === slug);
  if (!item) return <Navigate to="/work" replace />;

  const others = WORK.filter((w) => w.slug !== item.slug).slice(0, 2);

  return (
    <div className="pt-28 md:pt-36 pb-24">
      <section className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <ViewTransitionLink
          to="/work"
          className="inline-flex items-center gap-2 mono-label text-ink-500 dark:text-ink-400 hover:text-signal-red transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to work
        </ViewTransitionLink>

        {/* Headline */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-2">
            <div className={`mono-label ${item.accentClass}`}>{item.index} / Project</div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-display text-[clamp(40px,8vw,128px)] leading-[0.88] tracking-mega text-balance"
            >
              {item.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl leading-snug mt-6 text-ink-700 dark:text-ink-300 text-pretty max-w-3xl"
            >
              {item.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-y-6 border-t border-b hairline py-6"
        >
          {[
            { l: "Client", v: item.client },
            { l: "Role", v: item.role },
            { l: "Year", v: item.year },
            { l: "Status", v: item.status, accent: true },
          ].map((m) => (
            <div key={m.l}>
              <div className="mono-label text-ink-500 dark:text-ink-400">{m.l}</div>
              <div
                className={`text-sm md:text-base mt-1 font-mono ${
                  m.accent ? "text-signal-red" : ""
                }`}
              >
                {m.v}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Body */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 mt-16 md:mt-24">
          <div className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-32">
              <div className="mono-label text-signal-red mb-4">§ Stack</div>
              <ul className="space-y-2">
                {item.stack.map((s) => (
                  <li key={s} className="flex items-baseline gap-3">
                    <span className="mono-label text-ink-500 dark:text-ink-400">→</span>
                    <span className="font-mono text-sm">{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mono-label text-signal-red mb-4 mt-10">§ Metrics</div>
              <div className="grid grid-cols-2 gap-4">
                {item.metrics.map((m) => (
                  <div key={m.label} className="border hairline p-4">
                    <div className="editorial-display text-3xl leading-none">{m.value}</div>
                    <div className="mono-label text-ink-500 dark:text-ink-400 mt-2">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="mono-label text-signal-red mb-4">§ Summary</div>
            <p className="text-xl md:text-2xl leading-relaxed text-balance editorial-display tracking-tight">
              {item.summary}
            </p>

            <div className="mono-label text-signal-red mb-4 mt-12">§ Detail</div>
            <p className="text-base md:text-lg leading-relaxed text-ink-700 dark:text-ink-300 text-pretty max-w-prose">
              {item.details}
            </p>
          </div>
        </div>

        {/* Other work */}
        <div className="mt-24 md:mt-40 border-t hairline pt-12">
          <div className="flex items-baseline justify-between mb-8">
            <div className="mono-label text-signal-red">§ Continue</div>
            <ViewTransitionLink
              to="/work"
              className="mono-label link-edit inline-flex items-center gap-2"
            >
              All projects <ArrowUpRight size={14} />
            </ViewTransitionLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {others.map((o) => (
              <ViewTransitionLink
                key={o.slug}
                to={`/work/${o.slug}`}
                className="group block border hairline p-6 md:p-8 transition-colors duration-500 hover:bg-ink hover:text-signal-cream dark:hover:bg-signal-cream dark:hover:text-ink"
              >
                <div className="flex justify-between mb-4">
                  <span className={`mono-label ${o.accentClass} group-hover:text-current`}>
                    {o.index}
                  </span>
                  <span className="mono-label text-ink-500 dark:text-ink-400 group-hover:text-current">
                    {o.year}
                  </span>
                </div>
                <h3 className="editorial-display text-3xl md:text-4xl leading-none">{o.title}</h3>
                <div className="flex items-baseline justify-between mt-6">
                  <span className="mono-label text-ink-500 dark:text-ink-400 group-hover:text-current">
                    Read case →
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </ViewTransitionLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
