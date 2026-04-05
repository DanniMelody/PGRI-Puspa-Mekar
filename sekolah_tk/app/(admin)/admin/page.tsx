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
  const [recentNews, setRecentNews] = useState<any[]>([]);
  const [recentRegistrations, setRecentRegistrations] = useState<any[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ppdbOpen, setPpdbOpen] = useState<boolean | null>(null);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [regCount, inqCount, newsCount, galCount, recentReg, recentNewsData, recentInqData, settings, events] = await Promise.all([
          supabase.from("registrations").select("*", { count: "exact", head: true }),
          supabase.from("inquiries").select("*", { count: "exact", head: true }),
          supabase.from("news").select("*", { count: "exact", head: true }),
          supabase.from("gallery").select("*", { count: "exact", head: true }),
          supabase.from("registrations").select("*").order("created_at", { ascending: false }).limit(5),
          supabase.from("news").select("*").order("created_at", { ascending: false }).limit(3),
          supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(3),
          supabase.from("settings").select("*").eq("key", "ppdb_open").maybeSingle(),
          supabase.from("calendar_events").select("*").order("date", { ascending: true }).gte("date", new Date().toISOString().split('T')[0]).limit(4)
        ]);

        setStats({
          registrations: regCount.count || 0,
          inquiries: inqCount.count || 0,
          news: newsCount.count || 0,
          gallery: galCount.count || 0,
        });
        setRecentRegistrations(recentReg.data || []);
        setRecentNews(recentNewsData.data || []);
        setRecentInquiries(recentInqData.data || []);
        setUpcomingEvents(events.data || []);
        
        if (settings.data) {
          setPpdbOpen(settings.data.value === "true");
        } else {
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
      const { error } = await supabase.from("settings").upsert({ 
        key: "ppdb_open", 
        value: String(newValue),
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });
      if (error) throw error;
      setPpdbOpen(newValue);
    } catch (error: any) {
      alert("Gagal mengubah status PPDB: " + error.message);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Hapus pesan ini?")) return;
    try {
      const { error } = await supabase.from("inquiries").delete().eq("id", id);
      if (error) throw error;
      const { data: newInq } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(3);
      setRecentInquiries(newInq || []);
      const { count } = await supabase.from("inquiries").select("*", { count: "exact", head: true });
      setStats(prev => ({ ...prev, inquiries: count || 0 }));
    } catch (error) {
      alert("Gagal menghapus pesan");
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 19) return "Selamat Sore";
    return "Selamat Malam";
  };

  const cards = [
    { name: "Pendaftar", value: stats.registrations, icon: <Icons.UserPlus className="h-6 w-6 text-lime-600" />, color: "bg-lime-50", href: "/admin/registrations" },
    { name: "Pesan Masuk", value: stats.inquiries, icon: <Icons.Mail className="h-6 w-6 text-sky-600" />, color: "bg-sky-50", href: "/admin/inquiries" },
    { name: "Berita", value: stats.news, icon: <Icons.FileText className="h-6 w-6 text-amber-600" />, color: "bg-amber-50", href: "/admin/berita" },
    { name: "Galeri", value: stats.gallery, icon: <Icons.Camera className="h-6 w-6 text-rose-600" />, color: "bg-rose-50", href: "/admin/galeri" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-zinc-100 pb-8">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">{getGreeting()}, Administrator</h1>
          <p className="mt-1 text-sm font-bold text-zinc-400 uppercase tracking-widest">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        <div className="flex items-center gap-4 rounded-3xl bg-zinc-900 p-2 pl-5 shadow-xl">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Status PPDB</span>
            <span className={`text-[11px] font-black uppercase ${ppdbOpen ? 'text-lime-400' : 'text-rose-400'}`}>
              {ppdbOpen ? 'Online' : 'Offline'}
            </span>
          </div>
          <button
            onClick={togglePPDB}
            disabled={isToggling || ppdbOpen === null}
            className={`relative inline-flex h-10 w-18 shrink-0 cursor-pointer items-center rounded-2xl transition-colors disabled:opacity-50 ${ppdbOpen ? 'bg-lime-500' : 'bg-zinc-700'}`}
          >
            <motion.span
              animate={{ x: ppdbOpen ? 36 : 4 }}
              className="h-7 w-7 rounded-lg bg-white shadow-md"
            />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={card.name}
          >
            <Link href={card.href} className="group flex items-center gap-5 rounded-[2rem] bg-white p-6 shadow-sm border border-zinc-100 transition-all hover:shadow-xl hover:-translate-y-0.5">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${card.color}`}>
                {card.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{card.name}</p>
                <h3 className="text-2xl font-black text-zinc-900">
                  {isLoading ? "..." : card.value}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Upcoming Agenda - New Section */}
        <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 flex flex-col lg:col-span-1">
          <div className="mb-6 flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-zinc-900 flex items-center gap-2">
              <Icons.Calendar className="h-5 w-5 text-indigo-500" />
              Agenda Terdekat
            </h3>
            <Link href="/admin/calendar" className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">
              Kelola
            </Link>
          </div>
          
          <div className="flex-1 space-y-4">
            {isLoading ? (
              [1, 2, 3].map((n) => <div key={n} className="h-16 animate-pulse rounded-2xl bg-zinc-50" />)
            ) : upcomingEvents.length === 0 ? (
              <div className="py-8 text-center text-zinc-300 text-sm font-bold">Belum ada agenda terdekat.</div>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-4 items-start group">
                  <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-zinc-50 border border-zinc-100 shrink-0 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                    <span className="text-sm font-black text-zinc-900 leading-none">{new Date(event.date).getDate()}</span>
                    <span className="text-[8px] font-black uppercase text-zinc-400">{new Date(event.date).toLocaleDateString('id-ID', { month: 'short' })}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-zinc-800 leading-tight mb-1">{event.title}</p>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${event.type === 'Hari Libur' ? 'bg-rose-50 text-rose-500' : 'bg-sky-50 text-sky-500'}`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <Link href="/admin/calendar" className="mt-6 flex h-12 items-center justify-center gap-2 rounded-xl bg-zinc-900 text-[11px] font-black text-white transition-all hover:bg-zinc-800">
            <Icons.Plus className="h-4 w-4" />
            TAMBAH AGENDA
          </Link>
        </div>

        {/* Recent News */}
        <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 flex flex-col lg:col-span-1">
          <div className="mb-6 flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-zinc-900 flex items-center gap-2">
              <Icons.FileText className="h-5 w-5 text-amber-500" />
              Berita
            </h3>
            <Link href="/admin/berita" className="text-xs font-black text-amber-600 hover:underline uppercase tracking-widest">
              Semua
            </Link>
          </div>
          <div className="flex-1 space-y-3">
            {recentNews.map((item) => (
              <div key={item.id} className="group flex items-center gap-4 rounded-2xl border border-zinc-50 bg-zinc-50/30 p-3 transition-all hover:bg-white hover:shadow-md hover:border-amber-100">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-zinc-900 truncate">{item.title}</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 flex flex-col lg:col-span-1">
          <div className="mb-6 flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-zinc-900 flex items-center gap-2">
              <Icons.Mail className="h-5 w-5 text-sky-500" />
              Pesan
            </h3>
          </div>
          <div className="flex-1 space-y-3">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="group rounded-2xl border border-zinc-50 bg-zinc-50/30 p-4 transition-all hover:bg-white hover:shadow-md">
                <p className="text-sm font-black text-zinc-900">{inq.full_name}</p>
                <p className="text-xs font-medium text-zinc-500 line-clamp-1">{(inq as any).message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registrations - Full Width */}
        <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 lg:col-span-3">
          <div className="mb-6 flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-zinc-900 flex items-center gap-2">
              <Icons.UserPlus className="h-5 w-5 text-lime-500" />
              Pendaftar Baru
            </h3>
            <Link href="/admin/registrations" className="text-xs font-black text-lime-600 hover:underline uppercase tracking-widest">
              Lihat Semua
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recentRegistrations.map((reg) => (
              <div key={reg.id} className="flex items-center gap-3 rounded-2xl border border-zinc-50 bg-zinc-50/30 p-3 transition-all hover:bg-white hover:shadow-md">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-100 text-lime-600 font-black text-xs">
                  {reg.student_name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-zinc-900 truncate">{reg.student_name}</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{reg.program.split(' ')[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
