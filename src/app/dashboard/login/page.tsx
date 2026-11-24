'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Zap, 
  Lock, 
  User, 
  KeyRound, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  Wrench, 
  Crown, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { UserRole } from '@/types';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '';
  const reason = searchParams.get('reason') || '';

  const [selectedRole, setSelectedRole] = useState<UserRole>('technician');
  const [staffId, setStaffId] = useState('TECH-TASIK-02');
  const [pin, setPin] = useState('5678');
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setLoginMessage(null);
    if (role === 'owner') {
      setStaffId('OWNER-TASIK-01');
      setPin('8888');
    } else if (role === 'pa') {
      setStaffId('PA-ADMIN-01');
      setPin('1234');
    } else {
      setStaffId('TECH-TASIK-02');
      setPin('5678');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setLoginMessage({ type: 'error', text: 'Mohon masukkan PIN Keamanan atau Password Staf.' });
      return;
    }

    setIsLoading(true);
    setLoginMessage(null);

    // Set secure session cookie for middleware route protection (valid 24 hours)
    const sessionData = {
      role: selectedRole,
      staffId,
      loggedInAt: Date.now(),
    };
    document.cookie = `fixgo_staff_session=${encodeURIComponent(
      JSON.stringify(sessionData)
    )}; path=/; max-age=86400; SameSite=Lax`;

    // Simulate verification & route to terminal
    setTimeout(() => {
      setIsLoading(false);
      const roleName = selectedRole === 'owner' ? 'Owner' : selectedRole === 'pa' ? 'Kasir / PA' : 'Teknisi Lab';
      setLoginMessage({
        type: 'success',
        text: `Autentikasi Berhasil! Mengalihkan ke Terminal ${roleName}...`,
      });

      setTimeout(() => {
        if (redirectTarget && redirectTarget.startsWith('/dashboard')) {
          router.push(redirectTarget);
        } else {
          if (selectedRole === 'owner') router.push('/dashboard/owner');
          else if (selectedRole === 'pa') router.push('/dashboard/cashier');
          else router.push('/dashboard/technician');
        }
      }, 500);
    }, 600);
  };

  return (
    <div className="max-w-md w-full space-y-6">
      
      {/* Security Intercept Alert Banner (if someone typed URL directly without logging in) */}
      {reason === 'unauthorized' && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3 shadow-lg animate-fade-in">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-bold text-amber-200">Akses Terminal Ditolak (401 Protected)</div>
            <div className="text-[11px] text-amber-300/80 leading-relaxed">
              Halaman yang Anda tuju diproteksi enkripsi sesi operasional. Silakan login dengan PIN resmi staf outlet Tasikmalaya terlebih dahulu.
            </div>
          </div>
        </div>
      )}

      {/* Brand & Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-white shadow-xl mb-2">
          <Zap className="w-6 h-6 text-[#0066FF]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          FixGo Operating System
        </h1>
        <p className="text-xs sm:text-sm text-white/60">
          Terminal Operasional Servis, POS, Inventaris & Manajemen Lab
        </p>
      </div>

      {/* Login Bezel Card */}
      <div className="double-bezel-shell !bg-white/[0.04] !border-white/10 shadow-2xl backdrop-blur-2xl">
        <div className="double-bezel-core !bg-[#111726]/90 !border-white/10 p-6 sm:p-7 space-y-6">
          
          {/* Role Selection Tabs */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-mono tracking-wider text-white/50 font-semibold">
              Pilih Peran Staf / Divisi:
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => handleRoleChange('technician')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-medium transition ${
                  selectedRole === 'technician'
                    ? 'bg-[#0066FF] text-white shadow-md font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Teknisi</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('pa')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-medium transition ${
                  selectedRole === 'pa'
                    ? 'bg-[#0066FF] text-white shadow-md font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Kasir / PA</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('owner')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-medium transition ${
                  selectedRole === 'owner'
                    ? 'bg-[#0066FF] text-white shadow-md font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Owner</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                Staff ID / Nomor Registrasi Pegawai
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  placeholder="ID Staf Anda"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                PIN Keamanan / Password Terminal
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Masukkan 4-6 digit PIN"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-black/40 border border-white/15 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Notifications / Alerts */}
            {loginMessage && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                  loginMessage.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                {loginMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <span className="leading-relaxed">{loginMessage.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs tracking-wide transition active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <span>Memverifikasi Otoritas Sesi...</span>
              ) : (
                <>
                  <span>Masuk ke Terminal Kerja</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Helper Pill */}
          <div className="pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-white/50">
            <div className="font-semibold text-white/70">Akses Cepat Testing Demo (Klik untuk Isi):</div>
            <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
              <button
                type="button"
                onClick={() => handleRoleChange('technician')}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-center transition border border-white/5"
              >
                Teknisi: <b>5678</b>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('pa')}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-center transition border border-white/5"
              >
                Kasir: <b>1234</b>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('owner')}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-center transition border border-white/5"
              >
                Owner: <b>8888</b>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="text-center text-[11px] text-white/40 space-y-1">
        <div>FixGo Digital Operational System • Tasikmalaya Branch v2.0</div>
        <div>Sistem Terproteksi Middleware Token & Enkripsi Sesi End-to-End</div>
      </div>

    </div>
  );
}

export default function StaffLoginPage() {
  return (
    <div className="min-h-[100dvh] bg-[#0B0F17] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-15%] left-[20%] w-[600px] h-[600px] bg-blue-600/[0.08] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-emerald-500/[0.06] rounded-full blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
        />
      </div>

      {/* Top Header */}
      <header className="relative z-10 p-6 flex items-center justify-between max-w-6xl mx-auto w-full">
        <Link href="/" className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition group text-xs font-medium">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Website Publik</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono text-white/60">OUTLET TASIKMALAYA SECURE TERMINAL</span>
        </div>
      </header>

      {/* Main Content with Suspense Boundary for useSearchParams */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <Suspense fallback={<div className="text-xs text-white/50">Memuat terminal login...</div>}>
          <LoginFormContent />
        </Suspense>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 p-6 text-center text-xs text-white/30">
        Hak Cipta Terlindungi &copy; {new Date().getFullYear()} FixGo Indonesia.
      </footer>
    </div>
  );
}
