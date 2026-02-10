import { motion } from "framer-motion";
import profileImg from "@/assets/profile.png";
import { Mail, Phone, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-16 lg:px-24 pt-24 pb-16">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 py-5 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <span className="font-heading text-lg font-bold tracking-tight text-foreground">
          DHIVYAKANTH
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
          <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#education" className="hover:text-primary transition-colors">Education</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <a
          href="#contact"
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Hire Me
        </a>
      </motion.nav>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left */}
        <div className="flex-1 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-foreground text-lg md:text-xl"
          >
            Hey, 👋 I'm an
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary leading-none"
          >
            DHIVYA
            <br />
            KANTH P
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed"
          >
            I'm a passionate AI & ML student with hands-on experience in IoT and full-stack development. Focused on building intelligent, data-driven systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              dhivyakanth20@gmail.com
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              8072181949
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Tiruchengode, Namakkal
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-4 pt-2"
          >
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">/ LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">/ GitHub</a>
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">/ LeetCode</a>
          </motion.div>
        </div>

        {/* Right - Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative flex-shrink-0"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <img
              src={profileImg}
              alt="Dhivyakanth P"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Glow behind image */}
          <div className="absolute -inset-4 rounded-3xl opacity-30 blur-3xl bg-primary -z-10" />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="mt-16 overflow-hidden border-y border-border py-4 opacity-10">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="font-heading text-6xl font-bold mx-8 text-foreground">
              DHIVYAKANTH P
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <div className="w-px h-16 bg-border" />
        <span className="text-xs text-muted-foreground tracking-widest" style={{ writingMode: "vertical-lr" }}>
          SCROLL
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
