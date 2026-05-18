"use client";

import { motion } from "framer-motion";
import { UserPlus, Store, Rocket, CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Daftar & Verifikasi",
    description:
      "Buat akun LapaKoo dalam 2 menit. Isi data diri dan verifikasi email kamu. Gratis 14 hari tanpa kartu kredit.",
    color: "from-indigo-500 to-purple-600",
    details: ["Daftar dengan email", "Verifikasi dalam 1 menit", "Akses langsung dashboard"],
  },
  {
    step: "02",
    icon: Store,
    title: "Hubungkan Toko",
    description:
      "Sambungkan semua marketplace kamu — Shopee, Tokopedia, Lazada, dan lainnya dengan mudah.",
    color: "from-purple-500 to-pink-600",
    details: ["Shopee, Tokopedia, Lazada", "TikTok Shop, Blibli, dll", "Sinkronisasi otomatis"],
  },
  {
    step: "03",
    icon: Rocket,
    title: "Kelola & Tumbuhkan",
    description:
      "Pantau pesanan, kelola stok, lihat analitik, dan otomasi proses bisnis dari satu tempat.",
    color: "from-pink-500 to-rose-600",
    details: ["Dashboard real-time", "Laporan otomatis", "AI insight bisnis"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#080811] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Decorative background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-purple-400 text-sm font-semibold tracking-wider uppercase mb-4 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full">
            Cara Kerja
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            Mulai dalam{" "}
            <span className="gradient-text">3 Langkah Mudah</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tidak perlu skill teknis. LapaKoo dirancang agar siapa pun bisa langsung pakai
            dan rasakan manfaatnya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[33%] right-[33%] h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative"
            >
              {/* Step number */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center pulse-glow flex-shrink-0`}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-[#0f0f1a] text-xs font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <span className="text-5xl font-black text-white/5">{step.step}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{step.description}</p>

              <ul className="space-y-2">
                {step.details.map((detail, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="/purchase"
            className="inline-flex items-center gap-2 shimmer-btn text-white font-bold px-10 py-4 rounded-2xl text-lg hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-indigo-500/30"
          >
            <Rocket className="w-5 h-5" />
            Mulai Sekarang — Gratis 14 Hari
          </a>
        </motion.div>
      </div>
    </section>
  );
}
