"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../components/Icons";
import { supabase } from "../../../lib/supabase";

const CATEGORIES = ["Semua", "Kegiatan Belajar", "Bermain", "Pentas Seni", "Fasilitas", "Video"];

export default function GalleryPage() {
  const [filter, setFilter] = useState("Semua");
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
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

  const filteredPhotos = useMemo(() => 
    filter === "Semua" ? photos : photos.filter(p => p.category === filter),
  [photos, filter]);

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  const getYoutubeThumbnail = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
      : null;
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <main className="flex-1 px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 md:text-6xl">
              Galeri <span className="text-lime-600">Ceria</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-bold text-zinc-500">
              Momen-momen indah dan keseruan aktivitas si kecil dalam bentuk foto dan video.
            </p>
          </div>

          {/* Categories Filter */}
          <div className="mb-16 flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-2xl px-8 py-3 text-sm font-black transition-all active:scale-95 focus-visible:ring-4 focus-visible:ring-lime-200 focus-visible:outline-none ${
                  filter === cat 
                    ? "bg-zinc-900 text-white shadow-xl" 
                    : "bg-zinc-100 text-zinc-500 hover:bg-lime-100 hover:text-lime-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse rounded-[2.5rem] bg-zinc-100 h-full w-full" />
              ))}
            </div>
          ) : (
            <motion.div 
              layout
              className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredPhotos.map((photo) => {
                  const thumbnailUrl = photo.image_url || (photo.is_video ? getYoutubeThumbnail(photo.video_url) : null);
                  
                  return (
                    <motion.div
                      key={photo.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedPhoto(photo)}
                      className={`group relative cursor-pointer overflow-hidden rounded-[2.5rem] border-4 border-white shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl focus-visible:ring-4 focus-visible:ring-lime-500 col-span-1 row-span-1`}
                    >
                      {thumbnailUrl ? (
                        <Image 
                          src={thumbnailUrl} 
                          alt={photo.title} 
                          fill 
                          unoptimized={photo.is_video}
                          className="object-cover transition-transform duration-500 group-hover:scale-110" 
                          sizes="(max-width: 768px) 50vw, 250px" 
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-50 p-6 text-center">
                          <Icons.Camera className="h-12 w-12 text-zinc-200 mb-3" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                            {photo.category}
                          </span>
                          <h3 className="mt-1 text-sm font-black text-zinc-600">
                            {photo.title}
                          </h3>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
                        <div className="rounded-full bg-white px-6 py-2 text-xs font-black uppercase tracking-widest text-zinc-900 shadow-lg">
                          {photo.is_video ? "Putar Video" : "Perbesar"}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Lightbox / Modal */}
          <AnimatePresence>
            {selectedPhoto && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute inset-0 bg-zinc-950/95 backdrop-blur-xl"
                />
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="fixed top-6 right-6 z-[110] flex h-14 w-14 items-center justify-center rounded-full bg-white text-zinc-900 shadow-2xl transition-transform active:scale-90 md:top-12 md:right-12"
                >
                  <Icons.List className="h-8 w-8 rotate-45" />
                </button>
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className={`relative z-10 w-full max-w-5xl overflow-hidden rounded-[3rem] border-4 border-white shadow-2xl bg-white aspect-video flex items-center justify-center group`}
                >
                  {selectedPhoto.is_video ? (
                    <div className="w-full h-full bg-black flex items-center justify-center">
                       <iframe 
                        className="w-full h-full"
                        src={getEmbedUrl(selectedPhoto.video_url)} 
                        title={selectedPhoto.title}
                        allowFullScreen
                       />
                    </div>
                  ) : (
                    <Image src={selectedPhoto.image_url} alt={selectedPhoto.title} fill className="object-contain" sizes="100vw" priority />
                  )}

                  {/* Title & Category Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 md:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="mb-3 inline-block rounded-full bg-lime-500 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                        {selectedPhoto.category}
                      </span>
                      <h2 className="text-2xl font-black text-white md:text-4xl leading-tight">
                        {selectedPhoto.title}
                      </h2>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {!isLoading && filteredPhotos.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl font-bold text-zinc-400">Belum ada konten di kategori ini.</p>
            </div>
          )}

          {/* Social Media CTA */}
          <div className="mt-24 rounded-[3rem] bg-zinc-900 p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.1),transparent)]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-8 flex -space-x-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md ring-4 ring-zinc-900">
                  <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md ring-4 ring-zinc-900">
                  <svg className="h-8 w-8 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01"/>
                  </svg>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md ring-4 ring-zinc-900">
                  <svg className="h-8 w-8 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </div>
              <h2 className="mb-4 text-3xl font-black md:text-4xl tracking-tight">Ikuti Media Sosial Kami</h2>
              <p className="mx-auto mb-10 max-w-xl text-lg font-bold text-zinc-400">
                Dapatkan update harian tentang kegiatan belajar dan bermain si kecil melalui platform media sosial resmi kami.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
                <a 
                  href="https://youtube.com/@tkpgripuspamekar8478?si=nlDIOCFHVdapz-id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-14 w-full sm:w-auto items-center justify-center rounded-2xl bg-red-600 px-8 text-sm font-black text-white transition-all hover:bg-red-700 active:scale-95 shadow-xl shadow-red-900/20 gap-3"
                >
                  YouTube
                </a>
                <a 
                  href="https://www.instagram.com/tkpgripuspamekar2026?igsh=Z2FkaW9neHFlYzA0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-14 w-full sm:w-auto items-center justify-center rounded-2xl bg-rose-600 px-8 text-sm font-black text-white transition-all hover:bg-rose-700 active:scale-95 shadow-xl shadow-rose-900/20 gap-3"
                >
                  Instagram
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-14 w-full sm:w-auto items-center justify-center rounded-2xl bg-sky-600 px-8 text-sm font-black text-white transition-all hover:bg-sky-700 active:scale-95 shadow-xl shadow-sky-900/20 gap-3"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
