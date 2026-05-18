"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rizky Pratama",
    role: "Pemilik Toko Fashion Online",
    avatar: "RP",
    rating: 5,
    content:
      "Sejak pakai LapaKoo, omzet toko saya naik 3x lipat dalam 6 bulan. Semua toko bisa dipantau dari satu tempat. Gak perlu buka-tutup banyak tab lagi!",
    metrics: "+320% omzet",
    color: "from-indigo-500 to-purple-600",
  },
  {
    name: "Siti Rahayu",
    role: "Reseller Elektronik",
    avatar: "SR",
    rating: 5,
    content:
      "Fitur sinkronisasi stok adalah lifesaver! Dulu sering overselling karena stok beda-beda di tiap platform. Sekarang zero overselling sudah 8 bulan.",
    metrics: "0 overselling",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Budi Santoso",
    role: "Dropshipper Skincare",
    avatar: "BS",
    rating: 5,
    content:
      "LapaKoo membantu saya dari manage 2 toko menjadi 15 toko sekaligus. Otomasi pesanannya luar biasa, satu klik semua pesanan terproses. Worth it banget!",
    metrics: "15 toko dikelola",
    color: "from-violet-500 to-indigo-600",
  },
  {
    name: "Diana Kusuma",
    role: "Brand Owner Kuliner",
    avatar: "DK",
    rating: 5,
    content:
      "Laporan analitiksnya detail banget. Saya bisa tahu produk mana yang paling laku, jam berapa paling ramai, dan di platform mana. Bisnis jadi lebih terarah.",
    metrics: "Data 100% akurat",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Ahmad Fauzi",
    role: "Seller Alat Rumah Tangga",
    avatar: "AF",
    rating: 5,
    content:
      "Support 24 jam beneran ada! Pernah ada masalah tengah malam, langsung direspons dalam 5 menit. Pelayanannya profesional dan solutif.",
    metrics: "5 menit respons",
    color: "from-emerald-500 to-green-600",
  },
  {
    name: "Lestari Dewi",
    role: "Co-founder UMKM Batik",
    avatar: "LD",
    rating: 5,
    content:
      "Sebagai UMKM, kami butuh sistem yang mudah dan terjangkau. LapaKoo jawabannya. Fitur paket Pro sudah lebih dari cukup untuk bisnis kami berkembang.",
    metrics: "Hemat 4 jam/hari",
    color: "from-amber-500 to-orange-600",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#080811] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-pink-400 text-sm font-semibold tracking-wider uppercase mb-4 bg-pink-500/10 border border-pink-500/20 px-4 py-1.5 rounded-full">
            Testimoni
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            Dipercaya{" "}
            <span className="gradient-text">25.000+ Penjual</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] group"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-indigo-500/40 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(t.rating)
                  .fill(0)
                  .map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.content}"</p>

              {/* Metric badge */}
              <div
                className={`inline-flex items-center gap-1 bg-gradient-to-r ${t.color} bg-opacity-20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                {t.metrics}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
