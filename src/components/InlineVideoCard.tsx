import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface InlineVideoCardProps {
  src: string;
  label?: string;
  badge?: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
  delay?: number;
  glowColor?: string;
  /** Show a "LIVE" style status dot */
  showStatus?: boolean;
}

const InlineVideoCard = ({
  src,
  label,
  badge,
  className = "",
  aspectRatio = "video",
  delay = 0,
  glowColor = "hsl(152 100% 50%)",
  showStatus = false,
}: InlineVideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const aspectClass =
    aspectRatio === "video"
      ? "aspect-video"
      : aspectRatio === "square"
      ? "aspect-square"
      : "aspect-[3/4]";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.75; // Slightly slowed for cinematic feel
  }, [isLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay,
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${className}`}
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.6 : 0.15,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute -inset-[3px] rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, transparent 60%, ${glowColor})`,
          filter: "blur(8px)",
        }}
      />

      {/* Animated border */}
      <motion.div
        animate={{
          borderColor: isHovered
            ? `${glowColor.replace(")", " / 0.6)").replace("hsl(", "hsl(")}`
            : `${glowColor.replace(")", " / 0.2)").replace("hsl(", "hsl(")}`,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-2xl border pointer-events-none z-10"
        style={{ borderColor: "hsl(152 100% 50% / 0.2)" }}
      />

      {/* Glass container */}
      <div
        className={`relative rounded-2xl overflow-hidden ${aspectClass} bg-card/40 backdrop-blur-sm`}
        style={{
          boxShadow: isHovered
            ? `0 0 40px hsl(152 100% 50% / 0.25), 0 20px 60px hsl(0 0% 0% / 0.4)`
            : `0 8px 32px hsl(0 0% 0% / 0.3)`,
          transition: "box-shadow 0.5s ease",
        }}
      >
        {/* Scanline overlay for cinematic effect */}
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
          }}
        />

        {/* Corner accents */}
        {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map(
          (pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} z-30 w-4 h-4 pointer-events-none`}
              style={{
                borderTop: i < 2 ? "1.5px solid hsl(152 100% 50% / 0.5)" : "none",
                borderBottom: i >= 2 ? "1.5px solid hsl(152 100% 50% / 0.5)" : "none",
                borderLeft: i % 2 === 0 ? "1.5px solid hsl(152 100% 50% / 0.5)" : "none",
                borderRight: i % 2 === 1 ? "1.5px solid hsl(152 100% 50% / 0.5)" : "none",
              }}
            />
          )
        )}

        {/* Video */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setIsLoaded(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent z-10 pointer-events-none" />

        {/* Hover shimmer */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, hsl(152 100% 50% / 0.06) 50%, transparent 70%)",
          }}
        />

        {/* Status dot */}
        {showStatus && (
          <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[9px] text-emerald-400 font-mono tracking-widest uppercase">
              Live
            </span>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3 z-30">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-primary/20 border border-primary/30 text-primary backdrop-blur-sm">
              {badge}
            </span>
          </div>
        )}

        {/* Bottom label */}
        {label && (
          <div className="absolute bottom-0 left-0 right-0 z-30 px-4 py-3">
            <p className="text-[10px] text-muted-foreground/70 font-mono tracking-widest uppercase">
              {label}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InlineVideoCard;
