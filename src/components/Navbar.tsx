'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Zap, Menu, X, Shield, Phone, Sparkles } from 'lucide-react';
import { OUTLET_TASIKMALAYA } from '@/lib/constants';

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Secret 3x click on logo to open staff terminal (Easter Egg for staff/owner)
  const handleLogoClick = (e: React.MouseEvent) => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      router.push('/dashboard/login');
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1200);
  };

  // Secret keyboard shortcut: Ctrl+Shift+L or Alt+L for desktop PC staff
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') ||
        (e.altKey && e.key.toLowerCase() === 'l')
      ) {
        e.preventDefault();
        router.push('/dashboard/login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const navLinks = [
    { href: '#services', label: 'Layanan & Harga' },
    { href: '#tracker', label: 'Lacak Servis', hasDot: true },
    { href: '#booking', label: 'Booking Online' },
    { href: '#warranty', label: 'Garansi Digital' },
    { href: '#faq', label: 'FAQ' },
    { href: '#location', label: 'Outlet Tasikmalaya' },
  ];

  return (
    <header className="relative">
      <nav className="floating-nav w-[94%] sm:w-auto max-w-5xl justify-between sm:justify-start" aria-label="Navigasi Utama">
        {/* FixGo Logo with Secret 3x Click for Staff */}
        <a
          href="#hero"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group shrink-0 cursor-pointer"
          title="FixGo Hardware Diagnostic Lab"
        >
          <div className="w-8 h-8 rounded-full bg-[#0B0F17] flex items-center justify-center text-white font-bold text-xs shadow-sm transition-transform group-hover:scale-105">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base tracking-tight text-[#0B0F17]">FixGo</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs xl:text-sm font-medium text-[#475467]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#0066FF] transition-colors flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.hasDot && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </a>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <a href="#booking" className="btn-nested-cta text-xs py-1.5 px-3.5">
            <span>Booking Servis</span>
            <span className="btn-nested-icon !w-5 !h-5">
              <ArrowUpRight className="w-3 h-3 text-white" />
            </span>
          </a>
        </div>

        {/* Mobile Hamburger & Quick CTA */}
        <div className="flex lg:hidden items-center gap-2">
          <a href="#booking" className="btn-nested-cta text-[11px] py-1 px-2.5 sm:hidden">
            <span>Booking</span>
            <span className="btn-nested-icon !w-4 !h-4">
              <ArrowUpRight className="w-2.5 h-2.5 text-white" />
            </span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-[#0B0F17] transition active:scale-95"
            aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-40 bg-white/95 backdrop-blur-2xl rounded-3xl p-5 border border-black/[0.08] shadow-2xl animate-fade-in space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0066FF]" />
              <span className="text-xs font-bold text-[#0B0F17]">Menu Navigasi FixGo</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-50 text-[#0066FF] font-semibold">
              Outlet Tasikmalaya
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#344054] hover:bg-blue-50/60 hover:text-[#0066FF] transition active:scale-[0.98]"
              >
                <div className="flex items-center gap-2">
                  <span>{link.label}</span>
                  {link.hasDot && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#98A2B3]" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-black/[0.06] flex flex-col gap-2">
            <a
              href={OUTLET_TASIKMALAYA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 transition active:scale-[0.98]"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Admin: {OUTLET_TASIKMALAYA.phone}</span>
            </a>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#667085]">
              <Shield className="w-3 h-3 text-[#0066FF]" />
              <span>Garansi Hardware Resmi s/d 18 Bulan</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
