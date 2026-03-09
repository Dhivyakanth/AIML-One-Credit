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

    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      tail: { x: number; y: number }[];
    }

    const stars: Star[] = [];
    const STAR_COUNT = 180;
    const shootingStars: ShootingStar[] = [];
    let lastShootingTime = 0;
    const SHOOT_MIN = 5000;
    const SHOOT_MAX = 10000;
    let nextShootAt = Math.random() * (SHOOT_MAX - SHOOT_MIN) + SHOOT_MIN;

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

    const render = (timestamp: number) => {
      const width = w();
      const height = h();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Spawn shooting stars every 5-10s
      if (timestamp - lastShootingTime > nextShootAt) {
        lastShootingTime = timestamp;
        nextShootAt = Math.random() * (SHOOT_MAX - SHOOT_MIN) + SHOOT_MIN;
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
        const speed = 6 + Math.random() * 4;
        shootingStars.push({
          x: Math.random() * width * 0.7,
          y: Math.random() * height * 0.3,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 2 + Math.random() * 1.5,
          tail: [],
        });
      }

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.tail.push({ x: s.x, y: s.y });
        if (s.tail.length > 30) s.tail.shift();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;

        if (s.life <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        for (let j = 0; j < s.tail.length; j++) {
          const t = s.tail[j];
          const p = j / s.tail.length;
          ctx.fillStyle = `hsla(210, 80%, 85%, ${p * s.life * 0.6})`;
          ctx.beginPath();
          ctx.arc(t.x, t.y, s.size * p * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
        hg.addColorStop(0, `hsla(210, 90%, 95%, ${s.life})`);
        hg.addColorStop(0.5, `hsla(210, 80%, 75%, ${s.life * 0.5})`);
        hg.addColorStop(1, `hsla(210, 80%, 75%, 0)`);
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(0, 0%, 100%, ${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw twinkling stars
      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.4 + 0.6 * ((Math.sin(star.twinklePhase) + 1) / 2);
        const alpha = star.brightness * twinkle;
        const depth = 0.3 + star.z * 0.7;
        const size = star.size * depth;

        const sx = star.x * width;
        const sy = star.y * height;

        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 3);
        grad.addColorStop(0, `hsla(210, 80%, 75%, ${alpha * 0.8})`);
        grad.addColorStop(0.4, `hsla(210, 60%, 65%, ${alpha * 0.3})`);
        grad.addColorStop(1, `hsla(210, 60%, 65%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sx, sy, size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(0, 0%, 100%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    render(0);

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
