"use client";

import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Icons } from "@/app/components/Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminGallery() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Kegiatan Belajar",
    image_url: "",
    is_video: false,
    video_url: ""
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
    const filePath = `gallery/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
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

  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error: any) {
      console.error('Error fetching gallery:', error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      image_url: item.image_url,
      is_video: item.is_video,
      video_url: item.video_url || ""
    });
    setPreviewUrl(item.image_url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", category: "Kegiatan Belajar", image_url: "", is_video: false, video_url: "" });
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.image_url;

      if (selectedFile && !formData.is_video) {
        finalImageUrl = await uploadImage(selectedFile);
      }

      if (editingId) {
        // Update
        const { error } = await supabase
          .from('gallery')
          .update({ ...formData, image_url: finalImageUrl })
          .eq('id', editingId);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('gallery')
          .insert([{ ...formData, image_url: finalImageUrl }]);
        if (error) throw error;
      }
      
      closeModal();
      fetchGallery();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus foto/video ini dari galeri?")) return;

    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
      setPhotos(photos.filter(p => p.id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  const categories = ["Semua", "Kegiatan Belajar", "Bermain", "Pentas Seni", "Fasilitas", "Video"];

  const filteredPhotos = useMemo(() => {
    return photos.filter(p => filterCategory === "Semua" || p.category === filterCategory);
  }, [photos, filterCategory]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-black text-zinc-900">Kelola Galeri</h1>
          <p className="text-sm font-bold text-zinc-500">Total {filteredPhotos.length} dokumentasi sekolah.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-lime-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-lime-100 transition-all hover:bg-lime-700 active:scale-95"
        >
          <Icons.Plus className="h-4 w-4" />
          Tambah Foto/Video
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-black transition-all ${
              filterCategory === cat
                ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                : "bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square animate-pulse rounded-[2.5rem] bg-zinc-100" />
            ))
          ) : filteredPhotos.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center rounded-[3rem] border-2 border-dashed border-zinc-100"
            >
              <Icons.Camera className="mx-auto h-12 w-12 text-zinc-200 mb-4" />
              <p className="font-bold text-zinc-400">Tidak ada konten ditemukan untuk kategori ini.</p>
            </motion.div>
          ) : (
            filteredPhotos.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id} 
                className="group relative aspect-square overflow-hidden rounded-[2.5rem] bg-white shadow-lg shadow-zinc-100/50 border border-zinc-50 transition-all hover:shadow-2xl"
              >
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-6 flex flex-col justify-end">
                  <span className="mb-2 w-fit rounded-lg bg-lime-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white">{item.category}</span>
                  <h3 className="font-black text-white text-lg leading-tight line-clamp-2">{item.title}</h3>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all hover:bg-white/40 hover:scale-110 active:scale-90"
                        title="Edit"
                      >
                        <Icons.Pencil className="h-4 w-4" />
                      </button>
                      {item.is_video && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/20">
                          <Icons.Camera className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white shadow-lg transition-transform hover:scale-110 active:scale-90"
                      title="Hapus"
                    >
                      <Icons.Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl rounded-[3rem] bg-white p-8 shadow-2xl md:p-10 border border-zinc-100 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-3xl font-black text-zinc-900 mb-8">
                {editingId ? "Edit Konten" : "Tambah Konten"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-black text-zinc-700">Judul Kegiatan</label>
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50 px-5 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all"
                      placeholder="Misal: Lomba Mewarnai Seru"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-black text-zinc-700">Kategori</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50 px-5 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all"
                    >
                      {categories.filter(c => c !== "Semua").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-black text-zinc-700">Tipe Konten</label>
                  <div className="flex p-1 rounded-2xl border-2 border-zinc-100 bg-zinc-50">
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, is_video: false})}
                      className={`flex-1 h-12 rounded-xl text-sm font-black transition-all ${!formData.is_video ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400"}`}
                    >Foto</button>
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, is_video: true})}
                      className={`flex-1 h-12 rounded-xl text-sm font-black transition-all ${formData.is_video ? "bg-sky-500 text-white shadow-sm" : "text-zinc-400"}`}
                    >Video</button>
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    {!formData.is_video ? (
                      <div className="flex flex-col gap-2 animate-in fade-in duration-300">
                        <label className="text-sm font-black text-zinc-700">Upload Foto (Lokal)</label>
                        <div className="relative">
                          <input
                            required={!formData.image_url && !editingId}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="gallery-image-upload"
                          />
                          <label 
                            htmlFor="gallery-image-upload"
                            className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 px-5 text-sm font-bold text-zinc-500 transition-all hover:border-lime-500 hover:bg-lime-50"
                          >
                            <Icons.Plus className="h-5 w-5" />
                            {selectedFile ? selectedFile.name : editingId ? "Ganti Foto (Opsional)" : "Pilih Foto"}
                          </label>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-2 animate-in fade-in duration-300">
                          <label className="text-sm font-black text-zinc-700">URL Thumbnail (Gambar)</label>
                          <input
                            required
                            type="url"
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50 px-5 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all"
                            placeholder="https://..."
                          />
                        </div>
                        <div className="flex flex-col gap-2 animate-in slide-in-from-top-2 duration-300">
                          <label className="text-sm font-black text-sky-600">URL Video (YouTube)</label>
                          <input
                            required
                            type="url"
                            value={formData.video_url}
                            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                            className="h-14 rounded-2xl border-2 border-sky-100 bg-sky-50/30 px-5 text-base font-bold focus:border-sky-500 focus:bg-white focus:outline-none transition-all"
                            placeholder="https://youtube.com/..."
                          />
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Live Preview */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-black text-zinc-400 uppercase tracking-widest">Preview</label>
                    <div className="aspect-square w-full overflow-hidden rounded-[2rem] bg-zinc-50 border-2 border-dashed border-zinc-100 flex items-center justify-center relative shadow-inner">
                      {previewUrl || formData.image_url ? (
                        <img src={previewUrl || formData.image_url || ""} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <Icons.Camera className="h-12 w-12 text-zinc-200" />
                      )}
                      {formData.is_video && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center">
                            <Icons.Camera className="h-6 w-6 text-sky-500" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 h-16 rounded-2xl border-2 border-zinc-100 font-black text-zinc-400 hover:bg-zinc-50 transition-all"
                  >Batal</button>
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
                    ) : editingId ? "Simpan Perubahan" : "Simpan ke Galeri"}
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
