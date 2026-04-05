"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Icons } from "@/app/components/Icons";
import { motion } from "framer-motion";

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [news, setNews] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setNews(data);
      } catch (error: any) {
        console.error("Error fetching news detail:", error.message || error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchNewsDetail();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-lime-100 border-t-lime-600" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <Icons.FileText className="mb-6 h-20 w-20 text-zinc-100" />
        <h1 className="text-3xl font-black text-zinc-900">Berita Tidak Ditemukan</h1>
        <p className="mt-4 max-w-md text-lg font-bold text-zinc-500">
          Maaf, berita yang Anda cari tidak tersedia atau sudah dihapus.
        </p>
        <Link href="/berita" className="mt-10 rounded-2xl bg-zinc-900 px-8 py-4 font-black text-white shadow-xl transition-all hover:bg-zinc-800">
          Lihat Berita Lainnya
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <main className="flex-1 px-6 py-12 md:px-12 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
        >
          {/* Back Button */}
          <Link href="/berita" className="mb-12 inline-flex items-center gap-2 font-black text-zinc-400 hover:text-zinc-900 transition-colors">
            ← Kembali ke Daftar Berita
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="rounded-full bg-lime-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-lime-700 shadow-sm">
                {news.category}
              </span>
              <span className="text-sm font-bold text-zinc-400">
                {new Date(news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 md:text-6xl leading-tight">
              {news.title}
            </h1>
          </header>

          {/* Cover Image */}
          {news.image_url && (
            <div className="mb-12 overflow-hidden rounded-[3rem] shadow-2xl shadow-zinc-200 border-8 border-zinc-50">
              <img src={news.image_url} alt={news.title} className="w-full aspect-video object-cover" />
            </div>
          )}

          {/* Article Content */}
          <article className="prose prose-xl prose-zinc max-w-none">
            <div className="whitespace-pre-wrap text-xl font-bold leading-relaxed text-zinc-600">
              {news.content}
            </div>
            <div className="mt-12 pt-8 border-t border-zinc-50 text-lg font-medium text-zinc-400 italic">
              Demikian informasi ini kami sampaikan. Terima kasih atas perhatian Bapak/Ibu sekalian.
            </div>
          </article>

          {/* Share / Footer */}
          <footer className="mt-20 border-t border-zinc-100 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="font-black text-zinc-400 uppercase tracking-widest text-xs">Informasi Lebih Lanjut:</span>
            </div>
            <Link 
              href={`https://wa.me/6285199297045?text=Halo%20Admin%20TK%20Puspa%20Mekar,%20saya%20ingin%20bertanya%20mengenai%20berita:%20${news.title}`} 
              target="_blank"
              className="rounded-2xl bg-lime-600 px-10 py-4 font-black text-white shadow-xl shadow-lime-100 transition-all hover:bg-lime-700 active:scale-95"
            >
              Tanya via WhatsApp
            </Link>
          </footer>
        </motion.div>
      </main>
    </div>
  );
}
