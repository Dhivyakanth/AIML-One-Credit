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

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[100px] bg-primary pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

          {/* Stats */}
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
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Code divider */}
          <div className="flex items-center gap-3 mt-8">
            <span className="text-primary font-mono text-sm">&lt;/</span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
            <span className="text-primary font-mono text-sm">&gt;</span>
          </div>
        </motion.div>

        {/* Right skill cards */}
        <div className="lg:w-2/3 space-y-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group rounded-xl bg-card/80 backdrop-blur-sm border border-border p-6 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_hsl(152_100%_60%/0.06)]"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono text-sm font-bold">
                    {cat.icon}
                  </span>
                  <h3 className="font-heading text-base font-semibold text-foreground tracking-wide">
                    {cat.title}
                  </h3>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + j * 0.06, duration: 0.4 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-4 py-2 rounded-full bg-secondary/80 text-secondary-foreground text-sm font-medium border border-border/50 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
