import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Java", "Python", "C", "JavaScript", "SQL"],
  },
  {
    title: "Web Technologies",
    skills: ["HTML", "CSS", "React JS", "Node.js", "Express.js"],
  },
  {
    title: "AI / ML",
    skills: ["Machine Learning", "Computer Vision", "TensorFlow", "MediaPipe"],
  },
  {
    title: "Tools",
    skills: ["Power BI", "JDBC", "GitHub", "REST APIs"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label mb-3">// Skills</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-16">
          Tech Stack & Expertise
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl bg-card border border-border p-6 hover:border-primary/30 transition-colors"
          >
            <h3 className="font-heading text-sm font-semibold text-primary mb-4 tracking-wide">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 grid grid-cols-3 gap-6 max-w-2xl"
      >
        {[
          { value: "9.0", label: "CGPA" },
          { value: "3+", label: "Internships" },
          { value: "4+", label: "Projects" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-4xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
