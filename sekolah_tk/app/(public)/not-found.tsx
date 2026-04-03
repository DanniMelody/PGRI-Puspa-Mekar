import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-1 flex-col items-center justify-center bg-white px-6 py-24 text-center">
      <div className="relative mb-12">
        <span className="text-[120px] md:text-[160px] animate-bounce inline-block">🧩</span>
        <div className="absolute -bottom-4 left-1/2 h-10 w-40 -translate-x-1/2 rounded-full bg-zinc-100 blur-xl" />
      </div>
      
      <h1 className="mb-4 text-5xl font-black tracking-tight text-zinc-900 md:text-7xl">
        Aduh, <span className="text-lime-600">Nyasar!</span>
      </h1>
      
      <p className="mx-auto mb-12 max-w-xl text-xl font-bold leading-relaxed text-zinc-500">
        Halaman yang kamu cari tidak ada di sini. Mungkin lagi main di taman bermain sebelah?
      </p>
      
      <Link 
        href="/" 
        className="group relative inline-flex h-20 items-center justify-center overflow-hidden rounded-[2rem] bg-zinc-900 px-12 text-2xl font-black text-white shadow-2xl transition-all hover:bg-zinc-800 active:scale-95 focus-visible:ring-4 focus-visible:ring-lime-500 focus-visible:outline-none"
      >
        <span className="relative z-10 flex items-center gap-3">
          Kembali ke Beranda
          <svg className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
