"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

import { Icons } from "./Icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [ppdbOpen, setPpdbOpen] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setMounted(true);
    const checkStatus = async () => {
      try {
        const { data } = await supabase.from("settings").select("*").eq("key", "ppdb_open").maybeSingle();
        if (data) {
          setPpdbOpen(data.value === "true");
        }
      } catch (error) {
        console.error("Navbar status check error:", error);
      }
    };
    checkStatus();
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Program", href: "/program" },
    { name: "Galeri", href: "/galeri" },
    { name: "Berita", href: "/berita" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100/50 bg-white/80 px-6 py-4 backdrop-blur-xl md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3 group rounded-xl focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:outline-none">
            <div className="h-12 w-auto transition-transform duration-300 group-hover:scale-105 md:h-16">
              <Icons.Logo className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-black tracking-tight text-zinc-900 md:text-xl">TK PGRI</span>
              <span className="text-xs font-bold text-lime-600 md:text-base md:font-black md:text-zinc-900">Puspa Mekar</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 text-sm font-bold text-zinc-600 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative rounded-full px-5 py-2.5 transition-[color,background-color] hover:text-lime-600 focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:outline-none ${
                  isActive ? "bg-lime-50 text-lime-700" : "hover:bg-zinc-50"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full border-2 border-lime-200/50"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={(!mounted || ppdbOpen) ? "/ppdb" : "/kontak"}
            className={`hidden rounded-2xl px-6 py-3 text-sm font-black transition-all active:scale-95 shadow-sm focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:outline-none md:block ${
              (mounted && !ppdbOpen)
                ? "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200"
                : pathname === "/ppdb"
                  ? "bg-zinc-900 text-white shadow-xl shadow-zinc-200"
                  : "bg-lime-600 text-white shadow-lg shadow-lime-100 hover:bg-lime-700 hover:shadow-lime-200 hover:-translate-y-0.5"
            }`}
          >
            {(mounted && !ppdbOpen) ? "PPDB Ditutup" : "PPDB Online"}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 transition-[background-color,color] hover:bg-zinc-200 md:hidden"
            aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full overflow-hidden border-b border-zinc-100 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex h-14 items-center rounded-2xl px-6 text-lg font-black transition-[background-color,color] focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:outline-none ${
                      isActive 
                        ? "bg-lime-50 text-lime-700 shadow-sm" 
                        : "text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href={(!mounted || ppdbOpen) ? "/ppdb" : "/kontak"}
                onClick={() => setIsOpen(false)}
                className={`mt-6 flex h-16 items-center justify-center rounded-[2rem] text-xl font-black shadow-xl transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:outline-none ${
                  (mounted && !ppdbOpen)
                    ? "bg-zinc-100 text-zinc-400 border border-zinc-200"
                    : pathname === "/ppdb"
                      ? "bg-zinc-900 text-white"
                      : "bg-lime-600 text-white shadow-lime-100"
                }`}
              >
                {(mounted && !ppdbOpen) ? "PPDB Ditutup" : "PPDB Online"}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
