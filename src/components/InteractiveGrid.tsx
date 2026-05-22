import { useEffect, useRef } from 'react';

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Configurable parameters
    const dotSize = 2; // Size of the dots
    const spacing = 35; // Grid spacing
    const effectRadius = 250; // Radius of the distortion effect
    const maxPush = 120; // Maximum push force in pixels
    const mouseSmoothness = 0.15; // Lower is smoother/slower, 1 is instant

    let targetMouse = { x: width / 2, y: height / 2 };
    let mouse = { x: width / 2, y: height / 2 };
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouse.x = e.touches[0].clientX;
        targetMouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    // Pre-calculate colors for varying intensities based on distortion
    const shades = 15;
    const colors = new Array(shades).fill(0).map((_, i) => {
      // 0 = resting state, shades-1 = maximum distortion
      const opacity = 0.12 + (i / (shades - 1)) * 0.88;
      // Using custom emerald green brand color to match the LYKA Creative design system
      return `rgba(52, 211, 153, ${opacity})`;
    });

    let animationFrame: number;

    const render = (time: number) => {
      // Calculate physics dt
      const dt = Math.min((time - lastTime) / 16.66, 2.0);
      lastTime = time;

      // Smooth mouse follow
      mouse.x += (targetMouse.x - mouse.x) * (mouseSmoothness * dt);
      mouse.y += (targetMouse.y - mouse.y) * (mouseSmoothness * dt);

      // Clear frame (transparent background)
      ctx.clearRect(0, 0, width, height);

      // Arrays to batch draw calls by color
      const colorGroups: { x: number; y: number }[][] = Array.from(
        { length: shades },
        () => []
      );

      // Center the grid dynamically 
      const offsetX = (width % spacing) / 2;
      const offsetY = (height % spacing) / 2;

      // Overdraw by a margin so dots don't vanish nicely at the edges
      for (let y = offsetY - spacing; y < height + spacing * 2; y += spacing) {
        for (let x = offsetX - spacing; x < width + spacing * 2; x += spacing) {
          let px = x;
          let py = y;

          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let force = 0;
          if (dist < effectRadius && dist > 0.01) {
            // Gaussian falloff
            force = Math.exp(-(dist * dist) / (effectRadius * effectRadius * 0.4));
            
            px += (dx / dist) * force * maxPush;
            py += (dy / dist) * force * maxPush;
          }

          // Compute color index based on the magnitude of the push
          let colorIndex = Math.floor(force * (shades - 1));
          if (colorIndex < 0) colorIndex = 0;
          if (colorIndex >= shades) colorIndex = shades - 1;

          colorGroups[colorIndex].push({ x: px, y: py });
        }
      }

      // Batch render dots
      for (let i = 0; i < shades; i++) {
        if (colorGroups[i].length === 0) continue;

        ctx.fillStyle = colors[i];
        ctx.beginPath();
        for (const pt of colorGroups[i]) {
          // fillRect is significantly faster than arc for tiny shapes
          // and visually identical (creates sharp perfect squares at pixel level)
          ctx.rect(
            Math.round(pt.x - dotSize / 2),
            Math.round(pt.y - dotSize / 2), 
            dotSize, 
            dotSize
          );
        }
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
