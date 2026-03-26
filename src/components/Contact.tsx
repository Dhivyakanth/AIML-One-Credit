import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GlowCard from "./GlowCard";
import MagneticButton from "./MagneticButton";
import TextReveal from "./TextReveal";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

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

  const inputClasses = (name: string) =>
    `w-full px-4 py-3.5 rounded-xl bg-card/80 border text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-300 input-glow ${focused === name ? "border-primary/50" : "border-border/50"
    }`;

  return (
    <section id="contact" className="py-24 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[120px] bg-primary pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="section-label mb-3 text-center">// Contact</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 text-center">
          <TextReveal splitBy="word" variant="fade-up">Let's Work Together</TextReveal>
        </h2>
        <p className="text-muted-foreground mb-16 max-w-lg mx-auto text-center text-sm">
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
          {[
            { id: "name", label: "Your Name", type: "text", placeholder: "John Doe", maxLength: 100 },
            { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com", maxLength: 255 },
          ].map((field) => (
            <div key={field.id} className="relative">
              <motion.label
                htmlFor={field.id}
                animate={{
                  y: focused === field.id || form[field.id as keyof typeof form] ? -28 : 0,
                  scale: focused === field.id || form[field.id as keyof typeof form] ? 0.85 : 1,
                  color: focused === field.id
                    ? "hsl(152 100% 50%)"
                    : "hsl(0 0% 50%)",
                }}
                transition={{ duration: 0.2 }}
                className="absolute left-4 top-3.5 text-sm pointer-events-none origin-left"
              >
                {field.label}
              </motion.label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                maxLength={field.maxLength}
                value={form[field.id as keyof typeof form]}
                onChange={handleChange}
                onFocus={() => setFocused(field.id)}
                onBlur={() => setFocused(null)}
                placeholder={focused === field.id ? field.placeholder : ""}
                className={inputClasses(field.id)}
              />
            </div>
          ))}

          <div className="relative">
            <motion.label
              htmlFor="message"
              animate={{
                y: focused === "message" || form.message ? -28 : 0,
                scale: focused === "message" || form.message ? 0.85 : 1,
                color: focused === "message"
                  ? "hsl(152 100% 50%)"
                  : "hsl(0 0% 50%)",
              }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 top-3.5 text-sm pointer-events-none origin-left"
            >
              Message
            </motion.label>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={1000}
              value={form.message}
              onChange={handleChange}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              placeholder={focused === "message" ? "Tell me about your project..." : ""}
              className={`${inputClasses("message")} resize-none`}
            />
          </div>

          <MagneticButton
            as="button"
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-all duration-300 disabled:opacity-50 border-none cursor-pointer"
          >
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {sending ? "Opening..." : "Send Message"}
          </MagneticButton>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          variants={containerVariants}
          className="space-y-5 flex flex-col justify-center"
        >
          {[
            {
              href: "mailto:dhivyakanth20@gmail.com",
              icon: Mail,
              label: "Email",
              value: "dhivyakanth20@gmail.com",
            },
            {
              href: "tel:8072181949",
              icon: Phone,
              label: "Phone",
              value: "8072181949",
            },
          ].map((contact) => (
            <motion.div key={contact.label} variants={itemVariants}>
              <a href={contact.href} className="block">
                <GlowCard className="rounded-xl border border-border/50" tiltStrength={4}>
                  <div className="flex items-center gap-4 px-6 py-4">
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <contact.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-xs text-muted-foreground">{contact.label}</p>
                      <p className="text-sm font-medium text-foreground">{contact.value}</p>
                    </div>
                  </div>
                </GlowCard>
              </a>
            </motion.div>
          ))}

          <motion.div variants={itemVariants}>
            <GlowCard className="rounded-xl border border-border/50" tiltStrength={4}>
              <div className="flex items-center gap-4 px-6 py-4">
                <motion.div
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <MapPin className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">Tiruchengode, Namakkal</p>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6 px-6 pt-4">
            {[
              { label: "LinkedIn", href: "https://linkedin.com" },
              { label: "GitHub", href: "https://github.com" },
              { label: "LeetCode", href: "https://leetcode.com" },
            ].map((link) => (
              <MagneticButton
                key={link.label}
                as="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm animated-underline"
              >
                {link.label}
              </MagneticButton>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-24 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground/60"
      >
        <span>© 2025 Dhivyakanth P. All rights reserved.</span>
        <span className="mt-2 sm:mt-0 gradient-text font-medium" style={{ WebkitTextFillColor: "unset" }}>
          Aspiring AI Full-Stack Developer
        </span>
      </motion.div>
    </section>
  );
};

export default Contact;
