import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitial(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem("mra-theme") as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* noop */
  }
  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
    try {
      localStorage.setItem("mra-theme", theme);
    } catch {
      /* noop */
    }
  }, [theme]);

  const toggle = useCallback((origin?: { x: number; y: number }) => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      const apply = () => {
        const html = document.documentElement;
        if (next === "dark") html.classList.add("dark");
        else html.classList.remove("dark");
        try {
          localStorage.setItem("mra-theme", next);
        } catch {
          /* noop */
        }
      };

      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // @ts-ignore - View Transitions API
      const hasVT = typeof document.startViewTransition === "function";

      if (!reduceMotion && hasVT) {
        const x = origin?.x ?? window.innerWidth - 40;
        const y = origin?.y ?? 40;
        const maxRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        document.documentElement.style.setProperty("--vt-x", `${x}px`);
        document.documentElement.style.setProperty("--vt-y", `${y}px`);
        document.documentElement.style.setProperty("--vt-r", `${maxRadius}px`);
        document.documentElement.dataset.themeAnim = "1";

        // @ts-ignore
        const transition = document.startViewTransition(() => {
          apply();
        });
        // @ts-ignore
        transition.finished.finally(() => {
          delete document.documentElement.dataset.themeAnim;
        });
        return next;
      }

      if (!reduceMotion && origin) {
        const overlay = document.createElement("div");
        overlay.className = "theme-overlay";
        overlay.style.background = next === "dark" ? "#0a0a0a" : "#f5f1e8";
        overlay.style.setProperty("--ox", origin.x + "px");
        overlay.style.setProperty("--oy", origin.y + "px");
        document.body.appendChild(overlay);
        requestAnimationFrame(() => {
          overlay.classList.add("active");
          setTimeout(() => {
            apply();
            overlay.style.opacity = "0";
            setTimeout(() => overlay.remove(), 400);
          }, 350);
        });
        return next;
      }

      apply();
      return next;
    });
  }, []);

  return { theme, toggle };
}
