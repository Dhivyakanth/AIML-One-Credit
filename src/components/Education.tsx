import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import GlowCard from "./GlowCard";
import TextReveal from "./TextReveal";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: 25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const Education = () => {
  return (
    <section id="education" className="py-24 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[120px] bg-primary pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="section-label mb-3">// Education & Certifications</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-16">
          <TextReveal splitBy="word" variant="fade-up">Academic Background</TextReveal>
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Education */}
        <div className="space-y-6">
          <motion.h3
            variants={itemVariants}
            className="font-heading text-lg font-semibold text-foreground flex items-center gap-2 mb-6"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <GraduationCap className="w-5 h-5 text-primary" />
            </motion.div>
            Education
          </motion.h3>

          {[
            {
              school: "K.S. Rangasamy College of Technology",
              degree: "B.E. in Computer Science and Engineering",
              score: "CGPA: 9.0 / 10",
              year: "2024 – 2027",
            },
            {
              school: "K.S.R Matric Higher Secondary School",
              degree: "Higher Secondary Education",
              score: "Percentage: 93%",
              year: "2021 – 2024",
            },
          ].map((edu) => (
            <motion.div key={edu.school} variants={itemVariants}>
              <GlowCard className="rounded-xl border border-border/50" tiltStrength={5}>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {edu.school}
                      </h4>
                      <p className="text-sm text-primary mt-1">{edu.degree}</p>
                    </div>
                    <motion.div
                      className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                    >
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </motion.div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-muted-foreground">{edu.score}</span>
                    <span className="text-xs text-muted-foreground/60 font-mono">{edu.year}</span>
                  </div>
                  <div className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent transition-all duration-700" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Certifications + Achievements */}
        <div className="space-y-8">
          <div>
            <motion.h3
              variants={itemVariants}
              className="font-heading text-lg font-semibold text-foreground flex items-center gap-2 mb-6"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Award className="w-5 h-5 text-primary" />
              </motion.div>
              Certifications
            </motion.h3>
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "Infosys Java Programming Certification",
                "Oracle Cloud Infrastructure AI Foundation Associate",
                "Oracle Cloud DevOps Professional",
                "Oracle Cloud Generative AI Professional",
              ].map((cert, i) => (
                <motion.li
                  key={cert}
                  variants={listItemVariants}
                  whileHover={{ x: 8, transition: { duration: 0.2, type: "spring", stiffness: 400 } }}
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default group/item"
                >
                  <motion.span
                    className="mt-1.5 w-2 h-2 rounded-full bg-primary/60 flex-shrink-0"
                    whileHover={{ scale: 1.8, boxShadow: "0 0 12px hsl(152 100% 50% / 0.6)" }}
                  />
                  <span className="group-hover/item:text-foreground transition-colors duration-300">
                    {cert}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div>
            <motion.h3
              variants={itemVariants}
              className="font-heading text-lg font-semibold text-foreground flex items-center gap-2 mb-6"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <BookOpen className="w-5 h-5 text-primary" />
              </motion.div>
              Achievements
            </motion.h3>
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "Co-author of the book Hope's Tapestry",
                "Regular coding practice on LeetCode platform",
                "Selected for Smart India Hackathon (college level)",
              ].map((ach) => (
                <motion.li
                  key={ach}
                  variants={listItemVariants}
                  whileHover={{ x: 8, transition: { duration: 0.2, type: "spring", stiffness: 400 } }}
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default group/item"
                >
                  <motion.span
                    className="mt-1.5 w-2 h-2 rounded-full bg-primary/60 flex-shrink-0"
                    whileHover={{ scale: 1.8, boxShadow: "0 0 12px hsl(210 90% 56% / 0.6)" }}
                  />
                  <span className="group-hover/item:text-foreground transition-colors duration-300">
                    {ach}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
