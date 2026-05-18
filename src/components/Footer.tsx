"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Send, AtSign, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Produk:    [{ label: "Fitur", href: "#features" },{ label: "Harga", href: "#pricing" },{ label: "Integrasi", href: "#" },{ label: "Changelog", href: "#" },{ label: "Roadmap", href: "#" }],
  Perusahaan:[{ label: "Tentang Kami", href: "#" },{ label: "Blog", href: "#" },{ label: "Karir", href: "#" },{ label: "Partner", href: "#" },{ label: "Press Kit", href: "#" }],
  Bantuan:   [{ label: "Dokumentasi", href: "#" },{ label: "Tutorial Video", href: "#" },{ label: "Live Chat", href: "#" },{ label: "Status Server", href: "#" },{ label: "Community", href: "#" }],
  Legal:     [{ label: "Syarat & Ketentuan", href: "#" },{ label: "Kebijakan Privasi", href: "#" },{ label: "Kebijakan Cookie", href: "#" },{ label: "GDPR", href: "#" }],
};

const marketplaces = ["Shopee","Tokopedia","Lazada","TikTok Shop","Blibli","Bukalapak","JD.id","Zalora"];

export default function Footer() {
  return (
    <footer className="bg-[#1e1b4b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8">

          {/* Brand col */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <Image src="/mini-logo-lapakoo.png" alt="LapaKoo" width={36} height={36} className="rounded-lg" />
              <span className="text-xl font-extrabold text-white">LapaKoo</span>
            </Link>
            <p className="text-violet-300/70 text-sm leading-relaxed mb-6 max-w-xs">
              Platform manajemen toko online terlengkap untuk penjual Indonesia yang ingin
              berkembang lebih cepat.
            </p>

            <div className="space-y-2.5 text-sm text-violet-300/70">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-violet-400" />hello@lapakoo.id</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-violet-400" />+62 812-3456-7890</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-violet-400" />Jakarta, Indonesia</div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              {[MessageCircle, Send, AtSign].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-violet-500 flex items-center justify-center text-violet-300 hover:text-white transition-all duration-200 hover:scale-110">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="text-white font-bold text-sm mb-4">{cat}</h4>
              <ul className="space-y-3">
                {links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-violet-300/60 hover:text-violet-200 text-sm transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Marketplace row */}
        <div className="py-5 border-t border-white/10">
          <p className="text-violet-400/60 text-xs text-center mb-3">Terintegrasi dengan</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {marketplaces.map(m => (
              <span key={m} className="text-xs text-violet-300/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors cursor-default">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-violet-400/60 text-sm">© {new Date().getFullYear()} LapaKoo. All rights reserved.</p>
          <p className="text-violet-500/40 text-xs">Dibuat dengan ❤️ untuk penjual online Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
