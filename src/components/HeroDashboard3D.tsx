"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { TrendingUp, ShoppingBag, Package, BarChart3, Bell, Zap } from "lucide-react";

const bars = [55, 72, 48, 88, 65, 94, 78];
const navIcons = [BarChart3, ShoppingBag, Package, Bell, Zap];

export default function HeroDashboard3D() {
  const ref = useRef<HTMLDivElement>(null);

  const rawRotX    = useMotionValue(6);
  const rawRotY    = useMotionValue(-10);
  const rawShineX  = useMotionValue(50);
  const rawShineY  = useMotionValue(50);
  const rawOpacity = useMotionValue(0);

  const rotX    = useSpring(rawRotX,    { stiffness: 120, damping: 22 });
  const rotY    = useSpring(rawRotY,    { stiffness: 120, damping: 22 });
  const shineX  = useSpring(rawShineX,  { stiffness: 200, damping: 28 });
  const shineY  = useSpring(rawShineY,  { stiffness: 200, damping: 28 });
  const shineOp = useSpring(rawOpacity, { stiffness: 200, damping: 28 });

  const shineBg = useMotionTemplate`radial-gradient(ellipse at ${shineX}% ${shineY}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top)  / height;
    rawRotY.set(-10 + (x - 0.5) * 18);
    rawRotX.set( 6  + (0.5 - y) * 14);
    rawShineX.set(x * 100);
    rawShineY.set(y * 100);
  }

  function onMouseEnter() { rawOpacity.set(1); }

  function onMouseLeave() {
    rawRotX.set(6);
    rawRotY.set(-10);
    rawShineX.set(50);
    rawShineY.set(50);
    rawOpacity.set(0);
  }

  return (
    <div
      ref={ref}
      style={{ perspective: "1100px" }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="w-full flex justify-center"
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-2xl"
      >
        {/* Browser chrome shadow */}
        <div className="absolute -inset-3 rounded-[26px] bg-gradient-to-br from-violet-400/30 to-purple-600/20 blur-2xl" />

        {/* Main window */}
        <div className="relative rounded-2xl overflow-hidden border border-violet-200/80 shadow-2xl shadow-violet-300/30 bg-white">

          {/* Window title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <div className="mx-auto flex items-center gap-1.5 bg-white border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              app.lapakoo.id/dashboard
            </div>
          </div>

          {/* App body */}
          <div className="flex h-[300px] sm:h-[340px]">

            {/* Sidebar */}
            <div className="w-14 flex-shrink-0 bg-[#1e1b4b] flex flex-col items-center py-4 gap-5">
              <Image
                src="/mini-logo-lapakoo.png"
                alt="LapaKoo"
                width={28}
                height={28}
                className="rounded-md mb-2"
              />
              {navIcons.map((Icon, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center cursor-default transition-colors ${
                    i === 0 ? "bg-violet-500 text-white" : "text-violet-400 hover:bg-violet-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 bg-[#f5f3ff] p-4 flex flex-col gap-3 overflow-hidden">

              {/* Header row */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-violet-400 font-medium">Omzet Hari Ini</p>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl font-extrabold text-[#1e1b4b]"
                  >
                    Rp 2.847.000
                  </motion.p>
                </div>
                <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  +23%
                </div>
              </div>

              {/* Chart */}
              <div className="flex-1 bg-white rounded-xl border border-violet-100 p-3 flex flex-col justify-end gap-1">
                <p className="text-[10px] text-violet-400 font-semibold mb-2">Penjualan 7 Hari</p>
                <div className="flex items-end gap-1.5 h-[90px]">
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                      style={{ height: `${h}%`, originY: 1 }}
                      className={`flex-1 rounded-t-sm ${
                        i === 5
                          ? "bg-gradient-to-t from-violet-600 to-purple-400"
                          : "bg-violet-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  {["Sen","Sel","Rab","Kam","Jum","Sab","Min"].map(d => (
                    <span key={d} className="flex-1 text-center text-[9px] text-violet-300">{d}</span>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Pesanan", value: "284", color: "text-violet-700" },
                  { label: "Produk", value: "1.920", color: "text-pink-600" },
                  { label: "Rating", value: "4.9★", color: "text-amber-500" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="bg-white rounded-lg border border-violet-100 p-2 text-center"
                  >
                    <p className={`text-sm font-extrabold ${s.color}`}>{s.value}</p>
                    <p className="text-[9px] text-violet-400 font-medium">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shine overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: shineBg, opacity: shineOp }}
        />

        {/* Floating badge — front layer using translateZ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          style={{ translateZ: 40 }}
          className="absolute -top-3 -right-4 bg-white rounded-xl shadow-lg border border-violet-100 px-3 py-2 flex items-center gap-2"
        >
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-[9px] text-gray-400 leading-none">Omzet naik</p>
            <p className="text-xs font-extrabold text-gray-800">+Rp 420rb</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          style={{ translateZ: 40 }}
          className="absolute -bottom-3 -left-4 bg-white rounded-xl shadow-lg border border-violet-100 px-3 py-2 flex items-center gap-2"
        >
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
            <Package className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-[9px] text-gray-400 leading-none">Pesanan baru</p>
            <p className="text-xs font-extrabold text-gray-800">12 pesanan</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
