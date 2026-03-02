import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  depth: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

const STAR_COLORS = [
  "hsl(210, 90%, 65%)",    // primary blue
  "hsl(210, 80%, 80%)",    // lighter blue
  "hsl(220, 100%, 60%)",   // deeper blue
  "hsl(200, 90%, 65%)",    // sky blue
  "hsl(195, 70%, 75%)",    // cyan accent
  "hsl(0, 0%, 95%)",       // white sparkle
];

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -100, y: -100 });
  const prevMouse = useRef({ x: -100, y: -100 });
  const animationId = useRef<number>(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const lastEmit = useRef(0);

  // Config
  const particleSize = 4;
  const trailWidth = 25;
  const fadeSpeed = 0.015;
  const glowIntensity = 12;
  const motionSensitivity = 1.2;
  const maxParticles = 120;
  const emitRate = 3; // ms between emissions

  const createParticle = useCallback((x: number, y: number, speed: number): Particle => {
    const depth = Math.random() * 0.6 + 0.4;
    const spread = trailWidth * (1 + speed * 0.3);
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * spread;
    return {
      x: x + Math.cos(angle) * dist,
      y: y + Math.sin(angle) * dist,
      vx: (Math.random() - 0.5) * 0.8 * depth,
      vy: (Math.random() - 0.5) * 0.8 * depth - 0.3,
      size: (Math.random() * particleSize + 1.5) * depth,
      life: 1,
      maxLife: 1,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      depth,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.15 + 0.05,
    };
  }, []);

  const drawStar = useCallback((ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, rotation: number) => {
    const spikes = 4;
    const outerR = size;
    const innerR = size * 0.4;
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = rotation + (i * Math.PI) / spikes;
      const method = i === 0 ? "moveTo" : "lineTo";
      ctx[method](cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }
    ctx.closePath();
  }, []);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const handleMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='pointer']");
      setIsHovering(!!interactive);
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const now = performance.now();
      const dx = mouse.current.x - prevMouse.current.x;
      const dy = mouse.current.y - prevMouse.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy) * motionSensitivity;

      // Emit particles based on movement
      const emitCount = Math.min(Math.max(1, Math.floor(speed * 0.3)), 5);
      if (now - lastEmit.current > emitRate && mouse.current.x > 0) {
        for (let i = 0; i < emitCount; i++) {
          if (particles.current.length < maxParticles) {
            particles.current.push(createParticle(mouse.current.x, mouse.current.y, speed));
          }
        }
        lastEmit.current = now;
      }

      prevMouse.current = { ...mouse.current };

      // Update & draw particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // subtle gravity
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.life -= fadeSpeed;
        p.rotation += p.rotationSpeed;
        p.twinklePhase += p.twinkleSpeed;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        const lifeRatio = p.life / p.maxLife;
        const twinkle = 0.5 + 0.5 * Math.sin(p.twinklePhase);
        const alpha = lifeRatio * lifeRatio * twinkle;
        const currentSize = p.size * (0.3 + lifeRatio * 0.7);

        ctx.save();
        ctx.globalAlpha = alpha;

        // Glow
        ctx.shadowBlur = glowIntensity * lifeRatio;
        ctx.shadowColor = p.color;

        // Draw star shape
        ctx.fillStyle = p.color;
        drawStar(ctx, p.x, p.y, currentSize, p.rotation);
        ctx.fill();

        // Extra bright core
        ctx.shadowBlur = 0;
        ctx.globalAlpha = alpha * 0.8;
        ctx.fillStyle = "hsl(0, 0%, 100%)";
        drawStar(ctx, p.x, p.y, currentSize * 0.35, p.rotation);
        ctx.fill();

        ctx.restore();
      }

      // Draw cursor dot
      if (mouse.current.x > 0) {
        ctx.save();
        const dotSize = isHovering ? 8 : 4;
        const dotGlow = isHovering ? 20 : 10;
        ctx.shadowBlur = dotGlow;
        ctx.shadowColor = "hsl(210, 90%, 65%)";
        ctx.fillStyle = "hsl(210, 90%, 65%)";
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, dotSize, 0, Math.PI * 2);
        ctx.fill();

        // White core
        ctx.shadowBlur = 0;
        ctx.fillStyle = "hsl(0, 0%, 100%)";
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, dotSize * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Ring on hover
        if (isHovering) {
          ctx.strokeStyle = "hsl(210, 90%, 65%)";
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(mouse.current.x, mouse.current.y, 20, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      animationId.current = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseover", handleMouseOver);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationId.current);
    };
  }, [isTouchDevice, isHovering, createParticle, drawStar]);

  if (isTouchDevice) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      />
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
};

export default CustomCursor;
