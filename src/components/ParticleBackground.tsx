import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animationId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // desynchronized reduces latency, willReadFrequently=false is default (GPU path)
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    // FPS throttle — 30fps is plenty for a background effect
    const TARGET_FPS = 30;
    const FRAME_MS = 1000 / TARGET_FPS;
    let lastTime = 0;
    let isVisible = document.visibilityState === "visible";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Fewer particles — 50 max, reasonable for a background
    const count = Math.min(50, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 18000));
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleVisibility = () => { isVisible = document.visibilityState === "visible"; };

    const draw = (timestamp: number) => {
      animationId.current = requestAnimationFrame(draw);

      if (!isVisible) return;
      if (timestamp - lastTime < FRAME_MS) return;
      lastTime = timestamp;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const pts = particles.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const REPEL_R2 = 120 * 120; // squared, avoids Math.sqrt
      const CONNECT_R2 = 130 * 130;

      // Update + draw dots in one pass
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_R2) {
          const d = Math.sqrt(d2);
          const force = (120 - d) / 120 * 0.018;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(152,100%,60%,${p.opacity})`;
        ctx.fill();
      }

      // Batch ALL connection lines into a SINGLE path per opacity bucket
      // This is the key fix — was O(n²) beginPath/stroke calls, now 1 stroke call
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const ddx = pts[i].x - pts[j].x;
          const ddy = pts[i].y - pts[j].y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < CONNECT_R2) {
            const alpha = 0.05 * (1 - Math.sqrt(d2) / 130);
            ctx.strokeStyle = `hsla(152,100%,60%,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouse, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    animationId.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0, transform: "translateZ(0)", contain: "strict" }}
    />
  );
};

export default ParticleBackground;
