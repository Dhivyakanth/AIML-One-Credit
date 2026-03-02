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
          <motion.div
            variants={itemVariants}
            data-cursor-text="Education"
            className="rounded-xl bg-card border border-border p-6 hover:border-primary/30 transition-colors duration-300"
          >
            <h4 className="font-heading font-semibold text-foreground">
              K.S. Rangasamy College of Technology
            </h4>
            <p className="text-sm text-primary mt-1">B.E. in Computer Science and Engineering</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-muted-foreground">CGPA: 9.0 / 10</span>
              <span className="text-xs text-muted-foreground font-mono">2024 – 2027</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl bg-card border border-border p-6 hover:border-primary/30 transition-colors duration-300"
          >
            <h4 className="font-heading font-semibold text-foreground">
              K.S.R Matric Higher Secondary School
            </h4>
            <p className="text-sm text-primary mt-1">Higher Secondary Education</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-muted-foreground">Percentage: 93%</span>
              <span className="text-xs text-muted-foreground font-mono">2021 – 2024</span>
            </div>
          </motion.div>
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
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
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
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
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
