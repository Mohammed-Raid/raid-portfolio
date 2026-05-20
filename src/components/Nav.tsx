import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { ViewTransitionLink } from "./ViewTransitionLink";
import { useTheme } from "@/hooks/useTheme";

const ROUTES = [
  { to: "/", label: "Index", num: "00" },
  { to: "/work", label: "Work", num: "01" },
  { to: "/stack", label: "Stack", num: "02" },
  { to: "/about", label: "About", num: "03" },
  { to: "/contact", label: "Contact", num: "04" },
];

export function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleThemeToggle = () => {
    if (!toggleRef.current) {
      toggle();
      return;
    }
    const r = toggleRef.current.getBoundingClientRect();
    toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "is-scrolled bg-ink-50/75 dark:bg-ink-900/75 backdrop-blur-xl border-b hairline"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <ViewTransitionLink to="/" className="group flex items-center gap-3">
              <motion.span
                className="w-2 h-2 rounded-full bg-signal-red"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="mono-label text-ink-600 dark:text-ink-300 group-hover:text-ink dark:group-hover:text-ink-50 transition-colors">
                M.R.A · v3.1
              </span>
            </ViewTransitionLink>

            <nav className="hidden md:flex items-center gap-1">
              {ROUTES.map((r) => {
                const active = pathname === r.to;
                return (
                  <ViewTransitionLink
                    key={r.to}
                    to={r.to}
                    className={`relative px-4 py-2 mono-label text-xs transition-colors duration-300 ${
                      active
                        ? "text-ink dark:text-ink-50"
                        : "text-ink-500 dark:text-ink-400 hover:text-ink dark:hover:text-ink-50"
                    }`}
                  >
                    <span className="text-ink-400 dark:text-ink-500 mr-1.5">{r.num}</span>
                    {r.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute left-0 right-0 -bottom-1 h-[2px] bg-signal-red"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </ViewTransitionLink>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                ref={toggleRef}
                onClick={handleThemeToggle}
                aria-label="Basculer le thème"
                className="relative p-2 mono-label text-ink-500 dark:text-ink-400 hover:text-ink dark:hover:text-ink-50 transition-colors overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.span>
                </AnimatePresence>
              </button>
              <button
                onClick={() => setOpen(true)}
                aria-label="Ouvrir le menu"
                className="md:hidden p-2 text-ink dark:text-ink-50"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden bg-ink-50 dark:bg-ink-900"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
          >
            <div className="flex items-center justify-between h-16 px-5 border-b hairline">
              <span className="mono-label text-ink-600 dark:text-ink-300">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="p-2 text-ink dark:text-ink-50"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="px-5 py-8">
              {ROUTES.map((r, i) => (
                <motion.div
                  key={r.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ViewTransitionLink
                    to={r.to}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5 border-b hairline"
                  >
                    <span className="mono-label text-ink-400 dark:text-ink-500">{r.num}</span>
                    <span className="editorial-display text-5xl leading-none">{r.label}</span>
                  </ViewTransitionLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-10 pt-6 border-t hairline mono-label text-[11px] text-ink-500 dark:text-ink-400 leading-loose"
              >
                <div>Mohamed Raid Abadou</div>
                <div>M2 ESET · Univ. Savoie Mont Blanc</div>
                <div className="mt-3 text-signal-red">Disponible · Sept. 2026</div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
