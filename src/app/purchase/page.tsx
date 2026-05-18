"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Check,
  Star,
  Building2,
  Zap,
  Sparkles,
  User,
  Mail,
  Phone,
  Briefcase,
  ChevronRight,
  CreditCard,
  Landmark,
  QrCode,
  Shield,
  Lock,
} from "lucide-react";
import { PLANS, type PlanId, type BillingCycle, type OrderData } from "@/lib/types";

// Step 1: Plan selection schema
const planSchema = z.object({
  planId: z.enum(["starter", "pro", "business", "enterprise"]),
  billingCycle: z.enum(["monthly", "yearly"]),
});

// Step 2: Personal info schema
const personalSchema = z.object({
  firstName: z.string().min(2, "Nama depan minimal 2 karakter"),
  lastName: z.string().min(2, "Nama belakang minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z
    .string()
    .min(10, "Nomor HP minimal 10 digit")
    .regex(/^[0-9+\-\s]+$/, "Format nomor HP tidak valid"),
  businessName: z.string().min(2, "Nama bisnis minimal 2 karakter"),
  businessType: z.string().min(1, "Pilih jenis bisnis"),
});

// Step 3: Payment schema
const paymentSchema = z.object({
  paymentMethod: z.enum(["transfer", "credit_card", "qris"]),
});

type PersonalForm = z.infer<typeof personalSchema>;
type PaymentForm = z.infer<typeof paymentSchema>;

const planIcons = { starter: Zap, pro: Star, business: Building2, enterprise: Sparkles };
const planColors = {
  starter: "from-gray-500 to-slate-600",
  pro: "from-indigo-500 to-purple-600",
  business: "from-violet-500 to-fuchsia-600",
  enterprise: "from-amber-500 to-orange-600",
};

const businessTypes = [
  "Fashion & Pakaian",
  "Elektronik & Gadget",
  "Kuliner & Makanan",
  "Kecantikan & Skincare",
  "Alat Rumah Tangga",
  "Olahraga & Hobi",
  "Otomotif",
  "Buku & Stationery",
  "Dropshipper / Reseller",
  "Lainnya",
];

const paymentMethods = [
  {
    id: "transfer" as const,
    label: "Transfer Bank",
    icon: Landmark,
    desc: "BCA, BRI, BNI, Mandiri",
  },
  {
    id: "credit_card" as const,
    label: "Kartu Kredit/Debit",
    icon: CreditCard,
    desc: "Visa, Mastercard, JCB",
  },
  { id: "qris" as const, label: "QRIS", icon: QrCode, desc: "Scan QR dari semua e-wallet" },
];

const steps = ["Pilih Paket", "Data Diri", "Pembayaran", "Konfirmasi"];

export default function PurchasePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("pro");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [personalData, setPersonalData] = useState<PersonalForm | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "credit_card" | "qris">("transfer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register: regPersonal,
    handleSubmit: handlePersonal,
    formState: { errors: errPersonal },
  } = useForm<PersonalForm>({ resolver: zodResolver(personalSchema) });

  const plan = PLANS.find((p) => p.id === selectedPlan)!;
  const price =
    plan.monthlyPrice !== null
      ? billingCycle === "yearly"
        ? plan.yearlyPrice!
        : plan.monthlyPrice
      : null;

  const handleStepNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const handlePersonalSubmit = (data: PersonalForm) => {
    setPersonalData(data);
    setCurrentStep(2);
  };

  const handleSubmitOrder = async () => {
    if (!personalData) return;
    setIsSubmitting(true);
    try {
      const orderData: OrderData = {
        planId: selectedPlan,
        billingCycle,
        ...personalData,
        paymentMethod,
      };
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal membuat pesanan");
      router.push(`/purchase/success?orderId=${result.orderId}`);
    } catch (err) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] grid-pattern">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0f0f1a]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold gradient-text">LapaKoo</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Lock className="w-4 h-4 text-green-400" />
            Pembayaran Aman
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Progress steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: currentStep === i ? 1.1 : 1,
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    i < currentStep
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                      : i === currentStep
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-white/5 border border-white/20 text-gray-500"
                  }`}
                >
                  {i < currentStep ? <Check className="w-5 h-5" /> : i + 1}
                </motion.div>
                <span
                  className={`text-xs mt-2 hidden sm:block ${
                    i === currentStep ? "text-white" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-16 sm:w-24 h-0.5 mx-2 transition-all duration-500 ${
                    i < currentStep ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Plan Selection */}
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-white text-center mb-2">Pilih Paket LapaKoo</h1>
              <p className="text-gray-400 text-center mb-8">
                Mulai gratis 14 hari, batalkan kapan saja
              </p>

              {/* Billing toggle */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5">
                  {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => (
                    <button
                      key={cycle}
                      onClick={() => setBillingCycle(cycle)}
                      className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        billingCycle === cycle
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                          : "text-gray-400"
                      }`}
                    >
                      {cycle === "monthly" ? "Bulanan" : "Tahunan"}
                      {cycle === "yearly" && (
                        <span className="bg-green-500/20 text-green-400 text-xs px-1.5 py-0.5 rounded-full">
                          -20%
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {PLANS.map((p) => {
                  const Icon = planIcons[p.id];
                  const isSelected = selectedPlan === p.id;
                  const price =
                    p.monthlyPrice !== null
                      ? billingCycle === "yearly"
                        ? p.yearlyPrice!
                        : p.monthlyPrice
                      : null;

                  return (
                    <motion.button
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative text-left rounded-2xl p-5 transition-all duration-300 ${
                        isSelected
                          ? "border-2 border-indigo-500 bg-indigo-900/20 shadow-lg shadow-indigo-500/20"
                          : "glass-card hover:border-white/20"
                      }`}
                    >
                      {p.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                          Populer
                        </div>
                      )}
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${planColors[p.id]} flex items-center justify-center mb-3`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-bold text-white mb-1">{p.name}</div>
                      <div className="text-xs text-gray-400 mb-3">{p.description}</div>
                      {price ? (
                        <div>
                          <span className="text-2xl font-black text-white">
                            Rp {price.toLocaleString("id-ID")}
                          </span>
                          <span className="text-gray-400 text-xs">/bln</span>
                        </div>
                      ) : (
                        <div className="text-xl font-black text-white">Custom</div>
                      )}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Selected plan summary */}
              <div className="glass-card rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-sm">Paket dipilih</div>
                    <div className="text-white font-bold text-lg">{plan.name}</div>
                  </div>
                  {price ? (
                    <div className="text-right">
                      <div className="text-2xl font-black gradient-text">
                        Rp {price.toLocaleString("id-ID")}
                      </div>
                      <div className="text-gray-400 text-sm">per bulan</div>
                    </div>
                  ) : (
                    <div className="text-xl font-bold gradient-text">Hubungi Sales</div>
                  )}
                </div>
              </div>

              <button
                onClick={handleStepNext}
                className="w-full flex items-center justify-center gap-2 shimmer-btn text-white font-bold py-4 px-8 rounded-2xl text-lg hover:scale-105 transition-transform"
              >
                Lanjutkan
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-white text-center mb-2">Data Diri</h1>
              <p className="text-gray-400 text-center mb-8">Isi informasi akun dan bisnis kamu</p>

              <form onSubmit={handlePersonal(handlePersonalSubmit)} className="space-y-6">
                <div className="glass-card rounded-2xl p-6 space-y-5">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-400" />
                    Informasi Pribadi
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Nama Depan *</label>
                      <input
                        {...regPersonal("firstName")}
                        placeholder="Budi"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                      {errPersonal.firstName && (
                        <p className="text-red-400 text-xs mt-1">{errPersonal.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Nama Belakang *</label>
                      <input
                        {...regPersonal("lastName")}
                        placeholder="Santoso"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                      {errPersonal.lastName && (
                        <p className="text-red-400 text-xs mt-1">{errPersonal.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email *
                    </label>
                    <input
                      {...regPersonal("email")}
                      type="email"
                      placeholder="budi@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    {errPersonal.email && (
                      <p className="text-red-400 text-xs mt-1">{errPersonal.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Nomor HP / WhatsApp *
                    </label>
                    <input
                      {...regPersonal("phone")}
                      type="tel"
                      placeholder="08123456789"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    {errPersonal.phone && (
                      <p className="text-red-400 text-xs mt-1">{errPersonal.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 space-y-5">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                    Informasi Bisnis
                  </h3>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Nama Toko / Bisnis *</label>
                    <input
                      {...regPersonal("businessName")}
                      placeholder="Toko Online Budi"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    {errPersonal.businessName && (
                      <p className="text-red-400 text-xs mt-1">
                        {errPersonal.businessName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Jenis Bisnis *</label>
                    <select
                      {...regPersonal("businessType")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                    >
                      <option value="" className="bg-[#1a1a2e]">
                        Pilih jenis bisnis...
                      </option>
                      {businessTypes.map((bt) => (
                        <option key={bt} value={bt} className="bg-[#1a1a2e]">
                          {bt}
                        </option>
                      ))}
                    </select>
                    {errPersonal.businessType && (
                      <p className="text-red-400 text-xs mt-1">
                        {errPersonal.businessType.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Kembali
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 shimmer-btn text-white font-bold py-4 px-8 rounded-2xl text-lg hover:scale-105 transition-transform"
                  >
                    Lanjutkan ke Pembayaran
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-white text-center mb-2">Metode Pembayaran</h1>
              <p className="text-gray-400 text-center mb-8">Pilih cara pembayaran yang mudah bagimu</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Payment methods */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Pilih Metode Pembayaran</h3>
                  {paymentMethods.map((pm) => (
                    <motion.button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 text-left ${
                        paymentMethod === pm.id
                          ? "border-2 border-indigo-500 bg-indigo-900/20"
                          : "glass-card hover:border-white/20"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          paymentMethod === pm.id
                            ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                            : "bg-white/10"
                        }`}
                      >
                        <pm.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white">{pm.label}</div>
                        <div className="text-gray-400 text-sm">{pm.desc}</div>
                      </div>
                      {paymentMethod === pm.id && (
                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </motion.button>
                  ))}

                  {/* Security badge */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                    <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <p className="text-green-400/80 text-xs">
                      Semua transaksi diproteksi dengan enkripsi SSL 256-bit. Data pembayaran kamu
                      aman bersama kami.
                    </p>
                  </div>
                </div>

                {/* Right: Order summary */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Ringkasan Pesanan</h3>
                  <div className="glass-card rounded-2xl p-5 space-y-4">
                    {/* Plan details */}
                    <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${planColors[selectedPlan]} flex items-center justify-center`}
                      >
                        {(() => {
                          const Icon = planIcons[selectedPlan];
                          return <Icon className="w-5 h-5 text-white" />;
                        })()}
                      </div>
                      <div>
                        <div className="font-semibold text-white">LapaKoo {plan.name}</div>
                        <div className="text-gray-400 text-sm capitalize">{billingCycle === "monthly" ? "Bulanan" : "Tahunan"}</div>
                      </div>
                    </div>

                    {/* Personal summary */}
                    {personalData && (
                      <div className="space-y-2 pb-4 border-b border-white/10 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Nama</span>
                          <span className="text-white">
                            {personalData.firstName} {personalData.lastName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Email</span>
                          <span className="text-white truncate max-w-[180px]">
                            {personalData.email}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bisnis</span>
                          <span className="text-white">{personalData.businessName}</span>
                        </div>
                      </div>
                    )}

                    {/* Pricing breakdown */}
                    {price && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                          <span>Harga paket</span>
                          <span>Rp {price.toLocaleString("id-ID")}/bln</span>
                        </div>
                        {billingCycle === "yearly" && (
                          <div className="flex justify-between text-green-400">
                            <span>Diskon tahunan (20%)</span>
                            <span>
                              -Rp{" "}
                              {(
                                ((plan.monthlyPrice! - price) * 12)
                              ).toLocaleString("id-ID")}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-gray-400">
                          <span>PPN 11%</span>
                          <span>Rp {Math.round(price * 0.11).toLocaleString("id-ID")}</span>
                        </div>
                        <div className="flex justify-between text-white font-bold text-base pt-3 border-t border-white/10">
                          <span>Total Bayar</span>
                          <span className="gradient-text">
                            Rp {Math.round(price * 1.11).toLocaleString("id-ID")}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs">*Dibayar per bulan, termasuk PPN</p>
                      </div>
                    )}

                    {!price && (
                      <div className="text-center py-4">
                        <div className="text-white font-bold text-xl gradient-text">
                          Custom Pricing
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          Tim kami akan menghubungi kamu untuk negosiasi harga
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Trial info */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                    <Zap className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <p className="text-indigo-300/80 text-xs">
                      Kamu akan mendapatkan <strong>14 hari gratis</strong> sebelum mulai ditagih.
                      Batalkan kapan saja sebelum trial habis tanpa biaya apapun.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Kembali
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 flex items-center justify-center gap-2 shimmer-btn text-white font-bold py-4 px-8 rounded-2xl text-lg hover:scale-105 transition-transform"
                >
                  Review Pesanan
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-white text-center mb-2">Konfirmasi Pesanan</h1>
              <p className="text-gray-400 text-center mb-8">Cek kembali detail pesanan kamu</p>

              <div className="max-w-xl mx-auto space-y-4">
                <div className="glass-card rounded-2xl p-6 space-y-4">
                  <h3 className="font-bold text-white text-lg border-b border-white/10 pb-3">
                    Detail Pesanan
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <span className="text-gray-400">Paket</span>
                    <span className="text-white font-semibold">LapaKoo {plan.name}</span>

                    <span className="text-gray-400">Siklus</span>
                    <span className="text-white">{billingCycle === "monthly" ? "Bulanan" : "Tahunan"}</span>

                    <span className="text-gray-400">Nama</span>
                    <span className="text-white">
                      {personalData?.firstName} {personalData?.lastName}
                    </span>

                    <span className="text-gray-400">Email</span>
                    <span className="text-white truncate">{personalData?.email}</span>

                    <span className="text-gray-400">Bisnis</span>
                    <span className="text-white">{personalData?.businessName}</span>

                    <span className="text-gray-400">Pembayaran</span>
                    <span className="text-white capitalize">
                      {paymentMethods.find((pm) => pm.id === paymentMethod)?.label}
                    </span>

                    {price && (
                      <>
                        <span className="text-gray-400 pt-3 border-t border-white/10">
                          Total Bayar
                        </span>
                        <span className="text-white font-bold text-lg gradient-text pt-3 border-t border-white/10">
                          Rp {Math.round(price * 1.11).toLocaleString("id-ID")}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-300/80 text-xs">
                    Dengan melanjutkan, kamu menyetujui{" "}
                    <a href="#" className="underline hover:text-amber-300">
                      Syarat & Ketentuan
                    </a>{" "}
                    dan{" "}
                    <a href="#" className="underline hover:text-amber-300">
                      Kebijakan Privasi
                    </a>{" "}
                    LapaKoo.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Kembali
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 shimmer-btn text-white font-bold py-4 px-8 rounded-2xl text-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Konfirmasi & Bayar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
