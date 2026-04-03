# Spesifikasi Proyek: Website PGRI Puspa Mekar (Sekolah TK)

## 1. Pendahuluan
Platform digital resmi **TK PGRI Puspa Mekar** yang dirancang untuk mempermudah pendaftaran siswa baru (PPDB), penyampaian informasi kegiatan sekolah, dan pengelolaan konten oleh guru/staf secara mandiri.

## 2. Arsitektur & Teknologi
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript.
- **Styling**: Tailwind CSS 4 (Desain modern, bulat/rounded, mobile-first).
- **Animasi**: Framer Motion (Interaksi halus & transisi).
- **Backend/Database**: Supabase (PostgreSQL, Storage, Auth).
- **Karakter Desain**: Pastel, Ceria (Lime, Sky, Rose), Font Quicksand/Geist.

## 3. Fitur Utama (Implementasi Saat Ini)

### A. Landing Page & Public Interface
- **Dynamic Navbar**: Tombol PPDB yang otomatis berubah status (Buka/Tutup) berdasarkan database.
- **Hero Section**: Banner informasi pendaftaran dengan CTA dinamis.
- **Program & Kurikulum**: Penjelasan detail program TK-A dan TK-B.
- **Berita & Agenda**: List berita terbaru dan kalender akademik.
- **Galeri**: Dokumentasi foto kegiatan (Belajar, Bermain, Pentas Seni).
- **WhatsApp Floating**: Tombol chat langsung yang tersedia di setiap halaman.

### B. Portal Admin (Dashboard)
- **Overview**: Statistik cepat (Jumlah pendaftar, pesan, berita) dan kontrol cepat status PPDB.
- **Manajemen Berita**: CRUD berita lengkap dengan upload gambar ke Supabase Storage.
- **Manajemen Galeri**: CRUD foto kegiatan dengan sistem kategori.
- **Manajemen Pendaftar (PPDB)**: List pendaftar lengkap dengan filter program dan akses dokumen (KK/Akta).
- **Manajemen Pesan**: List inquiries dari wali murid melalui form kontak.

## 4. Struktur Database (Tabel Supabase)
- **settings**: Menyimpan konfigurasi global (`ppdb_open`, `whatsapp_number`, dll).
- **news**: Judul, slug, kategori, konten, dan image_url.
- **gallery**: Judul, kategori, image_url, is_video.
- **registrations**: Data siswa, NIK, orang tua, program, dan URL dokumen (KK/Akta).
- **inquiries**: Nama, WhatsApp, subjek, dan pesan.

## 5. Pengembangan Selanjutnya (Future Updates)
- **Settings Page**: Halaman khusus admin untuk mengubah nomor WA, alamat, dan sosial media tanpa menyentuh kode.
- **Document Management**: Perbaikan alur upload KK/Akta pada form PPDB publik agar lebih user-friendly.
- **Export Data**: Fitur download daftar pendaftar PPDB ke format Excel/PDF untuk keperluan admin sekolah.
- **SEO Optimization**: Penambahan meta tags dinamis untuk setiap berita.

## 6. Status Deployment
- **Database**: Supabase PostgreSQL Active.
- **Storage**: Folder `images/news` dan `images/gallery` aktif.
- **Auth**: Email/Password login untuk Portal Guru aktif.
