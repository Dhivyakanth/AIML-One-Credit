import { motion } from "framer-motion";
import { useState } from "react";

interface InlineImageCardProps {
  src: string;
  alt: string;
  label?: string;
  badge?: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
  delay?: number;
  glowColor?: string;
  showStatus?: boolean;
}

const InlineImageCard = ({
  src,
  alt,
  label,
  badge,
  className = "",
  aspectRatio = "video",
  delay = 0,
  glowColor = "hsl(152 100% 50%)",
  showStatus = false,
}: InlineImageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  const aspectClass =
    aspectRatio === "video"
      ? "aspect-video"
      : aspectRatio === "square"
      ? "aspect-square"
      : "aspect-[3/4]";

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
      <motion.div
        animate={{
          opacity: isHovered ? 0.58 : 0.14,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute -inset-[3px] rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, transparent 60%, ${glowColor})`,
          filter: "blur(8px)",
        }}
      />

      <div className="absolute inset-0 rounded-2xl border border-primary/20 pointer-events-none z-10" />

      <div
        className={`relative rounded-2xl overflow-hidden ${aspectClass} bg-card/40 backdrop-blur-sm`}
        style={{
          boxShadow: isHovered
            ? "0 0 40px hsl(152 100% 50% / 0.22), 0 18px 60px hsl(0 0% 0% / 0.45)"
            : "0 8px 32px hsl(0 0% 0% / 0.3)",
          transition: "box-shadow 0.45s ease",
        }}
      >
        {!hasImageError ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onError={() => setHasImageError(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_25%_20%,hsl(152_100%_50%/0.2),transparent_55%),linear-gradient(135deg,hsl(220_35%_10%),hsl(230_30%_4%))]">
            <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-mono tracking-widest uppercase">
              AI Visual
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/25 to-background/10 z-10 pointer-events-none" />

        {showStatus && (
          <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[9px] text-emerald-400 font-mono tracking-widest uppercase">Visual</span>
          </div>
        )}

        {badge && (
          <div className="absolute top-3 right-3 z-30">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-primary/20 border border-primary/30 text-primary backdrop-blur-sm">
              {badge}
            </span>
          </div>
        )}

        {label && (
          <div className="absolute bottom-0 left-0 right-0 z-30 px-4 py-3">
            <p className="text-[10px] text-muted-foreground/80 font-mono tracking-widest uppercase">{label}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InlineImageCard;
