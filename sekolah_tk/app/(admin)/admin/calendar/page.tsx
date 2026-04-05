"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Icons } from "@/app/components/Icons";
import { CalendarEvent } from "@/types/database";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    type: "Kegiatan" as "Kegiatan" | "Hari Libur"
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("calendar_events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      console.error("Error fetching events:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (is_published: boolean) => {
    if (!formData.date || !formData.title) {
      alert("Mohon isi tanggal dan nama kegiatan.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { ...formData, is_published };

      if (editingId) {
        const { error } = await supabase
          .from("calendar_events")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("calendar_events")
          .insert([payload]);
        if (error) throw error;
      }

      setFormData({ date: "", title: "", type: "Kegiatan" });
      setEditingId(null);
      fetchEvents();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (event: CalendarEvent) => {
    setEditingId(event.id);
    setFormData({
      date: event.date,
      title: event.title,
      type: event.type
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus agenda ini?")) return;

    try {
      const { error } = await supabase
        .from("calendar_events")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchEvents();
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  const togglePublished = async (event: CalendarEvent) => {
    try {
      const { error } = await supabase
        .from("calendar_events")
        .update({ is_published: !event.is_published })
        .eq("id", event.id);
      if (error) throw error;
      fetchEvents();
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="space-y-10">
      {/* Form Section */}
      <section className="rounded-[2.5rem] bg-white p-8 shadow-xl shadow-zinc-100/50 border border-zinc-100">
        <h2 className="mb-8 text-xl font-black text-zinc-900 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-lime-100 flex items-center justify-center text-lime-600">
            <Icons.Calendar className="h-6 w-6" />
          </div>
          {editingId ? "Edit Agenda Sekolah" : "Tambah Agenda Sekolah Baru"}
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Pilih Tanggal</label>
            <input
              required
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50 px-5 text-sm font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-2 lg:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Nama Kegiatan / Agenda</label>
            <input
              required
              type="text"
              placeholder="Contoh: Rapat Orang Tua Murid"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50 px-5 text-sm font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Kategori</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50 px-5 text-sm font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all appearance-none"
            >
              <option value="Kegiatan">Kegiatan Sekolah</option>
              <option value="Hari Libur">Hari Libur Sekolah</option>
            </select>
          </div>

          <div className="md:col-span-2 lg:col-span-4 flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
              className="flex-1 min-w-[200px] h-14 rounded-2xl bg-zinc-900 text-sm font-black text-white shadow-xl shadow-zinc-200 transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Icons.Check className="h-5 w-5 text-lime-400" />
              {isSubmitting ? "Menyimpan..." : editingId ? "Simpan Perubahan & Publish" : "Simpan & Tampilkan di Beranda"}
            </button>
            
            <button
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting}
              className="flex-1 min-w-[200px] h-14 rounded-2xl border-2 border-zinc-200 bg-white text-sm font-black text-zinc-600 transition-all hover:bg-zinc-50 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Icons.FileText className="h-5 w-5 text-zinc-400" />
              {isSubmitting ? "Menyimpan..." : "Simpan sebagai Draft"}
            </button>

            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ date: "", title: "", type: "Kegiatan" });
                }}
                className="h-14 px-8 rounded-2xl border-2 border-rose-100 text-sm font-black text-rose-500 hover:bg-rose-50 transition-colors"
              >
                Batal
              </button>
            )}
          </div>
        </div>
      </section>

      {/* List Section */}
      <div className="rounded-[2.5rem] border border-zinc-100 bg-white shadow-xl shadow-zinc-100/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-zinc-50 flex items-center justify-between">
          <h3 className="font-black text-zinc-900">Daftar Agenda</h3>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-50 px-3 py-1 rounded-full">Total {events.length} Agenda</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-50 bg-zinc-50/30">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Waktu</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Nama Agenda</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Kategori</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center">Status Beranda</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {isLoading ? (
                [1, 2, 3].map((n) => (
                  <tr key={n}>
                    <td colSpan={5} className="px-8 py-8">
                      <div className="h-10 w-full animate-pulse rounded-2xl bg-zinc-50" />
                    </td>
                  </tr>
                ))
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-50 text-zinc-200">
                      <Icons.Calendar className="h-10 w-10" />
                    </div>
                    <p className="text-zinc-400 font-bold text-lg">Belum ada agenda sekolah.</p>
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-zinc-900">
                          {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-bold text-zinc-700">{event.title}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-block rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                        event.type === 'Hari Libur' ? 'bg-rose-50 text-rose-600' : 'bg-sky-50 text-sky-600'
                      }`}>
                        {event.type}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <button
                          onClick={() => togglePublished(event)}
                          className={`flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                            event.is_published 
                            ? "bg-lime-50 text-lime-700 border border-lime-100" 
                            : "bg-zinc-50 text-zinc-400 border border-zinc-100"
                          }`}
                        >
                          <div className={`h-2 w-2 rounded-full ${event.is_published ? "bg-lime-500 animate-pulse" : "bg-zinc-300"}`} />
                          {event.is_published ? "Tampil" : "Draft"}
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEdit(event)}
                          className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 hover:bg-zinc-900 hover:text-white transition-all shadow-sm"
                          title="Edit Agenda"
                        >
                          <Icons.Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="h-10 w-10 flex items-center justify-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                          title="Hapus Agenda"
                        >
                          <Icons.Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
