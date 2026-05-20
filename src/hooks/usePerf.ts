import { useEffect, useState } from "react";

export type PerfTier = "high" | "mid" | "low";

type DeviceCapabilities = {
  tier: PerfTier;
  reduceMotion: boolean;
  isCoarse: boolean;
  isMobile: boolean;
  cores: number;
  memoryGB: number;
  hasGoodConnection: boolean;
};

let cached: DeviceCapabilities | null = null;

function detect(): DeviceCapabilities {
  if (cached) return cached;
  if (typeof window === "undefined") {
    return {
      tier: "high",
      reduceMotion: false,
      isCoarse: false,
      isMobile: false,
      cores: 8,
      memoryGB: 8,
      hasGoodConnection: true,
    };
  }

  // Read pre-React tier if it was already set by the inline script
  const preTier = (document.documentElement.getAttribute("data-perf") as PerfTier | null);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // @ts-ignore
  const cores = (navigator.hardwareConcurrency as number) || 4;
  // @ts-ignore
  const memoryGB = (navigator.deviceMemory as number | undefined) ?? 4;
  // @ts-ignore
  const connection = navigator.connection;
  const saveData = connection?.saveData === true;
  const effectiveType = connection?.effectiveType as string | undefined;
  const hasGoodConnection =
    !saveData && (!effectiveType || effectiveType === "4g" || effectiveType === "5g");

  let tier: PerfTier = preTier && (preTier === "low" || preTier === "mid" || preTier === "high") ? preTier : "high";
  // Re-confirm tier from JS (in case inline failed)
  if (!preTier) {
    if (reduceMotion || saveData) tier = "low";
    else if (cores <= 2 || memoryGB <= 2) tier = "low";
    else if (cores <= 4 || memoryGB <= 4 || (isMobile && cores <= 6)) tier = "mid";
  }

  cached = {
    tier,
    reduceMotion,
    isCoarse,
    isMobile,
    cores,
    memoryGB,
    hasGoodConnection,
  };
  return cached;
}

/** Probe rendering speed for 60 frames, downgrade tier if poor. */
async function probeFps(): Promise<number> {
  return new Promise((resolve) => {
    let frames = 0;
    const start = performance.now();
    function tick() {
      frames++;
      if (frames < 60) requestAnimationFrame(tick);
      else {
        const elapsed = performance.now() - start;
        resolve((frames * 1000) / elapsed);
      }
    }
    requestAnimationFrame(tick);
  });
}

export function usePerf(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>(detect);

  useEffect(() => {
    let mounted = true;
    // After mount, run FPS probe and refine if needed
    probeFps().then((fps) => {
      if (!mounted) return;
      if (fps < 45 && caps.tier === "high") {
        cached = { ...caps, tier: "mid" };
        setCaps(cached);
      } else if (fps < 30 && caps.tier === "mid") {
        cached = { ...caps, tier: "low" };
        setCaps(cached);
      }
      // Expose tier as data-attr for CSS-driven gating
      document.documentElement.dataset.perf = cached?.tier ?? caps.tier;
    });
    document.documentElement.dataset.perf = caps.tier;
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return caps;
}

/** Synchronous tier read, useful for non-hook code paths. */
export function getPerfTier(): PerfTier {
  return detect().tier;
}
