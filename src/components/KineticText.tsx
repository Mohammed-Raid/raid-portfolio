import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { getPerfTier } from "@/hooks/usePerf";

type Props = {
  children: string;
  className?: string;
  emphasis?: string;
};

/**
 * High tier: char-level scroll-scrubbed reveal.
 * Mid/Low: single fade-in whileInView (lightweight).
 */
export function KineticText({ children, className, emphasis }: Props) {
  const tier = getPerfTier();
  if (tier !== "high") return <SimpleReveal className={className} emphasis={emphasis}>{children}</SimpleReveal>;
  return <Cinematic className={className} emphasis={emphasis}>{children}</Cinematic>;
}

function SimpleReveal({ children, className, emphasis }: Props) {
  const words = children.split(" ");
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {words.map((w, i) =>
        w === emphasis ? (
          <em key={i} className="italic text-signal-red">
            {w}{" "}
          </em>
        ) : (
          <span key={i}>{w} </span>
        )
      )}
    </motion.div>
  );
}

function Cinematic({ children, className, emphasis }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });

  const words = children.split(" ");
  const total = children.replace(/\s/g, "").length;
  let charIdx = 0;

  return (
    <div ref={ref} className={className}>
      <span className="inline">
        {words.map((word, wi) => {
          const isEmphasis = word === emphasis;
          const wordEl = (
            <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
              {word.split("").map((c) => {
                const start = charIdx / total;
                const end = Math.min(1, start + 0.7);
                charIdx++;
                return (
                  <Char
                    key={charIdx}
                    char={c}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                    emphasis={isEmphasis}
                  />
                );
              })}
            </span>
          );
          return wordEl;
        })}
      </span>
    </div>
  );
}

function Char({
  char,
  progress,
  start,
  end,
  emphasis,
}: {
  char: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  emphasis?: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block ${emphasis ? "italic text-signal-red" : ""}`}
    >
      {char}
    </motion.span>
  );
}
