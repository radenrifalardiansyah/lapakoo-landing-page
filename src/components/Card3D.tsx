"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function Card3D({ children, className = "", intensity = 14 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const rawRotX   = useMotionValue(0);
  const rawRotY   = useMotionValue(0);
  const rawShineX = useMotionValue(50);
  const rawShineY = useMotionValue(50);
  const rawOpacity = useMotionValue(0);

  const rotX    = useSpring(rawRotX,    { stiffness: 380, damping: 34 });
  const rotY    = useSpring(rawRotY,    { stiffness: 380, damping: 34 });
  const scale   = useSpring(1,          { stiffness: 380, damping: 34 });
  const shineX  = useSpring(rawShineX,  { stiffness: 380, damping: 34 });
  const shineY  = useSpring(rawShineY,  { stiffness: 380, damping: 34 });
  const shineOp = useSpring(rawOpacity, { stiffness: 380, damping: 34 });

  const shineBg = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.30) 0%, transparent 60%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top)  / height;
    rawRotY.set((x - 0.5) * intensity * 2);
    rawRotX.set((0.5 - y) * intensity * 2);
    rawShineX.set(x * 100);
    rawShineY.set(y * 100);
  }

  function onMouseEnter() {
    scale.set(1.025);
    rawOpacity.set(1);
  }

  function onMouseLeave() {
    rawRotX.set(0);
    rawRotY.set(0);
    rawShineX.set(50);
    rawShineY.set(50);
    rawOpacity.set(0);
    scale.set(1);
  }

  return (
    <div
      ref={ref}
      style={{ perspective: "900px" }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, scale, transformStyle: "preserve-3d" }}
        className={`relative ${className}`}
      >
        {children}
        {/* Specular shine overlay */}
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{ background: shineBg, opacity: shineOp }}
        />
        {/* Soft depth shadow */}
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            boxShadow: "0 30px 60px -12px rgba(124,58,237,0.25)",
            opacity: shineOp,
          }}
        />
      </motion.div>
    </div>
  );
}
