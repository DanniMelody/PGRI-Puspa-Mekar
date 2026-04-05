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
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 transition-all hover:bg-zinc-200 active:scale-90 md:hidden"
            aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
          >
            <div className="relative h-6 w-6">
              <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? "top-3 rotate-45" : "top-1"}`} />
              <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 top-3 ${isOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? "top-3 -rotate-45" : "top-5"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[89px] z-40 bg-zinc-900/20 backdrop-blur-sm md:hidden"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="absolute left-6 right-6 top-[calc(100%+12px)] z-50 overflow-hidden rounded-[2.5rem] border border-zinc-100 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-2xl md:hidden"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex h-14 items-center justify-between rounded-2xl px-6 text-base font-black transition-all active:scale-[0.98] ${
                        isActive 
                          ? "bg-lime-50 text-lime-700 shadow-sm shadow-lime-100/50" 
                          : "text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {link.name}
                      {isActive && <div className="h-2 w-2 rounded-full bg-lime-500" />}
                    </Link>
                  );
                })}
                <div className="mt-4 border-t border-zinc-100 pt-4">
                  <Link
                    href={(!mounted || ppdbOpen) ? "/ppdb" : "/kontak"}
                    onClick={() => setIsOpen(false)}
                    className={`flex h-16 items-center justify-center gap-3 rounded-[1.75rem] text-lg font-black shadow-lg transition-all active:scale-95 ${
                      (mounted && !ppdbOpen)
                        ? "bg-zinc-100 text-zinc-400 border border-zinc-200"
                        : pathname === "/ppdb"
                          ? "bg-zinc-900 text-white"
                          : "bg-lime-600 text-white shadow-lime-100/50 hover:bg-lime-700"
                    }`}
                  >
                    <Icons.Logo className="h-6 w-6" />
                    {(mounted && !ppdbOpen) ? "PPDB Ditutup" : "Daftar PPDB"}
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
