"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard, Store, BarChart3, Bell, Package,
  Headphones, Zap, Shield, Globe,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard, title: "Dashboard Terpadu",
    description: "Pantau semua toko, pesanan, dan pendapatan dari satu dashboard yang intuitif dan real-time.",
    bg: "bg-violet-100",  icon_color: "text-violet-600",
    accent: "group-hover:bg-violet-600",
  },
  {
    icon: Store, title: "Multi-Channel Sync",
    description: "Kelola Shopee, Tokopedia, Lazada, TikTok Shop sekaligus. Stok otomatis tersinkronisasi.",
    bg: "bg-pink-100",    icon_color: "text-pink-600",
    accent: "group-hover:bg-pink-500",
  },
  {
    icon: BarChart3, title: "Analitik Canggih",
    description: "Laporan penjualan mendalam, tren produk, dan insight AI untuk keputusan bisnis lebih cerdas.",
    bg: "bg-purple-100",  icon_color: "text-purple-600",
    accent: "group-hover:bg-purple-600",
  },
  {
    icon: Package, title: "Manajemen Stok",
    description: "Alert stok habis otomatis, manajemen gudang, dan sinkronisasi stok real-time ke semua platform.",
    bg: "bg-cyan-100",    icon_color: "text-cyan-600",
    accent: "group-hover:bg-cyan-500",
  },
  {
    icon: Bell, title: "Notifikasi Cerdas",
    description: "Notifikasi pesanan baru, stok menipis, dan ulasan pelanggan langsung ke HP kamu.",
    bg: "bg-amber-100",   icon_color: "text-amber-600",
    accent: "group-hover:bg-amber-500",
  },
  {
    icon: Zap, title: "Otomasi Pesanan",
    description: "Konfirmasi pesanan, cetak label, dan update resi secara otomatis. Hemat 3+ jam per hari.",
    bg: "bg-emerald-100", icon_color: "text-emerald-600",
    accent: "group-hover:bg-emerald-500",
  },
  {
    icon: Globe, title: "Integrasi Ekspedisi",
    description: "Terintegrasi dengan J&T, JNE, SiCepat, Anteraja, dan 20+ ekspedisi lainnya.",
    bg: "bg-teal-100",    icon_color: "text-teal-600",
    accent: "group-hover:bg-teal-500",
  },
  {
    icon: Shield, title: "Keamanan Terjamin",
    description: "Data bisnis kamu dilindungi enkripsi SSL 256-bit dan backup otomatis setiap hari.",
    bg: "bg-blue-100",    icon_color: "text-blue-600",
    accent: "group-hover:bg-blue-600",
  },
  {
    icon: Headphones, title: "Support 24/7",
    description: "Tim support kami siap membantu kapan saja via live chat, WhatsApp, atau email.",
    bg: "bg-rose-100",    icon_color: "text-rose-600",
    accent: "group-hover:bg-rose-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 section-tinted relative overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge mb-5">Fitur Unggulan</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1e1b4b] mb-5">
            Semua yang Kamu Butuhkan{" "}
            <span className="gradient-text">Ada di Sini</span>
          </h2>
          <p className="text-violet-600/70 text-lg max-w-2xl mx-auto">
            LapaKoo hadir dengan fitur lengkap yang dirancang khusus untuk penjual online Indonesia
            agar bisa bersaing dan berkembang lebih cepat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="group card-white card-hover rounded-2xl p-6 cursor-default"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center mb-4 transition-all duration-300 ${f.accent}`}>
                <f.icon className={`w-6 h-6 ${f.icon_color} group-hover:text-white transition-colors duration-300`} />
              </div>

              <h3 className="text-base font-bold text-[#1e1b4b] mb-2 group-hover:text-violet-700 transition-colors">
                {f.title}
              </h3>
              <p className="text-violet-600/60 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
