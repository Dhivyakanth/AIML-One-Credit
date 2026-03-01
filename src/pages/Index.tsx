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

const sections = [
  { id: "hero", Component: Hero },
  { id: "skills", Component: Skills },
  { id: "experience", Component: Experience },
  { id: "projects", Component: Projects },
  { id: "education", Component: Education },
  { id: "contact", Component: Contact },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      staggerChildren: 0.08,
      when: "beforeChildren" as const,
    },
  },
};

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
  const isInView = useInView(ref, { once: false, margin: "-5% 0px -5% 0px" });

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
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="min-h-screen relative will-change-[opacity,transform]"
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
