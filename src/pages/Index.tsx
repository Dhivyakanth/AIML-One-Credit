import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Hero />
      <AnimatedSection>
        <Skills />
      </AnimatedSection>
      <AnimatedSection>
        <Experience />
      </AnimatedSection>
      <AnimatedSection>
        <Projects />
      </AnimatedSection>
      <AnimatedSection>
        <Education />
      </AnimatedSection>
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
      <BackToTop />
    </div>
  );
};

export default Index;
