import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const prevX = useRef(0);
  const prevY = useRef(0);

  // Smooth spring for main cursor
  const springConfig = { damping: 28, stiffness: 400, mass: 0.3 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  // Slower trailing ring
  const trailConfig = { damping: 40, stiffness: 150, mass: 0.8 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  // Even slower outer glow
  const glowConfig = { damping: 50, stiffness: 80, mass: 1.2 };
  const glowX = useSpring(cursorX, glowConfig);
  const glowY = useSpring(cursorY, glowConfig);

  // Rotation based on movement
  const rotate = useMotionValue(0);
  const smoothRotate = useSpring(rotate, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Calculate velocity for rotation
      velocityX.current = e.clientX - prevX.current;
      velocityY.current = e.clientY - prevY.current;
      prevX.current = e.clientX;
      prevY.current = e.clientY;

      const angle = Math.atan2(velocityY.current, velocityX.current) * (180 / Math.PI);
      const speed = Math.sqrt(velocityX.current ** 2 + velocityY.current ** 2);
      if (speed > 3) rotate.set(angle);
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
  }, [cursorX, cursorY, rotate]);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer glow trail - slowest */}
      <motion.div
        className="fixed top-0 left-0 z-[9996] pointer-events-none"
        style={{ x: glowX, y: glowY }}
      >
        <motion.div
          animate={{
            width: isHovering ? 44 : 30,
            height: isHovering ? 44 : 30,
            opacity: isClicking ? 0.15 : 0.08,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 150 }}
          className="rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, hsl(152 100% 60% / 0.2) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Trail ring - medium speed */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{ x: trailX, y: trailY }}
      >
        <motion.div
          animate={{
            width: isHovering ? (cursorText ? 56 : 32) : 20,
            height: isHovering ? (cursorText ? 56 : 32) : 20,
            opacity: isHovering ? 0.6 : 0.25,
            rotate: isHovering ? 0 : 45,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 180 }}
          className="-translate-x-1/2 -translate-y-1/2"
          style={{
            borderRadius: isHovering ? "50%" : "30%",
            border: "1px solid hsl(152 100% 60% / 0.3)",
            transition: "border-radius 0.4s ease",
          }}
        />
      </motion.div>

      {/* Main cursor dot - fastest */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x, y }}
      >
        <motion.div
          animate={{
            width: isHovering ? (cursorText ? 52 : 28) : 8,
            height: isHovering ? (cursorText ? 52 : 28) : 8,
            scale: isClicking ? 0.75 : 1,
          }}
          transition={{ type: "spring", damping: 22, stiffness: 350 }}
          className="rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
          style={{
            background: isHovering
              ? "radial-gradient(circle at 30% 30%, hsl(152 100% 70% / 0.2), hsl(152 100% 50% / 0.08))"
              : "hsl(152 100% 60%)",
            border: isHovering
              ? "1.5px solid hsl(152 100% 60% / 0.5)"
              : "none",
            backdropFilter: isHovering ? "blur(8px)" : "none",
            boxShadow: isHovering
              ? "0 0 20px hsl(152 100% 60% / 0.15), inset 0 0 20px hsl(152 100% 60% / 0.05)"
              : "0 0 8px hsl(152 100% 60% / 0.5)",
          }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap"
              style={{ color: "hsl(152 100% 60%)" }}
            >
              {cursorText}
            </motion.span>
          )}

          {/* Inner spinning accent for default state */}
          {!isHovering && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, hsl(152 100% 80% / 0.6) 10%, transparent 20%)",
                borderRadius: "50%",
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Crosshair lines when not hovering */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x, y }}
        animate={{ opacity: isHovering ? 0 : 0.15 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="absolute w-px h-5 bg-primary -top-4 left-0" />
          <div className="absolute w-px h-5 bg-primary top-1 left-0" />
          <div className="absolute w-5 h-px bg-primary top-0 -left-4" />
          <div className="absolute w-5 h-px bg-primary top-0 left-1" />
        </div>
      </motion.div>

      {/* Global cursor hide */}
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
};

export default CustomCursor;
