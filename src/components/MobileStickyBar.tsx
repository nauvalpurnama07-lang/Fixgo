'use client';

import React from 'react';
import { Send, ArrowUpRight, Phone, Sparkles } from 'lucide-react';
import { OUTLET_TASIKMALAYA } from '@/lib/constants';

export default function MobileStickyBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-black/[0.08] px-4 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Left: Value & Price Info */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-[#0066FF] tracking-wider uppercase">Outlet Tasikmalaya</span>
          </div>
          <div className="text-xs font-extrabold text-[#0B0F17]">
            Mulai <span className="font-mono text-[#0066FF]">Rp 109.000</span>
          </div>
          <div className="text-[10px] text-[#667085] leading-none">Garansi s/d 18 Bulan</div>
        </div>

        {/* Right: Quick Action CTAs */}
        <div className="flex items-center gap-2">
          {/* Quick WhatsApp Button */}
          <a
            href={OUTLET_TASIKMALAYA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center hover:bg-emerald-100 transition active:scale-95"
            aria-label="WhatsApp Admin"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
          </a>

          {/* Primary Booking Button */}
          <a
            href="#booking"
            className="btn-nested-cta text-xs py-2 px-3.5 whitespace-nowrap active:scale-95 shadow-md"
          >
            <span>Pesan Servis</span>
            <span className="btn-nested-icon !w-5 !h-5">
              <ArrowUpRight className="w-3 h-3 text-white" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
