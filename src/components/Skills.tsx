import { motion } from "framer-motion";
import GlowCard from "./GlowCard";
import TextReveal from "./TextReveal";
import InlineImageCard from "./InlineImageCard";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: "{ }",
    skills: ["Java", "Python", "C", "JavaScript", "SQL"],
  },
  {
    title: "Web Technologies",
    icon: "</>",
    skills: ["HTML", "CSS", "React JS", "Node.js", "Express.js"],
  },
  {
    title: "AI / ML",
    icon: "⚡",
    skills: ["Machine Learning", "Computer Vision", "TensorFlow", "MediaPipe"],
  },
  {
    title: "Tools & Platforms",
    icon: "⚙️",
    skills: ["Power BI", "JDBC", "GitHub", "REST APIs"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const skillPillVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 15 },
  visible: (j: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: j * 0.06, type: "spring" as const, stiffness: 400, damping: 20 },
  }),
};

// Animated counter component
const AnimatedCounter = ({ value, label }: { value: string; label: string }) => {
  const numericPart = value.replace(/[^0-9.]/g, "");
  const suffix = value.replace(/[0-9.]/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="text-center group"
    >
      <motion.p
        className="font-heading text-3xl font-bold gradient-text"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {numericPart}{suffix}
      </motion.p>
      <p className="text-xs text-muted-foreground mt-1 group-hover:text-primary/70 transition-colors duration-300">
        {label}
      </p>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[100px] bg-primary pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start"
        >
          <p className="section-label mb-3">// Skills</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
            <TextReveal splitBy="word" variant="fade-up">Tech Stack & Expertise</TextReveal>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            <span className="text-primary font-mono">&lt;p&gt;</span> Continuously evolving my toolkit to build{" "}
            <span className="gradient-text font-semibold" style={{ WebkitTextFillColor: "unset" }}>intelligent, scalable</span> solutions across the full stack.{" "}
            <span className="text-primary font-mono">&lt;/p&gt;</span>
          </p>

          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "9.0", label: "CGPA" },
              { value: "3+", label: "Internships" },
              { value: "4+", label: "Projects" },
            ].map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          <div className="flex items-center gap-3 mt-8">
            <span className="text-primary font-mono text-sm">&lt;/</span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
            <span className="text-primary font-mono text-sm">&gt;</span>
          </div>

          <div className="mt-8">
            <InlineImageCard
              src="/skills-tech.webp"
              alt="AI full stack development visualization"
              badge="AI"
              label="AI Full Stack Development"
              aspectRatio="video"
              delay={0.25}
              showStatus
            />
          </div>

        </motion.div>

        {/* Right skill cards */}
        <motion.div
          className="lg:w-2/3 space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {skillCategories.map((cat, i) => (
            <motion.div key={cat.title} variants={cardVariants}>
              <GlowCard className="rounded-xl border border-border/50" tiltStrength={6}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <motion.span
                        whileHover={{ rotate: 15, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono text-sm font-bold group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-300"
                      >
                        {cat.icon}
                      </motion.span>
                      <h3 className="font-heading text-base font-semibold text-foreground tracking-wide group-hover:text-primary transition-colors duration-300">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="text-xs text-muted-foreground/50 font-mono group-hover:text-primary/40 transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {cat.skills.map((skill, j) => (
                      <motion.span
                        key={skill}
                        custom={j}
                        variants={skillPillVariants}
                        whileHover={{
                          scale: 1.12,
                          y: -4,
                          boxShadow: "0 0 20px hsl(152 100% 50% / 0.2)",
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="px-4 py-2 rounded-full bg-secondary/60 text-secondary-foreground text-sm font-medium border border-border/30 hover:border-primary/50 hover:bg-primary/15 hover:text-primary transition-colors duration-300 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Hover glow line at bottom */}
                  <div className="mt-5 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent transition-all duration-700" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
