import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        const nextVisible = window.scrollY > 400;
        setVisible((prev) => (prev === nextVisible ? prev : nextVisible));
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.1, boxShadow: "0 0 40px hsl(152 100% 50% / 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all duration-300 border-none cursor-pointer relative"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 relative z-10" />
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full border-2 border-primary animate-pulse-ring" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
