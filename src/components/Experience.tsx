import { motion } from "framer-motion";

const experiences = [
  {
    title: "Full Stack Developer Intern",
    company: "SiDRA Hub (Inaiyam Innovations), Tiruchengode",
    period: "07/2025 – 10/2025",
    points: [
      "Built a smart agricultural advisory system with real-time weather automation (React.js, Node.js)",
      "Automated location-based weather alerts and crop advisories (n8n, APIs)",
      "Managed scalable farmer data and reporting systems (Firebase, MySQL)",
    ],
  },
  {
    title: "AIML Intern",
    company: "Hertzworkz Private Limited, Namakkal",
    period: "04/2025 – 07/2025",
    points: [
      "Built real-time computer vision applications using MediaPipe and OpenCV",
      "Trained chatbots and fine-tuned LLMs for domain-specific tasks using RAG",
      "Gained hands-on experience in model deployment, data handling, and AI system development",
    ],
  },
  {
    title: "Google for Developers – AIML Virtual Internship",
    company: "Online",
    period: "04/2025 – 06/2025",
    points: [
      "Learned TensorFlow, image classification, and object detection (SSD, Faster R-CNN)",
      "Worked on CNN feature extraction and optimization techniques",
      "Deployed real-world computer vision applications",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: 60, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 md:px-16 lg:px-24 bg-card/50">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:w-1/3"
        >
          <p className="section-label mb-3">// Experience</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
            Professional<br />Working Experience
          </h2>
          <div className="flex items-center gap-3 mt-6">
            <span className="text-primary font-mono text-sm">&lt;/</span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
            <span className="text-primary font-mono text-sm">&gt;</span>
          </div>
        </motion.div>

        {/* Right timeline - staggered */}
        <motion.div
          className="lg:w-2/3 space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              variants={cardVariants}
              data-cursor-text="Details"
              className="group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{exp.company}</h3>
                  <span className="text-xs text-primary font-mono">{exp.period}</span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">{exp.title}</span>
              </div>
              {/* Progress bar */}
              <div className="relative w-full h-px bg-border mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-primary"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.15, type: "spring", stiffness: 300 }}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background"
                  style={{ left: "60%" }}
                />
              </div>
              <ul className="space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-40 overflow-hidden">
                {exp.points.map((point, j) => (
                  <li key={j} className="text-sm text-muted-foreground leading-relaxed">
                    • {point}
                  </li>
                ))}
              </ul>
              <div className="border-b border-border mt-4" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
