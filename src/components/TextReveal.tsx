import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  /** "char" splits by character, "word" splits by word */
  splitBy?: "char" | "word";
  /** Animation style */
  variant?: "fade-up" | "slide-in" | "scale";
}

const animations = {
  "fade-up": {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "slide-in": {
    hidden: { opacity: 0, x: -15, rotateY: 40 },
    visible: { opacity: 1, x: 0, rotateY: 0 },
  },
  "scale": {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  },
};

const TextReveal = ({
  children,
  className = "",
  delay = 0,
  splitBy = "char",
  variant = "fade-up",
}: TextRevealProps) => {
  const items = splitBy === "char" ? children.split("") : children.split(" ");
  const anim = animations[variant];

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: splitBy === "char" ? 0.025 : 0.08, delayChildren: delay }}
    >
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          variants={anim}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block will-change-transform"
          style={{ whiteSpace: "pre" }}
        >
          {splitBy === "word" ? (i < items.length - 1 ? item + "\u00A0" : item) : item}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
