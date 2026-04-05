"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Icons } from "../../components/Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else {
        setIsVerifying(false);
      }
    };
    checkUser();
  }, [pathname, router]);

  // Close sidebar when navigating
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (isVerifying && pathname !== "/admin/login") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-lime-200 border-t-lime-600" />
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Overview", href: "/admin", icon: <Icons.LayoutDashboard className="h-5 w-5" /> },
    { name: "Pendaftaran", href: "/admin/registrations", icon: <Icons.List className="h-5 w-5" /> },
    { name: "Agenda Sekolah", href: "/admin/calendar", icon: <Icons.Calendar className="h-5 w-5" /> },
    { name: "Kelola Berita", href: "/admin/berita", icon: <Icons.FileText className="h-5 w-5" /> },
    { name: "Kelola Galeri", href: "/admin/galeri", icon: <Icons.Camera className="h-5 w-5" /> },
    { name: "Pesan Masuk", href: "/admin/inquiries", icon: <Icons.MessageSquare className="h-5 w-5" /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-auto transition-transform hover:scale-105">
            <Icons.Logo className="h-full w-auto object-contain drop-shadow-md" />
          </div>
          <span className="text-lg font-black tracking-tight text-zinc-900 leading-none">Puspa Admin</span>
        </div>
      </div>

      <div className="mb-8">
        <Link 
          href="/" 
          target="_blank"
          className="flex items-center gap-3 rounded-2xl bg-zinc-900 px-4 py-3 text-xs font-black text-white shadow-lg transition-all hover:bg-zinc-800 active:scale-95"
        >
          <Icons.ExternalLink className="h-4 w-4 text-lime-400" />
          Lihat Website Utama
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-black transition-all ${
                isActive
                  ? "bg-lime-50 text-lime-700 shadow-sm shadow-lime-100"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              <span className={`transition-transform group-hover:scale-110 ${isActive ? "text-lime-600" : "text-zinc-400"}`}>
                {item.icon}
              </span>
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-lime-500"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-zinc-50 pt-6">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-black text-rose-600 transition-all hover:bg-rose-50"
        >
          <Icons.LogOut className="h-5 w-5" />
          Keluar Akun
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans">
      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 border-r border-zinc-200 bg-white px-6 py-8 lg:block">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[60] w-72 bg-white px-6 py-8 shadow-2xl lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:pl-72">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-100 bg-white/80 px-8 py-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 text-zinc-600 hover:bg-zinc-100 lg:hidden"
            >
              <Icons.List className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-black text-zinc-900">
              {navItems.find((item) => item.href === pathname)?.name || "Admin"}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden h-10 items-center gap-2 rounded-2xl bg-lime-50 px-4 text-xs font-black text-lime-700 md:flex">
              <div className="h-2 w-2 animate-pulse rounded-full bg-lime-500" />
              Sistem Aktif
            </div>
          </div>
        </header>
        
        <div className="mx-auto max-w-7xl p-6 md:p-10">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
