"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Fitur",      href: "#features" },
  { label: "Cara Kerja", href: "#how-it-works" },
  { label: "Harga",      href: "#pricing" },
  { label: "Testimoni",  href: "#testimonials" },
  { label: "FAQ",        href: "#faq" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-violet-100 border-b border-violet-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/mini-logo-lapakoo.png" alt="LapaKoo" width={36} height={36} className="rounded-lg" />
            <span className="text-xl font-extrabold gradient-text">LapaKoo</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-violet-700/70 hover:text-violet-700 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#pricing"
              className="text-sm font-semibold text-violet-700 hover:text-violet-900 px-4 py-2 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/purchase"
              className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5"
            >
              <Zap className="w-4 h-4" />
              Mulai Gratis
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-violet-700 hover:bg-violet-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{   opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-violet-100 shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-violet-800 font-medium py-2 border-b border-violet-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <Link
                href="/purchase"
                className="btn-primary flex items-center justify-center gap-2 py-3 mt-1 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                <Zap className="w-4 h-4" />
                Mulai Gratis Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
