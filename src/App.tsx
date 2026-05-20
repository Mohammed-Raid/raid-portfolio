import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { usePerf } from "@/hooks/usePerf";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorFollower } from "@/components/CursorFollower";
import { Home } from "@/pages/Home";

// Code-split the other pages so they load on demand
const Work = lazy(() => import("@/pages/Work").then((m) => ({ default: m.Work })));
const WorkDetail = lazy(() => import("@/pages/WorkDetail").then((m) => ({ default: m.WorkDetail })));
const Stack = lazy(() => import("@/pages/Stack").then((m) => ({ default: m.Stack })));
const About = lazy(() => import("@/pages/About").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("@/pages/Contact").then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

function Boot({ onDone, fast }: { onDone: () => void; fast: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = fast ? 900 : 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, fast]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] bg-ink-900 text-signal-cream flex flex-col items-center justify-center px-6"
      initial={{ opacity: 1 }}
      exit={{ clipPath: "inset(0 0 100% 0)", opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
    >
      <div className="mono-label text-ink-400 mb-6">MRA · v3.3 — booting</div>
      <div className="editorial-display text-[clamp(80px,18vw,260px)] leading-none tracking-mega tabular-nums">
        {String(count).padStart(3, "0")}
      </div>
      <div className="w-full max-w-md h-px bg-ink-700 mt-10 overflow-hidden">
        <motion.div
          className="h-full bg-signal-red origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: count / 100 }}
          transition={{ duration: 0.2, ease: "linear" }}
        />
      </div>
      <div className="mono-label text-ink-400 mt-6 flex gap-6">
        <span>LOAD · {count}%</span>
      </div>
    </motion.div>
  );
}

function PageTransition({ children, lite }: { children: React.ReactNode; lite: boolean }) {
  if (lite) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function RouteFallback() {
  return <div className="pt-40 text-center mono-label text-ink-500 dark:text-ink-400">Loading…</div>;
}

function AnimatedRoutes({ lite }: { lite: boolean }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition lite={lite}><Home /></PageTransition>} />
        <Route
          path="/work"
          element={
            <PageTransition lite={lite}>
              <Suspense fallback={<RouteFallback />}><Work /></Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/work/:slug"
          element={
            <PageTransition lite={lite}>
              <Suspense fallback={<RouteFallback />}><WorkDetail /></Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/stack"
          element={
            <PageTransition lite={lite}>
              <Suspense fallback={<RouteFallback />}><Stack /></Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition lite={lite}>
              <Suspense fallback={<RouteFallback />}><About /></Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition lite={lite}>
              <Suspense fallback={<RouteFallback />}><Contact /></Suspense>
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition lite={lite}>
              <Suspense fallback={<RouteFallback />}><NotFound /></Suspense>
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useLenis();
  const perf = usePerf();
  const lite = perf.tier !== "high";

  const [booted, setBooted] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("mra-booted") === "1";
  });

  useEffect(() => {
    if (booted) sessionStorage.setItem("mra-booted", "1");
  }, [booted]);

  return (
    <div className={perf.tier === "high" ? "grain min-h-screen" : "min-h-screen"}>
      {perf.tier !== "low" && <div className="bg-blueprint" />}
      <AnimatePresence>
        {!booted && <Boot onDone={() => setBooted(true)} fast={lite} />}
      </AnimatePresence>

      {perf.tier === "high" && <CursorFollower />}
      <ScrollProgress />
      <Nav />
      <main className="relative z-[1]">
        <AnimatedRoutes lite={lite} />
      </main>
      <Footer />
    </div>
  );
}
