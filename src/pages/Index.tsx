import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

const SectionWrapper = ({
  id,
  children,
  index,
}: {
  id: string;
  children: React.ReactNode;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (index === 0) {
    return (
      <section id={id} className="min-h-screen relative">
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
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
      {/* Global starfield behind all sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Starfield />
      </div>

      <CustomCursor />

      <div className="relative z-10">
        {sections.map((s, i) => (
          <SectionWrapper key={s.id} id={s.id} index={i}>
            <s.Component />
          </SectionWrapper>
        ))}
      </div>

      <BackToTop />
    </div>
  );
};

export default Index;
