import { motion } from "framer-motion";

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
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const skillPillVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: (j: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: j * 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[100px] bg-primary pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start"
        >
          <p className="section-label mb-3">// Skills</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
            Tech Stack<br />& Expertise
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            <span className="text-primary font-mono">&lt;p&gt;</span> Continuously evolving my toolkit to build{" "}
            <span className="text-primary font-semibold">intelligent, scalable</span> solutions across the full stack.{" "}
            <span className="text-primary font-mono">&lt;/p&gt;</span>
          </p>

          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "9.0", label: "CGPA" },
              { value: "3+", label: "Internships" },
              { value: "4+", label: "Projects" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-8">
            <span className="text-primary font-mono text-sm">&lt;/</span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
            <span className="text-primary font-mono text-sm">&gt;</span>
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
            <motion.div
              key={cat.title}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              data-cursor-text="Explore"
              className="group rounded-xl bg-card/80 backdrop-blur-sm border border-border p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_50px_hsl(var(--primary)/0.1),0_8px_32px_hsl(var(--primary)/0.06)] hover:bg-card/95"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <motion.span
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono text-sm font-bold group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300"
                  >
                    {cat.icon}
                  </motion.span>
                  <h3 className="font-heading text-base font-semibold text-foreground tracking-wide group-hover:text-primary transition-colors duration-300">
                    {cat.title}
                  </h3>
                </div>
                <span className="text-xs text-muted-foreground font-mono group-hover:text-primary/60 transition-colors duration-300">
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
                      scale: 1.1,
                      y: -3,
                      transition: { type: "spring", stiffness: 400, damping: 15 },
                    }}
                    className="px-4 py-2 rounded-full bg-secondary/80 text-secondary-foreground text-sm font-medium border border-border/50 hover:border-primary/60 hover:bg-primary/15 hover:text-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.12)] transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* Hover glow line at bottom */}
              <div className="mt-5 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary/50 via-primary/30 to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
