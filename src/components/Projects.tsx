import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "River AI",
    subtitle: "IoT & AI Water Quality Monitoring System",
    description:
      "An IoT solution for real-time environmental assessment in water quality using pH, turbidity, temperature, TDS, and DO sensors with cloud-based monitoring.",
    tags: ["Raspberry Pi 5", "IoT", "GPS/GSM", "Cloud Analytics"],
    number: "01",
    accent: "from-primary/20 to-primary/5",
  },
  {
    title: "AI Sales Chatbot",
    subtitle: "Full-Stack Conversational AI",
    description:
      "Built a full-stack chatbot using React, Flask, and Gemini API with real-time sales data integration and responsive UI.",
    tags: ["React", "Flask", "Gemini API", "REST APIs"],
    number: "02",
    accent: "from-primary/15 to-transparent",
  },
  {
    title: "Sign Language Chatbot",
    subtitle: "Real-time ISL Recognition",
    description:
      "Real-time Indian Sign Language recognition using MediaPipe and OpenCV with CNN models for gesture classification and NLP-based voice responses.",
    tags: ["MediaPipe", "OpenCV", "TensorFlow", "NLP"],
    number: "03",
    accent: "from-primary/10 to-transparent",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[120px] bg-primary pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">// Projects</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            A Showcase of<br />My Latest Projects
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground max-w-sm mt-4 lg:mt-0 leading-relaxed"
        >
          <span className="text-primary font-mono">&lt;p&gt;</span> Each project represents a unique challenge
          solved with <span className="text-primary">cutting-edge technology</span>.{" "}
          <span className="text-primary font-mono">&lt;/p&gt;</span>
        </motion.p>
      </div>

      {/* Code divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="text-primary font-mono text-sm">&lt;/</span>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40" />
        <span className="text-primary font-mono text-sm">&gt;</span>
      </motion.div>

      {/* Project cards - stacked full width */}
      <div className="space-y-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="group relative rounded-2xl bg-card/80 backdrop-blur-sm border border-border overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_60px_hsl(152_100%_60%/0.08)]"
          >
            {/* Gradient accent */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

            <div className="relative p-8 flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Number */}
              <div className="flex-shrink-0">
                <span className="font-heading text-6xl font-bold text-border group-hover:text-primary/20 transition-colors duration-500">
                  {project.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs text-primary font-mono mt-1">{project.subtitle}</p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-border group-hover:border-primary/40 flex items-center justify-center transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground text-xs font-medium border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom progress line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
              className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
