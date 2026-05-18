"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket, ShieldCheck, Clock } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600" />
      <div className="absolute inset-0 dot-pattern opacity-10" />
      {/* Blobs inside */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blob" />
      <div className="absolute bottom-0 left-0 w-[340px] h-[340px] bg-fuchsia-400/20 blob" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full mb-8"
        >
          <Rocket className="w-4 h-4" />
          Bergabung dengan 25.000+ penjual sukses
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
        >
          Siap Bawa Bisnismu ke
          <br />
          <span className="text-yellow-300">Level Berikutnya?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-white/80 text-lg max-w-xl mx-auto mb-10"
        >
          Mulai gratis hari ini dan rasakan perbedaannya. Tidak perlu kartu kredit,
          tidak ada kontrak jangka panjang.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link
            href="/purchase"
            className="group flex items-center gap-2 bg-white text-violet-700 font-extrabold px-10 py-4 rounded-2xl text-lg hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            Mulai Gratis 14 Hari
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="mailto:hello@lapakoo.id"
            className="flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl border-2 border-white/30 hover:bg-white/10 transition-all duration-200"
          >
            Konsultasi Gratis
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-7 text-sm text-white/70"
        >
          {[
            { icon: ShieldCheck, text: "Tidak perlu kartu kredit", color: "text-emerald-300" },
            { icon: Clock,       text: "Setup dalam 5 menit",      color: "text-yellow-300" },
            { icon: Rocket,      text: "Batalkan kapan saja",       color: "text-pink-300" },
          ].map(({ icon: Icon, text, color }, i) => (
            <div key={i} className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${color}`} />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
