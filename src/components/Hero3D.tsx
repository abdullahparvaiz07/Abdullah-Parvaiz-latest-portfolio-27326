import { useEffect, useRef } from 'react';

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.003; // Rotation speed

      // --- Subtle Nebula Background ---
      const drawNebula = (cx: number, cy: number, radius: number, r: number, g: number, b: number, a: number) => {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      };

      ctx.globalCompositeOperation = 'screen';
      // Orange glow
      drawNebula(
        width / 2 + Math.sin(time * 0.8) * width * 0.3,
        height / 2 + Math.cos(time * 0.5) * height * 0.3,
        width * 0.6,
        249, 115, 22, 0.07
      );
      // Purple depth
      drawNebula(
        width / 2 + Math.cos(time * 0.6) * width * 0.3,
        height / 2 + Math.sin(time * 0.9) * height * 0.3,
        width * 0.6,
        76, 29, 149, 0.07
      );
      // Blue depth
      drawNebula(
        width / 2 + Math.sin(time * 0.4) * width * 0.4,
        height / 2 + Math.cos(time * 0.7) * height * 0.4,
        width * 0.5,
        30, 58, 138, 0.07
      );
      ctx.globalCompositeOperation = 'source-over';
      // --------------------------------

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full object-cover opacity-70" />;
}
