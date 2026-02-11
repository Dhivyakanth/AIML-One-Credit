import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import profileImg from "@/assets/profile.jpg";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <motion.div className="absolute inset-0" style={{ opacity: bgOpacity }}>
        <ParticleBackground />
      </motion.div>

      {/* Ambient glow backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.07] blur-[120px] bg-primary pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px] bg-primary pointer-events-none" />

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
          {["about", "skills", "experience", "projects", "education", "contact"].map((id) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="capitalize hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              {id}
            </button>
          ))}
        </div>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Hire Me
        </button>
      </motion.nav>

      {/* Main Content - Centered Layout with Parallax */}
      <div className="relative z-10 flex flex-col items-center text-center pt-32 pb-16 px-6">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ y: titleY }}
          className="text-primary text-sm font-mono tracking-widest mb-6"
        >
          // Hello World
        </motion.p>

        {/* Big Title with parallax */}
        <motion.div style={{ y: titleY }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-foreground leading-none whitespace-nowrap"
          >
            I'M A FULL
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-foreground leading-none mt-2"
          >
            <span className="text-primary">STACK</span> DEVELOPER
          </motion.h1>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent my-10"
        />

        {/* Profile Image with 3D hover + parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ delay: 0.5, duration: 1, type: "spring" }}
          style={{ y: imageY }}
          className="relative group mb-10"
        >
          <motion.div
            whileHover={{ rotateY: 8, rotateX: -5, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative w-64 h-72 md:w-80 md:h-96 rounded-2xl overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors duration-500"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={profileImg}
              alt="Dhivyakanth P - AI & ML Developer"
              className="w-full h-full object-cover object-top"
            />
            {/* Status dot */}
            <div className="absolute bottom-6 right-6 z-20">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse block" />
            </div>
          </motion.div>
          <div className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-30 blur-3xl bg-primary transition-opacity duration-700 -z-10" />
        </motion.div>

        {/* Description with parallax */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ y: contentY }}
          className="max-w-2xl space-y-4 mb-8"
        >
          <p className="font-heading text-sm md:text-base uppercase tracking-wider text-muted-foreground leading-relaxed">
            <span className="text-primary font-mono">&lt;p&gt;</span> I craft fast, scalable, and{" "}
            <span className="text-primary font-semibold">intelligent systems</span>{" "}
            with modern AI/ML frameworks — combining deep learning with robust{" "}
            <span className="text-primary font-semibold">full-stack solutions</span>{" "}
            using React & Node.js. <span className="text-primary font-mono">&lt;/p&gt;</span>
          </p>
          <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-lg mx-auto">
            I thrive on solving real-world problems, turning ideas into clean, maintainable code,
            and learning through experimentation. You'll find me building side projects, diving
            into new tech stacks, or simply exploring AI development.
          </p>
        </motion.div>

        {/* Contact info pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ y: contentY }}
          className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-8"
        >
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <Mail className="w-4 h-4 text-primary" />
            dhivyakanth20@gmail.com
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <Phone className="w-4 h-4 text-primary" />
            8072181949
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <MapPin className="w-4 h-4 text-primary" />
            Tiruchengode, Namakkal
          </span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/Dhivyakanth_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-105 hover:shadow-[0_0_30px_hsl(152_100%_60%/0.3)] transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            My Resume
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono">/ LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono">/ GitHub</a>
          <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono">/ LeetCode</a>
        </motion.div>
      </div>

      {/* Code tag divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="flex items-center justify-center gap-4 px-6 my-4"
      >
        <span className="text-primary font-mono text-sm">&lt;/</span>
        <div className="flex-1 max-w-3xl h-px bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40" />
        <span className="text-primary font-mono text-sm">&gt;</span>
      </motion.div>

      {/* Marquee */}
      <div className="mt-8 overflow-hidden border-y border-border py-4 opacity-10">
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
        transition={{ delay: 1.4 }}
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
