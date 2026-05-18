"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Star, CheckCircle2, TrendingUp, Package, BarChart3, Zap,
} from "lucide-react";

const stats = [
  { value: "25.000+", label: "Penjual Aktif" },
  { value: "Rp 2,5 T", label: "Total Transaksi" },
  { value: "99,9%",   label: "Uptime" },
  { value: "4,9★",    label: "Rating" },
];

const floatingCards = [
  {
    icon: TrendingUp, title: "Omzet Naik", value: "+147%",
    bg: "from-violet-500 to-purple-600", shadow: "shadow-violet-200",
    pos: "top-[18%] left-[2%]", delay: 0,
  },
  {
    icon: Package, title: "Pesanan Masuk", value: "1.284",
    bg: "from-pink-500 to-rose-500", shadow: "shadow-pink-200",
    pos: "top-[12%] right-[2%]", delay: 0.4,
  },
  {
    icon: BarChart3, title: "Produk Terjual", value: "8.920",
    bg: "from-orange-400 to-amber-500", shadow: "shadow-orange-200",
    pos: "bottom-[22%] right-[1%]", delay: 0.8,
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden pt-16">

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-violet-200/50 blob pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[420px] h-[420px] bg-pink-200/40 blob pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* Floating cards */}
      {floatingCards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.1 + c.delay, duration: 0.5 }}
          className={`absolute hidden lg:flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl ${c.shadow} border border-white/80 ${c.pos} float-${i === 1 ? "2" : "1"}`}
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.bg} flex items-center justify-center`}>
            <c.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">{c.title}</p>
            <p className="text-base font-extrabold text-gray-800">{c.value}</p>
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex mb-7"
        >
          <span className="badge">
            <Zap className="w-3.5 h-3.5 text-violet-600" />
            Platform #1 untuk Penjual Online Indonesia
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600" />
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 text-[#1e1b4b]"
        >
          Kelola Semua{" "}
          <span className="gradient-text">Toko Online</span>
          <br />
          Mu di{" "}
          <span className="relative inline-block">
            Satu Tempat
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-3 left-0 w-full"
              viewBox="0 0 300 14" fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M2 10 Q75 2 150 8 Q225 14 298 6"
                stroke="url(#heroUnderline)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="heroUnderline" x1="0" y1="0" x2="300" y2="0">
                  <stop offset="0%"   stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </motion.svg>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-lg sm:text-xl text-violet-700/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          LapaKoo menghubungkan semua marketplace favoritmu — Shopee, Tokopedia, Lazada, dan
          lainnya — dalam satu dashboard cerdas. Tingkatkan omzet, hemat waktu, dan kelola
          bisnis dengan mudah.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link href="/purchase" className="btn-primary flex items-center gap-2 px-8 py-4 text-lg group">
            Mulai Gratis 14 Hari
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="btn-outline flex items-center gap-3 px-8 py-4 text-base"
          >
            <span className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-bold">▶</span>
            Lihat Demo
          </a>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-5 text-sm text-violet-600/80 mb-16"
        >
          {["Gratis 14 hari, tanpa kartu kredit", "Setup dalam 5 menit", "Support 24/7"].map(
            (item, i) => (
              <div key={i} className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {item}
              </div>
            )
          )}
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.65 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 + i * 0.08 }}
              className="card-white card-hover rounded-2xl p-5 text-center"
            >
              <div className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">{s.value}</div>
              <div className="text-sm text-violet-500 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <div className="flex -space-x-2">
            {["RP", "SR", "BS", "DK", "AF"].map((init, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-400 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow"
              >
                {init}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
          </div>
          <span className="text-sm text-violet-600">
            Dipercaya <span className="font-bold text-violet-800">25.000+</span> penjual
          </span>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
