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

const sections = [
  { id: "hero", Component: Hero },
  { id: "skills", Component: Skills },
  { id: "experience", Component: Experience },
  { id: "projects", Component: Projects },
  { id: "education", Component: Education },
  { id: "contact", Component: Contact },
];

const SectionWrapper = ({ id, children, index }: { id: string; children: React.ReactNode; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity, y, scale }}
      className="min-h-screen relative"
    >
      {children}
    </motion.section>
  );
};

const Index = () => {
  return (
    <div className="bg-background relative">
      <CustomCursor />

      {/* Smooth scrollable sections with parallax fade */}
      {sections.map((s, i) => (
        <SectionWrapper key={s.id} id={s.id} index={i}>
          <s.Component />
        </SectionWrapper>
      ))}

      <BackToTop />
    </div>
  );
};

export default Index;
