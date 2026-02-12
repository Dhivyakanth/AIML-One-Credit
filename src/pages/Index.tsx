import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";

const sections = [
  { id: "hero", Component: Hero },
  { id: "skills", Component: Skills },
  { id: "experience", Component: Experience },
  { id: "projects", Component: Projects },
  { id: "education", Component: Education },
  { id: "contact", Component: Contact },
];

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const isScrolling = useRef(false);
  const touchStart = useRef(0);

  const goTo = (index: number) => {
    if (index < 0 || index >= sections.length || isScrolling.current || index === current) return;
    isScrolling.current = true;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setTimeout(() => {
      isScrolling.current = false;
    }, 900);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 20) return;
      goTo(current + (e.deltaY > 0 ? 1 : -1));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(current - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) {
        goTo(current + (delta > 0 ? 1 : -1));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [current]);

  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? "100%" : "-100%",
      scale: 0.9,
      borderRadius: "2.5rem",
      rotateX: dir > 0 ? 8 : -8,
    }),
    center: {
      y: 0,
      scale: 1,
      borderRadius: "0rem",
      rotateX: 0,
    },
    exit: (dir: number) => ({
      y: dir > 0 ? "-40%" : "40%",
      scale: 0.85,
      opacity: 0,
      borderRadius: "2.5rem",
      rotateX: dir > 0 ? -6 : 6,
    }),
  };

  return (
    <div className="h-screen bg-background overflow-hidden relative" style={{ perspective: "1200px" }}>
      <CustomCursor />

      {/* Section dots nav */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${s.id}`}
          >
            <span className={`absolute right-5 text-[10px] font-mono uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
              i === current ? "opacity-100 translate-x-0 text-primary" : "opacity-0 translate-x-2 text-muted-foreground group-hover:opacity-70 group-hover:translate-x-0"
            }`}>
              {s.id}
            </span>
            <span className={`block rounded-full transition-all duration-400 ${
              i === current
                ? "w-3 h-3 bg-primary shadow-[0_0_12px_hsl(152_100%_60%/0.5)]"
                : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`} />
          </button>
        ))}
      </div>

      {/* Stacked card sections with bidirectional shuffle */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.75,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="absolute inset-0 bg-background overflow-y-auto origin-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {(() => {
            const { Component } = sections[current];
            return <Component />;
          })()}
        </motion.div>
      </AnimatePresence>

      <BackToTop />
    </div>
  );
};

export default Index;
