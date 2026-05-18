"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket, ShieldCheck, Clock } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-[#080811] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-900/20 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-900/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-12 md:p-16 border border-indigo-500/20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium px-4 py-2 rounded-full mb-8"
          >
            <Rocket className="w-4 h-4" />
            Bergabung dengan 25.000+ penjual sukses
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
          >
            Siap Bawa Bisnismu ke{" "}
            <span className="gradient-text">Level Berikutnya?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-10"
          >
            Mulai gratis hari ini dan rasakan perbedaannya. Tidak perlu kartu kredit,
            tidak ada kontrak jangka panjang.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Link
              href="/purchase"
              className="group flex items-center gap-2 shimmer-btn text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30"
            >
              Mulai Gratis 14 Hari
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="mailto:hello@lapakoo.id"
              className="flex items-center gap-2 text-gray-300 hover:text-white font-medium px-8 py-4 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/5"
            >
              Konsultasi Gratis
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span>Tidak perlu kartu kredit</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              <span>Setup dalam 5 menit</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-purple-400" />
              <span>Batalkan kapan saja</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
