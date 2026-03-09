import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const Education = () => {
  return (
    <section id="education" className="py-24 px-6 md:px-16 lg:px-24 bg-card/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="section-label mb-3">// Education & Certifications</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-16">
          Academic Background
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
            <GraduationCap className="w-5 h-5 text-primary" />
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
            <motion.div
              key={edu.school}
              variants={itemVariants}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              data-cursor-text="Education"
              className="group rounded-xl bg-card border border-border p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.08),0_6px_24px_hsl(var(--primary)/0.05)] hover:bg-card/95"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {edu.school}
                  </h4>
                  <p className="text-sm text-primary mt-1">{edu.degree}</p>
                </div>
                <motion.div
                  className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ rotate: 10 }}
                >
                  <GraduationCap className="w-4 h-4 text-primary" />
                </motion.div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-muted-foreground">{edu.score}</span>
                <span className="text-xs text-muted-foreground font-mono">{edu.year}</span>
              </div>
              <div className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent transition-all duration-700" />
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
              <Award className="w-5 h-5 text-primary" />
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
              ].map((cert) => (
                <motion.li
                  key={cert}
                  variants={listItemVariants}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default group"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover:shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-shadow duration-300" />
                  {cert}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div>
            <motion.h3
              variants={itemVariants}
              className="font-heading text-lg font-semibold text-foreground flex items-center gap-2 mb-6"
            >
              <BookOpen className="w-5 h-5 text-primary" />
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
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default group"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover:shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-shadow duration-300" />
                  {ach}
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
