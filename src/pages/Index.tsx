import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/Hero";
import BackToTop from "@/components/BackToTop";
import { useIsMobile } from "@/hooks/use-mobile";

const Skills = lazy(() => import("@/components/Skills"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const Education = lazy(() => import("@/components/Education"));
const Contact = lazy(() => import("@/components/Contact"));
const CustomCursor = lazy(() => import("@/components/CustomCursor"));
const Starfield = lazy(() => import("@/components/Starfield"));
const SectionVideoBackground = lazy(() => import("@/components/SectionVideoBackground"));

const sections = [
  { id: "hero", Component: Hero },
  { id: "skills", Component: Skills },
  { id: "experience", Component: Experience },
  { id: "projects", Component: Projects },
  { id: "education", Component: Education },
  { id: "contact", Component: Contact },
];

/**
 * Lightweight scroll-driven card shuffle.
 * Subtle rotation + fade on entry only for most sections.
 * Last section (contact) stays fully visible — no exit fade.
 */
const ShuffleSection = ({
  id,
  children,
  index,
  isLast,
}: {
  id: string;
  children: React.ReactNode;
  index: number;
  isLast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Hero — no effect
  if (index === 0) {
    return <>{children}</>;
  }

  // For the LAST section: only fade/flip in, stay fully visible (no exit fade)
  // For others: gentle entry + very subtle exit
  const opacity = useTransform(
    scrollYProgress,
    isLast
      ? [0, 0.08, 0.2, 1]           // last: fade in, then stay at 1
      : [0, 0.08, 0.2, 0.85, 1],     // others: gentle exit fade
    isLast
      ? [0, 0.5, 1, 1]
      : [0, 0.5, 1, 1, 0.7]
  );

  const rotateX = useTransform(
    scrollYProgress,
    isLast
      ? [0, 0.1, 0.22, 1]
      : [0, 0.1, 0.22, 0.85, 1],
    isLast
      ? [4, 1.5, 0, 0]              // last: flip in only
      : [4, 1.5, 0, 0, -2]          // others: very subtle exit tilt
  );

  const scale = useTransform(
    scrollYProgress,
    isLast
      ? [0, 0.1, 0.22, 1]
      : [0, 0.1, 0.22, 0.85, 1],
    isLast
      ? [0.96, 0.99, 1, 1]
      : [0.96, 0.99, 1, 1, 0.98]
  );

  const y = useTransform(
    scrollYProgress,
    isLast
      ? [0, 0.1, 0.22, 1]
      : [0, 0.1, 0.22, 0.85, 1],
    isLast
      ? [30, 10, 0, 0]
      : [30, 10, 0, 0, -15]
  );

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{
        opacity,
        rotateX,
        scale,
        y,
        transformPerspective: 1400,
        transformOrigin: "center center",
        willChange: "transform, opacity",
        contain: "layout paint style",
        contentVisibility: "auto",
        containIntrinsicSize: "1200px",
        backfaceVisibility: "hidden",
      }}
      className="relative"
    >
      {children}
    </motion.section>
  );
};

const Index = () => {
  const isMobile = useIsMobile();
  const [mountEnhancedVisuals, setMountEnhancedVisuals] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    if (connection?.saveData) {
      return;
    }

    const preloadChunks = () => {
      void import("@/components/Skills");
      void import("@/components/Experience");
      void import("@/components/Projects");
      void import("@/components/Education");
      void import("@/components/Contact");
      void import("@/components/CustomCursor");
      void import("@/components/Starfield");
      void import("@/components/SectionVideoBackground");
    };

    const idleCallback = (window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    }).requestIdleCallback;
    const cancelIdleCallback = (window as Window & {
      cancelIdleCallback?: (id: number) => void;
    }).cancelIdleCallback;

    let timeoutId = 0;
    let idleId = 0;

    if (idleCallback) {
      idleId = idleCallback(preloadChunks);
    } else {
      timeoutId = window.setTimeout(preloadChunks, 900);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      if (idleId && cancelIdleCallback) {
        cancelIdleCallback(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || prefersReducedMotion) {
      setMountEnhancedVisuals(false);
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setMountEnhancedVisuals(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isMobile]);

  return (
    <div className="bg-background relative overflow-x-hidden">
      {mountEnhancedVisuals && (
        <Suspense fallback={null}>
          <SectionVideoBackground />
        </Suspense>
      )}

      {/* Global starfield */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {mountEnhancedVisuals && (
          <Suspense fallback={null}>
            <Starfield />
          </Suspense>
        )}
      </div>

      {mountEnhancedVisuals && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}

      {/* Top gradient overlay */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-[2] pointer-events-none" />

      <div className="relative z-10">
        {sections.map((s, i) => (
          <ShuffleSection
            key={s.id}
            id={s.id}
            index={i}
            isLast={i === sections.length - 1}
          >
            <Suspense fallback={<div className="h-24" aria-hidden="true" />}>
              <s.Component />
            </Suspense>
            {/* Gradient divider between sections */}
            {i > 0 && i < sections.length - 1 && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mx-6 md:mx-16 lg:mx-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              />
            )}
          </ShuffleSection>
        ))}
      </div>

      <BackToTop />
    </div>
  );
};

export default Index;
