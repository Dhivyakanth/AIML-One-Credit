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

const BELOW_THE_FOLD_MEDIA = [
  "/skills-tech.webp",
  "/experience-1.webp",
  "/ksr-college.webp",
  "/ksr-matric-school.webp",
  "/project-ai.webp",
  "/project-web.webp",
  "/project-design.webp",
  "/project-mobile.webp",
  "https://assets.mixkit.co/videos/preview/mixkit-young-man-typing-on-his-laptop-1379-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-computer-in-a-dark-room-1540-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-41108-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-notebook-in-a-desk-with-several-pens-viewed-from-above-2007-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-network-of-connections-over-a-city-1744-large.mp4",
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

    const idleApi = window as Window & {
      requestIdleCallback?: (
        cb: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void,
        options?: { timeout: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const appendedPrefetchLinks: HTMLLinkElement[] = [];
    const cleanupImages: HTMLImageElement[] = [];

    const scheduledRafs = new Set<number>();
    const scheduledTimeouts = new Set<number>();
    const scheduledIdle = new Set<number>();

    const scheduleQueue = (tasks: Array<() => void>) => {
      let cursor = 0;

      const runQueue = () => {
        if (cursor >= tasks.length) {
          return;
        }

        if (idleApi.requestIdleCallback) {
          const idleId = idleApi.requestIdleCallback(
            (deadline) => {
              scheduledIdle.delete(idleId);

              while (
                cursor < tasks.length &&
                (deadline.timeRemaining() > 4 || deadline.didTimeout)
              ) {
                tasks[cursor++]();
              }

              runQueue();
            },
            { timeout: 1200 }
          );
          scheduledIdle.add(idleId);
          return;
        }

        const rafId = window.requestAnimationFrame(() => {
          scheduledRafs.delete(rafId);
          const budgetEnd = performance.now() + 6;

          while (cursor < tasks.length && performance.now() < budgetEnd) {
            tasks[cursor++]();
          }

          if (cursor < tasks.length) {
            const timeoutId = window.setTimeout(runQueue, 16);
            scheduledTimeouts.add(timeoutId);
          }
        });

        scheduledRafs.add(rafId);
      };

      runQueue();
    };

    let hasPreloaded = false;

    const preloadChunks = () => {
      if (hasPreloaded) {
        return;
      }

      hasPreloaded = true;

      const tasks: Array<() => void> = [
        () => {
          void import("@/components/Skills");
        },
        () => {
          void import("@/components/Experience");
        },
        () => {
          void import("@/components/Projects");
        },
        () => {
          void import("@/components/Education");
        },
        () => {
          void import("@/components/Contact");
        },
        () => {
          void import("@/components/CustomCursor");
        },
        () => {
          void import("@/components/Starfield");
        },
        () => {
          void import("@/components/SectionVideoBackground");
        },
      ];

      for (const src of BELOW_THE_FOLD_MEDIA) {
        if (src.endsWith(".mp4")) {
          tasks.push(() => {
            const prefetchLink = document.createElement("link");
            prefetchLink.rel = "prefetch";
            prefetchLink.as = "video";
            prefetchLink.href = src;
            document.head.appendChild(prefetchLink);
            appendedPrefetchLinks.push(prefetchLink);
          });
          continue;
        }

        tasks.push(() => {
          const image = new Image();
          image.decoding = "async";
          image.src = src;
          cleanupImages.push(image);
          if (typeof image.decode === "function") {
            void image.decode().catch(() => {
              // Ignore decode errors for optional pre-warmed media.
            });
          }
        });
      }

      scheduleQueue(tasks);
    };

    let timeoutId = 0;
    let rafId = 0;

    const preloadOnIntent = () => {
      preloadChunks();
      removeIntentListeners();
    };

    const removeIntentListeners = () => {
      window.removeEventListener("wheel", preloadOnIntent);
      window.removeEventListener("touchstart", preloadOnIntent);
      window.removeEventListener("pointerdown", preloadOnIntent);
      window.removeEventListener("keydown", preloadOnIntent);
    };

    window.addEventListener("wheel", preloadOnIntent, { passive: true });
    window.addEventListener("touchstart", preloadOnIntent, { passive: true });
    window.addEventListener("pointerdown", preloadOnIntent, { passive: true });
    window.addEventListener("keydown", preloadOnIntent, { passive: true });

    rafId = window.requestAnimationFrame(() => {
      preloadChunks();
    });

    if (idleApi.requestIdleCallback) {
      const idleId = idleApi.requestIdleCallback(() => {
        scheduledIdle.delete(idleId);
        preloadChunks();
      });
      scheduledIdle.add(idleId);
    } else {
      timeoutId = window.setTimeout(preloadChunks, 220);
    }

    return () => {
      removeIntentListeners();
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      for (const scheduledId of scheduledIdle) {
        idleApi.cancelIdleCallback?.(scheduledId);
      }
      for (const scheduledId of scheduledRafs) {
        window.cancelAnimationFrame(scheduledId);
      }
      for (const scheduledId of scheduledTimeouts) {
        window.clearTimeout(scheduledId);
      }
      for (const prefetchLink of appendedPrefetchLinks) {
        prefetchLink.remove();
      }
      for (const image of cleanupImages) {
        image.src = "";
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
