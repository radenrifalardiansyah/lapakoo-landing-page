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
  title: "LapaKoo – Platform Toko Online Terlengkap",
  description:
    "LapaKoo membantu ribuan penjual online mengelola toko, produk, dan pesanan di semua marketplace dalam satu platform canggih.",
  keywords: "lapakoo, toko online, marketplace, manajemen toko, jualan online",
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
