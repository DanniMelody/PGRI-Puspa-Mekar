import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-1 flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8 h-20 w-20">
        <div className="absolute inset-0 animate-ping rounded-full bg-lime-400 opacity-20" />
        <div className="absolute inset-0 animate-pulse rounded-full bg-lime-500 opacity-40" />
        <div className="absolute inset-4 animate-bounce rounded-full bg-lime-600 shadow-lg shadow-lime-200" />
      </div>
      <h2 className="text-2xl font-black tracking-tight text-zinc-900">Menyiapkan Keceriaan…</h2>
      <p className="mt-2 font-bold text-zinc-500">Tunggu sebentar ya!</p>
    </div>
  );
}
