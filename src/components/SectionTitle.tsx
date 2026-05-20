import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  index?: string;
  kicker?: string;
  children: string;
  emphasis?: string;
  align?: "left" | "right";
};

export function SectionTitle({ index, kicker, children, emphasis, align = "left" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = children.split(" ");

  return (
    <div ref={ref} className={align === "right" ? "text-right" : ""}>
      {(index || kicker) && (
        <div
          className={`flex items-center gap-4 mb-6 ${
            align === "right" ? "justify-end" : "justify-start"
          }`}
        >
          {index && <span className="mono-label text-signal-red">§ {index}</span>}
          {kicker && (
            <span className="mono-label text-ink-500 dark:text-ink-400">{kicker}</span>
          )}
        </div>
      )}
      <h2 className="editorial-display text-[clamp(40px,9vw,140px)] leading-[0.88] tracking-mega text-balance">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.18em] last:mr-0">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
              animate={
                inView
                  ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                  : { y: "110%", opacity: 0, filter: "blur(8px)" }
              }
              transition={{ duration: 0.9, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              {w === emphasis ? <em className="italic text-signal-red">{w}</em> : w}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}
