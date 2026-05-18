"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  TrendingUp,
  Package,
  BarChart3,
  Zap,
  CheckCircle2,
} from "lucide-react";

const stats = [
  { value: "25.000+", label: "Penjual Aktif" },
  { value: "Rp 2,5 T", label: "Total Transaksi" },
  { value: "99,9%", label: "Uptime" },
  { value: "4,9★", label: "Rating Pengguna" },
];

const floatingCards = [
  {
    icon: TrendingUp,
    title: "Omzet Naik",
    value: "+147%",
    color: "from-green-500 to-emerald-400",
    position: "top-[15%] left-[5%]",
    delay: 0,
  },
  {
    icon: Package,
    title: "Pesanan Masuk",
    value: "1.284",
    color: "from-indigo-500 to-purple-500",
    position: "top-[10%] right-[8%]",
    delay: 0.5,
  },
  {
    icon: BarChart3,
    title: "Produk Terjual",
    value: "8.920",
    color: "from-pink-500 to-rose-400",
    position: "bottom-[20%] right-[5%]",
    delay: 1,
  },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center hero-bg grid-pattern overflow-hidden pt-16"
    >
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating stat cards */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + card.delay, duration: 0.6 }}
          className={`absolute hidden lg:flex items-center gap-3 glass-card rounded-2xl px-4 py-3 ${card.position} float-animation`}
          style={{ animationDelay: `${card.delay}s` }}
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
            <card.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400">{card.title}</p>
            <p className="text-base font-bold text-white">{card.value}</p>
          </div>
        </motion.div>
      ))}

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium px-4 py-2 rounded-full mb-8"
        >
          <Zap className="w-4 h-4" />
          Platform #1 untuk Penjual Online Indonesia
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Kelola Semua{" "}
          <span className="gradient-text">Toko Online</span>
          <br />
          Mu di{" "}
          <span className="relative">
            Satu Tempat
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full origin-left"
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          LapaKoo menghubungkan semua marketplace favoritmu — Shopee, Tokopedia, Lazada, dan lainnya —
          dalam satu dashboard cerdas. Tingkatkan omzet, hemat waktu, dan kelola bisnis dengan mudah.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/purchase"
            className="group flex items-center gap-2 shimmer-btn text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30"
          >
            Mulai Gratis 14 Hari
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center gap-2 text-gray-300 hover:text-white font-medium px-8 py-4 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/5"
          >
            Lihat Demo
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">▶</span>
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 mb-16"
        >
          {["Gratis 14 hari, tanpa kartu kredit", "Setup dalam 5 menit", "Support 24/7"].map(
            (item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>{item}</span>
              </div>
            )
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="glass-card rounded-2xl p-5 text-center hover:border-indigo-500/30 transition-all duration-300 hover:scale-105"
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <div className="flex -space-x-2">
            {["A", "B", "C", "D", "E"].map((letter, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-[#0f0f1a] flex items-center justify-center text-xs font-bold text-white"
              >
                {letter}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-gray-400">
            Dipercaya <span className="text-white font-semibold">25.000+</span> penjual
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f1a] to-transparent pointer-events-none" />
    </section>
  );
}
