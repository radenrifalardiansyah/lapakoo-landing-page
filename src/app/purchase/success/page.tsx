"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowRight, Mail, Phone, Share2 } from "lucide-react";

function SuccessContent() {
  const params  = useSearchParams();
  const orderId = params.get("orderId") || "LPK-000000";

  const nextSteps = [
    { step:"1", icon: Mail,        title: "Cek email konfirmasi",    desc: "Kami sudah mengirim detail akun dan instruksi login ke email kamu." },
    { step:"2", icon: ShoppingBag, title: "Login ke dashboard",      desc: "Gunakan email dan password sementara dari email konfirmasi untuk masuk." },
    { step:"3", icon: ArrowRight,  title: "Hubungkan toko pertama",  desc: "Ikuti panduan onboarding untuk menghubungkan marketplace dalam 5 menit." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 flex flex-col items-center justify-center px-4 py-16">

      {/* Success icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
        className="relative mb-8"
      >
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-2xl shadow-emerald-200">
          <CheckCircle className="w-14 h-14 text-white" />
        </div>
        {/* Confetti */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale:0, x:0, y:0 }}
            animate={{ scale:[0,1,0], x: Math.cos(i/12*Math.PI*2)*70, y: Math.sin(i/12*Math.PI*2)*70 }}
            transition={{ delay: 0.3 + i*0.04, duration: 0.7 }}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full -ml-1.5 -mt-1.5"
            style={{ background: `hsl(${i*30},70%,60%)` }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity:0, y:30 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay: 0.3 }}
        className="text-center max-w-2xl w-full"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1e1b4b] mb-3">
          Pesanan <span className="gradient-text">Berhasil!</span> 🎉
        </h1>
        <p className="text-violet-500 text-lg mb-5">
          Selamat! Kamu sudah bergabung dengan 25.000+ penjual sukses di LapaKoo.
        </p>

        {/* Order ID */}
        <div className="inline-flex items-center gap-2 bg-white border border-violet-200 rounded-full px-6 py-3 mb-10 shadow-sm">
          <span className="text-violet-400 text-sm">ID Pesanan:</span>
          <span className="text-violet-700 font-mono font-bold">{orderId}</span>
        </div>

        {/* Next steps */}
        <div className="bg-white rounded-3xl border border-violet-200 p-7 mb-6 text-left shadow-md">
          <h2 className="text-xl font-bold text-[#1e1b4b] mb-6">Langkah Selanjutnya</h2>
          <div className="space-y-5">
            {nextSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, x:-20 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: 0.5 + i*0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow">
                  {s.step}
                </div>
                <div>
                  <div className="font-bold text-[#1e1b4b]">{s.title}</div>
                  <div className="text-violet-400 text-sm">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 mb-7 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-violet-700 font-medium"><Mail className="w-4 h-4 text-violet-500" />hello@lapakoo.id</div>
          <div className="hidden sm:block w-px h-4 bg-violet-200" />
          <div className="flex items-center gap-2 text-violet-700 font-medium"><Phone className="w-4 h-4 text-emerald-500" />+62 812-3456-7890 (WhatsApp)</div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="btn-primary flex items-center gap-2 px-8 py-3.5 text-base">
            <ShoppingBag className="w-5 h-5" />
            Buka Dashboard LapaKoo
          </a>
          <button
            onClick={() => navigator.share?.({ title:"LapaKoo", text:"Saya baru bergabung dengan LapaKoo!", url: window.location.origin })}
            className="btn-outline flex items-center gap-2 px-8 py-3.5 text-base"
          >
            <Share2 className="w-4 h-4" /> Bagikan
          </button>
        </div>

        <Link href="/" className="inline-block mt-8 text-violet-400 hover:text-violet-700 text-sm font-medium transition-colors">
          ← Kembali ke halaman utama
        </Link>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-violet-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
