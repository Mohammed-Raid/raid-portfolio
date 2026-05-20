import { CONTACT } from "@/data/portfolio";
import { motion } from "framer-motion";
import { ViewTransitionLink } from "./ViewTransitionLink";

export function Footer() {
  return (
    <footer className="border-t hairline mt-20 md:mt-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-12 md:py-20">
        <div className="grid grid-cols-12 gap-y-10 gap-x-8">
          {/* Massive editorial CTA */}
          <div className="col-span-12 md:col-span-8">
            <div className="mono-label text-ink-500 dark:text-ink-400 mb-3">
              § Disponibilité — alternance ingénieur · sept. 2026
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-display text-[clamp(48px,8vw,128px)] leading-[0.88] text-balance"
            >
              Let's build <em className="italic text-signal-red">something</em> together.
            </motion.h3>
            <ViewTransitionLink
              to="/contact"
              className="inline-flex items-center gap-3 mt-8 mono-label text-xs link-edit"
            >
              <span>Open channel</span>
              <span aria-hidden>↗</span>
            </ViewTransitionLink>
          </div>

          {/* Quick contact */}
          <div className="col-span-12 md:col-span-4 md:pl-8 md:border-l hairline">
            <div className="mono-label text-ink-500 dark:text-ink-400 mb-4">§ Direct</div>
            <ul className="space-y-3 text-sm">
              <li>
                <a className="link-edit" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a className="link-edit" href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a className="link-edit" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t hairline flex flex-wrap gap-4 justify-between mono-label text-[10px] text-ink-500 dark:text-ink-400">
          <span>© 2026 — Mohamed Raid Abadou</span>
          <span>Built with React · Vite · Framer Motion · Tailwind</span>
          <span>v3.0 — Editorial Edition</span>
        </div>
      </div>
    </footer>
  );
}
