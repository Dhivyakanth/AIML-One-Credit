import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import profileImg from "@/assets/profile.jpg";
import { Mail, Phone, MapPin, Download, ChevronDown } from "lucide-react";
import MagneticButton from "./MagneticButton";


const roles = ["Full Stack Developer", "AI & ML Engineer", "Problem Solver", "Tech Enthusiast"];

const navItems = ["about", "skills", "experience", "projects", "education", "contact"];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const [roleIndex, setRoleIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Track scroll directly to avoid spring lag that can feel sticky.
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -52]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.01]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Nav scroll progress
  const scrollProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for navbar
  useEffect(() => {
    let ticking = false;

    const updateOnScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      for (const id of [...navItems].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateOnScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Character animation variants
  const titleChars = "I'M A".split("");
  const roleChars = "FULL STACK".split("");

  const charVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.4 + i * 0.04,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  const pillVariants = {
    hidden: { opacity: 0, scale: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 1.0 + i * 0.1,
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-[125svh] md:min-h-[120svh] flex flex-col justify-center overflow-hidden"
    >
      {/* Background Video & Gradient overlay */}
      <motion.div className="absolute inset-0 w-full h-full overflow-hidden" style={{ opacity: bgOpacity }}>
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-particles-floating-against-a-dark-background-154-large.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Gradients to blend the video smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08)_0%,transparent_60%)] z-10" />
      </motion.div>

      {/* Ambient glow backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.07] blur-[120px] bg-primary pointer-events-none animate-float" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px] bg-primary pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* ===== NAVBAR ===== */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "glass-strong shadow-[0_4px_30px_hsl(0_0%_0%/0.3)]"
            : "bg-transparent"
          }`}
      >
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4">
          <MagneticButton
            as="div"
            strength={0.2}
            className="font-heading text-lg font-bold tracking-tight"
          >
            <span className="gradient-text">DHIVYAKANTH</span>
          </MagneticButton>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((id) => (
              <MagneticButton
                key={id}
                as="button"
                strength={0.15}
                radius={80}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                className={`relative capitalize px-4 py-2 text-sm transition-all duration-300 bg-transparent border-none cursor-pointer rounded-full ${activeSection === id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {activeSection === id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{id}</span>
              </MagneticButton>
            ))}
          </div>

          <MagneticButton
            as="button"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300 animate-glow-pulse border-none cursor-pointer"
          >
            Hire Me
          </MagneticButton>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="h-[2px] bg-gradient-to-r from-primary via-primary/80 to-primary/50 origin-left"
          style={{ width: scrollProgress }}
        />
      </motion.nav>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative flex flex-col items-center text-center pt-24 pb-8 px-6 md:pt-24 md:pb-10">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ y: titleY }}
          className="text-primary text-sm font-mono tracking-widest mb-4 z-[1]"
        >
          {"// Hello World".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.04 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        {/* Big Title with character animation */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="z-[1] will-change-transform"
        >
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-foreground leading-none whitespace-nowrap">
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={charVariants}
                className="inline-block"
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-none mt-2">
            {roleChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i + titleChars.length}
                initial="hidden"
                animate="visible"
                variants={charVariants}
                className="inline-block gradient-text"
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            {" "}
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-foreground"
            >
              DEVELOPER
            </motion.span>
          </h1>
        </motion.div>

        {/* Role cycling text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ y: titleY }}
          className="h-8 mt-2 z-[1] flex items-center gap-2"
        >
          <span className="text-primary font-mono text-sm">{">"}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-muted-foreground text-sm font-mono tracking-wider"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="text-primary font-mono text-sm"
          >
            |
          </motion.span>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ y: titleY, opacity: titleOpacity }}
          className="w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent my-6 z-[1]"
        />

        {/* Profile Image with 3D effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotateX: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.6, duration: 1.2, type: "spring", stiffness: 100 }}
          style={{ y: imageY, scale: imageScale }}
          className="relative group mb-6 z-[5] will-change-transform"
        >
          <motion.div
            whileHover={{ rotateY: 8, rotateX: -5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative w-40 h-48 md:w-52 md:h-64 rounded-2xl overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors duration-500"
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
              <span className="w-3 h-3 rounded-full bg-emerald-500 block relative">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </span>
            </div>
          </motion.div>
          {/* Glow behind image */}
          <div className="absolute -inset-8 rounded-3xl opacity-0 group-hover:opacity-40 blur-3xl bg-primary transition-all duration-700 -z-10" />
          {/* Animated ring */}
          <div className="absolute -inset-3 rounded-3xl border border-primary/0 group-hover:border-primary/20 transition-all duration-700" />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          style={{ y: contentY }}
          className="max-w-2xl space-y-3 mb-6 z-[5]"
        >
          <p className="font-heading text-sm md:text-base uppercase tracking-wider text-muted-foreground leading-relaxed">
            <span className="text-primary font-mono">&lt;p&gt;</span> I craft fast, scalable, and{" "}
            <span className="gradient-text font-semibold" style={{ WebkitTextFillColor: "unset", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>intelligent systems</span>{" "}
            with modern AI/ML frameworks — combining deep learning with robust{" "}
            <span className="gradient-text font-semibold" style={{ WebkitTextFillColor: "unset", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>full-stack solutions</span>{" "}
            using React & Node.js. <span className="text-primary font-mono">&lt;/p&gt;</span>
          </p>
          <p className="hidden md:block text-sm text-muted-foreground/70 leading-relaxed max-w-lg mx-auto">
            I thrive on solving real-world problems, turning ideas into clean, maintainable code,
            and learning through experimentation. You'll find me building side projects, diving
            into new tech stacks, or simply exploring AI development.
          </p>
        </motion.div>

        {/* Contact info pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground mb-6 z-[5]"
        >
          {[
            { icon: Mail, text: "dhivyakanth20@gmail.com" },
            { icon: Phone, text: "8072181949" },
            { icon: MapPin, text: "Tiruchengode, Namakkal" },
          ].map((item, i) => (
            <motion.span
              key={item.text}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={pillVariants}
              whileHover={{ y: -3, scale: 1.02, boxShadow: "0 0 25px hsl(var(--primary) / 0.15)" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full glass border border-border/50 hover:border-primary/30 transition-colors duration-300"
            >
              <item.icon className="w-4 h-4 text-primary" />
              {item.text}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-4 z-[5]"
        >
          <MagneticButton
            as="a"
            href="/1Dhivyakanth_Final_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-all duration-300 group"
          >
            <Download className="w-4 h-4 group-hover:animate-bounce-gentle" />
            My Resume
          </MagneticButton>

          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/dhivyakanth-p-409a30291/" },
            { label: "GitHub", href: "https://github.com/Dhivyakanth" },
            { label: "LeetCode", href: "https://leetcode.com/u/4CSqeEzFyk/" },
          ].map((link, i) => (
            <MagneticButton
              key={link.label}
              as="a"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono animated-underline"
            >
              / {link.label}
            </MagneticButton>
          ))}
        </motion.div>
      </div>





      {/* Code tag divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex items-center justify-center gap-4 px-6 my-2"
      >
        <span className="text-primary font-mono text-sm">&lt;/</span>
        <div className="flex-1 max-w-3xl h-px bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40" />
        <span className="text-primary font-mono text-sm">&gt;</span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary/50" />
        </motion.div>
        <span className="text-[10px] text-muted-foreground/50 tracking-widest uppercase">Scroll</span>
      </motion.div>

      {/* Side scroll text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent" />
        <span className="text-xs text-muted-foreground/40 tracking-widest" style={{ writingMode: "vertical-lr" }}>
          SCROLL
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
