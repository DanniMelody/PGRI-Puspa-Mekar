"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "../../components/Icons";
import { supabase } from "@/lib/supabase";
import { News } from "@/types/database";

export default function BeritaPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("Semua");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setNewsList(data || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const categories = ["Semua", "Pengumuman", "Acara Sekolah", "Prestasi"];
  const filteredNews = newsList.filter(
    (item) => filter === "Semua" || item.category === filter
  );

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-zinc-900 px-6 py-20 text-center text-white md:px-12 lg:px-24 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-5xl font-black tracking-tight md:text-6xl">Berita & Pengumuman</h1>
            <p className="text-xl leading-relaxed opacity-80 font-medium">
              Ikuti terus perkembangan terbaru, prestasi siswa, dan agenda kegiatan di TK PGRI Puspa Mekar.
            </p>
          </div>
        </section>

        {/* Filter Chips */}
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`rounded-2xl px-6 py-3 text-sm font-black transition-all active:scale-95 ${
                    filter === cat
                      ? "bg-zinc-900 text-white shadow-xl shadow-zinc-200"
                      : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* News Grid */}
            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-video w-full rounded-[2.5rem] bg-zinc-100 mb-6" />
                    <div className="h-6 w-3/4 rounded-lg bg-zinc-100 mb-3" />
                    <div className="h-4 w-full rounded-lg bg-zinc-100" />
                  </div>
                ))}
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="py-20 text-center">
                <Icons.Empty className="mx-auto h-16 w-16 text-zinc-200 mb-4" />
                <p className="text-xl font-bold text-zinc-400">Belum ada berita dalam kategori ini.</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredNews.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link href={`/berita/${item.slug}`} className="group block h-full">
                      <div className="mb-6 aspect-video w-full overflow-hidden rounded-[2.5rem] bg-zinc-100 shadow-xl shadow-zinc-100 transition-all group-hover:-translate-y-2 group-hover:shadow-2xl">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-zinc-300">
                            <Icons.FileText className="h-12 w-12" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-3 px-4">
                        <div className="flex items-center gap-3">
                          <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                            item.category === "Pengumuman" ? "bg-amber-100 text-amber-600" :
                            item.category === "Acara Sekolah" ? "bg-sky-100 text-sky-600" : "bg-lime-100 text-lime-600"
                          }`}>
                            {item.category}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                            {new Date(item.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <h2 className="text-2xl font-black leading-tight text-zinc-900 group-hover:text-lime-600 transition-colors">
                          {item.title}
                        </h2>
                        <p className="line-clamp-2 text-zinc-600 font-medium leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
