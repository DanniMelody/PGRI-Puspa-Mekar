"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Icons } from "@/app/components/Icons";
import { News } from "@/types/database";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORY_OPTIONS = ["Semua", "Pengumuman", "Acara Sekolah", "Prestasi"] as const;

export default function AdminNews() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<News, "id" | "created_at" | "slug">>({
    title: "",
    category: "Pengumuman",
    content: "",
    image_url: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `news/${fileName}`;

    try {
      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        if (uploadError.message === 'Bucket not found') {
          throw new Error('Folder penyimpanan "images" belum dibuat di Supabase Storage.');
        }
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      console.error('Storage error:', error);
      throw new Error(`Gagal upload: ${error.message}`);
    }
  };

  const fetchNews = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error: any) {
      console.error('Error fetching news:', error.message || error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleEdit = (item: News) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      content: item.content,
      image_url: item.image_url || ""
    });
    setPreviewUrl(item.image_url || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", category: "Pengumuman", content: "", image_url: "" });
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.image_url;

      if (selectedFile) {
        finalImageUrl = await uploadImage(selectedFile);
      }

      const slug = formData.title
        .toLowerCase()
        .trim()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
        
      if (editingId) {
        // Update existing news
        const { error } = await supabase
          .from('news')
          .update({ ...formData, image_url: finalImageUrl, slug })
          .eq('id', editingId);
        
        if (error) throw error;
      } else {
        // Insert new news
        const { error } = await supabase
          .from('news')
          .insert([{ ...formData, image_url: finalImageUrl, slug }]);
        
        if (error) throw error;
      }

      closeModal();
      await fetchNews();
    } catch (error: any) {
      alert(`Gagal menyimpan: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus berita ini secara permanen?")) return;

    try {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;
      setNews(prev => prev.filter(item => item.id !== id));
    } catch (error: any) {
      alert(`Gagal menghapus: ${error.message}`);
    }
  };

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterCategory === "Semua" || item.category === filterCategory;
      return matchesSearch && matchesFilter;
    });
  }, [news, searchTerm, filterCategory]);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-black text-zinc-900">Kelola Berita</h1>
            <p className="text-sm font-bold text-zinc-500">Terdapat {filteredNews.length} berita ditemukan.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3.5 text-sm font-black text-white shadow-xl transition-all hover:bg-zinc-800 active:scale-95 w-full md:w-auto"
          >
            <Icons.PlusCircle className="h-4 w-4" />
            Tulis Berita
          </button>
        </div>
        
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Icons.Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari judul berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-4 text-sm font-bold focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-50"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-black transition-all ${
                  filterCategory === cat
                    ? "bg-amber-100 text-amber-700 shadow-sm"
                    : "bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-xl shadow-zinc-100/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-full">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Berita</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Kategori</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Tanggal</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  [1, 2, 3].map(n => (
                    <tr key={n}>
                      <td colSpan={4} className="px-6 py-8">
                        <div className="h-16 w-full animate-pulse rounded-2xl bg-zinc-50" />
                      </td>
                    </tr>
                  ))
                ) : filteredNews.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-24 text-center">
                      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-50 text-zinc-300">
                        <Icons.FileText className="h-10 w-10" />
                      </div>
                      <p className="text-zinc-400 font-bold text-lg">Tidak ada berita ditemukan.</p>
                    </td>
                  </tr>
                ) : (
                  filteredNews.map((item) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={item.id} 
                      className="hover:bg-zinc-50/50 transition-colors group"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="hidden sm:block h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 border border-zinc-50">
                            {item.image_url ? (
                              <img src={item.image_url} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Icons.FileText className="h-6 w-6 text-zinc-300" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-black text-zinc-900 line-clamp-1">{item.title}</p>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5 truncate">/{item.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                          item.category === 'Pengumuman' ? 'bg-amber-50 text-amber-600' :
                          item.category === 'Acara Sekolah' ? 'bg-sky-50 text-sky-600' : 'bg-lime-50 text-lime-600'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-[11px] font-bold text-zinc-400 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="h-10 w-10 inline-flex items-center justify-center rounded-xl text-zinc-300 hover:bg-amber-50 hover:text-amber-600 transition-all active:scale-90"
                            title="Edit Berita"
                          >
                            <Icons.Pencil className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="h-10 w-10 inline-flex items-center justify-center rounded-xl text-zinc-300 hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-90"
                            title="Hapus Berita"
                          >
                            <Icons.Trash className="h-4 w-4" />
                          </button>
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

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" 
              onClick={closeModal} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-[3rem] bg-white p-8 shadow-2xl md:p-12 border border-zinc-100 max-h-[95vh] overflow-y-auto"
            >
              <h2 className="text-3xl font-black text-zinc-900 mb-10">
                {editingId ? "Edit Berita" : "Tulis Berita Baru"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-black text-zinc-700">Judul Berita</label>
                      <input
                        required
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50 px-5 text-base font-bold focus:border-amber-500 focus:bg-white focus:outline-none transition-all"
                        placeholder="Contoh: Pentas Seni Akhir Tahun"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-black text-zinc-700">Kategori</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50 px-5 text-base font-bold focus:border-amber-500 focus:bg-white focus:outline-none transition-all"
                      >
                        {CATEGORY_OPTIONS.filter(c => c !== "Semua").map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-black text-zinc-700">Foto Utama (Upload Lokal)</label>
                      <div className="relative">
                        <input
                          required={!formData.image_url && !editingId}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="news-image-upload"
                        />
                        <label 
                          htmlFor="news-image-upload"
                          className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 px-5 text-sm font-bold text-zinc-500 transition-all hover:border-amber-500 hover:bg-amber-50"
                        >
                          <Icons.Plus className="h-5 w-5" />
                          {selectedFile ? selectedFile.name : editingId ? "Ganti Foto (Opsional)" : "Pilih Foto dari Perangkat"}
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview Side */}
                  <div className="flex flex-col gap-4">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Preview Gambar</label>
                    <div className="aspect-video w-full overflow-hidden rounded-[2rem] bg-zinc-50 border-2 border-dashed border-zinc-100 flex items-center justify-center relative">
                      {previewUrl || formData.image_url ? (
                        <img src={previewUrl || formData.image_url || ""} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <Icons.Camera className="h-12 w-12 text-zinc-200" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-black text-zinc-700">Isi Berita Lengkap</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="rounded-3xl border-2 border-zinc-100 bg-zinc-50 p-6 text-base font-medium focus:border-amber-500 focus:bg-white focus:outline-none transition-all resize-none"
                    placeholder="Tulis detail berita di sini secara lengkap..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 h-16 rounded-2xl border-2 border-zinc-100 font-black text-zinc-400 hover:bg-zinc-50 transition-all"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] h-16 rounded-2xl bg-zinc-900 font-black text-white shadow-xl transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                        <span>Menyimpan...</span>
                      </div>
                    ) : (
                      editingId ? "Simpan Perubahan" : "Publikasikan Berita"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
