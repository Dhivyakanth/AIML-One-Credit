import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "River AI",
    subtitle: "IoT & AI Water Quality Monitoring System",
    description:
      "An IoT solution for real-time environmental assessment in water quality using pH, turbidity, temperature, TDS, and DO sensors with cloud-based monitoring.",
    tags: ["Raspberry Pi 5", "IoT", "GPS/GSM", "Cloud Analytics"],
  },
  {
    title: "AI Sales Chatbot",
    subtitle: "Full-Stack Conversational AI",
    description:
      "Built a full-stack chatbot using React, Flask, and Gemini API with real-time sales data integration and responsive UI.",
    tags: ["React", "Flask", "Gemini API", "REST APIs"],
  },
  {
    title: "Sign Language Chatbot",
    subtitle: "Real-time ISL Recognition",
    description:
      "Real-time Indian Sign Language recognition using MediaPipe and OpenCV with CNN models for gesture classification and NLP-based voice responses.",
    tags: ["MediaPipe", "OpenCV", "TensorFlow", "NLP"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label mb-3">// Projects</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-16">
          A Showcase of My Latest Projects
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group rounded-xl bg-card border border-border p-6 hover:border-primary/40 transition-all hover:shadow-[var(--glow-primary)]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-heading font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
              {project.title}
            </h3>
            <p className="text-xs text-primary mb-3">{project.subtitle}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
