import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GlowCard from "./GlowCard";
import TextReveal from "./TextReveal";

const projects = [
  {
    title: "River AI",
    subtitle: "IoT & AI Water Quality Monitoring System",
    description:
      "An IoT solution for real-time environmental assessment in water quality using pH, turbidity, temperature, TDS, and DO sensors with cloud-based monitoring.",
    tags: ["Raspberry Pi 5", "IoT", "GPS/GSM", "Cloud Analytics"],
    number: "01",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    title: "AI Sales Chatbot",
    subtitle: "Full-Stack Conversational AI",
    description:
      "Built a full-stack chatbot using React, Flask, and Gemini API with real-time sales data integration and responsive UI.",
    tags: ["React", "Flask", "Gemini API", "REST APIs"],
    number: "02",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },
  {
    title: "Sign Language Chatbot",
    subtitle: "Real-time ISL Recognition",
    description:
      "Real-time Indian Sign Language recognition using MediaPipe and OpenCV with CNN models for gesture classification and NLP-based voice responses.",
    tags: ["MediaPipe", "OpenCV", "TensorFlow", "NLP"],
    number: "03",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      type: "spring" as const,
      stiffness: 400,
      damping: 20,
    },
  }),
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[120px] bg-primary pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="section-label mb-3">// Projects</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            <TextReveal splitBy="word" variant="fade-up">A Showcase of My Latest Projects</TextReveal>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm text-muted-foreground max-w-sm mt-4 lg:mt-0 leading-relaxed"
        >
          <span className="text-primary font-mono">&lt;p&gt;</span> Each project represents a unique challenge
          solved with <span className="gradient-text font-semibold" style={{ WebkitTextFillColor: "unset" }}>cutting-edge technology</span>.{" "}
          <span className="text-primary font-mono">&lt;/p&gt;</span>
        </motion.p>
      </div>

      {/* Code divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="text-primary font-mono text-sm">&lt;/</span>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40" />
        <span className="text-primary font-mono text-sm">&gt;</span>
      </motion.div>

      {/* Project cards */}
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {projects.map((project, i) => (
          <motion.div key={project.title} variants={cardVariants}>
            <GlowCard className="rounded-2xl border border-border/50" tiltStrength={5}>
              {/* Gradient accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl`} />

              <div className="relative p-8 flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Number */}
                <div className="flex-shrink-0">
                  <motion.span
                    className="font-heading text-7xl font-bold gradient-text opacity-30 group-hover:opacity-60 transition-opacity duration-500 block"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.number}
                  </motion.span>
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
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="flex-shrink-0 w-10 h-10 rounded-full border border-border/50 group-hover:border-primary/40 group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300"
                    >
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {project.description}
                  </p>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {project.tags.map((tag, j) => (
                      <motion.span
                        key={tag}
                        custom={j}
                        variants={tagVariants}
                        whileHover={{
                          scale: 1.08,
                          y: -2,
                          boxShadow: "0 0 15px hsl(152 100% 50% / 0.15)",
                        }}
                        className="px-3 py-1.5 rounded-full bg-secondary/60 text-secondary-foreground text-xs font-medium border border-border/30 hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Bottom gradient line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 1, ease: "easeOut" }}
                className="h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
              />
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
