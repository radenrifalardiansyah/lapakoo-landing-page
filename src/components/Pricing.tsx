"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star, Building2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: { monthly: 99000, yearly: 79000 },
    description: "Sempurna untuk penjual baru yang ingin memulai",
    color: "from-gray-500 to-slate-600",
    features: [
      "2 Toko marketplace",
      "500 produk",
      "200 pesanan/bulan",
      "Laporan dasar",
      "Support via email",
      "Sinkronisasi stok",
    ],
    cta: "Mulai Gratis",
    popular: false,
  },
  {
    name: "Pro",
    icon: Star,
    price: { monthly: 299000, yearly: 239000 },
    description: "Untuk penjual serius yang ingin naik level",
    color: "from-indigo-500 to-purple-600",
    features: [
      "10 Toko marketplace",
      "5.000 produk",
      "Pesanan tak terbatas",
      "Analitik mendalam + AI",
      "Otomasi pesanan",
      "Multi-ekspedisi",
      "Support prioritas 24/7",
      "Export laporan",
    ],
    cta: "Coba 14 Hari Gratis",
    popular: true,
  },
  {
    name: "Business",
    icon: Building2,
    price: { monthly: 699000, yearly: 559000 },
    description: "Untuk bisnis dengan volume tinggi & tim besar",
    color: "from-violet-500 to-fuchsia-600",
    features: [
      "Unlimited toko",
      "Unlimited produk",
      "Unlimited pesanan",
      "AI + analitik enterprise",
      "Manajemen tim (10 user)",
      "API access",
      "Dedicated account manager",
      "Onboarding khusus",
      "SLA 99.9%",
    ],
    cta: "Hubungi Sales",
    popular: false,
  },
  {
    name: "Enterprise",
    icon: Sparkles,
    price: { monthly: null, yearly: null },
    description: "Solusi custom untuk perusahaan besar",
    color: "from-amber-500 to-orange-600",
    features: [
      "Semua fitur Business",
      "Infrastructure khusus",
      "Integrasi custom",
      "White-label tersedia",
      "Unlimited pengguna",
      "Dukungan on-site",
      "Kontrak fleksibel",
    ],
    cta: "Konsultasi Gratis",
    popular: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-[#0f0f1a] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-4 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">
            Harga Paket
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            Pilih Paket{" "}
            <span className="gradient-text">Sesuai Kebutuhan</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Mulai gratis, upgrade kapan saja. Semua paket sudah termasuk fitur lengkap.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                !yearly
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                yearly
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Tahunan
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full font-semibold">
                Hemat 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl p-6 flex flex-col transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-indigo-900/50 to-purple-900/30 border-2 border-indigo-500/60 scale-105 shadow-2xl shadow-indigo-500/20"
                  : "glass-card hover:border-white/20 hover:scale-105"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                  ⭐ Paling Populer
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
                >
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {plan.price.monthly ? (
                  <div>
                    <span className="text-4xl font-black text-white">
                      Rp{" "}
                      {(yearly ? plan.price.yearly! : plan.price.monthly).toLocaleString("id-ID")}
                    </span>
                    <span className="text-gray-400 text-sm">/bulan</span>
                    {yearly && (
                      <div className="text-green-400 text-xs mt-1">
                        Hemat Rp{" "}
                        {(
                          (plan.price.monthly - plan.price.yearly!) * 12
                        ).toLocaleString("id-ID")}
                        /tahun
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-3xl font-black text-white">Custom</div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-indigo-400" : "text-green-400"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/purchase"
                className={`block text-center font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 ${
                  plan.popular
                    ? "shimmer-btn text-white hover:shadow-lg hover:shadow-indigo-500/30"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-10"
        >
          Semua harga belum termasuk PPN 11%. Pembayaran aman via transfer bank, kartu kredit, atau QRIS.
        </motion.p>
      </div>
    </section>
  );
}
