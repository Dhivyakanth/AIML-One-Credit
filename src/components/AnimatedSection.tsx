import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

interface Props {
  children: ReactNode;
  className?: string;
}

const AnimatedSection = ({ children, className }: Props) => (
  <motion.div
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default AnimatedSection;
