"use client";

import { motion } from "framer-motion";
import { UserPlus, Store, Rocket, CheckCircle2 } from "lucide-react";
import Card3D from "./Card3D";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Daftar & Verifikasi",
    description:
      "Buat akun LapaKoo dalam 2 menit. Isi data diri dan verifikasi email kamu. Gratis 14 hari tanpa kartu kredit.",
    bg: "from-violet-500 to-purple-600",
    light: "bg-violet-50",
    border: "border-violet-200",
    num_color: "text-violet-200",
    details: ["Daftar dengan email", "Verifikasi dalam 1 menit", "Akses langsung dashboard"],
  },
  {
    step: "02",
    icon: Store,
    title: "Hubungkan Toko",
    description:
      "Sambungkan semua marketplace kamu — Shopee, Tokopedia, Lazada, dan lainnya dengan mudah.",
    bg: "from-pink-500 to-rose-500",
    light: "bg-pink-50",
    border: "border-pink-200",
    num_color: "text-pink-200",
    details: ["Shopee, Tokopedia, Lazada", "TikTok Shop, Blibli, dll", "Sinkronisasi otomatis"],
  },
  {
    step: "03",
    icon: Rocket,
    title: "Kelola & Tumbuhkan",
    description:
      "Pantau pesanan, kelola stok, lihat analitik, dan otomasi proses bisnis dari satu tempat.",
    bg: "from-orange-400 to-amber-500",
    light: "bg-amber-50",
    border: "border-amber-200",
    num_color: "text-amber-200",
    details: ["Dashboard real-time", "Laporan otomatis", "AI insight bisnis"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 section-light relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />

      {/* Decorative */}
      <div className="absolute top-20 right-0 w-[340px] h-[340px] bg-violet-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[280px] h-[280px] bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge mb-5">Cara Kerja</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1e1b4b] mb-5">
            Mulai dalam{" "}
            <span className="gradient-text">3 Langkah Mudah</span>
          </h2>
          <p className="text-violet-600/70 text-lg max-w-2xl mx-auto">
            Tidak perlu skill teknis. LapaKoo dirancang agar siapa pun bisa langsung pakai
            dan rasakan manfaatnya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.14, duration: 0.5 }}
            >
            <Card3D className={`relative rounded-3xl p-8 ${s.light} border ${s.border}`} intensity={8}>
              {/* Big step number (decorative) */}
              <div className={`absolute top-4 right-6 text-7xl font-black ${s.num_color} select-none pointer-events-none`}>
                {s.step}
              </div>

              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.bg} flex items-center justify-center mb-6 shadow-lg`}>
                <s.icon className="w-7 h-7 text-white" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-gray-100 text-[#1e1b4b] text-xs font-black flex items-center justify-center shadow">
                  {i + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#1e1b4b] mb-3">{s.title}</h3>
              <p className="text-violet-700/60 text-sm leading-relaxed mb-6">{s.description}</p>

              <ul className="space-y-2">
                {s.details.map((d, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm font-medium text-[#1e1b4b]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </Card3D>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <a href="/purchase" className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-lg">
            <Rocket className="w-5 h-5" />
            Mulai Sekarang — Gratis 14 Hari
          </a>
        </motion.div>
      </div>
    </section>
  );
}
