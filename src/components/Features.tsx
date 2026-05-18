"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Store,
  BarChart3,
  Bell,
  Package,
  Headphones,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Terpadu",
    description:
      "Pantau semua toko, pesanan, dan pendapatan dari satu dashboard yang intuitif dan real-time.",
    color: "from-indigo-500 to-purple-600",
    glow: "rgba(99,102,241,0.3)",
  },
  {
    icon: Store,
    title: "Multi-Channel Sync",
    description:
      "Kelola Shopee, Tokopedia, Lazada, TikTok Shop sekaligus. Stok otomatis tersinkronisasi.",
    color: "from-pink-500 to-rose-600",
    glow: "rgba(236,72,153,0.3)",
  },
  {
    icon: BarChart3,
    title: "Analitik Canggih",
    description:
      "Laporan penjualan mendalam, tren produk, dan insight AI untuk keputusan bisnis lebih cerdas.",
    color: "from-violet-500 to-indigo-600",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    icon: Package,
    title: "Manajemen Stok",
    description:
      "Alert stok habis otomatis, manajemen gudang, dan sinkronisasi stok real-time ke semua platform.",
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    icon: Bell,
    title: "Notifikasi Cerdas",
    description:
      "Notifikasi pesanan baru, stok menipis, dan ulasan pelanggan langsung ke HP kamu.",
    color: "from-amber-500 to-orange-600",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    icon: Zap,
    title: "Otomasi Pesanan",
    description:
      "Konfirmasi pesanan, cetak label, dan update resi secara otomatis. Hemat 3+ jam per hari.",
    color: "from-emerald-500 to-green-600",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    icon: Globe,
    title: "Integrasi Ekspedisi",
    description:
      "Terintegrasi dengan J&T, JNE, SiCepat, Anteraja, dan 20+ ekspedisi lainnya.",
    color: "from-teal-500 to-cyan-600",
    glow: "rgba(20,184,166,0.3)",
  },
  {
    icon: Shield,
    title: "Keamanan Terjamin",
    description:
      "Data bisnis kamu dilindungi enkripsi SSL 256-bit dan backup otomatis setiap hari.",
    color: "from-slate-500 to-gray-600",
    glow: "rgba(100,116,139,0.3)",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description:
      "Tim support kami siap membantu kapan saja via live chat, WhatsApp, atau email.",
    color: "from-fuchsia-500 to-purple-600",
    glow: "rgba(217,70,239,0.3)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#0f0f1a] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-4 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">
            Fitur Unggulan
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            Semua yang Kamu Butuhkan{" "}
            <span className="gradient-text">Ada di Sini</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            LapaKoo hadir dengan fitur lengkap yang dirancang khusus untuk penjual online Indonesia
            agar bisa bersaing dan berkembang lebih cepat.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group relative glass-card rounded-2xl p-6 hover:border-white/20 transition-all duration-300 cursor-default"
              style={{
                boxShadow: "none",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: `0 0 30px ${feature.glow}`,
              }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
