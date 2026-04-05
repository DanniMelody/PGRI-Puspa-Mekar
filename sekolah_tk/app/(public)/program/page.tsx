"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icons } from "../../components/Icons";
import { supabase } from "@/lib/supabase";

const PROGRAMS = [
  {
    id: "kelompok-a",
    title: "Kelompok A (Usia 4-5 Tahun)",
    subtitle: "Fase Fondasi: Eksplorasi & Pembiasaan Karakter",
    color: "bg-gradient-to-br from-lime-50 via-white to-lime-50 border-lime-200 text-lime-700",
    accent: "bg-lime-500",
    icon: <Icons.Leaf className="h-12 w-12" />,
    curriculum: [
      { name: "Aku Sayang Al-Qur'an", desc: "Mengenal huruf hijaiyah and pembiasaan hafalan surat pendek (Taqwa)." },
      { name: "Gerak & Irama Nyunda", desc: "Eksplorasi motorik melalui lagu anak dan tarian daerah sederhana (Nyunda)." },
      { name: "Adab & Kemandirian", desc: "Membangun karakter jujur, sopan santun, dan kemandirian dasar (Karakter)." }
    ],
    skills: ["Hafalan Doa Harian", "Motorik Kasar & Halus", "Sosialisasi Dasar"]
  },
  {
    id: "kelompok-b",
    title: "Kelompok B (Usia 5-6 Tahun)",
    subtitle: "Fase Kesiapan: Literasi, Religi & Budaya",
    color: "bg-gradient-to-br from-sky-50 via-white to-sky-50 border-sky-200 text-sky-700",
    accent: "bg-sky-500",
    icon: <Icons.Rocket className="h-12 w-12" />,
    curriculum: [
      { name: "Cilik Berakhlak", desc: "Penerapan nilai agama dalam keseharian dan hafalan juz amma (Taqwa)." },
      { name: "Budaya Nusantara", desc: "Mengenal kekayaan tradisi, seni tari, dan bahasa pengantar daerah (Nyunda)." },
      { name: "Literasi Kreatif (STEAM)", desc: "Persiapan calistung melalui eksperimen sains dan proyek inovatif (Inovatif)." }
    ],
    skills: ["Literasi & Numerasi", "Percaya Diri Tampil", "Kesiapan Sekolah Dasar"]
  }
];

export default function ProgramPage() {
  const [ppdbOpen, setPpdbOpen] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkStatus = async () => {
      try {
        const { data } = await supabase.from("settings").select("*").eq("key", "ppdb_open").maybeSingle();
        if (data) {
          setPpdbOpen(data.value === "true");
        }
      } catch (error) {
        console.error("Program page status check error:", error);
      }
    };
    checkStatus();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <main className="flex-1">
        {/* Hero Section Program */}
        <section className="relative overflow-hidden bg-zinc-900 px-6 py-20 text-center text-white md:px-12 lg:px-24 lg:py-28">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-lime-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
          
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-lime-400 ring-1 ring-white/20">
              Kurikulum Merdeka & Kreatif
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl">
              Belajar yang <br />
              <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">Penuh Makna</span>
            </h1>
            <p className="text-xl leading-relaxed opacity-80 font-medium">
              Kami merancang setiap kegiatan untuk menyeimbangkan perkembangan kognitif, sosial-emosional, dan karakter anak sesuai tahapan usianya.
            </p>
          </div>
        </section>

        {/* Kurikulum Inti */}
        <section className="px-6 py-24 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-20 grid gap-8 lg:grid-cols-3">
              {[
                { title: "Nilai Agama & Moral", icon: <Icons.Shield className="h-full w-full" />, color: "bg-amber-100 text-amber-600", desc: "Pembiasaan doa, etika, dan karakter mulia sehari-hari." },
                { title: "Jati Diri (Sosial)", icon: <Icons.Smile className="h-full w-full" />, color: "bg-rose-100 text-rose-600", desc: "Membangun percaya diri dan kecerdasan emosional." },
                { title: "STEAM & Literasi", icon: <Icons.Book className="h-full w-full" />, color: "bg-indigo-100 text-indigo-600", desc: "Eksplorasi sains, teknologi, seni, dan bahasa dasar." }
              ].map((item, i) => (
                <div key={i} className="rounded-3xl bg-zinc-50 p-8 text-center transition-transform hover:-translate-y-1">
                  <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl p-4 ${item.color}`}>
                    {item.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-zinc-900">{item.title}</h3>
                  <p className="text-zinc-600 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Program Detail */}
            <div className="grid gap-8 lg:grid-cols-2">
              {PROGRAMS.map((program) => (
                <div key={program.id} className={`rounded-[3.5rem] border-2 p-10 md:p-14 ${program.color} transition-all hover:shadow-2xl`}>
                  <div className="mb-10 flex items-center justify-between">
                    <div className={`flex h-20 w-20 items-center justify-center rounded-[2rem] text-white shadow-xl p-4 ${program.accent}`}>
                      {React.cloneElement(program.icon as React.ReactElement<{ className?: string }>, { className: "h-full w-full" })}
                    </div>
                    <span className="rounded-full bg-white/50 px-4 py-1 text-xs font-black uppercase tracking-widest text-zinc-500">Program Inti</span>
                  </div>
                  
                  <h2 className="mb-3 text-4xl font-black">{program.title}</h2>
                  <p className="mb-10 text-lg font-bold opacity-70">{program.subtitle}</p>

                  <div className="space-y-10">
                    <div>
                      <h4 className="mb-6 text-sm font-black uppercase tracking-widest opacity-40">Materi Unggulan</h4>
                      <ul className="space-y-5">
                        {program.curriculum.map((topic, j) => (
                          <li key={j} className="flex gap-4">
                            <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${program.accent}`} />
                            <div>
                              <p className="text-lg font-bold text-zinc-800">{topic.name}</p>
                              <p className="text-zinc-500 font-medium">{topic.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-3xl bg-white/60 p-8">
                      <h4 className="mb-4 text-sm font-black uppercase tracking-widest opacity-40">Fokus Kemampuan</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.skills.map((skill) => (
                          <span key={skill} className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-zinc-600 shadow-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ekstrakurikuler */}
        <section className="bg-zinc-50/50 px-6 py-24 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="mb-16 text-4xl font-black tracking-tight text-zinc-900">Program Ekstrakurikuler</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Seni Menari", color: "border-rose-100 hover:bg-rose-50 hover:border-rose-200", icon: <Icons.Music className="h-full w-full text-rose-500" /> },
                { name: "Menyanyi & Olah Vokal", color: "border-sky-100 hover:bg-sky-50 hover:border-sky-200", icon: <Icons.Mic className="h-full w-full text-sky-500" /> },
                { name: "Hafalan Surat Pendek", color: "border-lime-100 hover:bg-lime-50 hover:border-lime-200", icon: <Icons.Book className="h-full w-full text-lime-500" /> },
                { name: "Melukis & Mewarnai", color: "border-amber-100 hover:bg-amber-50 hover:border-amber-200", icon: <Icons.Palette className="h-full w-full text-amber-500" /> }
              ].map((item, i) => (
                <div key={i} className={`flex flex-col items-center rounded-3xl border-2 bg-white p-8 transition-all ${item.color}`}>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-50 p-4">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-black text-zinc-900">{item.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 text-center md:px-12 lg:px-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-4xl font-black text-zinc-900 tracking-tight md:text-5xl">Siap Bergabung dengan Kami?</h2>
            <Link 
              href={(!mounted || ppdbOpen) ? "/ppdb" : "/kontak"} 
              className={`inline-flex h-20 items-center justify-center rounded-[2rem] px-12 text-2xl font-black text-white shadow-2xl transition-all active:scale-95 focus-visible:ring-4 focus-visible:ring-lime-500 focus-visible:outline-none ${
                (mounted && !ppdbOpen) ? "bg-zinc-400 cursor-not-allowed shadow-zinc-200" : "bg-lime-600 shadow-lime-200 hover:bg-lime-700 hover:shadow-lime-300"
              }`}
            >
              {(mounted && !ppdbOpen) ? "PPDB Ditutup" : "Daftar Sekarang"}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
