import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TK PGRI Puspa Mekar - Tempat Belajar Penuh Keceriaan",
  description: "Membentuk generasi cerdas, kreatif, dan berkarakter melalui pendekatan belajar yang menyenangkan di lingkungan yang aman dan asri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${quicksand.variable} h-full antialiased selection:bg-lime-200`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 overflow-x-hidden font-sans transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
