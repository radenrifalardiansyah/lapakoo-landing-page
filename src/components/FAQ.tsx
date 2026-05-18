"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Apakah LapaKoo benar-benar gratis selama 14 hari?",
    a: "Ya, benar. Kamu bisa mencoba semua fitur paket Pro secara gratis selama 14 hari tanpa kartu kredit. Setelah periode trial habis, kamu bisa memilih paket yang sesuai atau berhenti tanpa biaya apapun.",
  },
  {
    q: "Marketplace apa saja yang bisa diintegrasikan?",
    a: "LapaKoo mendukung Shopee, Tokopedia, Lazada, TikTok Shop, Blibli, Bukalapak, JD.id, dan masih banyak lagi. Total lebih dari 15 marketplace dan platform e-commerce yang kami dukung.",
  },
  {
    q: "Apakah data toko saya aman di LapaKoo?",
    a: "Keamanan data adalah prioritas utama kami. Data kamu dilindungi dengan enkripsi SSL 256-bit, backup otomatis setiap hari, dan server yang bersertifikat ISO 27001. Kami tidak pernah membagikan data kamu ke pihak ketiga.",
  },
  {
    q: "Apakah saya perlu keahlian teknis untuk menggunakan LapaKoo?",
    a: "Tidak sama sekali. LapaKoo dirancang untuk semua orang. Interface yang intuitif memungkinkan siapa pun bisa langsung pakai dalam hitungan menit. Kami juga menyediakan video tutorial dan panduan lengkap.",
  },
  {
    q: "Bagaimana cara menghubungkan toko ke LapaKoo?",
    a: "Sangat mudah! Cukup masuk ke menu Integrasi, pilih marketplace yang ingin dihubungkan, lalu ikuti langkah otentikasi. Proses ini hanya membutuhkan waktu 2-5 menit dan stok serta produk akan langsung tersinkronisasi.",
  },
  {
    q: "Apakah bisa upgrade atau downgrade paket kapan saja?",
    a: "Tentu! Kamu bisa upgrade atau downgrade paket kapan saja. Saat upgrade, kamu hanya membayar selisih untuk sisa periode. Saat downgrade, perubahan akan berlaku di periode penagihan berikutnya.",
  },
  {
    q: "Apakah ada batasan jumlah pengguna dalam satu akun?",
    a: "Tergantung paket. Starter untuk 1 pengguna, Pro untuk 3 pengguna, Business untuk 10 pengguna. Enterprise memiliki pengguna tak terbatas. Kamu juga bisa menambah slot pengguna ekstra.",
  },
  {
    q: "Bagaimana cara pembayaran dan apakah ada biaya tersembunyi?",
    a: "Kami menerima pembayaran via transfer bank, kartu kredit/debit, dan QRIS. Tidak ada biaya tersembunyi. Harga yang tertera sudah termasuk semua fitur sesuai paket. Satu-satunya tambahan adalah PPN 11% sesuai regulasi.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 section-tinted relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge mb-5">FAQ</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1e1b4b] mb-4">
            Pertanyaan yang{" "}
            <span className="gradient-text">Sering Ditanya</span>
          </h2>
          <p className="text-violet-600/70">
            Tidak menemukan jawaban?{" "}
            <a href="mailto:hello@lapakoo.id" className="text-violet-600 font-semibold underline hover:text-violet-800">
              Hubungi kami
            </a>
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                open === i
                  ? "border-violet-300 shadow-lg shadow-violet-100"
                  : "border-violet-100 hover:border-violet-200"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center gap-3 p-5 text-left hover:bg-violet-50/50 transition-colors"
              >
                <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${open === i ? "text-violet-600" : "text-violet-300"}`} />
                <span className={`font-semibold flex-1 text-sm sm:text-base ${open === i ? "text-violet-800" : "text-[#1e1b4b]"}`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className={`w-5 h-5 transition-colors ${open === i ? "text-violet-600" : "text-violet-300"}`} />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-violet-700/70 text-sm leading-relaxed border-t border-violet-100 pt-4 ml-8">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
