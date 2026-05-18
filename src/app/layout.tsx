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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-[#0f0f1a] text-white min-h-screen">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1a2e",
              color: "#fff",
              border: "1px solid rgba(99, 102, 241, 0.3)",
            },
          }}
        />
      </body>
    </html>
  );
}
