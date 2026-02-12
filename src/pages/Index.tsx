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
  const isScrolling = useRef(false);
  const touchStart = useRef(0);

  const goTo = (index: number) => {
    if (index < 0 || index >= sections.length || isScrolling.current) return;
    isScrolling.current = true;
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

  return (
    <div className="h-screen bg-background overflow-hidden relative">
      <CustomCursor />

      {/* Section dots nav */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full border border-border transition-all duration-300 ${
              i === current
                ? "bg-primary border-primary scale-125"
                : "bg-transparent hover:bg-muted"
            }`}
            aria-label={`Go to ${s.id}`}
          />
        ))}
      </div>

      {/* Stacked card sections */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ y: "100%", scale: 0.92, borderRadius: "2rem" }}
          animate={{ y: 0, scale: 1, borderRadius: "0rem" }}
          exit={{ y: "-30%", scale: 0.88, opacity: 0, borderRadius: "2rem" }}
          transition={{
            duration: 0.7,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="absolute inset-0 bg-background overflow-y-auto"
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
