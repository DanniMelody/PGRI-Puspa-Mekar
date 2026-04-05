"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { Icons } from "../../components/Icons";

export default function KontakPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    whatsapp: "",
    subject: "Informasi PPDB",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([formData]);

      if (error) throw error;
      setIsSubmitted(true);
      setFormData({ full_name: "", whatsapp: "", subject: "Informasi PPDB", message: "" });
    } catch (error: any) {
      console.error('Error submitting inquiry:', error.message || error);
      alert('Maaf, gagal mengirim pesan. Silakan hubungi kami langsung via WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900 overflow-x-hidden">
      <main className="flex-1">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-lime-50/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-sky-50/50 blur-3xl" />

        <section className="px-6 py-20 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
              
              {/* Left Column: Info & Map */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12"
              >
                <div>
                  <div className="mb-6 inline-flex rounded-full bg-lime-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-lime-700 shadow-sm">
                    Hubungi Kami
                  </div>
                  <h1 className="mb-6 text-4xl font-black tracking-tight text-zinc-900 md:text-6xl">
                    Mari Terhubung <br/>dengan <span className="text-lime-600">Kami</span>
                  </h1>
                  <p className="max-w-lg text-xl font-bold text-zinc-500 leading-relaxed">
                    Punya pertanyaan seputar program belajar atau pendaftaran di PGRI Puspa Mekar? Tim kami siap membantu Ayah/Bunda dengan sepenuh hati.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-6 group">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lime-50 text-lime-600 shadow-sm ring-1 ring-lime-100 transition-all group-hover:scale-110 group-hover:bg-lime-600 group-hover:text-white">
                      <Icons.MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-zinc-900">Alamat Fisik</h4>
                      <p className="text-zinc-600 font-medium leading-relaxed">Desa Cimuja, Kec. Cimalaka, Kabupaten Sumedang, Jawa Barat</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6 group">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-sm ring-1 ring-amber-100 transition-all group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white">
                      <Icons.Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-zinc-900">Telepon / WhatsApp</h4>
                      <p className="text-zinc-600 font-medium">0851-9929-7045</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 shadow-sm ring-1 ring-sky-100 transition-all group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white">
                      <Icons.Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-zinc-900">Email Resmi</h4>
                      <p className="text-zinc-600 font-medium">halo@puspamekar.sch.id</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-600 shadow-sm ring-1 ring-zinc-100 transition-all group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white">
                      <Icons.Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-zinc-900">Jam Operasional</h4>
                      <p className="text-zinc-600 font-medium leading-relaxed">Senin - Jumat: 07.00 - 12.00 WIB</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[3rem] border-8 border-zinc-50 shadow-2xl shadow-zinc-200/50 aspect-video relative bg-zinc-100 ring-1 ring-zinc-200/50 group">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3962.0315482313366!2d107.942657!3d-6.826838!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDknMzYuNiJTIDEwN8KwNTYnMzMuNiJF!5e0!3m2!1sen!2sid!4v1711885000000!5m2!1sen!2sid"
                    className="absolute inset-0 h-full w-full border-0 transition-opacity group-hover:opacity-90"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </motion.div>

              {/* Right Column: Inquiry Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="rounded-[3.5rem] bg-white p-8 md:p-16 shadow-2xl shadow-zinc-200/40 border border-zinc-100 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <h2 className="mb-4 text-3xl font-black text-zinc-900 tracking-tight">Kirim Pesan</h2>
                        <p className="mb-10 text-zinc-500 font-bold leading-relaxed">
                          Silakan isi formulir di bawah ini untuk menanyakan informasi lebih lanjut.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-8">
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-black text-zinc-700">Nama Lengkap</label>
                              <input 
                                required 
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleInputChange}
                                type="text" 
                                placeholder="Nama Ayah/Bunda" 
                                className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 px-5 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all" 
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-black text-zinc-700">Nomor WhatsApp</label>
                              <input 
                                required 
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                                type="tel" 
                                placeholder="Contoh: 0812..." 
                                className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 px-5 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all" 
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">Tujuan Pesan</label>
                            <select 
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 px-5 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all appearance-none"
                            >
                              <option>Informasi PPDB</option>
                              <option>Jadwal Kunjungan (Tour)</option>
                              <option>Saran & Kritik</option>
                              <option>Lainnya</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">Isi Pesan</label>
                            <textarea 
                              required 
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Tuliskan pesan Anda secara lengkap..." 
                              className="min-h-[180px] rounded-3xl border-2 border-zinc-100 bg-zinc-50/50 p-6 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all resize-none"
                            ></textarea>
                          </div>
                          <button 
                            type="submit" 
                            disabled={isLoading}
                            className="flex h-20 w-full items-center justify-center rounded-[2rem] bg-zinc-900 text-xl font-black text-white shadow-xl transition-all hover:bg-zinc-800 active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-lime-500 focus-visible:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-3">
                                <div className="h-6 w-6 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                                <span>Mengirim...</span>
                              </div>
                            ) : "Kirim Sekarang"}
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center min-h-[500px]"
                      >
                        <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-lime-100 text-lime-600 shadow-inner">
                          <Icons.Check className="h-16 w-16" />
                        </div>
                        <h2 className="mb-4 text-4xl font-black text-zinc-900">Pesan Terkirim!</h2>
                        <p className="mb-12 max-w-sm text-xl font-bold text-zinc-500 leading-relaxed">
                          Terima kasih. Tim admin PGRI Puspa Mekar akan segera menghubungi Ayah/Bunda melalui WhatsApp untuk merespon pesan ini.
                        </p>
                        <div className="flex flex-col gap-4 w-full">
                          <button 
                            onClick={() => setIsSubmitted(false)}
                            className="inline-flex h-16 items-center justify-center rounded-2xl bg-zinc-900 px-10 text-lg font-black text-white transition-all hover:bg-zinc-800 active:scale-95"
                          >
                            Kirim Pesan Lain
                          </button>
                          <Link href="/" className="inline-flex h-16 items-center justify-center rounded-2xl border-2 border-zinc-100 bg-white px-10 text-lg font-black text-zinc-600 transition-all hover:bg-zinc-50">
                            Kembali ke Beranda
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
