"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Star, Building2, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter", icon: Zap,
    price: { monthly: 99000, yearly: 79000 },
    description: "Untuk penjual baru yang ingin memulai",
    gradient: "from-slate-500 to-gray-600",
    light: "bg-slate-50", border: "border-slate-200",
    popular: false,
    features: ["1 Toko online","500 produk","200 pesanan/bulan","Laporan dasar","Support email","Domain toko sendiri"],
  },
  {
    name: "Pro", icon: Star,
    price: { monthly: 299000, yearly: 239000 },
    description: "Untuk penjual serius yang ingin naik level",
    gradient: "from-violet-600 to-purple-600",
    light: "bg-violet-600", border: "border-violet-400",
    popular: true,
    features: ["1 Toko online","5.000 produk","Pesanan tak terbatas","Analitik AI","Otomasi pesanan","Multi-ekspedisi","Support prioritas 24/7","Export laporan"],
  },
  {
    name: "Business", icon: Building2,
    price: { monthly: 699000, yearly: 559000 },
    description: "Untuk bisnis volume tinggi & tim besar",
    gradient: "from-violet-500 to-fuchsia-600",
    light: "bg-violet-50", border: "border-violet-200",
    popular: false,
    features: ["1 Toko online","Unlimited produk","Unlimited pesanan","AI enterprise","Tim 10 user","API access","Account manager","Onboarding khusus","SLA 99.9%"],
  },
  {
    name: "Enterprise", icon: Sparkles,
    price: { monthly: null, yearly: null },
    description: "Solusi custom untuk perusahaan besar",
    gradient: "from-amber-500 to-orange-500",
    light: "bg-amber-50", border: "border-amber-200",
    popular: false,
    features: ["Semua fitur Business","Infrastructure khusus","Integrasi custom","White-label","Unlimited users","Support on-site","Kontrak fleksibel"],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 section-tinted relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-100/80 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge mb-5">Harga Paket</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1e1b4b] mb-5">
            Pilih Paket{" "}
            <span className="gradient-text">Sesuai Kebutuhan</span>
          </h2>
          <p className="text-violet-600/70 text-lg max-w-xl mx-auto mb-8">
            Mulai gratis, upgrade kapan saja. Semua paket sudah termasuk fitur lengkap.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 bg-white border border-violet-200 rounded-2xl p-1.5 shadow-sm">
            {(["monthly", "yearly"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setYearly(c === "yearly")}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  (c === "yearly") === yearly
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md"
                    : "text-violet-500 hover:text-violet-700"
                }`}
              >
                {c === "monthly" ? "Bulanan" : "Tahunan"}
                {c === "yearly" && (
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-bold">
                    Hemat 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {plans.map((plan, i) => {
            const price = plan.price.monthly
              ? yearly ? plan.price.yearly! : plan.price.monthly
              : null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl overflow-hidden ${
                  plan.popular
                    ? "shadow-2xl shadow-violet-300 scale-105 ring-2 ring-violet-400"
                    : "card-white card-hover"
                }`}
              >
                {/* Popular banner */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold text-center py-2 tracking-wide">
                    ⭐ PALING POPULER
                  </div>
                )}

                <div className={`p-6 ${plan.popular ? "bg-white pt-10" : ""}`}>
                  {/* Icon + name */}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4 shadow-md`}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1e1b4b]">{plan.name}</h3>
                  <p className="text-violet-500/70 text-xs mt-1 mb-5">{plan.description}</p>

                  {/* Price */}
                  {price ? (
                    <div className="mb-6">
                      <span className="text-3xl font-black text-[#1e1b4b]">
                        Rp {price.toLocaleString("id-ID")}
                      </span>
                      <span className="text-violet-400 text-sm">/bln</span>
                      {yearly && (
                        <div className="text-emerald-600 text-xs font-semibold mt-1">
                          Hemat Rp {((plan.price.monthly! - price) * 12).toLocaleString("id-ID")}/thn
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-2xl font-black text-[#1e1b4b] mb-6">Custom</div>
                  )}

                  {/* CTA */}
                  <Link
                    href="/purchase"
                    className={`block text-center font-bold py-3 px-5 rounded-xl text-sm transition-all duration-200 hover:scale-105 mb-6 ${
                      plan.popular
                        ? "shimmer text-white shadow-lg"
                        : "border-2 border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-400"
                    }`}
                  >
                    {plan.name === "Enterprise" ? "Konsultasi Gratis" : "Coba Gratis 14 Hari"}
                  </Link>

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-violet-700">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-violet-600" : "text-emerald-500"}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-violet-400 text-sm mt-10"
        >
          Semua harga belum termasuk PPN 11%. Pembayaran aman via transfer bank, kartu kredit, atau QRIS.
        </motion.p>
      </div>
    </section>
  );
}
