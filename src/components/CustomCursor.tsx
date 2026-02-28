import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");

  // Fast dot
  const springConfig = { damping: 30, stiffness: 500, mass: 0.2 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  // Trailing ring
  const trailConfig = { damping: 35, stiffness: 180, mass: 0.5 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

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
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{ x: trailX, y: trailY }}
      >
        <motion.div
          animate={{
            width: isHovering ? (cursorText ? 64 : 40) : 28,
            height: isHovering ? (cursorText ? 64 : 40) : 28,
            borderWidth: isHovering ? 2 : 1,
            opacity: isClicking ? 0.4 : 0.6,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
          style={{
            borderColor: "hsl(var(--primary))",
            borderStyle: "solid",
            background: isHovering
              ? "hsl(var(--primary) / 0.06)"
              : "transparent",
          }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[9px] font-bold tracking-widest uppercase whitespace-nowrap text-primary"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x, y }}
      >
        <motion.div
          animate={{
            width: isHovering ? 6 : 6,
            height: isHovering ? 6 : 6,
            scale: isClicking ? 2.5 : isHovering ? 0 : 1,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="rounded-full -translate-x-1/2 -translate-y-1/2 bg-primary"
          style={{
            boxShadow: "0 0 6px hsl(var(--primary) / 0.6)",
          }}
        />
      </motion.div>

      {/* Global cursor hide */}
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
};

export default CustomCursor;
