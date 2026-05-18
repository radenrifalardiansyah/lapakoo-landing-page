"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    a: "Tergantung paket. Paket Starter untuk 1 pengguna, Pro untuk 3 pengguna, dan Business untuk 10 pengguna. Paket Enterprise memiliki pengguna tak terbatas. Kamu juga bisa menambah slot pengguna ekstra.",
  },
  {
    q: "Bagaimana cara pembayaran dan apakah ada biaya tersembunyi?",
    a: "Kami menerima pembayaran via transfer bank, kartu kredit/debit, dan QRIS. Tidak ada biaya tersembunyi. Harga yang tertera sudah termasuk semua fitur sesuai paket. Satu-satunya tambahan adalah PPN 11% sesuai regulasi pemerintah.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#0f0f1a] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-4 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            Pertanyaan yang{" "}
            <span className="gradient-text">Sering Ditanya</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Tidak menemukan jawaban yang kamu cari?{" "}
            <a href="mailto:hello@lapakoo.id" className="text-indigo-400 hover:text-indigo-300 underline">
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
              transition={{ delay: i * 0.06 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-indigo-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed text-sm border-t border-white/5 pt-4">
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
