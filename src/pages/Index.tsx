import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import Starfield from "@/components/Starfield";

const sections = [
  { id: "hero", Component: Hero },
  { id: "skills", Component: Skills },
  { id: "experience", Component: Experience },
  { id: "projects", Component: Projects },
  { id: "education", Component: Education },
  { id: "contact", Component: Contact },
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
    return (
      <section id={id} ref={ref} className="min-h-screen relative">
        {children}
      </section>
    );
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
      }}
      className="relative"
    >
      {children}
    </motion.section>
  );
};

const Index = () => {
  return (
    <div className="bg-background relative overflow-x-hidden">
      {/* Global starfield */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Starfield />
      </div>

      <CustomCursor />

      {/* Top gradient overlay */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-[1] pointer-events-none" />

      <div className="relative z-10">
        {sections.map((s, i) => (
          <ShuffleSection
            key={s.id}
            id={s.id}
            index={i}
            isLast={i === sections.length - 1}
          >
            <s.Component />
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
