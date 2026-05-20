import { ViewTransitionLink } from "@/components/ViewTransitionLink";

export function NotFound() {
  return (
    <div className="min-h-[100svh] flex items-center justify-center px-5">
      <div className="text-center max-w-2xl">
        <div className="mono-label text-signal-red mb-6">§ ERROR — 404</div>
        <h1 className="editorial-display text-[clamp(60px,15vw,200px)] leading-[0.85] tracking-mega">
          Signal <em className="italic">lost</em>.
        </h1>
        <p className="text-base md:text-lg mt-8 text-ink-700 dark:text-ink-300">
          The page you're looking for has drifted out of range. Reroute below.
        </p>
        <ViewTransitionLink
          to="/"
          className="inline-flex items-center gap-3 mt-10 px-6 py-4 bg-signal-red text-signal-cream mono-label hover:bg-ink dark:hover:bg-signal-cream dark:hover:text-ink transition-colors"
        >
          Return home →
        </ViewTransitionLink>
      </div>
    </div>
  );
}
