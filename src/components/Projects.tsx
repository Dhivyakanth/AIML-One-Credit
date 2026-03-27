import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import TextReveal from "./TextReveal";
import { useIsMobile } from "@/hooks/use-mobile";

import riverAiImg from "@/assets/project_river_ai.png";
import aiChatbotImg from "@/assets/project_ai_chatbot.png";
import signLangImg from "@/assets/project_sign_language.png";

const projects = [
  {
    title: "River AI",
    subtitle: "IoT & AI Water Quality Monitoring System",
    description:
      "An IoT solution for real-time environmental assessment in water quality using pH, turbidity, temperature, TDS, and DO sensors with cloud-based monitoring. Deployed on Raspberry Pi 5 with GPS/GSM for live location tracking and remote alerts.",
    tags: ["Raspberry Pi 5", "IoT", "GPS/GSM", "Cloud Analytics", "Python", "MQTT"],
    number: "01",
    image: riverAiImg,
    accentColor: "hsl(180 100% 50%)",
    gradient: "from-cyan-500/30 via-teal-500/15 to-transparent",
    borderColor: "border-cyan-500/30",
    tagColor: "hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-400/10",
  },
  {
    title: "AI Sales Chatbot",
    subtitle: "Full-Stack Conversational AI",
    description:
      "Built a full-stack chatbot using React, Flask, and Gemini API with real-time sales data integration and responsive UI. Features context-aware conversations, product recommendations, and analytics dashboard.",
    tags: ["React", "Flask", "Gemini API", "REST APIs", "Python", "TypeScript"],
    number: "02",
    image: aiChatbotImg,
    accentColor: "hsl(270 80% 65%)",
    gradient: "from-violet-500/30 via-purple-500/15 to-transparent",
    borderColor: "border-violet-500/30",
    tagColor: "hover:border-violet-400/50 hover:text-violet-400 hover:bg-violet-400/10",
  },
  {
    title: "Sign Language Chatbot",
    subtitle: "Real-time ISL Recognition",
    description:
      "Real-time Indian Sign Language recognition using MediaPipe and OpenCV with CNN models for gesture classification and NLP-based voice responses. Achieves 94% accuracy across 26 ISL alphabets.",
    tags: ["MediaPipe", "OpenCV", "TensorFlow", "NLP", "CNN", "Python"],
    number: "03",
    image: signLangImg,
    accentColor: "hsl(152 100% 50%)",
    gradient: "from-emerald-500/30 via-teal-500/15 to-transparent",
    borderColor: "border-emerald-500/30",
    tagColor: "hover:border-emerald-400/50 hover:text-emerald-400 hover:bg-emerald-400/10",
  },
];

const getStackOffset = (index: number) => {
  const y = index * 10;
  const rotate = (index % 2 === 0 ? -1 : 1) * Math.min(2.5, index * 0.7);
  const scale = Math.max(0.9, 1 - index * 0.02);
  const zIndex = 80 - index;

  return { x: 0, y, rotate, scale, zIndex };
};

const getSpreadOffset = (index: number, total: number, isMobile: boolean) => {
  // Keep layout perfectly symmetric for odd and even project counts.
  const center = (total - 1) / 2;
  const relative = index - center;

  if (relative === 0) {
    return { x: 0, y: -8, rotate: 0, scale: 1.03, zIndex: 60 };
  }

  const side = relative < 0 ? -1 : 1;
  const distanceFromCenter = Math.abs(relative);
  const stepX = isMobile ? 86 : 235;
  const x = side * distanceFromCenter * stepX;
  const y = Math.min(38, distanceFromCenter * 9);
  const rotate = side * Math.min(14, 5 + distanceFromCenter * 1.4);
  const scale = Math.max(isMobile ? 0.92 : 0.94, 1 - distanceFromCenter * 0.03);
  const zIndex = 60 - distanceFromCenter;

  return { x, y, rotate, scale, zIndex };
};

const DESKTOP_CENTER_NUDGE_X = -26;
const MOBILE_CENTER_NUDGE_X = -10;

const ProjectCard = ({
  project,
  index,
  total,
  isSpread,
  hasHoveredCard,
  isHovered,
  isMobile,
  onHoverStart,
  onHoverEnd,
  onClick,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
  isSpread: boolean;
  hasHoveredCard: boolean;
  isHovered: boolean;
  isMobile: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}) => {
  const centerNudgeX = isMobile ? MOBILE_CENTER_NUDGE_X : DESKTOP_CENTER_NUDGE_X;
  const stackOffset = getStackOffset(index);
  const carpetOffset = getSpreadOffset(index, total, isMobile);
  const targetOffset = isSpread ? carpetOffset : stackOffset;
  const isDimmed = hasHoveredCard && !isHovered;

  return (
    <motion.div
      className="absolute top-0 left-1/2 -translate-x-1/2 cursor-pointer"
      style={{ zIndex: isHovered ? 90 : targetOffset.zIndex }}
      initial={{ opacity: 0, y: 55, scale: 0.92 }}
      animate={{
        x: targetOffset.x + centerNudgeX,
        y: targetOffset.y,
        rotate: targetOffset.rotate,
        scale: isHovered ? targetOffset.scale + 0.04 : targetOffset.scale,
        filter: isDimmed ? "blur(3.5px) saturate(0.7) brightness(0.6)" : "blur(0px) saturate(1) brightness(1)",
        opacity: isDimmed ? 0.45 : 1,
      }}
      whileHover={{ y: targetOffset.y - 14 }}
      transition={{
        duration: isSpread ? 0.95 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: isSpread ? index * 0.12 : index * 0.04,
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    >
      <div
        className={`group ${isMobile ? "w-[min(74vw,280px)]" : "w-[360px]"} h-[420px] rounded-2xl border ${project.borderColor} bg-card/80 backdrop-blur-md overflow-hidden shadow-2xl`}
        style={{
          borderColor: isHovered ? `${project.accentColor}70` : undefined,
          boxShadow:
            isHovered
              ? `0 26px 80px -10px ${project.accentColor}45, 0 8px 30px rgba(0,0,0,0.65)`
              : `0 14px 45px -10px ${project.accentColor}18, 0 8px 30px rgba(0,0,0,0.55)`,
        }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b ${project.gradient} mix-blend-overlay`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/90" />

          {/* Number badge */}
          <div
            className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono border"
            style={{
              background: `${project.accentColor}20`,
              borderColor: `${project.accentColor}40`,
              color: project.accentColor,
            }}
          >
            {project.number}
          </div>

          <motion.div
            whileHover={{ scale: 1.15, rotate: 45 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        {/* Content (visible on top card) */}
        <div className="p-5">
          <p className="text-xs font-mono mb-1" style={{ color: project.accentColor }}>
            {project.subtitle}
          </p>
          <h3 className="font-heading text-xl font-bold text-foreground mb-2">{project.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-secondary/60 text-secondary-foreground text-[10px] font-medium border border-border/30"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-full bg-secondary/40 text-muted-foreground text-[10px] border border-border/20">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accentColor}60, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
};

const ProjectModal = ({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Card */}
      <motion.div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden border"
        style={{
          borderColor: project.accentColor + "40",
          boxShadow: `0 30px 80px -10px ${project.accentColor}30, 0 0 0 1px ${project.accentColor}25`,
          background: "hsl(0 0% 6%)",
        }}
        initial={{ scale: 0.7, y: 80, rotateX: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-70`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(0_0%_6%)]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Number */}
          <div
            className="absolute bottom-4 left-6 font-heading text-6xl font-bold opacity-20"
            style={{ color: project.accentColor }}
          >
            {project.number}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <p className="text-xs font-mono mb-1" style={{ color: project.accentColor }}>
            {project.subtitle}
          </p>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.06, y: -2 }}
                className={`px-3 py-1 rounded-full bg-secondary/60 text-secondary-foreground text-xs font-medium border border-border/30 transition-all duration-300 ${project.tagColor}`}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Action */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{
                background: `${project.accentColor}18`,
                border: `1px solid ${project.accentColor}40`,
                color: project.accentColor,
              }}
            >
              <ExternalLink className="w-4 h-4" />
              View Project
            </motion.button>

            <button
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Bottom glow line */}
        <div
          className="h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accentColor}80, transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const DeckStack = ({
  projects: deckProjects,
}: {
  projects: typeof projects;
}) => {
  const isMobile = useIsMobile();
  const [isSpreadActive, setIsSpreadActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalProject, setModalProject] = useState<(typeof projects)[0] | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const isDeckInView = useInView(deckRef, { once: false, margin: "-15% 0px -20% 0px" });

  useEffect(() => {
    if (isDeckInView) {
      const timer = setTimeout(() => setIsSpreadActive(true), 90);
      return () => clearTimeout(timer);
    }

    setHoveredIndex(null);
    setIsSpreadActive(false);
  }, [isDeckInView]);

  return (
    <>
      <div
        className="relative flex flex-col items-center"
        ref={deckRef}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="w-screen relative left-1/2 -translate-x-1/2 flex justify-center px-4 sm:px-6">
          <div
            className="relative"
            style={{
              height: "520px",
              width: isMobile ? "min(100%, 620px)" : "1080px",
              maxWidth: "100%",
            }}
          >
            {deckProjects.map((project, index) => (
              <ProjectCard
                key={project.number}
                project={project}
                index={index}
                total={deckProjects.length}
                isSpread={isSpreadActive}
                hasHoveredCard={hoveredIndex !== null}
                isHovered={hoveredIndex === index}
                isMobile={isMobile}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setModalProject(project)}
              />
            ))}
          </div>
        </div>

        <motion.p
          className="text-[11px] text-muted-foreground/55 mt-6 font-mono tracking-wide"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          hover to spotlight · click any card to explore
        </motion.p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal
            project={modalProject}
            onClose={() => setModalProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-16 lg:px-24 relative overflow-x-clip overflow-y-visible">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[130px] bg-primary pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px] bg-violet-500 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="section-label mb-3">// Projects</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            <TextReveal splitBy="word" variant="fade-up">
              A Showcase of My Latest Projects
            </TextReveal>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm text-muted-foreground max-w-sm mt-4 lg:mt-0 leading-relaxed"
        >
          <span className="text-primary font-mono">&lt;p&gt;</span> Each project represents a unique
          challenge solved with{" "}
          <span className="gradient-text font-semibold" style={{ WebkitTextFillColor: "unset" }}>
            cutting-edge technology
          </span>
          .{" "}
          <span className="text-primary font-mono">&lt;/p&gt;</span>
        </motion.p>
      </div>

      {/* Code divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-primary font-mono text-sm">&lt;/</span>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40" />
        <span className="text-primary font-mono text-sm">&gt;</span>
      </motion.div>

      {/* Deck of Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <DeckStack projects={projects} />
      </motion.div>
    </section>
  );
};

export default Projects;
