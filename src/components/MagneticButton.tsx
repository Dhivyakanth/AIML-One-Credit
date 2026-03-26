import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: "button" | "a" | "div";
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

const MagneticButton = ({
  children,
  className = "",
  strength = 0.35,
  radius = 150,
  as: Component = "button",
  ...props
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 250, damping: 20, mass: 0.5 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    }
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-block will-change-transform"
    >
      {Component === "a" ? (
        <a className={className} {...(props as any)}>
          {children}
        </a>
      ) : Component === "div" ? (
        <div className={className} {...(props as any)}>
          {children}
        </div>
      ) : (
        <button className={className} {...(props as any)}>
          {children}
        </button>
      )}
    </motion.div>
  );
};

export default MagneticButton;
