"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";
import {
  CheckCircle,
  ShoppingBag,
  ArrowRight,
  Mail,
  Phone,
  Download,
  Share2,
} from "lucide-react";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") || "LPK-000000";

  const nextSteps = [
    {
      step: "1",
      title: "Cek email konfirmasi",
      desc: "Kami sudah mengirim detail akun dan instruksi login ke email kamu.",
      icon: Mail,
    },
    {
      step: "2",
      title: "Login ke dashboard",
      desc: "Gunakan email dan password sementara dari email konfirmasi untuk masuk.",
      icon: ShoppingBag,
    },
    {
      step: "3",
      title: "Hubungkan toko pertama",
      desc: "Ikuti panduan onboarding untuk menghubungkan marketplace kamu dalam 5 menit.",
      icon: ArrowRight,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] grid-pattern flex flex-col items-center justify-center px-4 py-16">
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center pulse-glow">
          <CheckCircle className="w-16 h-16 text-white" />
        </div>
        {/* Confetti particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos((i / 12) * Math.PI * 2) * 80,
              y: Math.sin((i / 12) * Math.PI * 2) * 80,
            }}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.8 }}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
            style={{
              background: `hsl(${(i * 30) % 360}, 70%, 60%)`,
              marginLeft: -6,
              marginTop: -6,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Pesanan <span className="gradient-text">Berhasil!</span>
        </h1>
        <p className="text-gray-400 text-lg mb-4">
          Selamat! Kamu sudah bergabung dengan 25.000+ penjual sukses di LapaKoo.
        </p>

        {/* Order ID */}
        <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-3 mb-10">
          <span className="text-gray-400 text-sm">ID Pesanan:</span>
          <span className="text-indigo-400 font-mono font-bold">{orderId}</span>
        </div>

        {/* Next steps */}
        <div className="glass-card rounded-3xl p-8 mb-8 text-left">
          <h2 className="text-xl font-bold text-white mb-6">Langkah Selanjutnya</h2>
          <div className="space-y-5">
            {nextSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <div className="font-semibold text-white">{step.title}</div>
                  <div className="text-gray-400 text-sm">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support info */}
        <div className="glass-card rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <Mail className="w-4 h-4 text-indigo-400" />
            <span>hello@lapakoo.id</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2 text-gray-300">
            <Phone className="w-4 h-4 text-green-400" />
            <span>+62 812-3456-7890 (WhatsApp)</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="flex items-center gap-2 shimmer-btn text-white font-bold px-8 py-3.5 rounded-2xl hover:scale-105 transition-transform"
          >
            <ShoppingBag className="w-5 h-5" />
            Buka Dashboard LapaKoo
          </a>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Bergabung dengan LapaKoo",
                  text: "Saya baru bergabung dengan LapaKoo – platform toko online terlengkap!",
                  url: window.location.origin,
                });
              }
            }}
            className="flex items-center gap-2 text-gray-300 hover:text-white px-8 py-3.5 rounded-2xl border border-white/10 hover:border-white/30 transition-all hover:bg-white/5"
          >
            <Share2 className="w-4 h-4" />
            Bagikan
          </button>
        </div>

        <Link
          href="/"
          className="inline-block mt-8 text-gray-500 hover:text-gray-300 text-sm transition-colors"
        >
          ← Kembali ke halaman utama
        </Link>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
