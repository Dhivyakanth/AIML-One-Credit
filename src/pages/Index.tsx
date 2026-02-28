import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

  // Hero section is always fully visible
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
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 80, scale: 0.95 }
      }
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        scale: { duration: 0.6 },
      }}
      className="min-h-screen relative origin-top will-change-transform"
    >
      {children}
    </motion.section>
  );
};

const Index = () => {
  return (
    <div className="bg-background relative overflow-x-hidden">
      <CustomCursor />

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
