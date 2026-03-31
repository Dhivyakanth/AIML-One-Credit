import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Starfield = () => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animId: number;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPowerDevice = isMobile || prefersReducedMotion || (navigator.hardwareConcurrency ?? 8) <= 4;
    let dpr = Math.min(window.devicePixelRatio || 1, lowPowerDevice ? 1 : 1.5);
    const targetFps = lowPowerDevice ? 20 : 30;
    const frameInterval = 1000 / targetFps;
    let lastFrameTime = 0;
    let scrollY = 0;
    let scrollRafId = 0;
    let isPageVisible = document.visibilityState === "visible";

    interface Star {
      x: number; y: number; z: number;
      baseY: number;
      size: number; brightness: number;
      twinkleSpeed: number; twinklePhase: number;
    }

    interface ShootingStar {
      x: number; y: number;
      vx: number; vy: number;
      life: number; size: number;
      tail: { x: number; y: number }[];
    }

    const stars: Star[] = [];
    const STAR_COUNT = lowPowerDevice ? 50 : 80;
    const shootingStars: ShootingStar[] = [];
    let lastShootTime = 0;
    const SHOOT_MIN = 5000;
    const SHOOT_MAX = 10000;
    let nextShootAt = Math.random() * (SHOOT_MAX - SHOOT_MIN) + SHOOT_MIN;

    let nebulaCanvas: HTMLCanvasElement | null = null;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, lowPowerDevice ? 1 : 1.5);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      // Set transform once on resize — NOT inside the render loop
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderNebula();
    };

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const renderNebula = () => {
      const width = w();
      const height = h();
      nebulaCanvas = document.createElement("canvas");
      nebulaCanvas.width = width;
      nebulaCanvas.height = height;
      const nctx = nebulaCanvas.getContext("2d");
      if (!nctx) return;

      const blobs = [
        { x: width * 0.3, y: height * 0.25, rx: width * 0.35, ry: height * 0.25, hue: 150, sat: 60, light: 15, alpha: 0.04 },
        { x: width * 0.7, y: height * 0.6, rx: width * 0.3, ry: height * 0.2, hue: 140, sat: 50, light: 12, alpha: 0.035 },
        { x: width * 0.5, y: height * 0.5, rx: width * 0.5, ry: height * 0.15, hue: 152, sat: 70, light: 18, alpha: 0.025 },
        { x: width * 0.15, y: height * 0.7, rx: width * 0.2, ry: height * 0.2, hue: 160, sat: 40, light: 14, alpha: 0.03 },
        { x: width * 0.85, y: height * 0.3, rx: width * 0.18, ry: height * 0.18, hue: 145, sat: 55, light: 16, alpha: 0.025 },
      ];

      for (const b of blobs) {
        const grad = nctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, Math.max(b.rx, b.ry));
        grad.addColorStop(0, `hsla(${b.hue}, ${b.sat}%, ${b.light}%, ${b.alpha})`);
        grad.addColorStop(0.4, `hsla(${b.hue}, ${b.sat}%, ${b.light}%, ${b.alpha * 0.6})`);
        grad.addColorStop(1, `hsla(${b.hue}, ${b.sat}%, ${b.light}%, 0)`);
        nctx.fillStyle = grad;
        nctx.beginPath();
        nctx.ellipse(b.x, b.y, b.rx, b.ry, 0, 0, Math.PI * 2);
        nctx.fill();
      }

      nctx.save();
      nctx.translate(width * 0.5, height * 0.5);
      nctx.rotate(-0.4);
      const milky = nctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.6);
      milky.addColorStop(0, "hsla(150, 60%, 20%, 0.03)");
      milky.addColorStop(0.3, "hsla(145, 50%, 15%, 0.02)");
      milky.addColorStop(1, "hsla(145, 50%, 15%, 0)");
      nctx.fillStyle = milky;
      nctx.fillRect(-width * 0.6, -height * 0.08, width * 1.2, height * 0.16);
      nctx.restore();
    };

    resize();

    for (let i = 0; i < STAR_COUNT; i++) {
      const y = Math.random();
      stars.push({
        x: Math.random(), y, baseY: y, z: Math.random(),
        size: Math.random() * 1.8 + 0.3,
        brightness: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleScroll = () => {
      if (scrollRafId) {
        return;
      }

      scrollRafId = window.requestAnimationFrame(() => {
        scrollY = window.scrollY;
        scrollRafId = 0;
      });
    };

    const handleVisibility = () => {
      isPageVisible = document.visibilityState === "visible";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    const render = (timestamp: number) => {
      if (!isPageVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      if (timestamp - lastFrameTime < frameInterval) {
        animId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = timestamp;

      const width = w();
      const height = h();
      // No setTransform here — it's set once in resize(), saves a matrix multiply every frame
      ctx.clearRect(0, 0, width, height);

      if (nebulaCanvas) {
        ctx.drawImage(nebulaCanvas, 0, 0);
      }

      // Shooting stars
      if (!lowPowerDevice && timestamp - lastShootTime > nextShootAt) {
        lastShootTime = timestamp;
        nextShootAt = Math.random() * (SHOOT_MAX - SHOOT_MIN) + SHOOT_MIN;
        const angle = Math.PI * 0.2 + (Math.random() - 0.5) * 0.4;
        const speed = 8 + Math.random() * 6;
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.25,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1, size: 1.5 + Math.random(),
          tail: [],
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.tail.push({ x: s.x, y: s.y });
        if (s.tail.length > 24) s.tail.shift();
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 1.005;
        s.vy *= 1.005;
        s.life -= 0.008;

        if (s.life <= 0 || s.x > width + 50 || s.y > height + 50) {
          shootingStars.splice(i, 1);
          continue;
        }

        if (s.tail.length > 1) {
          ctx.save();
          for (let j = 1; j < s.tail.length; j++) {
            const prev = s.tail[j - 1];
            const curr = s.tail[j];
            const progress = j / s.tail.length;
            ctx.strokeStyle = `hsla(152, 80%, 85%, ${progress * progress * s.life * 0.7})`;
            ctx.lineWidth = s.size * progress * 1.8;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.stroke();
          }
          ctx.restore();
        }

        ctx.save();
        // No shadowBlur on shooting stars — it forces a GPU compositing layer per frame
        ctx.fillStyle = `hsla(0, 0%, 100%, ${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Parallax stars — skip glow halos on low power to halve fill calls
      const scrollFactor = scrollY / height;
      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.4 + 0.6 * ((Math.sin(star.twinklePhase) + 1) / 2);
        const alpha = star.brightness * twinkle;
        const depth = 0.3 + star.z * 0.7;
        const size = star.size * depth;

        const parallaxOffset = scrollFactor * star.z * 0.15;
        const sy = ((star.baseY - parallaxOffset) % 1 + 1) % 1 * height;
        const sx = star.x * width;

        ctx.fillStyle = `hsla(0,0%,100%,${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    render(0);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (scrollRafId) {
        window.cancelAnimationFrame(scrollRafId);
      }
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, transform: "translateZ(0)", contain: "strict" }}
    />
  );
};

export default Starfield;
