"use client";

import Link from "next/link";
import { ShoppingBag, MessageCircle, Send, AtSign, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Produk: [
    { label: "Fitur", href: "#features" },
    { label: "Harga", href: "#pricing" },
    { label: "Integrasi", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Karir", href: "#" },
    { label: "Partner", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  Bantuan: [
    { label: "Dokumentasi", href: "#" },
    { label: "Tutorial Video", href: "#" },
    { label: "Live Chat", href: "#" },
    { label: "Status Server", href: "#" },
    { label: "Community", href: "#" },
  ],
  Legal: [
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Kebijakan Cookie", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

const marketplaces = ["Shopee", "Tokopedia", "Lazada", "TikTok Shop", "Blibli", "Bukalapak"];

export default function Footer() {
  return (
    <footer className="bg-[#08080f] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">LapaKoo</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Platform manajemen toko online terlengkap untuk penjual Indonesia yang ingin
              berkembang lebih cepat.
            </p>

            {/* Contact */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                hello@lapakoo.id
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                +62 812-3456-7890
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                Jakarta, Indonesia
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {[MessageCircle, Send, AtSign].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all duration-200 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Marketplace badges */}
        <div className="py-6 border-t border-white/10">
          <p className="text-gray-500 text-xs text-center mb-4">
            Terintegrasi dengan marketplace favorit kamu
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {marketplaces.map((m) => (
              <span
                key={m}
                className="text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LapaKoo. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Dibuat dengan ❤️ untuk penjual online Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
