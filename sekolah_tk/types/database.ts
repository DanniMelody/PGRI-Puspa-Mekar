export interface News {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  category: "Pengumuman" | "Acara Sekolah" | "Prestasi";
  content: string;
  image_url: string | null;
}

export interface Gallery {
  id: string;
  created_at: string;
  title: string;
  category: "Kegiatan Belajar" | "Bermain" | "Pentas Seni" | "Fasilitas" | "Video";
  image_url: string;
  is_video: boolean;
  video_url: string | null;
}

export interface Registration {
  id: string;
  created_at: string;
  student_name: string;
  nik: string;
  birth_place: string;
  birth_date: string;
  gender: "Laki-laki" | "Perempuan";
  program: string;
  parent_name: string;
  whatsapp: string;
  address: string;
  kk_url: string;
  birth_certificate_url: string;
}

export interface Inquiry {
  id: string;
  created_at: string;
  full_name: string;
  whatsapp: string;
  subject: string;
  message: string;
}

export interface Setting {
  key: string;
  value: string;
  description: string | null;
  updated_at: string;
}
