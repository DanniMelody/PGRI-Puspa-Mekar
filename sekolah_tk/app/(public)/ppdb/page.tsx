"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../../components/Icons";
import { supabase } from "../../../lib/supabase";

export default function PPDBPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ppdbOpen, setPpdbOpen] = useState<boolean | null>(null);
  const [files, setFiles] = useState<{ kk: File | null; akta: File | null }>({
    kk: null,
    akta: null
  });
  const [formData, setFormData] = useState({
    student_name: "",
    nik: "",
    birth_place: "",
    birth_date: "",
    gender: "",
    program: "TK-A (Usia 4-5 Tahun)",
    parent_name: "",
    whatsapp: "",
    address: ""
  });

  React.useEffect(() => {
    const checkStatus = async () => {
      const { data } = await supabase.from("settings").select("*").eq("key", "ppdb_open").single();
      if (data) {
        setPpdbOpen(data.value === "true");
      } else {
        setPpdbOpen(true);
      }
    };
    checkStatus();
  }, []);

  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.kk || !files.akta) {
      alert("Mohon unggah fotokopi KK dan Akta Kelahiran.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Upload Files
      const [kkUrl, aktaUrl] = await Promise.all([
        uploadFile(files.kk, 'kk'),
        uploadFile(files.akta, 'akta')
      ]);

      // 2. Insert Registration Data
      const { error } = await supabase
        .from('registrations')
        .insert([{
          ...formData,
          kk_url: kkUrl,
          birth_certificate_url: aktaUrl
        }]);

      if (error) throw error;
      
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Error submitting form:', error.message || error);
      alert('Maaf, terjadi kesalahan saat mengirim pendaftaran. Pastikan file tidak terlalu besar atau hubungi admin via WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'kk' | 'akta') => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const REGISTRATION_STEPS = [
    {
      step: "01",
      title: "Isi Formulir Online",
      desc: "Lengkapi data calon siswa dan orang tua melalui formulir di bawah ini.",
      icon: <Icons.FileText className="h-10 w-10 text-lime-600" />
    },
    {
      step: "02",
      title: "Verifikasi Berkas",
      desc: "Tim kami akan menghubungi Anda via WhatsApp untuk verifikasi dokumen (Akta & KK).",
      icon: <Icons.Phone className="h-10 w-10 text-amber-600" />
    },
    {
      step: "03",
      title: "Kunjungan & Observasi",
      desc: "Jadwalkan kunjungan ke sekolah untuk melihat fasilitas dan pengenalan singkat.",
      icon: <Icons.School className="h-10 w-10 text-sky-600" />
    },
    {
      step: "04",
      title: "Daftar Ulang",
      desc: "Penyelesaian administrasi dan pengambilan seragam sekolah.",
      icon: <Icons.Backpack className="h-10 w-10 text-emerald-600" />
    }
  ];

  const FEES = [
    { category: "Uang Pangkal", amount: "Rp 2.500.000", period: "1x di Awal", desc: "Termasuk biaya gedung & sarana prasarana." },
    { category: "Biaya Seragam", amount: "Rp 650.000", period: "1x di Awal", desc: "Mendapatkan 4 stel seragam lengkap." },
    { category: "SPP Bulanan", amount: "Rp 350.000", period: "Per Bulan", desc: "Biaya operasional pendidikan rutin." },
    { category: "Biaya Kegiatan", amount: "Rp 1.200.000", period: "Per Tahun", desc: "Outbound, pentas seni, dan alat peraga." },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-900">
      <main className="flex-1 px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          
          {/* Header Section */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 md:text-6xl">
              Pendaftaran Siswa Baru
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-bold text-zinc-500 leading-relaxed">
              Selamat datang di gerbang masa depan si kecil. Mari bergabung menjadi bagian dari keluarga besar <span className="text-lime-600">PGRI Puspa Mekar</span>.
            </p>
            
            {/* Download Brochure CTA */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button 
                onClick={() => {
                  if (confirm("Apakah Anda ingin mengunduh brosur TK PGRI Puspa Mekar?")) {
                    window.location.href = "/brosur-tk-puspa-mekar.pdf";
                  }
                }}
                className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-black text-zinc-900 shadow-xl shadow-zinc-200/50 transition-[transform,background-color] hover:-translate-y-1 hover:bg-zinc-50 active:scale-95 border-2 border-zinc-100"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-100 text-2xl transition-transform group-hover:rotate-12">
                  <Icons.FileText className="h-6 w-6 text-lime-600" />
                </span>
                Download Brosur & Biaya (PDF)
              </button>
              <p className="text-sm font-bold text-zinc-400">Tahun Pelajaran 2026/2027</p>
            </div>
          </div>

          {/* Alur Pendaftaran Section */}
          <section className="mb-24">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Alur Pendaftaran</h2>
              <div className="mt-2 mx-auto h-1.5 w-20 rounded-full bg-lime-500" />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {REGISTRATION_STEPS.map((item, i) => (
                <div key={i} className="group relative rounded-[2.5rem] bg-white p-8 shadow-lg shadow-zinc-100 border border-zinc-100 transition-all hover:shadow-2xl hover:-translate-y-1">
                  <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-500 font-black text-white shadow-lg shadow-lime-200">
                    {item.step}
                  </div>
                  <div className="mb-6 mt-2">{item.icon}</div>
                  <h3 className="mb-3 text-xl font-black leading-tight text-zinc-900">{item.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Investasi Pendidikan (Fees) */}
          <section className="mb-24">
            <div className="rounded-[3.5rem] bg-white p-10 md:p-16 shadow-xl shadow-zinc-200/50 border border-zinc-100">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Investasi Pendidikan</h2>
                <p className="mt-2 font-bold text-zinc-500">Estimasi biaya pendidikan untuk Tahun Pelajaran 2026/2027.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {FEES.map((fee, i) => (
                  <div key={i} className="flex flex-col gap-4 rounded-[2rem] bg-zinc-50 p-8 border border-zinc-100 transition-colors hover:bg-lime-50/50">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-black text-zinc-900">{fee.category}</h4>
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-100">{fee.period}</span>
                    </div>
                    <div className="text-3xl font-black text-lime-600">{fee.amount}</div>
                    <p className="text-sm font-medium text-zinc-500 leading-relaxed">{fee.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl bg-amber-50 p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-amber-100 text-2xl shrink-0">
                  <Icons.Lightbulb className="h-6 w-6 text-amber-600" />
                </div>
                <p className="text-sm font-bold text-amber-800 leading-relaxed">
                  Kami menyediakan program potongan biaya khusus bagi pendaftar gelombang pertama (Early Bird) sebelum bulan Mei 2026. Hubungi admin untuk detail selengkapnya.
                </p>
              </div>
            </div>
          </section>

          {/* Registration Form Card */}
          <section id="daftar" className="relative">
            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-lime-200/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
            
            <div className="relative rounded-[3.5rem] bg-white p-8 shadow-2xl shadow-zinc-200/50 md:p-16 border border-zinc-100 overflow-hidden min-h-[400px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {ppdbOpen === null ? (
                  <motion.div key="loading" className="flex flex-col items-center justify-center py-20">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-100 border-t-lime-600" />
                  </motion.div>
                ) : !ppdbOpen ? (
                  <motion.div
                    key="closed"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-rose-50 text-rose-500 shadow-inner">
                      <Icons.Empty className="h-16 w-16" />
                    </div>
                    <h2 className="mb-4 text-4xl font-black text-zinc-900">Pendaftaran Ditutup</h2>
                    <p className="mb-12 max-w-md text-xl font-bold text-zinc-500 leading-relaxed">
                      Mohon maaf, saat ini pendaftaran siswa baru TK PGRI Puspa Mekar sedang ditutup atau kuota sudah terpenuhi.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Link 
                        href="https://wa.me/6281234567890?text=Halo%20Admin%20TK%20PGRI%20Puspa%20Mekar,%20kapan%20pendaftaran%20siswa%20baru%20akan%20dibuka%20kembali?" 
                        target="_blank"
                        className="inline-flex h-16 items-center justify-center rounded-2xl bg-zinc-900 px-10 text-lg font-black text-white transition-all hover:bg-zinc-800 active:scale-95"
                      >
                        Hubungi Admin (Waiting List)
                      </Link>
                    </div>
                  </motion.div>
                ) : !isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="mb-12 text-center lg:text-left">
                      <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Formulir Pendaftaran</h2>
                      <p className="mt-2 font-bold text-zinc-500">Silakan isi data calon siswa dengan benar sesuai akta kelahiran.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-12">
                      {/* Section 1: Data Calon Siswa */}
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 text-lime-600">
                          <div className="h-px flex-1 bg-lime-100" />
                          <span className="text-xs font-black uppercase tracking-[0.2em]">Data Calon Siswa</span>
                          <div className="h-px flex-1 bg-lime-100" />
                        </div>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">Nama Lengkap Siswa</label>
                            <input 
                              required 
                              name="student_name"
                              value={formData.student_name}
                              onChange={handleInputChange}
                              type="text" 
                              placeholder="Sesuai Akta Kelahiran" 
                              className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 px-5 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all" 
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">NIK (Nomor Induk Kependudukan)</label>
                            <input 
                              required 
                              name="nik"
                              value={formData.nik}
                              onChange={handleInputChange}
                              type="text" 
                              placeholder="16 Digit NIK" 
                              className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 px-5 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all" 
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">Tempat Lahir</label>
                            <input 
                              required 
                              name="birth_place"
                              value={formData.birth_place}
                              onChange={handleInputChange}
                              type="text" 
                              placeholder="Kota/Kabupaten" 
                              className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 px-5 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all" 
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">Tanggal Lahir</label>
                            <input 
                              required 
                              name="birth_date"
                              value={formData.birth_date}
                              onChange={handleInputChange}
                              type="date" 
                              className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 px-5 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all" 
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">Jenis Kelamin</label>
                            <div className="flex gap-4">
                              <label className="flex h-14 flex-1 cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 font-black transition-all hover:bg-white has-[:checked]:border-lime-500 has-[:checked]:bg-lime-50 has-[:checked]:text-lime-700">
                                <input 
                                  required 
                                  type="radio" 
                                  name="gender" 
                                  value="Laki-laki"
                                  checked={formData.gender === "Laki-laki"}
                                  onChange={handleInputChange}
                                  className="hidden" 
                                /> Laki-laki
                              </label>
                              <label className="flex h-14 flex-1 cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 font-black transition-all hover:bg-white has-[:checked]:border-lime-500 has-[:checked]:bg-lime-50 has-[:checked]:text-lime-700">
                                <input 
                                  required 
                                  type="radio" 
                                  name="gender" 
                                  value="Perempuan"
                                  checked={formData.gender === "Perempuan"}
                                  onChange={handleInputChange}
                                  className="hidden" 
                                /> Perempuan
                              </label>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">Pilihan Program</label>
                            <select 
                              name="program"
                              value={formData.program}
                              onChange={handleInputChange}
                              className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 px-5 text-base font-bold focus:border-lime-500 focus:bg-white focus:outline-none transition-all appearance-none"
                            >
                              <option>TK-A (Usia 4-5 Tahun)</option>
                              <option>TK-B (Usia 5-6 Tahun)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Unggah Dokumen */}
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 text-sky-600">
                          <div className="h-px flex-1 bg-sky-100" />
                          <span className="text-xs font-black uppercase tracking-[0.2em]">Unggah Dokumen (Wajib)</span>
                          <div className="h-px flex-1 bg-sky-100" />
                        </div>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">Fotokopi Kartu Keluarga (KK)</label>
                            <div className="relative">
                              <input 
                                required 
                                type="file" 
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileChange(e, 'kk')}
                                className="hidden" 
                                id="file-kk"
                              />
                              <label 
                                htmlFor="file-kk"
                                className={`flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed px-5 font-bold transition-all ${
                                  files.kk ? "border-lime-500 bg-lime-50 text-lime-700" : "border-zinc-200 bg-zinc-50/50 text-zinc-400 hover:border-sky-400 hover:bg-sky-50"
                                }`}
                              >
                                <span className="truncate">{files.kk ? files.kk.name : "Pilih File Gambar/PDF"}</span>
                                <Icons.FileText className="h-5 w-5 shrink-0" />
                              </label>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">Fotokopi Akta Kelahiran</label>
                            <div className="relative">
                              <input 
                                required 
                                type="file" 
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileChange(e, 'akta')}
                                className="hidden" 
                                id="file-akta"
                              />
                              <label 
                                htmlFor="file-akta"
                                className={`flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed px-5 font-bold transition-all ${
                                  files.akta ? "border-lime-500 bg-lime-50 text-lime-700" : "border-zinc-200 bg-zinc-50/50 text-zinc-400 hover:border-sky-400 hover:bg-sky-50"
                                }`}
                              >
                                <span className="truncate">{files.akta ? files.akta.name : "Pilih File Gambar/PDF"}</span>
                                <Icons.FileText className="h-5 w-5 shrink-0" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Data Orang Tua */}
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 text-amber-600">
                          <div className="h-px flex-1 bg-amber-100" />
                          <span className="text-xs font-black uppercase tracking-[0.2em]">Data Orang Tua / Wali</span>
                          <div className="h-px flex-1 bg-amber-100" />
                        </div>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">Nama Ayah/Ibu/Wali</label>
                            <input 
                              required 
                              name="parent_name"
                              value={formData.parent_name}
                              onChange={handleInputChange}
                              type="text" 
                              placeholder="Nama Lengkap Penanggung Jawab" 
                              className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 px-5 text-base font-bold focus:border-amber-500 focus:bg-white focus:outline-none transition-all" 
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-black text-zinc-700">Nomor WhatsApp Aktif</label>
                            <input 
                              required 
                              name="whatsapp"
                              value={formData.whatsapp}
                              onChange={handleInputChange}
                              type="tel" 
                              placeholder="Contoh: 081234567890" 
                              className="h-14 rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 px-5 text-base font-bold focus:border-amber-500 focus:bg-white focus:outline-none transition-all" 
                            />
                          </div>
                          <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-black text-zinc-700">Alamat Rumah Lengkap</label>
                            <textarea 
                              required 
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder="Nama Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan" 
                              className="min-h-[120px] rounded-2xl border-2 border-zinc-100 bg-zinc-50/50 p-5 text-base font-bold focus:border-amber-500 focus:bg-white focus:outline-none transition-all"
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-6">
                        <button 
                          type="submit" 
                          disabled={isLoading}
                          className="flex h-20 w-full items-center justify-center rounded-[2rem] bg-lime-600 text-2xl font-black text-white shadow-2xl shadow-lime-200 transition-all hover:bg-lime-700 hover:shadow-lime-300 active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-lime-500 focus-visible:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-3">
                              <div className="h-6 w-6 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                              Mengirim...
                            </div>
                          ) : "Kirim Pendaftaran Online"}
                        </button>
                        <p className="mt-6 text-center text-sm font-bold text-zinc-400">
                          🔒 Data Anda aman bersama kami. Tim admin akan menghubungi Anda dalam 1x24 jam.
                        </p>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-lime-100 text-6xl shadow-inner">
                      <Icons.Check className="h-16 w-16 text-lime-600" />
                    </div>
                    <h2 className="mb-4 text-4xl font-black text-zinc-900">Pendaftaran Berhasil!</h2>
                    <p className="mb-12 max-w-md text-xl font-bold text-zinc-500 leading-relaxed">
                      Selamat! Data Ananda telah kami terima. Tim administrasi PGRI Puspa Mekar akan segera menghubungi Ayah/Bunda melalui WhatsApp untuk langkah selanjutnya.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Link href="/" className="inline-flex h-16 items-center justify-center rounded-2xl bg-lime-600 px-10 text-lg font-black text-white transition-all hover:bg-lime-700 active:scale-95">
                        Kembali ke Beranda
                      </Link>
                      <button 
                        onClick={() => {
                          setFormData({
                            student_name: "",
                            nik: "",
                            birth_place: "",
                            birth_date: "",
                            gender: "",
                            program: "TK-A (Usia 4-5 Tahun)",
                            parent_name: "",
                            whatsapp: "",
                            address: ""
                          });
                          setIsSubmitted(false);
                        }}
                        className="inline-flex h-16 items-center justify-center rounded-2xl border-2 border-zinc-100 bg-white px-10 text-lg font-black text-zinc-600 transition-all hover:bg-zinc-50"
                      >
                        Daftar Siswa Lain
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* FAQ / Info Tambahan */}
          <div className="mt-20 rounded-[2.5rem] bg-zinc-900 p-10 text-white text-center">
            <h3 className="text-2xl font-black mb-4">Butuh Bantuan Pendaftaran?</h3>
            <p className="text-white/60 font-medium mb-8">Hubungi tim admin kami jika Anda mengalami kesulitan saat mengisi formulir.</p>
            <Link href="/kontak" className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 font-black text-zinc-900 transition-transform hover:scale-105">
              Hubungi Admin via WA
            </Link>
          </div>
          
        </div>
      </main>
    </div>
  );
}
