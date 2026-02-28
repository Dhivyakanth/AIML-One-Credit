import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface VolcanoBackgroundProps {
  animationStyle?: "default" | "vortex" | "explosive" | "wave";
  eruptionIntensity?: number;
  meteorCount?: number;
  starCount?: number;
  maxLavaParticles?: number;
  enableMeteors?: boolean;
  enableEmbers?: boolean;
  simulationSpeed?: number;
}

const VolcanoBackground = ({
  animationStyle = "default",
  eruptionIntensity = 1,
  meteorCount = 5,
  starCount = 50,
  maxLavaParticles = 300,
  enableMeteors = true,
  enableEmbers = true,
  simulationSpeed = 1,
}: VolcanoBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Colors matched to the portfolio theme (green primary)
  const skyColorTop = "#050a08";
  const skyColorBottom = "#0a0d0b";
  const lavaColor = "#33ff99"; // primary green
  const glowColor = "#33ff99";
  const meteorColor = "#66ffbb";

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let dpr = window.devicePixelRatio || 1;
    const speedMultiplier = simulationSpeed;

    const resize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const w = rect.width > 0 ? rect.width : 800;
      const h = rect.height > 0 ? rect.height : 450;
      dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    interface Star { x: number; y: number; size: number; opacity: number; twinkleSpeed: number; twinkleDir: number; }
    interface Meteor { x: number; y: number; speed: number; angle: number; size: number; tailLength: number; depth: number; }
    interface LavaParticle { x: number; y: number; vx: number; vy: number; size: number; life: number; decay: number; gravity: number; }
    interface Ember { x: number; y: number; vx: number; vy: number; size: number; life: number; decay: number; depth: number; }

    const meteors: Meteor[] = [];
    const lavaParticles: LavaParticle[] = [];
    const stars: Star[] = [];
    const embers: Ember[] = [];
    let lavaAccumulator = 0;
    let emberAccumulator = 0;

    for (let i = 0; i < starCount; i++) {
      stars.push({ x: Math.random(), y: Math.random() * 0.7, size: Math.random() * 1.5 + 0.5, opacity: Math.random(), twinkleSpeed: Math.random() * 0.02 + 0.005, twinkleDir: 1 });
    }

    const logicalWidth = () => (canvas.width || 1) / dpr;
    const logicalHeight = () => (canvas.height || 1) / dpr;

    const createMeteor = (w: number): Meteor => {
      const depth = Math.random() * 0.7 + 0.3;
      const angle = Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      const startX = Math.random() * (w + 800) - 400;
      return { x: startX, y: -150, speed: (Math.random() * 15 + 10) * depth, angle, size: (Math.random() * 2 + 1.5) * depth, tailLength: (Math.random() * 200 + 120) * depth, depth };
    };

    const createLavaParticle = (w: number, y?: number): LavaParticle => {
      const speed = Math.random() * 2 + 2 + eruptionIntensity * 1.5;
      return { x: Math.random() * w, y: y !== undefined ? y : -20, vx: (Math.random() - 0.5) * 2, vy: speed, size: Math.random() * 2 + 1, life: 1, decay: Math.random() * 0.005 + 0.002, gravity: 0.15 };
    };

    const createEmber = (w: number, h: number, y?: number): Ember => {
      const depth = Math.random() * 0.5 + 0.5;
      return { x: Math.random() * w, y: y !== undefined ? y : h * (0.6 + Math.random() * 0.4), vx: (Math.random() - 0.5) * 0.5, vy: -Math.random() * 0.8 - 0.2, size: (Math.random() * 2 + 1) * depth, life: 1, decay: Math.random() * 0.01 + 0.004, depth };
    };

    const initW = logicalWidth();
    const initH = logicalHeight();
    for (let i = 0; i < meteorCount; i++) {
      meteors.push({ ...createMeteor(initW), y: Math.random() * initH });
    }
    const initialLava = Math.min(maxLavaParticles, 150 * eruptionIntensity);
    for (let i = 0; i < initialLava; i++) {
      lavaParticles.push(createLavaParticle(initW, Math.random() * initH));
    }
    if (enableEmbers) {
      const initialEmbers = 50 * eruptionIntensity;
      for (let i = 0; i < initialEmbers; i++) {
        embers.push(createEmber(initW, initH, initH * (0.6 + Math.random() * 0.4)));
      }
    }

    // Parse color for lava particles
    const lr = 51, lg = 255, lb = 153; // #33ff99

    const render = () => {
      const now = performance.now();
      let delta = ((now - lastTime) / 16.67) * speedMultiplier;
      if (delta > 5) delta = 5;
      lastTime = now;
      const width = logicalWidth();
      const height = logicalHeight();
      if (width === 0 || height === 0) { animationFrameId = requestAnimationFrame(render); return; }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, width, height);

      const driftStrength = eruptionIntensity * 0.5;
      const time = now * 0.002;
      const offsetX = Math.sin(time * 0.7) * driftStrength;
      const offsetY = Math.cos(time * 0.9) * driftStrength * 0.6;
      ctx.save();
      ctx.translate(offsetX, offsetY);

      // Sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, skyColorTop);
      gradient.addColorStop(0.35, "#030807");
      gradient.addColorStop(0.7, "#081a12");
      gradient.addColorStop(1, skyColorBottom);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Atmospheric haze
      const haze = ctx.createLinearGradient(0, height * 0.45, 0, height);
      haze.addColorStop(0, "rgba(51, 255, 153, 0)");
      haze.addColorStop(0.6, "rgba(51, 255, 153, 0.08)");
      haze.addColorStop(1, "rgba(51, 255, 153, 0.15)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, height * 0.45, width, height * 0.55);

      // Ground fog
      const fog = ctx.createLinearGradient(0, height * 0.75, 0, height);
      fog.addColorStop(0, "rgba(51, 255, 153, 0)");
      fog.addColorStop(1, "rgba(51, 255, 153, 0.06)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, height * 0.75, width, height * 0.25);

      // Stars
      ctx.fillStyle = "#FFFFFF";
      for (const star of stars) {
        star.opacity += star.twinkleSpeed * star.twinkleDir * delta;
        if (star.opacity > 1 || star.opacity < 0.2) star.twinkleDir *= -1;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.opacity));
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Lava particles
      lavaAccumulator += delta * 0.9 * eruptionIntensity;
      while (lavaAccumulator > 1) {
        if (lavaParticles.length < maxLavaParticles) lavaParticles.push(createLavaParticle(width));
        lavaAccumulator -= 1;
      }

      for (let i = lavaParticles.length - 1; i >= 0; i--) {
        const p = lavaParticles[i];
        let { vx, vy, gravity } = p;

        if (animationStyle === "vortex") {
          const dx = p.x - width * 0.5, dy = p.y - height * 0.6;
          const swirl = 0.002 * eruptionIntensity;
          vx += -dy * swirl; vy += dx * swirl;
        } else if (animationStyle === "explosive") {
          const dx = p.x - width * 0.5, dy = p.y - height;
          const accel = 0.0008 * eruptionIntensity;
          vx += dx * accel * delta * 60; vy += dy * accel * delta * 60;
        } else if (animationStyle === "wave") {
          vy += Math.sin((p.x / width) * Math.PI * 4 + time * 2) * 0.25;
        }

        p.x += vx * delta; p.y += vy * delta; vy += gravity * delta;
        p.vx = vx; p.vy = vy; p.life -= p.decay * delta;

        if (p.life <= 0 || p.y > height + 50) {
          lavaParticles.splice(i, 1);
        } else {
          const lifeRatio = Math.max(0, p.life);
          const stretch = 1 + Math.min(p.vy * 0.15, 2);
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.scale(1 / Math.sqrt(stretch), stretch);
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.5);
          g.addColorStop(0, `rgba(${Math.min(255, lr + 80)}, ${Math.min(255, lg + 80)}, ${Math.min(255, lb + 80)}, ${lifeRatio})`);
          g.addColorStop(0.3, `rgba(${lr}, ${lg}, ${lb}, ${lifeRatio * 0.9})`);
          g.addColorStop(1, `rgba(${lr}, ${lg}, ${lb}, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Embers
      if (enableEmbers) {
        emberAccumulator += delta * 0.4 * eruptionIntensity;
        while (emberAccumulator > 1) { embers.push(createEmber(width, height)); emberAccumulator -= 1; }
      }
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        let { vx: evx, vy: evy } = e;
        if (animationStyle === "vortex") {
          const dx = e.x - width * 0.5, dy = e.y - height * 0.7;
          evx += -dy * 0.002 * eruptionIntensity; evy += dx * 0.002 * eruptionIntensity;
        } else if (animationStyle === "explosive") {
          const dx = e.x - width * 0.5, dy = e.y - height;
          evx += dx * 0.0006 * eruptionIntensity * delta * 60; evy += dy * 0.0006 * eruptionIntensity * delta * 60;
        } else if (animationStyle === "wave") {
          evx += Math.sin((e.y / height) * Math.PI * 3 + time * 1.5) * 0.2;
        }
        e.x += evx * delta; e.y += evy * delta; e.vx = evx; e.vy = evy;
        e.life -= e.decay * delta;
        if (e.life <= 0 || e.y < height * 0.3) {
          embers.splice(i, 1);
        } else {
          const opacity = Math.max(0, e.life) * 0.9;
          ctx.fillStyle = `rgba(51, ${200 + e.depth * 55}, ${120 + e.depth * 30}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Meteors
      if (!enableMeteors) {
        meteors.length = 0;
      } else {
        while (meteors.length < meteorCount) meteors.push(createMeteor(width));
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          let dx = Math.cos(m.angle) * m.speed;
          let dy = Math.sin(m.angle) * m.speed;
          if (animationStyle === "vortex") {
            const mx = m.x - width * 0.5, my = m.y - height * 0.4;
            dx += -my * 0.003 * m.depth; dy += mx * 0.003 * m.depth;
          } else if (animationStyle === "wave") {
            dy += Math.sin((m.x / width) * Math.PI * 2 + time * 3) * 8;
          }
          m.x += dx * delta; m.y += dy * delta;
          if (m.y > height + 200 || m.x < -200 || m.x > width + 200) {
            meteors.splice(i, 1);
          } else {
            const tailGrad = ctx.createLinearGradient(m.x, m.y, m.x - Math.cos(m.angle) * m.tailLength, m.y - Math.sin(m.angle) * m.tailLength);
            tailGrad.addColorStop(0, meteorColor);
            tailGrad.addColorStop(0.3, "rgba(255,255,255,0.85)");
            tailGrad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.strokeStyle = tailGrad;
            ctx.lineWidth = m.size;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x - Math.cos(m.angle) * m.tailLength, m.y - Math.sin(m.angle) * m.tailLength);
            ctx.stroke();
            ctx.fillStyle = "#FFFFFF";
            ctx.shadowBlur = 18;
            ctx.shadowColor = meteorColor;
            ctx.beginPath();
            ctx.arc(m.x, m.y, m.size * 1.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationStyle, eruptionIntensity, meteorCount, starCount, maxLavaParticles, enableMeteors, enableEmbers, simulationSpeed]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </motion.div>
  );
};

export default VolcanoBackground;
