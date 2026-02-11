import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: "{ }",
    skills: [
      { name: "Java", level: 85 },
      { name: "Python", level: 90 },
      { name: "C", level: 75 },
      { name: "JavaScript", level: 88 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    title: "Web Technologies",
    icon: "</>",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "React JS", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 78 },
    ],
  },
  {
    title: "AI / ML",
    icon: "⚡",
    skills: [
      { name: "Machine Learning", level: 82 },
      { name: "Computer Vision", level: 85 },
      { name: "TensorFlow", level: 78 },
      { name: "MediaPipe", level: 80 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "⚙️",
    skills: [
      { name: "Power BI", level: 75 },
      { name: "JDBC", level: 70 },
      { name: "GitHub", level: 90 },
      { name: "REST APIs", level: 88 },
    ],
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

              <div className="space-y-3">
                {cat.skills.map((skill, j) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground group-hover/skill:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.08, duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                      />
                    </div>
                  </div>
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
