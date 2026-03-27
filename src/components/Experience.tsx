import { motion } from "framer-motion";
import GlowCard from "./GlowCard";
import TextReveal from "./TextReveal";
import InlineImageCard from "./InlineImageCard";

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
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: 80, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const pointVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[120px] bg-primary pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start"
        >
          <p className="section-label mb-3">// Experience</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
            <TextReveal splitBy="word" variant="fade-up">Professional Working Experience</TextReveal>
          </h2>
          <div className="flex items-center gap-3 mt-6">
            <span className="text-primary font-mono text-sm">&lt;/</span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
            <span className="text-primary font-mono text-sm">&gt;</span>
          </div>

          <div className="mt-8">
            <InlineImageCard
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80"
              alt="AI generated portrait with full stack analytics"
              badge="AI"
              label="AI Work Experience"
              aspectRatio="video"
              delay={0.35}
              showStatus
            />
          </div>
        </motion.div>

        {/* Right timeline */}
        <motion.div
          className="lg:w-2/3 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-px hidden lg:block"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
          </motion.div>

          <div className="space-y-8 lg:pl-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                variants={cardVariants}
                className="relative"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute -left-8 top-6 hidden lg:block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 400 }}
                >
                  <div className="w-3 h-3 rounded-full bg-primary border-2 border-background relative">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                  </div>
                </motion.div>

                <GlowCard className="rounded-xl border border-border/50" tiltStrength={4}>
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {exp.company}
                        </h3>
                        <span className="text-xs text-primary font-mono">{exp.period}</span>
                      </div>
                      <motion.span
                        className="text-sm text-muted-foreground font-medium mt-1 sm:mt-0 px-3 py-1 rounded-full bg-primary/5 border border-primary/10"
                        whileHover={{ scale: 1.05, borderColor: "hsl(152 100% 50% / 0.3)" }}
                      >
                        {exp.title}
                      </motion.span>
                    </div>

                    {/* Animated progress bar */}
                    <div className="relative w-full h-[2px] bg-border/50 mb-4 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "65%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.15, duration: 1, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, hsl(152 100% 50%), hsl(140 100% 45%))",
                        }}
                      />
                    </div>

                    {/* Points with staggered reveal */}
                    <motion.ul
                      className="space-y-2"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {exp.points.map((point, j) => (
                        <motion.li
                          key={j}
                          custom={j}
                          variants={pointVariants}
                          className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed group/item"
                        >
                          <motion.span
                            className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0"
                            whileHover={{ scale: 1.5, boxShadow: "0 0 8px hsl(152 100% 50% / 0.5)" }}
                          />
                          <span className="group-hover/item:text-foreground/80 transition-colors duration-300">
                            {point}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
