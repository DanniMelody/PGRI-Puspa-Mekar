"use client";

import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Icons } from "@/app/components/Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminInquiries() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("Semua");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setData(data || []);
    } catch (error: any) {
      console.error('Error fetching inquiries:', error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pesan ini secara permanen?")) return;

    try {
      const { error } = await supabase.from("inquiries").delete().eq("id", id);
      if (error) throw error;
      setData(data.filter(item => item.id !== id));
    } catch (error: any) {
      alert(`Gagal menghapus: ${error.message}`);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = 
        item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterSubject === "Semua" || item.subject === filterSubject;
      
      return matchesSearch && matchesFilter;
    });
  }, [data, searchTerm, filterSubject]);

  const subjects = ["Semua", "Pertanyaan Umum", "Pendaftaran", "Saran & Kritik"];

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Pesan Masuk</h1>
          <p className="text-sm font-bold text-zinc-500">Terdapat {filteredData.length} pesan dari wali murid.</p>
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Icons.Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari pengirim atau isi pesan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-4 text-sm font-bold focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-50 sm:w-72"
            />
          </div>
          
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="h-12 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-600 focus:border-sky-500 focus:outline-none"
          >
            {subjects.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            [1, 2, 3].map((n) => (
              <div key={n} className="h-48 animate-pulse rounded-[2.5rem] bg-zinc-100" />
            ))
          ) : filteredData.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 rounded-[3rem] bg-white border-2 border-dashed border-zinc-100"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-50 text-zinc-300">
                <Icons.Mail className="h-10 w-10" />
              </div>
              <p className="text-xl font-black text-zinc-900">Kotak Masuk Kosong</p>
              <p className="text-sm font-bold text-zinc-400">Tidak ada pesan yang ditemukan saat ini.</p>
            </motion.div>
          ) : (
            filteredData.map((inq) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={inq.id} 
                className="group relative rounded-[2.5rem] bg-white p-8 shadow-sm border border-zinc-100 transition-all hover:shadow-xl hover:border-sky-100"
              >
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 font-black text-xl">
                      {inq.full_name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-zinc-900">{inq.full_name}</h4>
                      <div className="mt-1 flex items-center gap-2">
                        <Icons.Mail className="h-3 w-3 text-zinc-400" />
                        <p className="text-xs font-bold text-zinc-400">{inq.whatsapp}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                      inq.subject === 'Pendaftaran' ? 'bg-lime-50 text-lime-600' :
                      inq.subject === 'Saran & Kritik' ? 'bg-rose-50 text-rose-600' : 'bg-sky-50 text-sky-600'
                    }`}>
                      {inq.subject}
                    </span>
                    <p className="text-xs font-bold text-zinc-300">
                      {new Date(inq.created_at).toLocaleString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="rounded-3xl bg-zinc-50/50 p-6 ring-1 ring-zinc-100 transition-colors group-hover:bg-white group-hover:ring-sky-100">
                  <p className="text-base font-medium leading-relaxed text-zinc-700 whitespace-pre-wrap">
                    {inq.message}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="flex items-center gap-2 text-xs font-black text-rose-400 transition-colors hover:text-rose-600"
                  >
                    <Icons.Trash className="h-4 w-4" />
                    Hapus Pesan
                  </button>
                  
                  <a 
                    href={`https://wa.me/${inq.whatsapp.replace(/\D/g, '')}?text=Halo%20Bapak/Ibu%20${inq.full_name},%20saya%20Admin%20TK%20Puspa%20Mekar.%20Mengenai%20pertanyaan%20Anda:%20`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 text-sm font-black text-white transition-all hover:bg-zinc-800 active:scale-95"
                  >
                    <Icons.MessageSquare className="h-4 w-4" />
                    Balas via WhatsApp
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
