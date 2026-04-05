"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "../../components/Icons";

export default function ProfilPage() {
  const TEAM = useMemo(() => [
    { 
      name: "Ibu Nani Trisnawati, S.Pd.", 
      role: "Kepala Sekolah", 
      image: "/kepalask.jpeg", 
      color: "bg-lime-500 shadow-lime-200",
      trait: "Visioner & Penyayang",
      moto: "Mendidik dengan hati, membentuk karakter sejak dini."
    },
    { 
      name: "Ibu Nia Kurniawati, S.Pd.", 
      role: "Wali Kelas Kelompok A", 
      image: "/walaskelA.jpeg", 
      color: "bg-sky-500 shadow-sky-200",
      trait: "Kreatif & Ceria",
      moto: "Dunia anak adalah dunia bermain yang penuh makna."
    },
    { 
      name: "Ibu Erna Pujiastuti, S.Pd.", 
      role: "Wali Kelas Kelompok B", 
      image: "/walaskelB.jpeg", 
      color: "bg-rose-500 shadow-rose-200",
      trait: "Seni & Imajinasi",
      moto: "Setiap anak adalah seniman dengan imajinasi tanpa batas."
    },
    { 
      name: "Ibu Iit Puswati", 
      role: "Tenaga Administrasi", 
      image: "/buiit.jpeg", 
      color: "bg-amber-500 shadow-amber-200",
      trait: "Ramah & Cekatan",
      moto: "Pelayanan prima untuk kenyamanan seluruh keluarga besar sekolah."
    },
  ], []);

  const FACILITIES = useMemo(() => [
    { title: "Ruang Kelas AC", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400", desc: "Nyaman & sejuk untuk fokus belajar." },
    { title: "Taman Bermain", image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=400", desc: "Outdoor luas & edukatif." },
    { title: "Perpustakaan", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400", desc: "Koleksi buku cerita menarik." },
    { title: "Area Seni", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400", desc: "Ruang khusus eksplorasi warna." },
    { title: "Kebun Edukasi", image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400", desc: "Mengenal alam & berkebun." },
    { title: "Keamanan CCTV", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=400", desc: "Keamanan terpantau maksimal." },
  ], []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900 overflow-hidden">
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative bg-lime-50 px-6 py-10 text-center md:px-12 lg:px-24 lg:py-16">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl animate-pulse" />
          <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl" />
          
          <div className="relative mx-auto max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-lime-700 shadow-sm border border-lime-100 md:px-5 md:text-xs">
              Profil Sekolah
            </span>
            <h1 className="mb-4 text-3xl font-black tracking-tight text-zinc-900 md:text-6xl">
              TK PGRI <span className="text-lime-600">Puspa Mekar</span>
            </h1>
            <p className="text-base font-bold text-zinc-600 md:text-xl">
              Membentuk Masa Depan Ceria Sejak 2010.
            </p>
          </div>
        </section>

        {/* Sambutan Kepala Sekolah */}
        <section className="px-6 py-12 md:px-12 lg:px-24 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-10 border-y border-zinc-100 py-12 md:gap-12 md:py-16">
              <div className="shrink-0">
                <div className="relative h-64 w-56 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white transition-transform hover:scale-105">
                  <Image src="/kepalask.jpeg" alt="Ibu Nani Trisnawati, S.Pd." fill className="object-cover" sizes="224px" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lime-600 mb-4 block">Kata Pengantar</span>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 leading-tight md:text-3xl">Komitmen Kami Terhadap Pendidikan Anak Usia Dini</h2>
                <div className="space-y-6 text-zinc-600 font-bold leading-relaxed text-sm md:text-base">
                  <p>
                    Selamat datang di **TK PGRI Puspa Mekar**. Kami memahami bahwa pendidikan anak usia dini merupakan fase krusial dalam membentuk fondasi intelektual dan emosional setiap individu. 
                  </p>
                  <p>
                    Fokus utama kami adalah menghadirkan lingkungan belajar yang terukur, suportif, dan inovatif. Melalui kurikulum yang terintegrasi, kami berkomitmen untuk mengembangkan potensi setiap peserta didik secara optimal, sembari menanamkan nilai-masing karakter yang kokoh sebagai persiapan mereka menuju jenjang pendidikan selanjutnya.
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-lg font-black text-zinc-900">Ibu Nani Trisnawati, S.Pd.</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Kepala Sekolah</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tim Pengajar */}
        <section className="px-6 py-10 md:px-12 lg:px-24 bg-zinc-50">
          <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-zinc-100">
              <h2 className="mb-6 text-2xl font-black text-zinc-900 flex items-center gap-3">
                <span className="h-8 w-8 bg-lime-100 rounded-lg flex items-center justify-center"><Icons.Award className="h-5 w-5 text-lime-600"/></span>
                Misi Strategis
              </h2>
              <ul className="space-y-4">
                {[
                  "Merancang program unggulan prosedural (SKL Terintegrasi).",
                  "Menerapkan Pembelajaran Mendalam & 7 Kebiasaan Anak Hebat.",
                  "Kolaborasi aktif dengan Orang Tua & Mitra terkait.",
                  "Evaluasi berkala & Rencana Tindak Lanjut (RTL).",
                  "Pelestarian Budaya Nyunda & Wawasan Nusantara."
                ].map((misi, i) => (
                  <li key={i} className="flex gap-3 items-start group">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-xs font-black text-zinc-500 group-hover:bg-lime-600 group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <p className="text-base font-bold text-zinc-700 leading-snug">{misi}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-zinc-900 text-center lg:text-left">Guru <span className="text-lime-600">Penyayang</span></h2>
                <p className="text-xs font-bold text-zinc-400 mt-1 text-center lg:text-left">Tenaga pendidik profesional yang membimbing dengan kasih sayang.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TEAM.map((guru, i) => (
                  <div key={i} className="group bg-white rounded-[2.5rem] p-6 shadow-sm border border-zinc-100 transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`relative h-16 w-16 shrink-0 rounded-2xl overflow-hidden shadow-md border-2 border-white transition-transform group-hover:rotate-3`}>
                        <Image src={guru.image} alt={guru.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-zinc-900 leading-tight">{guru.name}</h4>
                        <span className="inline-block mt-1 rounded-full bg-zinc-50 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:bg-lime-50 group-hover:text-lime-700 transition-colors">
                          {guru.role}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-lime-600 uppercase tracking-widest">{guru.trait}</p>
                      <p className="text-xs font-bold italic text-zinc-500 leading-relaxed">
                        &quot;{guru.moto}&quot;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fasilitas */}
        <section className="px-6 py-12 md:px-12 lg:px-24 bg-zinc-50">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-zinc-900">Fasilitas <span className="text-sky-500">Kreatif</span></h2>
            </div>

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {FACILITIES.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3 rounded-[2rem] bg-white p-4 transition-all hover:bg-lime-50 group border border-zinc-100 hover:border-lime-200">
                  <div className="relative h-24 w-full rounded-2xl overflow-hidden shadow-sm transition-transform group-hover:scale-105">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 50vw, 150px" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-zinc-900 mb-1 leading-tight">{item.title}</h4>
                    <p className="text-[9px] font-bold leading-tight text-zinc-400 group-hover:text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legalitas & Akreditasi */}
        <section id="legalitas" className="px-6 py-20 md:px-12 lg:px-24 bg-white border-t border-zinc-100">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="relative aspect-video rounded-[2.5rem] bg-lime-100 flex items-center justify-center overflow-hidden shadow-inner">
                 <Icons.Award className="h-24 w-24 text-lime-600 opacity-20 absolute -right-4 -bottom-4 rotate-12" />
                 <div className="text-center relative z-10">
                    <div className="mb-2 text-5xl font-black text-lime-700">Terakreditasi</div>
                    <div className="text-8xl font-black text-lime-600">B</div>
                 </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black text-zinc-900 mb-2">Legalitas Sekolah</h2>
                  <p className="font-bold text-zinc-500">Resmi terdaftar dan diakui oleh Kementerian Pendidikan.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "NPSN", value: "20259826", icon: <Icons.Check className="h-4 w-4 text-lime-600" /> },
                    { label: "Status Akreditasi", value: "B (Baik)", icon: <Icons.Award className="h-4 w-4 text-lime-600" /> },
                    { label: "Izin Operasional", value: "421.1/2056/Disdik/2010", icon: <Icons.FileText className="h-4 w-4 text-lime-600" /> },
                    { label: "Penyelenggara", value: "Yayasan Pembina Lembaga Pendidikan (YPLP) PGRI", icon: <Icons.School className="h-4 w-4 text-lime-600" /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-100 transition-colors hover:bg-white hover:shadow-md">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center border border-zinc-100">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.label}</p>
                        <p className="text-base font-black text-zinc-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
