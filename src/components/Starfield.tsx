import { useEffect, useRef } from "react";

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let dpr = window.devicePixelRatio || 1;

    interface Star {
      x: number;
      y: number;
      z: number;
      size: number;
      brightness: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }

    const stars: Star[] = [];
    const STAR_COUNT = 180;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        size: Math.random() * 1.8 + 0.3,
        brightness: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      const width = w();
      const height = h();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.4 + 0.6 * ((Math.sin(star.twinklePhase) + 1) / 2);
        const alpha = star.brightness * twinkle;
        const depth = 0.3 + star.z * 0.7;
        const size = star.size * depth;

        const sx = star.x * width;
        const sy = star.y * height;

        // Outer glow
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 3);
        grad.addColorStop(0, `hsla(152, 80%, 70%, ${alpha * 0.8})`);
        grad.addColorStop(0.4, `hsla(152, 60%, 60%, ${alpha * 0.3})`);
        grad.addColorStop(1, `hsla(152, 60%, 60%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sx, sy, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `hsla(0, 0%, 100%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default Starfield;
