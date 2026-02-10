import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

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

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 md:px-16 lg:px-24 bg-card/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label mb-3">// Experience</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-16">
          Work Experience
        </h2>
      </motion.div>

      <div className="space-y-8 max-w-4xl">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative pl-8 border-l-2 border-border hover:border-primary transition-colors group"
          >
            <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-secondary border-2 border-border group-hover:border-primary group-hover:bg-primary transition-colors" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                {exp.title}
              </h3>
              <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
            </div>
            <p className="text-sm text-primary/80 mb-3">{exp.company}</p>
            <ul className="space-y-1.5">
              {exp.points.map((point, j) => (
                <li key={j} className="text-sm text-muted-foreground leading-relaxed">
                  • {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
