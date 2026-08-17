import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseAngle: number;
  glow: boolean;
}

interface DataPacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  size: number;
  alpha: number;
}

interface MatrixStreamGlyph {
  x: number;
  y: number;
  speed: number;
  char: string;
  alpha: number;
  size: number;
  changeTimer: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface GreenDataFabricProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  enableMouseInteraction?: boolean;
}

const GLYPH_CHARS = ['0', '1', '◈', 'λ', '::', 'PB', 'CSE', '⚡', '✦', '0x1', '0x0'];

export const GreenDataFabric: React.FC<GreenDataFabricProps> = ({
  className = '',
  particleCount = 65,
  connectionDistance = 145,
  enableMouseInteraction = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position with smooth interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 190,
      active: false,
    };

    let shockwaves: Shockwave[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleWindowClick = (e: MouseEvent) => {
      if (shockwaves.length < 8) {
        shockwaves.push({
          x: e.clientX,
          y: e.clientY,
          radius: 10,
          maxRadius: Math.min(width, height) * 0.35,
          alpha: 0.85,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleWindowClick);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    let particles: Particle[] = [];
    let packets: DataPacket[] = [];
    let glyphs: MatrixStreamGlyph[] = [];

    const initParticles = () => {
      particles = [];
      packets = [];
      glyphs = [];
      const density = (width * height) / 20000;
      const count = Math.min(Math.max(Math.floor(density), 40), particleCount * 1.5);

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2.0 + 1.2;
        const alpha = Math.random() * 0.45 + 0.3;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius,
          baseRadius: radius,
          alpha,
          baseAlpha: alpha,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          pulseAngle: Math.random() * Math.PI * 2,
          glow: Math.random() > 0.65,
        });
      }

      // Initialize Matrix background glyph streamers
      const glyphCount = Math.floor(width / 75);
      for (let g = 0; g < glyphCount; g++) {
        glyphs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: Math.random() * 0.6 + 0.3,
          char: GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)],
          alpha: Math.random() * 0.25 + 0.08,
          size: Math.floor(Math.random() * 4) + 9,
          changeTimer: Math.floor(Math.random() * 60),
        });
      }
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    initParticles();

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.016;

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle ambient scanline radar beam sweep
      const sweepY = ((time * 35) % (height + 260)) - 130;
      const beamGrad = ctx.createLinearGradient(0, sweepY - 60, 0, sweepY + 60);
      beamGrad.addColorStop(0, 'rgba(0, 229, 89, 0)');
      beamGrad.addColorStop(0.5, 'rgba(0, 229, 89, 0.03)');
      beamGrad.addColorStop(1, 'rgba(0, 229, 89, 0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, sweepY - 60, width, 120);

      // 2. Draw Floating Matrix Glyphs in the deep background
      ctx.font = '10px "JetBrains Mono", monospace';
      for (let g = 0; g < glyphs.length; g++) {
        const item = glyphs[g];
        item.y += item.speed;
        item.changeTimer++;

        if (item.changeTimer > 80) {
          item.char = GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
          item.changeTimer = 0;
        }

        if (item.y > height + 20) {
          item.y = -20;
          item.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(0, 229, 89, ${item.alpha * (0.8 + Math.sin(time + g) * 0.2)})`;
        ctx.fillText(item.char, item.x, item.y);
      }

      // 3. Update & Draw Shockwaves from click interactions
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 5.5;
        sw.alpha = (1 - sw.radius / sw.maxRadius) * 0.65;

        if (sw.radius >= sw.maxRadius || sw.alpha <= 0) {
          shockwaves.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 229, 89, ${sw.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = '#00E559';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Disperse nearby particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - sw.radius) < 30) {
            const push = (1 - Math.abs(dist - sw.radius) / 30) * 2.5;
            p.x += (dx / (dist || 1)) * push;
            p.y += (dy / (dist || 1)) * push;
            p.alpha = 0.9;
          }
        }
      }

      // 4. Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulseAngle += p.pulseSpeed;
        const waveOffset = Math.sin(time + p.x * 0.006) * 0.25;
        p.x += p.vx;
        p.y += p.vy + waveOffset * 0.12;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        if (enableMouseInteraction && mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 1.8;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
            p.alpha = Math.min(p.baseAlpha + 0.55, 0.95);
            p.radius = p.baseRadius * (1 + force * 0.9);
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
            p.radius += (p.baseRadius - p.radius) * 0.05;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          p.radius += (p.baseRadius - p.radius) * 0.05;
        }

        const nodeAlpha = Math.max(0.12, p.alpha * (0.8 + Math.sin(p.pulseAngle) * 0.25));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 89, ${nodeAlpha})`;
        ctx.fill();

        if (p.glow) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 229, 89, ${nodeAlpha * 0.25})`;
          ctx.fill();
        }
      }

      // 5. Draw Network Fabric Connecting Lines
      const activeConnections: { i: number; j: number; dist: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            activeConnections.push({ i, j, dist });
            const lineAlpha = (1 - dist / connectionDistance) * 0.18;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 229, 89, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Randomly spawn data packet
            if (packets.length < 22 && Math.random() < 0.004) {
              packets.push({
                fromIdx: i,
                toIdx: j,
                progress: 0,
                speed: Math.random() * 0.022 + 0.012,
                size: Math.random() * 1.6 + 1.2,
                alpha: Math.random() * 0.5 + 0.5,
              });
            }
          }
        }
      }

      // 6. Update & Draw Data Packets along Fabric Lines
      for (let k = packets.length - 1; k >= 0; k--) {
        const pkt = packets[k];
        const pFrom = particles[pkt.fromIdx];
        const pTo = particles[pkt.toIdx];

        if (!pFrom || !pTo) {
          packets.splice(k, 1);
          continue;
        }

        const dx = pFrom.x - pTo.x;
        const dy = pFrom.y - pTo.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > connectionDistance * 1.3) {
          packets.splice(k, 1);
          continue;
        }

        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const currX = pFrom.x + (pTo.x - pFrom.x) * pkt.progress;
        const currY = pFrom.y + (pTo.y - pFrom.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, pkt.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 243, 208, ${pkt.alpha * 0.95})`;
        ctx.shadowColor = '#00E559';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 7. Draw Interactive Cursor Pulse Field
      if (enableMouseInteraction && mouse.active) {
        const mouseGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        mouseGrad.addColorStop(0, 'rgba(0, 229, 89, 0.09)');
        mouseGrad.addColorStop(0.5, 'rgba(0, 229, 89, 0.025)');
        mouseGrad.addColorStop(1, 'rgba(0, 229, 89, 0)');

        ctx.fillStyle = mouseGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, connectionDistance, enableMouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.88 }}
    />
  );
};

export default GreenDataFabric;
