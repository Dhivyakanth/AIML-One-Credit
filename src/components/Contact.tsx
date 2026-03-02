import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    setSending(true);

    const subject = encodeURIComponent(`Portfolio Contact from ${trimmed.name}`);
    const body = encodeURIComponent(`Name: ${trimmed.name}\nEmail: ${trimmed.email}\n\n${trimmed.message}`);
    window.open(`mailto:dhivyakanth20@gmail.com?subject=${subject}&body=${body}`, "_self");

    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", message: "" });
      toast({ title: "Mail client opened!", description: "Send the email to complete your message." });
    }, 500);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="section-label mb-3">// Contact</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Let's Work Together
        </h2>
        <p className="text-muted-foreground mb-16 max-w-lg mx-auto text-center">
          I'm always open to discussing new opportunities, interesting projects, or just a friendly chat about technology.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={itemVariants}
          className="space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm text-muted-foreground mb-1.5">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              maxLength={100}
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-muted-foreground mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={255}
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm text-muted-foreground mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={1000}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {sending ? "Opening..." : "Send Message"}
          </button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          variants={containerVariants}
          className="space-y-6 flex flex-col justify-center"
        >
          <motion.a
            href="mailto:dhivyakanth20@gmail.com"
            variants={itemVariants}
            data-cursor-text="Email"
            className="flex items-center gap-4 px-6 py-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors duration-300 text-foreground"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">dhivyakanth20@gmail.com</p>
            </div>
          </motion.a>

          <motion.a
            href="tel:8072181949"
            variants={itemVariants}
            data-cursor-text="Call"
            className="flex items-center gap-4 px-6 py-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors duration-300 text-foreground"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm font-medium">8072181949</p>
            </div>
          </motion.a>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 px-6 py-4 rounded-xl bg-card border border-border text-foreground"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm font-medium">Tiruchengode, Namakkal</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6 px-6 pt-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">GitHub</a>
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">LeetCode</a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground"
      >
        <span>© 2025 Dhivyakanth P. All rights reserved.</span>
        <span className="mt-2 sm:mt-0">Aspiring AI Full-Stack Developer</span>
      </motion.div>
    </section>
  );
};

export default Contact;
