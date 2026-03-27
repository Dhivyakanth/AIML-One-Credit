import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type VideoSection = "about" | "skills" | "experience" | "projects" | "education" | "contact";

type VideoTheme = {
  src: string;
  overlay: string;
  fallbackGradient: string;
};

const VIDEO_THEMES: Record<VideoSection, VideoTheme> = {
  about: {
    src: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-43521-large.mp4",
    overlay: "bg-[radial-gradient(circle_at_20%_20%,hsl(160_100%_45%/0.15),transparent_42%),linear-gradient(to_bottom,hsl(220_40%_5%/0.68),hsl(230_35%_4%/0.76))]",
    fallbackGradient: "bg-[radial-gradient(circle_at_20%_20%,hsl(160_100%_45%/0.14),transparent_44%),linear-gradient(135deg,hsl(220_42%_6%),hsl(228_40%_3%))]",
  },
  skills: {
    src: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-programmer-typing-code-43543-large.mp4",
    overlay: "bg-[radial-gradient(circle_at_80%_22%,hsl(195_100%_50%/0.16),transparent_40%),linear-gradient(to_bottom,hsl(215_45%_6%/0.68),hsl(220_35%_3%/0.78))]",
    fallbackGradient: "bg-[radial-gradient(circle_at_80%_22%,hsl(195_100%_50%/0.16),transparent_42%),linear-gradient(145deg,hsl(215_45%_7%),hsl(220_38%_3%))]",
  },
  experience: {
    src: "https://assets.mixkit.co/videos/preview/mixkit-colleagues-gathered-around-a-computer-43544-large.mp4",
    overlay: "bg-[radial-gradient(circle_at_18%_78%,hsl(175_90%_45%/0.16),transparent_42%),linear-gradient(to_bottom,hsl(210_40%_6%/0.7),hsl(220_35%_3%/0.78))]",
    fallbackGradient: "bg-[radial-gradient(circle_at_18%_78%,hsl(175_90%_45%/0.15),transparent_44%),linear-gradient(135deg,hsl(208_42%_7%),hsl(220_35%_3%))]",
  },
  projects: {
    src: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-41108-large.mp4",
    overlay: "bg-[radial-gradient(circle_at_72%_22%,hsl(280_90%_65%/0.2),transparent_40%),linear-gradient(to_bottom,hsl(240_35%_6%/0.66),hsl(230_35%_4%/0.8))]",
    fallbackGradient: "bg-[radial-gradient(circle_at_72%_22%,hsl(280_90%_65%/0.2),transparent_42%),linear-gradient(135deg,hsl(238_38%_8%),hsl(228_32%_4%))]",
  },
  education: {
    src: "https://assets.mixkit.co/videos/preview/mixkit-student-writing-in-notebook-43538-large.mp4",
    overlay: "bg-[radial-gradient(circle_at_26%_30%,hsl(200_100%_55%/0.14),transparent_45%),linear-gradient(to_bottom,hsl(210_35%_7%/0.66),hsl(220_35%_4%/0.8))]",
    fallbackGradient: "bg-[radial-gradient(circle_at_26%_30%,hsl(200_100%_55%/0.14),transparent_45%),linear-gradient(145deg,hsl(212_36%_8%),hsl(223_34%_4%))]",
  },
  contact: {
    src: "https://assets.mixkit.co/videos/preview/mixkit-network-of-connections-over-a-city-1744-large.mp4",
    overlay: "bg-[radial-gradient(circle_at_82%_84%,hsl(152_100%_48%/0.14),transparent_46%),linear-gradient(to_bottom,hsl(210_30%_6%/0.66),hsl(220_30%_4%/0.82))]",
    fallbackGradient: "bg-[radial-gradient(circle_at_82%_84%,hsl(152_100%_48%/0.14),transparent_46%),linear-gradient(135deg,hsl(210_34%_8%),hsl(225_30%_4%))]",
  },
};

interface SectionVideoBackgroundProps {
  sectionIds?: string[];
  defaultSection?: VideoSection;
}

const SectionVideoBackground = ({
  sectionIds = ["about", "skills", "experience", "projects", "education", "contact"],
  defaultSection = "about",
}: SectionVideoBackgroundProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<VideoSection>(defaultSection);

  const activeTheme = useMemo(() => VIDEO_THEMES[activeSection] ?? VIDEO_THEMES.about, [activeSection]);

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) {
      return;
    }

    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sectionElements.length === 0) {
      return;
    }

    const updateFromScroll = () => {
      const viewportMiddle = window.innerHeight * 0.45;
      let bestId = defaultSection;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const el of sectionElements) {
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportMiddle);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = el.id as VideoSection;
        }
      }

      setActiveSection(bestId);
    };

    updateFromScroll();

    let ticking = false;
    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateFromScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [defaultSection, sectionIds]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className={`absolute inset-0 ${activeTheme.fallbackGradient}`} />

      {!prefersReducedMotion && (
        <AnimatePresence mode="wait">
          <motion.video
            key={activeTheme.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <source src={activeTheme.src} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
      )}

      <motion.div
        key={activeSection}
        className={`absolute inset-0 ${activeTheme.overlay}`}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(0_0%_1%/0.12),hsl(0_0%_2%/0.6))]" />
    </div>
  );
};

export default SectionVideoBackground;
