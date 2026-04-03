"use client";

import React from "react";
import Link from "next/link";
import { Icons } from "../../components/Icons";

const TEAM = [
  { 
    name: "Ibu Siti Aminah", 
    role: "Kepala Sekolah", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", 
    color: "bg-lime-500 shadow-lime-200",
    trait: "Visioner & Penyayang",
    moto: "Mendidik dengan hati, membentuk karakter sejak dini."
  },
  { 
    name: "Ibu Rina Wijaya", 
    role: "Guru Kelas TK-A", 
    image: "https://images.unsplash.com/photo-1580894732230-2867e633d149?auto=format&fit=crop&q=80&w=400", 
    color: "bg-sky-500 shadow-sky-200",
    trait: "Kreatif & Ceria",
    moto: "Dunia anak adalah dunia bermain yang penuh makna."
  },
  { 
    name: "Ibu Desi Ratnasari", 
    role: "Guru Kelas TK-B", 
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=400", 
    color: "bg-rose-500 shadow-rose-200",
    trait: "Seni & Imajinasi",
    moto: "Setiap anak adalah seniman dengan imajinasi tanpa batas."
  },
  { 
    name: "Bapak Ahmad Fauzi", 
    role: "Guru Agama & Olahraga", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", 
    color: "bg-amber-500 shadow-amber-200",
    trait: "Disiplin & Religius",
    moto: "Tubuh sehat, jiwa kuat, dan akhlak yang mulia."
  },
];

const FACILITIES = [
  { title: "Ruang Kelas AC", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400", desc: "Nyaman & sejuk untuk fokus belajar." },
  { title: "Taman Bermain", image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=400", desc: "Outdoor luas & edukatif." },
  { title: "Perpustakaan", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400", desc: "Koleksi buku cerita menarik." },
  { title: "Area Seni", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400", desc: "Ruang khusus eksplorasi warna." },
  { title: "Kebun Edukasi", image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400", desc: "Mengenal alam & berkebun." },
  { title: "Keamanan CCTV", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=400", desc: "Keamanan terpantau maksimal." },
];

export default function ProfilPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900 overflow-hidden">
      <main className="flex-1">
        
        {/* Hero Section - Compact & Fun */}
        <section className="relative bg-lime-50 px-6 py-12 text-center md:px-12 lg:px-24 lg:py-16">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl animate-pulse" />
          <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl" />
          
          <div className="relative mx-auto max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-white px-5 py-1.5 text-xs font-black uppercase tracking-widest text-lime-700 shadow-sm border border-lime-100">
              Profil Sekolah
            </span>
            <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 md:text-6xl">
              TK PGRI <span className="text-lime-600">Puspa Mekar</span>
            </h1>
            <p className="text-lg font-bold text-zinc-600 md:text-xl">
              Membentuk Masa Depan Ceria Sejak 2010.
            </p>
          </div>
        </section>

        {/* Sambutan Kepala Sekolah - Warm & Real */}
        <section className="px-6 py-10 md:px-12 lg:px-24 bg-white overflow-hidden">
          <div className="mx-auto max-w-5xl">
            <div className="relative rounded-[3rem] bg-zinc-50 p-8 md:p-12 border border-zinc-100 flex flex-col md:flex-row items-center gap-10">
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-lime-200/20 blur-3xl" />
              
              <div className="relative shrink-0 flex flex-col items-center">
                <div className="h-44 w-40 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl transition-transform hover:scale-105">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="Ibu Siti Aminah" className="h-full w-full object-cover" />
                </div>
                <h4 className="mt-4 text-lg font-black text-zinc-900">Ibu Siti Aminah</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-lime-600">Kepala Sekolah</p>
              </div>

              <div className="relative">
                <Icons.Heart className="absolute -top-6 -left-6 h-8 w-8 text-lime-200" />
                <h2 className="text-2xl font-black text-zinc-900 mb-4 italic leading-tight">&quot;Setiap Anak Adalah Bunga yang Mekar di Waktunya Sendiri.&quot;</h2>
                <div className="space-y-4 text-zinc-600 font-medium leading-relaxed text-sm md:text-base">
                  <p>
                    Selamat datang di keluarga besar **TK PGRI Puspa Mekar**. Kami percaya bahwa masa anak-anak adalah fondasi terpenting dalam perjalanan hidup seseorang. 
                  </p>
                  <p>
                    Di sini, kami berkomitmen menciptakan lingkungan yang bukan sekadar tempat belajar, tapi rumah kedua yang penuh kasih sayang, di mana kreativitas diapresiasi dan karakter luhur ditanamkan melalui kebahagiaan. Mari bersama kita antarkan buah hati menuju masa depan yang gemilang.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <div className="h-px w-8 bg-zinc-200" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 italic">Pesan Hangat dari Kami</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visi Section - Dynamic & Focused */}
        <section className="px-6 py-10 md:px-12 lg:px-24 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-12 items-stretch">
              
              {/* Visi Card */}
              <div className="lg:col-span-5 rounded-[2.5rem] bg-zinc-900 p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-lime-500/20 blur-2xl" />
                <span className="mb-4 inline-block text-xs font-black uppercase tracking-widest text-lime-400">Visi Kami</span>
                <h2 className="mb-6 text-3xl font-black leading-tight md:text-4xl">PUSPA <br/><span className="text-lime-400">NYENTRIK</span></h2>
                <p className="text-xl font-bold leading-relaxed opacity-95">
                  &quot;Program Unggulan Siapkan Peserta didik Adaptif Nyunda Energik Taqwa Reflektif Inovatif dan Kolaboratif&quot;
                </p>
              </div>

              {/* Nyentrik Grid */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <h2 className="mb-6 text-2xl font-black text-zinc-900 text-center lg:text-left">Makna <span className="text-lime-600">NYENTRIK</span></h2>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {[
                    { l: "A", t: "Adaptif", c: "bg-sky-50 text-sky-700 border-sky-100" },
                    { l: "N", t: "Nyunda", c: "bg-lime-50 text-lime-700 border-lime-100" },
                    { l: "E", t: "Energik", c: "bg-amber-50 text-amber-700 border-amber-100" },
                    { l: "T", t: "Taqwa", c: "bg-rose-50 text-rose-700 border-rose-100" },
                    { l: "R", t: "Reflektif", c: "bg-indigo-50 text-indigo-700 border-indigo-100" },
                    { l: "I", t: "Inovatif", c: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                    { l: "K", t: "Kolaboratif", c: "bg-violet-50 text-violet-700 border-violet-100" },
                  ].map((item, i) => (
                    <div key={i} className={`flex flex-col items-center justify-center rounded-2xl p-4 min-w-[100px] border-2 transition-transform hover:scale-105 shadow-sm ${item.c}`}>
                      <span className="text-2xl font-black mb-1">{item.l}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Misi & Guru Section - Side by Side */}
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

            {/* Tim Pengajar - Real Photos */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-zinc-900 text-center lg:text-left">Guru <span className="text-lime-600">Penyayang</span></h2>
                <p className="text-xs font-bold text-zinc-400 mt-1 text-center lg:text-left">Tenaga pendidik profesional yang membimbing dengan kasih sayang.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TEAM.map((guru, i) => (
                  <div key={i} className="group bg-white rounded-[2.5rem] p-6 shadow-sm border border-zinc-100 transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`h-16 w-16 shrink-0 rounded-2xl overflow-hidden shadow-md border-2 border-white transition-transform group-hover:rotate-3`}>
                        <img src={guru.image} alt={guru.name} className="h-full w-full object-cover" />
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

        {/* Tujuan Pendidikan - Scannable */}
        <section className="px-6 py-12 md:px-12 lg:px-24 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center lg:text-left">
              <h2 className="text-3xl font-black text-zinc-900">Tujuan <span className="text-lime-600">Pendidikan</span></h2>
              <p className="mt-2 font-bold text-zinc-500">Langkah konkret kami dalam mewujudkan visi sekolah.</p>
            </div>

            <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
              {[
                {
                  title: "Kesehatan Fisik & Mental",
                  icon: <Icons.Activity className="text-rose-500" />,
                  text: "Mengembangkan **kesehatan fisik dan mental** anak melalui pembiasaan pola hidup sehat, aktivitas motorik yang beragam, dan lingkungan belajar yang aman."
                },
                {
                  title: "Kecerdasan Optimal",
                  icon: <Icons.Book className="text-sky-500" />,
                  text: "Mengoptimalkan **kecerdasan anak** sesuai tahap perkembangannya melalui stimulasi tepat pada aspek kognitif, bahasa, dan keterampilan berpikir dasar."
                },
                {
                  title: "Kreativitas & Inovasi",
                  icon: <Icons.Palette className="text-amber-500" />,
                  text: "Menumbuhkan **kreativitas dan inovasi** dengan memberikan kesempatan luas bagi anak untuk berekspresi, bereksperimen, dan menghasilkan karya original."
                },
                {
                  title: "Karakter & Akhlak Mulia",
                  icon: <Icons.Shield className="text-emerald-500" />,
                  text: "Membentuk **karakter dan akhlak mulia** melalui keteladanan, pembiasaan nilai-nilai luhur, dan pengintegrasian nilai spiritual dalam keseharian."
                },
                {
                  title: "Kesiapan Sekolah",
                  icon: <Icons.School className="text-indigo-500" />,
                  text: "Mempersiapkan **kesiapan sekolah** mencakup kemampuan akademik dasar, sosial-emosional, dan kemandirian untuk jenjang pendidikan berikutnya."
                },
                {
                  title: "Kemitraan Kuat",
                  icon: <Icons.Users className="text-zinc-500" />,
                  text: "Membangun **kemitraan yang kuat** dengan orang tua dan masyarakat untuk menciptakan kontinuitas pendidikan antara rumah dan sekolah."
                }

              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <div className="h-6 w-6">{item.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-zinc-900 mb-2">{item.title}</h4>
                    <p className="text-sm font-medium leading-relaxed text-zinc-500">
                      {item.text.split("**").map((part, index) => 
                        index % 2 === 1 ? <strong key={index} className="text-zinc-800 font-black">{part}</strong> : part
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fasilitas - Dense Grid with Images */}
        <section className="px-6 py-12 md:px-12 lg:px-24 bg-zinc-50">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-zinc-900">Fasilitas <span className="text-sky-500">Kreatif</span></h2>
            </div>

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {FACILITIES.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3 rounded-[2rem] bg-white p-4 transition-all hover:bg-lime-50 group border border-zinc-100 hover:border-lime-200">
                  <div className="h-24 w-full rounded-2xl overflow-hidden shadow-sm transition-transform group-hover:scale-105">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
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

        {/* Closing CTA - Unique */}
        <section className="px-6 py-12 md:px-12 lg:px-24 bg-white">
          <div className="mx-auto max-w-5xl rounded-[3rem] bg-zinc-900 p-10 text-center text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h2 className="mb-4 text-2xl font-black md:text-4xl leading-tight">Ingin Melihat <span className="text-lime-400">PGRI Puspa Mekar</span> Langsung?</h2>
              <p className="mb-8 text-white/70 font-bold max-w-2xl mx-auto">Kami dengan senang hati menyambut Ayah & Bunda untuk berkunjung dan melihat langsung suasana belajar yang ceria.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20menjadwalkan%20kunjungan%20ke%20TK%20Puspa%20Mekar." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-lime-600 text-white px-10 py-4 rounded-[1.5rem] font-black text-lg hover:bg-lime-700 transition-all hover:scale-105 shadow-xl shadow-lime-900/20"
                >
                  Jadwalkan Kunjungan
                </a>
                <Link 
                  href="/kontak" 
                  className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-10 py-4 rounded-[1.5rem] font-black text-lg hover:bg-white/20 transition-all"
                >
                  Tanya Admin
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
