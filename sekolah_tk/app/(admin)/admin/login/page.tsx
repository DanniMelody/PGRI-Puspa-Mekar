"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import { Icons } from "../../../components/Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push("/admin");
    } catch (error: any) {
      setErrorMsg(error.message || "Email atau password salah.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 font-sans overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-lime-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="mb-10 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto mb-8 flex justify-center"
          >
            <Icons.Logo className="h-28 w-auto object-contain drop-shadow-xl" />
          </motion.div>

          <h1 className="text-3xl font-black tracking-tight text-zinc-900">Puspa Admin</h1>
          <p className="mt-2 font-bold text-zinc-500">Pusat Kendali TK PGRI Puspa Mekar</p>
        </div>

        <div className="rounded-[3rem] bg-white p-8 shadow-2xl shadow-zinc-200/40 md:p-12 border border-zinc-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence mode="wait">
              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-2xl bg-rose-50 p-4 border border-rose-100 flex items-center gap-3 text-rose-600 text-sm font-bold"
                >
                  <Icons.Empty className="h-5 w-5 shrink-0" />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Email Admin</label>
              <div className="relative">
                <Icons.Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-300" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@puspamekar.sch.id"
                  className="h-16 w-full rounded-2xl border-2 border-zinc-50 bg-zinc-50/50 pl-14 pr-5 text-base font-bold text-zinc-900 placeholder:text-zinc-300 focus:border-lime-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Password</label>
              <div className="relative">
                <Icons.Shield className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-300" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-16 w-full rounded-2xl border-2 border-zinc-50 bg-zinc-50/50 pl-14 pr-14 text-base font-bold text-zinc-900 placeholder:text-zinc-300 focus:border-lime-500 focus:bg-white focus:outline-none transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-500 transition-colors"
                >
                  {showPassword ? <Icons.EyeOff className="h-5 w-5" /> : <Icons.Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex h-16 w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-900 text-lg font-black text-white shadow-xl transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-70"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    <span>Memproses...</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span>Masuk Sekarang</span>
                    <Icons.Plus className="h-5 w-5 rotate-45 transition-transform group-hover:rotate-90" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>
        </div>
        
        <p className="mt-10 text-center text-sm font-bold text-zinc-400">
          Butuh bantuan akses? <span className="text-lime-600">Hubungi IT Puspa</span>
        </p>
      </motion.div>
    </div>
  );
}
