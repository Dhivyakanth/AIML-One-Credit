import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="section-label mb-3">// Contact</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
          Let's Work Together
        </h2>
        <p className="text-muted-foreground mb-12 max-w-lg mx-auto">
          I'm always open to discussing new opportunities, interesting projects, or just a friendly chat about technology.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <a
            href="mailto:dhivyakanth20@gmail.com"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border hover:border-primary/40 transition-colors text-foreground"
          >
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm">dhivyakanth20@gmail.com</span>
          </a>
          <a
            href="tel:8072181949"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border hover:border-primary/40 transition-colors text-foreground"
          >
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm">8072181949</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-8">
          <MapPin className="w-4 h-4 text-primary" />
          Tiruchengode, Namakkal
        </div>

        <div className="flex items-center justify-center gap-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">GitHub</a>
          <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">LeetCode</a>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
        <span>© 2025 Dhivyakanth P. All rights reserved.</span>
        <span className="mt-2 sm:mt-0">Aspiring AI Full-Stack Developer</span>
      </div>
    </section>
  );
};

export default Contact;
