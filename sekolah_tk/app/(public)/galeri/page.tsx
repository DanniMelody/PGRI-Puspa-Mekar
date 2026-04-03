"use client";

import React, { useState, useEffect } from "react";
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

  const filteredPhotos = filter === "Semua" 
    ? photos 
    : photos.filter(p => p.category === filter);

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
                {filteredPhotos.map((photo) => (
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
                    {photo.image_url ? (
                      <img src={photo.image_url} alt={photo.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
                ))}
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
                  <Icons.List className="h-8 w-8 rotate-45" /> {/** Reuse icons as close X */}
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
                        src={selectedPhoto.video_url?.replace('watch?v=', 'embed/')} 
                        title={selectedPhoto.title}
                        allowFullScreen
                       />
                    </div>
                  ) : (
                    <img src={selectedPhoto.image_url} alt={selectedPhoto.title} className="h-full w-full object-cover" />
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
        </div>
      </main>
    </div>
  );
}
