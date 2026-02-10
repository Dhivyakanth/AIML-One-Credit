import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const Education = () => {
  return (
    <section id="education" className="py-24 px-6 md:px-16 lg:px-24 bg-card/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label mb-3">// Education & Certifications</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-16">
          Academic Background
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
        {/* Education */}
        <div className="space-y-6">
          <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-primary" />
            Education
          </h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-xl bg-card border border-border p-6"
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-xl bg-card border border-border p-6"
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
            <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-primary" />
              Certifications
            </h3>
            <ul className="space-y-3">
              {[
                "Infosys Java Programming Certification",
                "Oracle Cloud Infrastructure AI Foundation Associate",
                "Oracle Cloud DevOps Professional",
                "Oracle Cloud Generative AI Professional",
              ].map((cert, i) => (
                <motion.li
                  key={cert}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {cert}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              Achievements
            </h3>
            <ul className="space-y-3">
              {[
                "Co-author of the book Hope's Tapestry",
                "Regular coding practice on LeetCode platform",
                "Selected for Smart India Hackathon (college level)",
              ].map((ach, i) => (
                <motion.li
                  key={ach}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {ach}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
