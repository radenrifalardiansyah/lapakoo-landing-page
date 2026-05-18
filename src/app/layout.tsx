import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LapaKoo – Buat Toko Online Kamu Sendiri",
  description:
    "LapaKoo adalah platform untuk membangun toko online sendiri. Kelola produk, terima pesanan, dan tumbuhkan bisnis dari satu dashboard cerdas.",
  keywords: "lapakoo, toko online, buat toko online, jualan online, platform toko, e-commerce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-white text-[#1e1b4b] min-h-screen">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#fff",
              color: "#1e1b4b",
              border: "1.5px solid #ddd6fe",
              boxShadow: "0 8px 24px rgba(124,58,237,0.12)",
            },
          }}
        />
      </body>
    </html>
  );
}
