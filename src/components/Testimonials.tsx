"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rizky Pratama", role: "Pemilik Toko Fashion Online", avatar: "RP",
    rating: 5, metrics: "+320% omzet",
    metricBg: "bg-violet-100 text-violet-700",
    avatarBg: "from-violet-500 to-purple-600",
    content: "Sejak pakai LapaKoo, omzet toko saya naik 3x lipat dalam 6 bulan. Semua toko bisa dipantau dari satu tempat. Gak perlu buka-tutup banyak tab lagi!",
  },
  {
    name: "Siti Rahayu", role: "Reseller Elektronik", avatar: "SR",
    rating: 5, metrics: "0 overselling",
    metricBg: "bg-pink-100 text-pink-700",
    avatarBg: "from-pink-500 to-rose-500",
    content: "Fitur sinkronisasi stok adalah lifesaver! Dulu sering overselling karena stok beda-beda di tiap platform. Sekarang zero overselling sudah 8 bulan.",
  },
  {
    name: "Budi Santoso", role: "Dropshipper Skincare", avatar: "BS",
    rating: 5, metrics: "15 toko dikelola",
    metricBg: "bg-purple-100 text-purple-700",
    avatarBg: "from-purple-500 to-violet-600",
    content: "LapaKoo membantu saya dari manage 2 toko menjadi 15 toko sekaligus. Otomasi pesanannya luar biasa, satu klik semua pesanan terproses. Worth it banget!",
  },
  {
    name: "Diana Kusuma", role: "Brand Owner Kuliner", avatar: "DK",
    rating: 5, metrics: "Data 100% akurat",
    metricBg: "bg-cyan-100 text-cyan-700",
    avatarBg: "from-cyan-500 to-blue-600",
    content: "Laporan analitiksnya detail banget. Saya bisa tahu produk mana yang paling laku, jam berapa paling ramai, dan di platform mana. Bisnis jadi lebih terarah.",
  },
  {
    name: "Ahmad Fauzi", role: "Seller Alat Rumah Tangga", avatar: "AF",
    rating: 5, metrics: "5 menit respons",
    metricBg: "bg-emerald-100 text-emerald-700",
    avatarBg: "from-emerald-500 to-green-600",
    content: "Support 24 jam beneran ada! Pernah ada masalah tengah malam, langsung direspons dalam 5 menit. Pelayanannya profesional dan solutif.",
  },
  {
    name: "Lestari Dewi", role: "Co-founder UMKM Batik", avatar: "LD",
    rating: 5, metrics: "Hemat 4 jam/hari",
    metricBg: "bg-amber-100 text-amber-700",
    avatarBg: "from-amber-400 to-orange-500",
    content: "Sebagai UMKM, kami butuh sistem yang mudah dan terjangkau. LapaKoo jawabannya. Fitur paket Pro sudah lebih dari cukup untuk bisnis kami berkembang.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 section-light relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
      <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge mb-5">Testimoni</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1e1b4b] mb-5">
            Dipercaya{" "}
            <span className="gradient-text">25.000+ Penjual</span>
          </h2>
          <p className="text-violet-600/70 text-lg max-w-xl mx-auto">
            Lihat apa kata mereka yang sudah merasakan manfaat LapaKoo untuk bisnis mereka.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="card-white card-hover rounded-2xl p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-7 h-7 text-violet-200 mb-2" />

              {/* Content */}
              <p className="text-[#1e1b4b]/70 text-sm leading-relaxed flex-1 mb-5">
                "{t.content}"
              </p>

              {/* Metric */}
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full w-fit mb-5 ${t.metricBg}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                {t.metrics}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-violet-100">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-[#1e1b4b] text-sm">{t.name}</div>
                  <div className="text-violet-400 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
