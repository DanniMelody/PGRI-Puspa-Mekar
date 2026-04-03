"use client";

import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Icons } from "@/app/components/Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminRegistrations() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("Semua");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("registrations")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setData(data || []);
      } catch (error: any) {
        console.error('Error fetching registrations:', error.message || error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const searchStr = `${item.student_name} ${item.parent_name} ${item.nik}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterProgram === "Semua" || item.program === filterProgram;
      
      return matchesSearch && matchesFilter;
    });
  }, [data, searchTerm, filterProgram]);

  const programs = ["Semua", "TK A", "TK B", "Kelompok Bermain"];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-black text-zinc-900">Daftar Pendaftar PPDB</h1>
          <p className="text-sm font-bold text-zinc-500">Total {filteredData.length} pendaftar ditemukan.</p>
        </div>
        
        <div className="grid gap-4 md:flex md:items-center md:justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Icons.Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari nama siswa, ortu, atau NIK..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-4 text-sm font-bold focus:border-lime-500 focus:outline-none focus:ring-4 focus:ring-lime-50"
            />
          </div>
          
          {/* Filter Chips - Scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {programs.map((p) => (
              <button
                key={p}
                onClick={() => setFilterProgram(p)}
                className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-xs font-black transition-all ${
                  filterProgram === p
                    ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                    : "bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-xl shadow-zinc-100/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-full">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Data Siswa</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Program</th>
                <th className="hidden lg:table-cell px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center">File KK</th>
                <th className="hidden lg:table-cell px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center">File Akta</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Orang Tua</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  [1, 2, 3, 4, 5].map((n) => (
                    <tr key={n}>
                      <td colSpan={6} className="px-6 py-8">
                        <div className="h-12 w-full animate-pulse rounded-2xl bg-zinc-50" />
                      </td>
                    </tr>
                  ))
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-24 text-center">
                      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-50 text-zinc-300">
                        <Icons.Search className="h-10 w-10" />
                      </div>
                      <p className="text-zinc-400 font-bold text-lg">Tidak ada pendaftar ditemukan.</p>
                      <button onClick={() => {setSearchTerm(""); setFilterProgram("Semua");}} className="mt-4 text-sm font-black text-lime-600 hover:underline">Reset Pencarian</button>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((reg) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={reg.id} 
                      className="hover:bg-zinc-50/80 transition-colors group"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-50 text-lime-600 font-black text-lg">
                            {reg.student_name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-black text-zinc-900 truncate max-w-[150px] lg:max-w-none">{reg.student_name}</p>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-black uppercase bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded">NIK: {reg.nik}</span>
                              <span className="text-[10px] font-bold text-zinc-300">{new Date(reg.created_at).toLocaleDateString('id-ID')}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                          reg.program.includes('TK A') ? 'bg-orange-50 text-orange-600' :
                          reg.program.includes('TK B') ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                        }`}>
                          {reg.program}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell px-6 py-6 text-center">
                        {reg.kk_url ? (
                          <a href={reg.kk_url} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 px-3 items-center gap-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 hover:bg-sky-100 transition-all shadow-sm text-[10px] font-black uppercase" title="Buka Kartu Keluarga">
                            <Icons.FileText className="h-4 w-4" />
                            Lihat KK
                          </a>
                        ) : (
                          <span className="text-[10px] font-bold text-zinc-300">Kosong</span>
                        )}
                      </td>
                      <td className="hidden lg:table-cell px-6 py-6 text-center">
                        {reg.birth_certificate_url ? (
                          <a href={reg.birth_certificate_url} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 px-3 items-center gap-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 transition-all shadow-sm text-[10px] font-black uppercase" title="Buka Akta Kelahiran">
                            <Icons.FileText className="h-4 w-4" />
                            Lihat Akta
                          </a>
                        ) : (
                          <span className="text-[10px] font-bold text-zinc-300">Kosong</span>
                        )}
                      </td>
                      <td className="px-6 py-6">
                        <div className="min-w-0">
                          <p className="font-bold text-zinc-900 truncate">{reg.parent_name}</p>
                          <p className="text-xs font-bold text-zinc-400">{reg.whatsapp}</p>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex flex-col items-end gap-2 lg:block">
                          {/* Mobile documents link (small screen only) */}
                          <div className="flex gap-2 lg:hidden mb-2">
                            {reg.kk_url && <a href={reg.kk_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-50 text-sky-600 rounded-lg border border-sky-100"><Icons.FileText className="h-4 w-4" /></a>}
                            {reg.birth_certificate_url && <a href={reg.birth_certificate_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-rose-50 text-rose-600 rounded-lg border border-rose-100"><Icons.FileText className="h-4 w-4" /></a>}
                          </div>
                          
                          <a 
                            href={`https://wa.me/${reg.whatsapp.replace(/\D/g, '')}?text=Halo%20Bunda%20${reg.parent_name},%20saya%20Admin%20TK%20Puspa%20Mekar.%20Terima%20kasih%20sudah%20mendaftarkan%20Ananda%20${reg.student_name}.`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-lime-600 px-5 text-[11px] font-black text-white shadow-lg shadow-lime-100 transition-all hover:bg-lime-700 active:scale-95"
                          >
                            <Icons.MessageSquare className="h-4 w-4" />
                            <span className="hidden sm:inline">Hubungi Ortu</span>
                            <span className="sm:hidden">Chat</span>
                          </a>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Mobile-only horizontal scroll hint */}
      <p className="text-center text-[10px] font-bold text-zinc-400 md:hidden uppercase tracking-widest">
        Geser tabel ke samping untuk melihat lebih banyak →
      </p>
    </div>
  );
}
