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
  ShoppingBag, ArrowLeft, ArrowRight, Check, Star,
  Building2, Zap, Sparkles, User, Mail, Phone,
  Briefcase, ChevronRight, CreditCard, Landmark, QrCode,
  Shield, Lock,
} from "lucide-react";
import { PLANS, type PlanId, type BillingCycle, type OrderData } from "@/lib/types";

const personalSchema = z.object({
  firstName:    z.string().min(2, "Nama depan minimal 2 karakter"),
  lastName:     z.string().min(2, "Nama belakang minimal 2 karakter"),
  email:        z.string().email("Format email tidak valid"),
  phone:        z.string().min(10, "Nomor HP minimal 10 digit").regex(/^[0-9+\-\s]+$/, "Format tidak valid"),
  businessName: z.string().min(2, "Nama bisnis minimal 2 karakter"),
  businessType: z.string().min(1, "Pilih jenis bisnis"),
});
type PersonalForm = z.infer<typeof personalSchema>;

const planIcons   = { starter: Zap, pro: Star, business: Building2, enterprise: Sparkles };
const planGrads   = { starter: "from-slate-500 to-gray-500", pro: "from-violet-600 to-purple-600", business: "from-violet-500 to-fuchsia-600", enterprise: "from-amber-500 to-orange-500" };
const planLights  = { starter: "bg-slate-50 border-slate-200", pro: "bg-violet-50 border-violet-300 ring-2 ring-violet-400", business: "bg-violet-50 border-violet-200", enterprise: "bg-amber-50 border-amber-200" };

const businessTypes = ["Fashion & Pakaian","Elektronik & Gadget","Kuliner & Makanan","Kecantikan & Skincare","Alat Rumah Tangga","Olahraga & Hobi","Otomotif","Buku & Stationery","Dropshipper / Reseller","Lainnya"];

const paymentMethods = [
  { id: "transfer"    as const, label: "Transfer Bank",      icon: Landmark,   desc: "BCA, BRI, BNI, Mandiri" },
  { id: "credit_card" as const, label: "Kartu Kredit/Debit", icon: CreditCard,  desc: "Visa, Mastercard, JCB" },
  { id: "qris"        as const, label: "QRIS",               icon: QrCode,      desc: "Semua e-wallet" },
];

const steps = ["Pilih Paket", "Data Diri", "Pembayaran", "Konfirmasi"];

export default function PurchasePage() {
  const router = useRouter();
  const [step,          setStep]          = useState(0);
  const [selectedPlan,  setSelectedPlan]  = useState<PlanId>("pro");
  const [billing,       setBilling]       = useState<BillingCycle>("monthly");
  const [personalData,  setPersonalData]  = useState<PersonalForm | null>(null);
  const [payMethod,     setPayMethod]     = useState<"transfer"|"credit_card"|"qris">("transfer");
  const [submitting,    setSubmitting]    = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<PersonalForm>({
    resolver: zodResolver(personalSchema),
  });

  const plan  = PLANS.find(p => p.id === selectedPlan)!;
  const price = plan.monthlyPrice !== null
    ? (billing === "yearly" ? plan.yearlyPrice! : plan.monthlyPrice)
    : null;

  const onPersonalSubmit = (data: PersonalForm) => { setPersonalData(data); setStep(2); };

  const onSubmitOrder = async () => {
    if (!personalData) return;
    setSubmitting(true);
    try {
      const body: OrderData = { planId: selectedPlan, billingCycle: billing, ...personalData, paymentMethod: payMethod };
      const res    = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      router.push(`/purchase/success?orderId=${result.orderId}`);
    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ff]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-violet-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold gradient-text">LapaKoo</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">
            <Lock className="w-4 h-4" />
            Pembayaran Aman & Terenkripsi
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ scale: step === i ? 1.1 : 1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    i < step
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                      : i === step
                      ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-300"
                      : "bg-white border-2 border-violet-200 text-violet-300"
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </motion.div>
                <span className={`text-xs mt-1.5 hidden sm:block font-medium ${i === step ? "text-violet-700" : "text-violet-300"}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-14 sm:w-20 h-0.5 mx-2 transition-all duration-500 ${i < step ? "bg-emerald-400" : "bg-violet-200"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Step 0: Plan ── */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-[#1e1b4b] mb-2">Pilih Paket LapaKoo</h1>
                <p className="text-violet-500">Mulai gratis 14 hari, batalkan kapan saja</p>
              </div>

              {/* Billing toggle */}
              <div className="flex justify-center mb-7">
                <div className="inline-flex items-center gap-1 bg-white border border-violet-200 rounded-2xl p-1.5 shadow-sm">
                  {(["monthly","yearly"] as BillingCycle[]).map(c => (
                    <button key={c} onClick={() => setBilling(c)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${billing === c ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow" : "text-violet-400 hover:text-violet-700"}`}
                    >
                      {c === "monthly" ? "Bulanan" : "Tahunan"}
                      {c === "yearly" && <span className="bg-emerald-100 text-emerald-700 text-xs px-1.5 py-0.5 rounded-full font-bold">-20%</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {PLANS.map(p => {
                  const Icon = planIcons[p.id];
                  const px   = p.monthlyPrice !== null ? (billing === "yearly" ? p.yearlyPrice! : p.monthlyPrice) : null;
                  const sel  = selectedPlan === p.id;
                  return (
                    <motion.button key={p.id} onClick={() => setSelectedPlan(p.id)}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className={`relative text-left rounded-2xl p-5 border transition-all duration-300 ${sel ? planLights[p.id] + " shadow-lg" : "bg-white border-violet-100 hover:border-violet-300 hover:shadow-md"}`}
                    >
                      {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">Populer</div>}
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${planGrads[p.id]} flex items-center justify-center mb-3 shadow`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-bold text-[#1e1b4b] mb-1">{p.name}</div>
                      <div className="text-xs text-violet-400 mb-3">{p.description}</div>
                      {px ? (
                        <div><span className="text-2xl font-black text-[#1e1b4b]">Rp {px.toLocaleString("id-ID")}</span><span className="text-violet-400 text-xs">/bln</span></div>
                      ) : (
                        <div className="text-xl font-black text-[#1e1b4b]">Custom</div>
                      )}
                      {sel && <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                    </motion.button>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl border border-violet-200 p-5 mb-6 flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-violet-500 text-sm">Paket dipilih</div>
                  <div className="font-extrabold text-[#1e1b4b] text-lg">LapaKoo {plan.name}</div>
                </div>
                {price
                  ? <div className="text-right"><div className="text-2xl font-black gradient-text">Rp {price.toLocaleString("id-ID")}</div><div className="text-violet-400 text-xs">per bulan</div></div>
                  : <div className="text-xl font-bold gradient-text">Hubungi Sales</div>
                }
              </div>

              <button onClick={() => setStep(1)}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg"
              >
                Lanjutkan <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* ── Step 1: Personal ── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-[#1e1b4b] mb-2">Data Diri</h1>
                <p className="text-violet-500">Isi informasi akun dan bisnis kamu</p>
              </div>

              <form onSubmit={handleSubmit(onPersonalSubmit)} className="space-y-5">
                {/* Personal info */}
                <div className="bg-white rounded-2xl border border-violet-200 p-6 space-y-4 shadow-sm">
                  <h3 className="font-bold text-[#1e1b4b] flex items-center gap-2">
                    <User className="w-5 h-5 text-violet-500" /> Informasi Pribadi
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-violet-600 mb-1.5">Nama Depan *</label>
                      <input {...register("firstName")} placeholder="Budi" className="input-field" />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-violet-600 mb-1.5">Nama Belakang *</label>
                      <input {...register("lastName")} placeholder="Santoso" className="input-field" />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-violet-600 mb-1.5"><Mail className="w-4 h-4 inline mr-1" />Email *</label>
                    <input {...register("email")} type="email" placeholder="budi@email.com" className="input-field" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-violet-600 mb-1.5"><Phone className="w-4 h-4 inline mr-1" />Nomor HP / WhatsApp *</label>
                    <input {...register("phone")} type="tel" placeholder="08123456789" className="input-field" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Business info */}
                <div className="bg-white rounded-2xl border border-violet-200 p-6 space-y-4 shadow-sm">
                  <h3 className="font-bold text-[#1e1b4b] flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-500" /> Informasi Bisnis
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-violet-600 mb-1.5">Nama Toko / Bisnis *</label>
                    <input {...register("businessName")} placeholder="Toko Online Budi" className="input-field" />
                    {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-violet-600 mb-1.5">Jenis Bisnis *</label>
                    <select {...register("businessType")} className="input-field">
                      <option value="">Pilih jenis bisnis...</option>
                      {businessTypes.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                    </select>
                    {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType.message}</p>}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(0)} className="btn-outline flex items-center gap-2 px-6 py-3">
                    <ArrowLeft className="w-4 h-4" /> Kembali
                  </button>
                  <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-base">
                    Lanjutkan ke Pembayaran <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── Step 2: Payment ── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-[#1e1b4b] mb-2">Metode Pembayaran</h1>
                <p className="text-violet-500">Pilih cara pembayaran yang mudah bagimu</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment methods */}
                <div className="space-y-3">
                  <h3 className="font-bold text-[#1e1b4b]">Pilih Metode</h3>
                  {paymentMethods.map(pm => (
                    <motion.button key={pm.id} onClick={() => setPayMethod(pm.id)} whileHover={{ scale: 1.02 }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${payMethod === pm.id ? "border-violet-500 bg-violet-50 shadow-md shadow-violet-100" : "border-violet-100 bg-white hover:border-violet-300"}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${payMethod === pm.id ? "bg-gradient-to-br from-violet-600 to-purple-600" : "bg-violet-100"}`}>
                        <pm.icon className={`w-6 h-6 ${payMethod === pm.id ? "text-white" : "text-violet-500"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[#1e1b4b]">{pm.label}</div>
                        <div className="text-violet-400 text-sm">{pm.desc}</div>
                      </div>
                      {payMethod === pm.id && <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                    </motion.button>
                  ))}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <p className="text-emerald-700 text-xs">Semua transaksi diproteksi enkripsi SSL 256-bit. Data pembayaran kamu aman.</p>
                  </div>
                </div>

                {/* Order summary */}
                <div className="space-y-3">
                  <h3 className="font-bold text-[#1e1b4b]">Ringkasan Pesanan</h3>
                  <div className="bg-white rounded-2xl border border-violet-200 p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-violet-100">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${planGrads[selectedPlan]} flex items-center justify-center shadow`}>
                        {(() => { const Icon = planIcons[selectedPlan]; return <Icon className="w-5 h-5 text-white" />; })()}
                      </div>
                      <div>
                        <div className="font-bold text-[#1e1b4b]">LapaKoo {plan.name}</div>
                        <div className="text-violet-400 text-sm">{billing === "monthly" ? "Bulanan" : "Tahunan"}</div>
                      </div>
                    </div>
                    {personalData && (
                      <div className="space-y-2 pb-4 border-b border-violet-100 text-sm">
                        <div className="flex justify-between"><span className="text-violet-400">Nama</span><span className="font-semibold text-[#1e1b4b]">{personalData.firstName} {personalData.lastName}</span></div>
                        <div className="flex justify-between"><span className="text-violet-400">Email</span><span className="font-semibold text-[#1e1b4b] truncate max-w-[180px]">{personalData.email}</span></div>
                        <div className="flex justify-between"><span className="text-violet-400">Bisnis</span><span className="font-semibold text-[#1e1b4b]">{personalData.businessName}</span></div>
                      </div>
                    )}
                    {price ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-violet-500"><span>Harga paket</span><span>Rp {price.toLocaleString("id-ID")}/bln</span></div>
                        {billing === "yearly" && <div className="flex justify-between text-emerald-600 font-semibold"><span>Diskon tahunan</span><span>-Rp {((plan.monthlyPrice! - price) * 12).toLocaleString("id-ID")}</span></div>}
                        <div className="flex justify-between text-violet-500"><span>PPN 11%</span><span>Rp {Math.round(price * 0.11).toLocaleString("id-ID")}</span></div>
                        <div className="flex justify-between font-extrabold text-base pt-3 border-t border-violet-100">
                          <span className="text-[#1e1b4b]">Total Bayar</span>
                          <span className="gradient-text">Rp {Math.round(price * 1.11).toLocaleString("id-ID")}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-3"><div className="text-xl font-black gradient-text">Custom Pricing</div><p className="text-violet-400 text-sm mt-1">Tim kami akan menghubungi kamu</p></div>
                    )}
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-violet-50 border border-violet-200">
                    <Zap className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                    <p className="text-violet-700 text-xs"><strong>14 hari gratis</strong> sebelum mulai ditagih. Batalkan kapan saja.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="btn-outline flex items-center gap-2 px-6 py-3"><ArrowLeft className="w-4 h-4" /> Kembali</button>
                <button onClick={() => setStep(3)} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-base">
                  Review Pesanan <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Confirm ── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-[#1e1b4b] mb-2">Konfirmasi Pesanan</h1>
                <p className="text-violet-500">Cek kembali detail pesanan kamu</p>
              </div>

              <div className="max-w-xl mx-auto space-y-4">
                <div className="bg-white rounded-2xl border border-violet-200 p-6 shadow-sm">
                  <h3 className="font-extrabold text-[#1e1b4b] text-lg border-b border-violet-100 pb-3 mb-4">Detail Pesanan</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      ["Paket", `LapaKoo ${plan.name}`],
                      ["Siklus", billing === "monthly" ? "Bulanan" : "Tahunan"],
                      ["Nama", `${personalData?.firstName} ${personalData?.lastName}`],
                      ["Email", personalData?.email],
                      ["Bisnis", personalData?.businessName],
                      ["Pembayaran", paymentMethods.find(p => p.id === payMethod)?.label],
                    ].map(([label, val], i) => (
                      <><span key={`l${i}`} className="text-violet-400">{label}</span><span key={`v${i}`} className="font-semibold text-[#1e1b4b] truncate">{val}</span></>
                    ))}
                    {price && <>
                      <span className="text-violet-400 pt-3 border-t border-violet-100">Total Bayar</span>
                      <span className="font-extrabold text-lg gradient-text pt-3 border-t border-violet-100">Rp {Math.round(price * 1.11).toLocaleString("id-ID")}</span>
                    </>}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-700 text-xs">
                    Dengan melanjutkan, kamu menyetujui <a href="#" className="underline font-semibold">Syarat & Ketentuan</a> dan <a href="#" className="underline font-semibold">Kebijakan Privasi</a> LapaKoo.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-outline flex items-center gap-2 px-6 py-3"><ArrowLeft className="w-4 h-4" /> Kembali</button>
                  <button
                    onClick={onSubmitOrder}
                    disabled={submitting}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting
                      ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Memproses...</>
                      : <><Lock className="w-4 h-4" />Konfirmasi & Bayar</>
                    }
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
