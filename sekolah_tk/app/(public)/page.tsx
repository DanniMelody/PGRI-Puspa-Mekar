"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icons } from "../components/Icons";
import { supabase } from "@/lib/supabase";
import { News } from "@/types/database";

export default function Home() {
  const [ppdbOpen, setPpdbOpen] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const [
          { data: settingData },
          { data: newsData },
          { data: eventData }
        ] = await Promise.all([
          supabase.from("settings").select("*").eq("key", "ppdb_open").maybeSingle(),
          supabase.from("news").select("*").order("created_at", { ascending: false }).limit(3),
          supabase.from("calendar_events").select("*").eq("is_published", true).order("date", { ascending: true }).gte("date", new Date().toISOString().split('T')[0]).limit(3)
        ]);

        if (settingData) setPpdbOpen(settingData.value === "true");
        if (newsData) setLatestNews(newsData);
        if (eventData) setCalendarEvents(eventData);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };
    fetchData();
  }, []);

  const TESTIMONIALS = useMemo(() => [
    {
      name: "Bunda Laila",
      role: "Orang Tua Siswa Kelompok A",
      quote: "PGRI Puspa Mekar benar-benar tempat yang nyaman. Anak saya jadi lebih mandiri and selalu antusias berangkat sekolah setiap pagi!",
      avatar: <Icons.User className="h-6 w-6 text-lime-600" />
    },
    {
      name: "Ayah Budi",
      role: "Orang Tua Siswa Kelompok B",
      quote: "Kurikulumnya seimbang antara bermain and belajar. Guru-gurunya sabar and sangat komunikatif dengan orang tua.",
      avatar: <Icons.User className="h-6 w-6 text-sky-600" />
    },
    {
      name: "Bunda Sarah",
      role: "Alumni Wali Murid",
      quote: "Persiapan ke jenjang SD sangat matang. Anak saya tidak kesulitan saat masuk sekolah dasar berkat fondasi di sini.",
      avatar: <Icons.User className="h-6 w-6 text-amber-600" />
    }
  ], []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900 overflow-x-hidden">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 py-12 text-center md:px-12 md:py-20 lg:flex-row lg:text-left lg:px-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(163,230,53,0.15)_0%,rgba(255,255,255,0)_100%)]" />
          
          <div className="max-w-3xl lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center rounded-lg bg-lime-100/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-lime-700 md:text-xs">
                Pendaftaran TA 2026/2027
              </div>
              <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-zinc-900 md:text-7xl">
                Tempat Si Kecil <br/>
                <span className="text-lime-600">Tumbuh Ceria</span>
              </h1>
              <p className="mb-10 max-w-xl text-base leading-relaxed text-zinc-600 md:text-xl font-semibold">
                Membentuk generasi cerdas, kreatif, dan berkarakter melalui pendekatan belajar yang menyenangkan di lingkungan yang aman dan asri.
              </p>

              <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row lg:justify-start">
                <Link 
                  href={(!mounted || ppdbOpen) ? "/ppdb" : "/kontak"} 
                  className={`flex h-16 w-full items-center justify-center rounded-[1.5rem] px-10 text-lg font-black text-white transition-all shadow-xl active:scale-95 sm:w-auto ${
                    (mounted && !ppdbOpen) ? "bg-zinc-400 cursor-not-allowed shadow-none" : "bg-zinc-900 hover:bg-zinc-800 shadow-zinc-200"
                  }`}
                >
                  {(mounted && !ppdbOpen) ? "PPDB Ditutup" : "Daftar Sekarang"}
                </Link>
                <button 
                  onClick={() => {
                    if (confirm("Apakah Anda ingin mengunduh brosur TK PGRI Puspa Mekar?")) {
                      window.location.href = "/brosur-tk-puspa-mekar.pdf";
                    }
                  }}
                  className="flex h-16 w-full items-center justify-center gap-3 rounded-[1.5rem] border-2 border-zinc-100 px-8 text-lg font-black text-zinc-600 transition-all hover:bg-zinc-50 active:scale-95 sm:w-auto"
                >
                  <Icons.FileText className="h-5 w-5" />
                  Brosur (PDF)
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-12 lg:mt-0 lg:w-1/2"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[450px]">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-lime-400/20 blur-2xl md:rounded-[3rem]" />
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-zinc-100 shadow-2xl ring-8 ring-white md:rounded-[3.5rem]">
                <Image 
                  src="/fotopgri.jpeg" 
                  alt="Gedung TK PGRI Puspa Mekar" 
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* News & Announcement Section */}
        <section className="bg-zinc-50 px-6 py-20 md:px-12 md:py-24 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <h2 className="mb-4 text-3xl font-black tracking-tight text-zinc-900 md:text-5xl">Berita Terkini</h2>
                <p className="text-base font-bold text-zinc-500 md:text-lg">Informasi terbaru seputar kegiatan dan pengumuman sekolah.</p>
              </div>
              <Link href="/berita" className="group flex items-center gap-2 text-base font-black text-lime-600 md:text-lg">
                Lihat Semua 
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {latestNews.length > 0 ? (
                latestNews.map((item) => (
                  <div key={item.id} className="group flex flex-col rounded-[2rem] bg-white p-6 transition-all hover:shadow-xl shadow-sm border border-zinc-100 md:rounded-[2.5rem] md:p-8">
                    <div className="mb-6 flex items-center justify-between">
                      <span className={`rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-widest md:px-4 md:text-[10px] ${
                        item.category === "Pengumuman" ? "bg-amber-50 text-amber-600" :
                        item.category === "Acara Sekolah" ? "bg-sky-50 text-sky-600" : "bg-lime-50 text-lime-700"
                      }`}>
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-zinc-400">
                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <h3 className="mb-3 text-lg font-black leading-tight text-zinc-900 group-hover:text-lime-600 transition-colors line-clamp-2 md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm font-medium leading-relaxed text-zinc-500 line-clamp-3 md:text-base">
                      {item.content}
                    </p>
                    <Link href={`/berita/${item.slug}`} className="inline-flex items-center text-xs font-black uppercase tracking-widest text-zinc-400 transition-colors group-hover:text-zinc-900">
                      Baca Selengkapnya <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                ))
              ) : (
                [1, 2, 3].map((n) => (
                  <div key={n} className="h-64 animate-pulse rounded-[2rem] bg-zinc-100 md:rounded-[2.5rem]" />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Calendar & FAQ Quick Section */}
        <section className="bg-white px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Kalender Akademik */}
            <div className="rounded-[2.5rem] bg-zinc-900 p-8 md:rounded-[3rem] md:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-black tracking-tight md:text-3xl">Agenda Sekolah</h2>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lime-400 md:h-12 md:w-12 md:rounded-[1.5rem]">
                    <Icons.Calendar className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </div>
                <div className="space-y-5 md:space-y-6">
                  {calendarEvents.length > 0 ? (
                    calendarEvents.map((item, i) => {
                      const eventDate = new Date(item.date);
                      const day = eventDate.getDate();
                      const month = eventDate.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase();
                      
                      return (
                        <div key={i} className="flex items-center gap-4 md:gap-6">
                          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-white text-zinc-900 shadow-lg md:h-16 md:w-16 md:rounded-2xl">
                            <span className="text-lg font-black leading-none md:text-xl">{day}</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] md:text-[10px]">{month}</span>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-base font-bold leading-tight text-white/90 md:text-lg">{item.title}</p>
                            <span className={`mt-1 text-[9px] font-black uppercase tracking-widest md:text-[10px] ${item.type === 'Hari Libur' ? 'text-rose-400' : 'text-lime-400'}`}>
                              {item.type}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-10 text-center">
                      <p className="text-white/40 font-bold italic">Belum ada agenda terdekat.</p>
                    </div>
                  )}
                </div>
                <Link href="/program" className="mt-10 inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/20 px-6 text-xs font-black uppercase tracking-widest text-lime-400 transition-all hover:bg-white/10 md:w-auto md:text-sm">
                  Lihat Jadwal Lengkap
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-3xl font-black tracking-tight text-zinc-900 md:text-5xl">Tanya Jawab</h2>
              <p className="mb-8 text-base font-bold text-zinc-500 md:text-lg">Hal-hal yang sering ditanyakan oleh calon orang tua siswa.</p>
              
              <div className="space-y-4">
                {[
                  { q: "Kapan pendaftaran siswa baru dibuka?", a: "Pendaftaran tahun ajaran 2026/2027 sudah dibuka mulai Maret 2026." },
                  { q: "Apa saja syarat dokumen pendaftaran?", a: "Cukup siapkan scan Akta Kelahiran and Kartu Keluarga." },
                  { q: "Berapa jam operasional sekolah?", a: "Kegiatan belajar mengajar berlangsung pukul 07.00 - 12.00 WIB." }
                ].map((faq, i) => (
                  <details key={i} className="group rounded-[1.5rem] border-2 border-zinc-100 bg-white p-5 transition-all open:border-lime-500 md:rounded-[2rem] md:p-6">
                    <summary className="flex cursor-pointer items-center justify-between font-black text-base text-zinc-900 list-none md:text-lg">
                      {faq.q}
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-[10px] text-zinc-400 group-open:bg-lime-600 group-open:text-white group-open:rotate-180 transition-all md:h-8 md:w-8">▼</span>
                    </summary>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-600 md:text-base">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="mb-4 text-3xl font-black tracking-tight text-zinc-900 md:text-5xl">Cerita Orang Tua</h2>
              <p className="mx-auto max-w-2xl text-base text-zinc-500 font-bold md:text-lg">
                Apa kata mereka tentang pengalaman belajar si kecil di PGRI Puspa Mekar?
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {TESTIMONIALS.map((testi, i) => (
                <div key={i} className="group relative rounded-[2rem] bg-zinc-50 p-8 transition-all hover:bg-white hover:shadow-xl md:rounded-[2.5rem] md:p-10">
                  <div className="absolute -top-4 left-8 flex h-10 w-10 items-center justify-center rounded-xl bg-lime-600 text-white md:-top-5 md:left-10 md:h-12 md:w-12 md:rounded-2xl">
                    <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21C14.017 16.204 17.915 12.182 21 11L21 8C17.135 9.172 14.017 12.827 14.017 17.5V17.5M3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H5C3.89543 23 3 22.1046 3 21ZM3 21C3 16.204 6.898 12.182 9.983 11L9.983 8C6.118 9.172 3 12.827 3 17.5V17.5" />
                    </svg>
                  </div>
                  <p className="mb-6 text-base font-bold italic leading-relaxed text-zinc-700 md:mb-8 md:text-lg">
                    &quot;{testi.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-inner md:h-12 md:w-12 md:rounded-2xl">
                      {testi.avatar}
                    </div>
                    <div>
                      <h4 className="text-base font-black text-zinc-900 md:text-lg">{testi.name}</h4>
                      <p className="text-[10px] font-black text-lime-600 uppercase tracking-widest">{testi.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-zinc-50 px-6 py-12 md:px-12 md:py-16 lg:px-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-zinc-900 p-8 text-center text-white relative shadow-2xl md:rounded-[3rem] md:p-16">
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md md:mb-8 md:h-16 md:w-16 md:rounded-[1.5rem]">
                <Icons.Logo className="h-7 w-7 text-lime-400 md:h-8 md:w-8" />
              </div>
              <h2 className="mb-6 text-2xl font-black md:text-5xl leading-[1.1] tracking-tight">Mulai Perjalanan <br/>Si Kecil Sekarang</h2>
              <p className="mx-auto mb-10 max-w-2xl text-base font-bold opacity-70 md:text-xl">
                Jangan lewatkan masa emas anak. Bergabunglah dengan keluarga besar PGRI Puspa Mekar dan lihat mereka tumbuh bahagia.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row w-full">
                <Link 
                  href={(!mounted || ppdbOpen) ? "/ppdb" : "/kontak"} 
                  className={`flex h-16 w-full items-center justify-center rounded-[1.25rem] px-10 text-lg font-black text-white transition-all active:scale-95 sm:w-auto ${
                    (mounted && !ppdbOpen) ? "bg-zinc-400 cursor-not-allowed" : "bg-lime-600 hover:bg-lime-500 shadow-xl shadow-lime-900/20"
                  }`}
                >
                  {(mounted && !ppdbOpen) ? "PPDB Ditutup" : "Daftar PPDB Online"}
                </Link>
                <Link href="/kontak" className="flex h-16 w-full items-center justify-center rounded-[1.25rem] border-2 border-white/20 px-10 text-lg font-black text-white transition-all hover:bg-white/10 active:scale-95 sm:w-auto">
                  Tanya Admin (WA)
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
