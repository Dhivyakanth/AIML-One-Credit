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
      x: number; y: number; z: number;
      size: number; brightness: number;
      twinkleSpeed: number; twinklePhase: number;
    }

    interface ShootingStar {
      x: number; y: number;
      vx: number; vy: number;
      life: number; size: number;
      speed: number;
      tail: { x: number; y: number; alpha: number }[];
    }

    const stars: Star[] = [];
    const STAR_COUNT = 200;
    const shootingStars: ShootingStar[] = [];
    let lastShootTime = 0;
    const SHOOT_MIN = 5000;
    const SHOOT_MAX = 10000;
    let nextShootAt = Math.random() * (SHOOT_MAX - SHOOT_MIN) + SHOOT_MIN;

    // Pre-rendered nebula canvas (static, drawn once)
    let nebulaCanvas: HTMLCanvasElement | null = null;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
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

      // Large soft nebula clouds
      const blobs = [
        { x: width * 0.3, y: height * 0.25, rx: width * 0.35, ry: height * 0.25, hue: 220, sat: 60, light: 20, alpha: 0.04 },
        { x: width * 0.7, y: height * 0.6, rx: width * 0.3, ry: height * 0.2, hue: 240, sat: 50, light: 15, alpha: 0.035 },
        { x: width * 0.5, y: height * 0.5, rx: width * 0.5, ry: height * 0.15, hue: 210, sat: 70, light: 25, alpha: 0.025 },
        { x: width * 0.15, y: height * 0.7, rx: width * 0.2, ry: height * 0.2, hue: 260, sat: 40, light: 18, alpha: 0.03 },
        { x: width * 0.85, y: height * 0.3, rx: width * 0.18, ry: height * 0.18, hue: 200, sat: 55, light: 22, alpha: 0.025 },
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

      // Milky way band — diagonal streak
      nctx.save();
      nctx.translate(width * 0.5, height * 0.5);
      nctx.rotate(-0.4);
      const milky = nctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.6);
      milky.addColorStop(0, "hsla(215, 60%, 25%, 0.03)");
      milky.addColorStop(0.3, "hsla(220, 50%, 20%, 0.02)");
      milky.addColorStop(1, "hsla(220, 50%, 20%, 0)");
      nctx.fillStyle = milky;
      nctx.fillRect(-width * 0.6, -height * 0.08, width * 1.2, height * 0.16);
      nctx.restore();
    };

    resize();

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random(), y: Math.random(), z: Math.random(),
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

      // Draw nebula overlay
      if (nebulaCanvas) {
        ctx.drawImage(nebulaCanvas, 0, 0);
      }

      // Spawn shooting stars
      if (timestamp - lastShootTime > nextShootAt) {
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
          speed,
          tail: [],
        });
      }

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.tail.push({ x: s.x, y: s.y, alpha: s.life });
        if (s.tail.length > 50) s.tail.shift();
        s.x += s.vx;
        s.y += s.vy;
        // Accelerate slightly for realism
        s.vx *= 1.005;
        s.vy *= 1.005;
        s.life -= 0.008;

        if (s.life <= 0 || s.x > width + 50 || s.y > height + 50) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw tail as a continuous tapered line
        if (s.tail.length > 1) {
          ctx.save();
          for (let j = 1; j < s.tail.length; j++) {
            const prev = s.tail[j - 1];
            const curr = s.tail[j];
            const progress = j / s.tail.length;
            const lineWidth = s.size * progress * 1.8;
            const alpha = progress * progress * s.life * 0.7;

            ctx.strokeStyle = `hsla(210, 70%, 85%, ${alpha})`;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Bright head with glow
        ctx.save();
        ctx.shadowBlur = 15 * s.life;
        ctx.shadowColor = `hsla(210, 90%, 90%, ${s.life * 0.8})`;
        ctx.fillStyle = `hsla(0, 0%, 100%, ${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Outer glow halo
        ctx.shadowBlur = 0;
        const hGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 6);
        hGrad.addColorStop(0, `hsla(210, 90%, 95%, ${s.life * 0.4})`);
        hGrad.addColorStop(0.3, `hsla(210, 80%, 75%, ${s.life * 0.15})`);
        hGrad.addColorStop(1, "hsla(210, 80%, 75%, 0)");
        ctx.fillStyle = hGrad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
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
        grad.addColorStop(1, "hsla(210, 60%, 65%, 0)");
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
