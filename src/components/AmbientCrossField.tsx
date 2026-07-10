"use client";

import { useEffect, useRef } from "react";

export default function AmbientCrossField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      smoothX: window.innerWidth / 2,
      smoothY: window.innerHeight / 2,
      active: false,
      intensity: 0,
    };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawCross = (x: number, y: number, alpha: number) => {
      const length = 10.5;
      context.globalAlpha = alpha;
      context.beginPath();
      context.moveTo(x - length / 2, y);
      context.lineTo(x + length / 2, y);
      context.moveTo(x, y - length / 2);
      context.lineTo(x, y + length / 2);
      context.stroke();
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const spacing = width < 720 ? 62 : 78;
      const scrollRatio = window.scrollY / Math.max(window.innerHeight, 1);
      const scrollDriftX = Math.sin(scrollRatio * 0.8) * 9;
      const scrollDriftY = Math.max(-18, Math.min(30, scrollRatio * 12));
      const motionTime = prefersReducedMotion.matches ? 0 : time;
      const breath = prefersReducedMotion.matches ? 1 : 0.82 + Math.sin(motionTime / 2200) * 0.18;
      const slowDriftX = Math.sin(motionTime / 9000) * 10;
      const slowDriftY = Math.cos(motionTime / 11000) * 8;
      const offsetX = ((scrollDriftX + slowDriftX) % spacing) - spacing;
      const offsetY = ((scrollDriftY + slowDriftY) % spacing) - spacing;

      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.14;
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.14;
      pointer.intensity += ((pointer.active ? 1 : 0) - pointer.intensity) * 0.08;

      context.lineCap = "round";
      context.lineWidth = 0.95;
      context.strokeStyle = "#00c853";

      for (let y = offsetY; y < height + spacing; y += spacing) {
        for (let x = offsetX; x < width + spacing; x += spacing) {
          const distance = Math.hypot(x - pointer.smoothX, y - pointer.smoothY);
          const falloff = Math.max(0, 1 - distance / 285);
          const spotlight = falloff * falloff * pointer.intensity;
          const alpha = 0.16 * breath + spotlight * 0.62;
          drawCross(x, y, Math.min(alpha, 0.76));
        }
      }

      context.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="ambient-cross-field" aria-hidden="true">
      <canvas className="ambient-cross-canvas" ref={canvasRef} />
      <div className="ambient-cross-vignette" />
    </div>
  );
}
