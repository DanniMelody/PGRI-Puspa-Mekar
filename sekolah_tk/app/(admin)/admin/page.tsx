"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Icons } from "@/app/components/Icons";
import { motion } from "framer-motion";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    registrations: 0,
    inquiries: 0,
    news: 0,
    gallery: 0,
  });
  const [recentRegistrations, setRecentRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ppdbOpen, setPpdbOpen] = useState<boolean | null>(null);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [regCount, inqCount, newsCount, galCount, recentReg, settings] = await Promise.all([
          supabase.from("registrations").select("*", { count: "exact", head: true }),
          supabase.from("inquiries").select("*", { count: "exact", head: true }),
          supabase.from("news").select("*", { count: "exact", head: true }),
          supabase.from("gallery").select("*", { count: "exact", head: true }),
          supabase.from("registrations").select("*").order("created_at", { ascending: false }).limit(5),
          supabase.from("settings").select("*").eq("key", "ppdb_open").maybeSingle(),
        ]);

        setStats({
          registrations: regCount.count || 0,
          inquiries: inqCount.count || 0,
          news: newsCount.count || 0,
          gallery: galCount.count || 0,
        });
        setRecentRegistrations(recentReg.data || []);
        
        if (settings.data) {
          setPpdbOpen(settings.data.value === "true");
        } else {
          // Jika setting belum ada, default ke true tapi JANGAN langsung insert di sini
          // biarkan togglePPDB yang melakukan upsert nanti
          setPpdbOpen(true);
        }
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const togglePPDB = async () => {
    if (isToggling || ppdbOpen === null) return;
    
    setIsToggling(true);
    const newValue = !ppdbOpen;
    
    try {
      // Gunakan upsert agar lebih aman (jika data belum ada, dia buat baru)
      const { error } = await supabase
        .from("settings")
        .upsert({ 
          key: "ppdb_open", 
          value: String(newValue),
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

      if (error) throw error;
      
      setPpdbOpen(newValue);
      console.log("PPDB Status updated to:", newValue);
    } catch (error: any) {
      console.error("Gagal update status PPDB:", error);
      alert("Gagal mengubah status PPDB: " + (error.message || "Pastikan Anda sudah login sebagai admin."));
    } finally {
      setIsToggling(false);
    }
  };

  const cards = [
    {
      name: "Pendaftar",
      value: stats.registrations,
      icon: <Icons.Users className="h-6 w-6 text-lime-600" />,
      color: "bg-lime-50",
      href: "/admin/registrations"
    },
    {
      name: "Pesan Masuk",
      value: stats.inquiries,
      icon: <Icons.MessageSquare className="h-6 w-6 text-sky-600" />,
      color: "bg-sky-50",
      href: "/admin/inquiries"
    },
    {
      name: "Berita",
      value: stats.news,
      icon: <Icons.FileText className="h-6 w-6 text-amber-600" />,
      color: "bg-amber-50",
      href: "/admin/berita"
    },
    {
      name: "Galeri Foto",
      value: stats.gallery,
      icon: <Icons.Camera className="h-6 w-6 text-rose-600" />,
      color: "bg-rose-50",
      href: "/admin/galeri"
    },
  ];

  const quickActions = [
    { name: "Buat Berita", href: "/admin/berita", icon: <Icons.Sparkles className="h-4 w-4" /> },
    { name: "Unggah Foto", href: "/admin/galeri", icon: <Icons.Plus className="h-4 w-4" /> },
    { name: "Cek Pesan", href: "/admin/inquiries", icon: <Icons.Mail className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-10">
      {/* Header with Quick Actions */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-zinc-900">Dashboard</h1>
          <p className="text-sm font-bold text-zinc-500">Selamat datang kembali di pusat kendali TK PGRI Puspa Mekar.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-xs font-black text-white shadow-lg transition-all hover:bg-zinc-800 active:scale-95"
            >
              {action.icon}
              {action.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={card.name}
          >
            <Link href={card.href} className="group block rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${card.color}`}>
                {card.icon}
              </div>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{card.name}</p>
              <h3 className="mt-1 text-4xl font-black text-zinc-900">
                {isLoading ? (
                  <div className="h-10 w-16 animate-pulse rounded-lg bg-zinc-100" />
                ) : (
                  card.value
                )}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* PPDB Status Control */}
        <div className="rounded-[3rem] bg-white p-10 shadow-sm border border-zinc-100 flex flex-col justify-between">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-black text-zinc-900">Status PPDB Online</h3>
              {ppdbOpen !== null && (
                <div className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${ppdbOpen ? 'bg-lime-100 text-lime-700' : 'bg-rose-100 text-rose-700'}`}>
                  <div className={`h-2 w-2 rounded-full ${ppdbOpen ? 'bg-lime-500 animate-pulse' : 'bg-rose-500'}`} />
                  {ppdbOpen ? 'Pendaftaran Dibuka' : 'Pendaftaran Ditutup'}
                </div>
              )}
            </div>
            <p className="text-lg font-bold text-zinc-500 leading-relaxed">
              Atur apakah formulir pendaftaran siswa baru dapat diakses oleh publik atau tidak.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-between rounded-[2rem] bg-zinc-50 p-6 border border-zinc-100">
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Kontrol Akses</span>
              <span className="text-lg font-black text-zinc-900">{ppdbOpen ? 'Tutup Pendaftaran' : 'Buka Pendaftaran'}</span>
            </div>
            <button
              onClick={togglePPDB}
              disabled={isToggling || ppdbOpen === null}
              className={`relative inline-flex h-12 w-24 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${ppdbOpen ? 'bg-lime-500' : 'bg-zinc-300'}`}
            >
              <span className="sr-only">Toggle PPDB</span>
              <motion.span
                animate={{ x: ppdbOpen ? 52 : 4 }}
                className="pointer-events-none inline-block h-10 w-10 transform rounded-full bg-white shadow-lg ring-0 transition-transform"
              />
              {isToggling && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-400/20 border-t-zinc-400" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="rounded-[3rem] bg-white p-10 shadow-sm border border-zinc-100">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-black text-zinc-900">Pendaftar Terbaru</h3>
            <Link href="/admin/registrations" className="text-sm font-black text-lime-600 hover:underline">
              Lihat Semua
            </Link>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-20 animate-pulse rounded-2xl bg-zinc-50" />
              ))}
            </div>
          ) : recentRegistrations.length === 0 ? (
            <div className="py-10 text-center text-zinc-400 font-bold">
              Belum ada pendaftaran masuk.
            </div>
          ) : (
            <div className="space-y-4">
              {recentRegistrations.map((reg) => (
                <div key={reg.id} className="flex items-center justify-between rounded-3xl border border-zinc-50 bg-zinc-50/30 p-5 transition-colors hover:bg-zinc-50">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100 text-lime-600">
                      <Icons.User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-black text-zinc-900">{reg.student_name}</p>
                      <p className="text-xs font-bold text-zinc-400">Program: {reg.program}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                      {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
