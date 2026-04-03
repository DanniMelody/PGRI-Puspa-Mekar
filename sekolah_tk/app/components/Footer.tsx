"use client";

import React from "react";
import Link from "next/link";

import { Icons } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-zinc-200 bg-gradient-to-b from-white via-zinc-50 to-lime-50/50 px-6 py-20 md:px-12 lg:px-24">
      {/* Decorative blobs for a playful feel */}
      <div className="absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-lime-200/30 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-20 w-auto transition-transform hover:scale-105">
                <Icons.Logo className="h-full w-auto object-contain" />
              </div>
              <div className="flex flex-col border-l-2 border-zinc-200 pl-4">
                <span className="text-3xl font-black tracking-tight text-zinc-900 leading-none">PGRI Puspa Mekar</span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-lime-600 mt-2">TK PGRI Sumedang</span>
              </div>
            </div>
            <p className="max-w-md text-lg font-semibold leading-relaxed text-zinc-800">
              Mendidik dengan hati, membangun generasi cerdas, ceria, dan berkarakter sejak dini. Tempat terbaik untuk tumbuh kembang buah hati Anda.
            </p>
            
            {/* Social Media Icons */}
            <div className="mt-8 flex gap-4">
              {/* WhatsApp */}
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all hover:-translate-y-1 hover:bg-emerald-500 hover:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none" aria-label="Hubungi kami melalui WhatsApp">
                <svg className="h-6 w-6 text-emerald-600 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all hover:-translate-y-1 hover:bg-rose-500 hover:ring-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none" aria-label="Ikuti kami di Instagram">
                <svg className="h-6 w-6 text-rose-600 transition-colors group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all hover:-translate-y-1 hover:bg-sky-600 hover:ring-sky-600 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:outline-none" aria-label="Ikuti kami di Facebook">
                <svg className="h-6 w-6 text-sky-600 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-8 text-sm font-black uppercase tracking-widest text-zinc-900">Navigasi</h4>
            <nav className="flex flex-col gap-4 text-base font-bold text-zinc-800">
              <Link href="/" className="transition-colors hover:text-lime-600">Beranda</Link>
              <Link href="/profil" className="transition-colors hover:text-lime-600">Profil Sekolah</Link>
              <Link href="/program" className="transition-colors hover:text-lime-600">Program & Kurikulum</Link>
              <Link href="/ppdb" className="transition-colors hover:text-lime-600">Pendaftaran (PPDB)</Link>
              <Link href="/galeri" className="transition-colors hover:text-lime-600">Galeri Kegiatan</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-8 text-sm font-black uppercase tracking-widest text-zinc-900">Hubungi Kami</h4>
            <div className="space-y-5">
              <div className="flex gap-3">
                <Icons.MapPin className="h-5 w-5 shrink-0 text-lime-600" />
                <p className="text-sm font-bold leading-relaxed text-zinc-600">
                  Desa Cimuja, Kec. Cimalaka, Kab. Sumedang, Jawa Barat.
                </p>
              </div>
              <div className="flex gap-3">
                <Icons.Phone className="h-5 w-5 shrink-0 text-lime-600" />
                <p className="text-sm font-bold text-zinc-600">0812-3456-7890</p>
              </div>
              <div className="flex gap-3">
                <Icons.Mail className="h-5 w-5 shrink-0 text-lime-600" />
                <p className="text-sm font-bold text-zinc-600">halo@puspamekar.sch.id</p>
              </div>
            </div>
          </div>

          {/* Operation Hours */}
          <div>
            <h4 className="mb-8 text-sm font-black uppercase tracking-widest text-zinc-900">Jam Operasional</h4>
            <div className="rounded-3xl border border-lime-100 bg-white p-6 shadow-sm shadow-lime-100/50">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-lime-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-lime-700">Sekolah Aktif</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-zinc-400">Senin - Jumat</span>
                  <span className="text-zinc-900">07:00 - 12:00</span>
                </div>
                <div className="flex justify-between text-sm font-bold opacity-40">
                  <span>Sabtu - Minggu</span>
                  <span>Libur</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-8 border-t border-zinc-100 pt-10 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm font-black uppercase tracking-widest text-zinc-900">
              © 2026 TK PGRI PUSPA MEKAR SUMEDANG
            </p>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Membangun Generasi Cerdas & Ceria</p>
          </div>
          <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-zinc-400">
            <Link href="/admin/login" className="hover:text-lime-600 transition-colors">Portal Guru</Link>
            <span className="hover:text-zinc-900 cursor-pointer transition-colors">Kebijakan Privasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
