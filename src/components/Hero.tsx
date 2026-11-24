'use client';

import React from 'react';
import { ArrowUpRight, ClipboardList, Smartphone, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center pt-32 pb-24 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFB]/95 via-[#FAFAFB]/90 to-[#FAFAFB]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center">
              <span className="eyebrow-badge">
                <span className="status-live-dot"></span>
                OUTLET TASIKMALAYA • HARDWARE DIAGNOSTIC LAB
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-[#0B0F17] leading-[1.05]">
              Solusi Servis Gadget Berstandar <span className="text-[#0066FF]">Laboratorium.</span>
            </h1>

            <p className="text-lg md:text-xl text-[#475467] leading-relaxed max-w-2xl font-normal">
              Perbaikan transparan, teknisi bersertifikasi, suku cadang terverifikasi, dan pemantauan 9 tahapan pengerjaan waktu nyata. Layanan servis gadget profesional <span className="font-semibold text-[#0B0F17]">#AntiRibet</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#booking" className="btn-nested-cta">
                <span>Pesan Servis Sekarang</span>
                <span className="btn-nested-icon">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </a>
              <a href="#tracker" className="btn-pill-secondary">
                <ClipboardList className="w-4 h-4 text-[#0066FF]" />
                <span>Lacak Status Pengerjaan</span>
              </a>
            </div>

            {/* Metrics Banner */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-black/[0.06] max-w-xl">
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0B0F17] font-mono tabular-nums">99.4%</div>
                <div className="text-xs text-[#667085] mt-1 font-medium">Tingkat Presisi Lab</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0066FF] font-mono tabular-nums">18 Bln</div>
                <div className="text-xs text-[#667085] mt-1 font-medium">Garansi Resmi Tersegel</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0B0F17] font-mono tabular-nums">15-45m</div>
                <div className="text-xs text-[#667085] mt-1 font-medium">Pengerjaan Ekspres</div>
              </div>
            </div>
          </div>

          {/* Right Column: Double-Bezel Hardware Diagnostic Card */}
          <div className="lg:col-span-5">
            <div className="double-bezel-shell">
              <div className="double-bezel-core p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF]">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#0066FF] tracking-wider uppercase">Inspeksi Lab Terverifikasi</div>
                      <div className="text-sm font-bold text-[#0B0F17]">iPhone 14 Pro — Deep Purple</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    QC Lolos 100%
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                    <span className="text-[#667085] font-medium">Kondisi Baterai (Health)</span>
                    <span className="font-bold text-[#0B0F17] font-mono">100% Original Capacity</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                    <span className="text-[#667085] font-medium">TrueTone & Face ID Sensor</span>
                    <span className="font-bold text-emerald-600 font-mono">Terkalibrasi Aktif</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                    <span className="text-[#667085] font-medium">Kerapatan Segel Anti-Air</span>
                    <span className="font-bold text-[#0B0F17] font-mono">Presisi Tekanan Pabrik</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[11px] text-[#475467] font-medium">ID Order Teknisi:</div>
                    <div className="text-xs font-mono font-bold text-[#0066FF]">FXG-TASIK-2026-0849</div>
                  </div>
                  <a href="#tracker" className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1">
                    <span>Pantau Live</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
