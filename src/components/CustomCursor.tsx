import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='pointer']"
      );
      const cursorLabel = target.closest("[data-cursor-text]");

      if (cursorLabel) {
        setCursorText(cursorLabel.getAttribute("data-cursor-text") || "");
        setIsHovering(true);
      } else if (interactive) {
        setCursorText("");
        setIsHovering(true);
      } else {
        setCursorText("");
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x, y }}
      >
        <motion.div
          animate={{
            width: isHovering ? (cursorText ? 80 : 48) : 12,
            height: isHovering ? (cursorText ? 80 : 48) : 12,
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{
            backgroundColor: isHovering
              ? "hsl(152 100% 60% / 0.15)"
              : "hsl(152 100% 60% / 0.9)",
            border: isHovering
              ? "1.5px solid hsl(152 100% 60% / 0.6)"
              : "none",
            backdropFilter: isHovering ? "blur(4px)" : "none",
          }}
        >
          {cursorText && (
            <span className="text-[10px] font-medium text-foreground whitespace-nowrap">
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x, y }}
      >
        <motion.div
          animate={{
            width: isHovering ? 0 : 36,
            height: isHovering ? 0 : 36,
            opacity: isHovering ? 0 : 0.3,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="rounded-full -translate-x-1/2 -translate-y-1/2 border border-primary/40"
        />
      </motion.div>

      {/* Global cursor hide */}
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
};

export default CustomCursor;
