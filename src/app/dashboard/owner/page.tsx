'use client';

import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  FileSpreadsheet, 
  Clock, 
  ArrowUpRight, 
  Check, 
  X,
  History,
  Lock,
  Smartphone
} from 'lucide-react';

export default function OwnerTerminalPage() {
  const [stockApprovalDone, setStockApprovalDone] = useState(false);
  const [closingDone, setClosingDone] = useState(false);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="min-h-[100dvh] bg-[#F4F5F7] flex flex-col text-[#0B0F17]">
      <DashboardHeader 
        currentRole="owner" 
        staffName="Nauval (Store Owner)" 
        staffId="OWNER-TASIK-01" 
      />

      {/* Executive Top Banner */}
      <div className="bg-[#0B0F17] text-white py-4 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-white/50 font-semibold">
              Executive Terminal • Outlet Tasikmalaya
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
              <span>Laporan Kinerja & Tutup Buku Harian</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded-full font-bold">
                PROFIT MARGIN +57.2%
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => alert('Laporan harian berhasil diekspor ke format XLSX / PDF.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ekspor Laporan Harian</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* KPI Financial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Omset Kotor */}
          <div className="double-bezel-shell">
            <div className="double-bezel-core p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#667085]">
                <span>Omset Kotor Hari Ini</span>
                <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-extrabold font-mono text-[#0B0F17] tabular-nums">
                {formatRupiah(4280000)}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span>+18.4%</span>
                <span className="text-[#98A2B3] font-normal">vs rata-rata harian</span>
              </div>
            </div>
          </div>

          {/* Card 2: Laba Bersih */}
          <div className="double-bezel-shell">
            <div className="double-bezel-core p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#667085]">
                <span>Estimasi Gross Profit</span>
                <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-extrabold font-mono text-emerald-600 tabular-nums">
                {formatRupiah(2450000)}
              </div>
              <div className="text-[11px] text-[#475467]">
                Margin laba: <strong>57.2%</strong> dari omset
              </div>
            </div>
          </div>

          {/* Card 3: Modal Sparepart */}
          <div className="double-bezel-shell">
            <div className="double-bezel-core p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#667085]">
                <span>Biaya Modal Part (HPP)</span>
                <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <PieChart className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-extrabold font-mono text-[#0B0F17] tabular-nums">
                {formatRupiah(1830000)}
              </div>
              <div className="text-[11px] text-[#667085]">
                Tereduksi otomatis dari inventaris
              </div>
            </div>
          </div>

          {/* Card 4: Unit Selesai */}
          <div className="double-bezel-shell">
            <div className="double-bezel-core p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#667085]">
                <span>Volume Servis Hari Ini</span>
                <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-extrabold font-mono text-[#0B0F17] tabular-nums">
                9 Unit
              </div>
              <div className="text-[11px] text-[#667085]">
                7 Selesai Lolos QC • 2 In Progress
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: Daily Closing & Stock Opname Approval */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Daily Closing Box (Col 6) */}
          <div className="lg:col-span-6 double-bezel-shell">
            <div className="double-bezel-core p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                  <h3 className="text-sm font-bold text-[#0B0F17]">Tutup Kas Harian (Daily Closing)</h3>
                </div>
                <span className="text-[10px] font-mono bg-blue-50 text-[#0066FF] px-2 py-0.5 rounded font-bold">
                  Shift Meja Kasir
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                  <span className="text-[#667085]">Penerimaan QRIS & Digital:</span>
                  <span className="font-bold font-mono text-[#0B0F17]">{formatRupiah(2780000)}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                  <span className="text-[#667085]">Penerimaan Uang Tunai (Cash di Laci):</span>
                  <span className="font-bold font-mono text-[#0B0F17]">{formatRupiah(1500000)}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-emerald-800">
                  <span className="font-semibold">Status Rekonsiliasi:</span>
                  <span className="font-bold font-mono">100% MATCHED (SELISIH Rp 0)</span>
                </div>
              </div>

              <div className="pt-2">
                {closingDone ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Buku Kas Hari Ini Resmi Ditutup oleh Owner & Terkunci Permanen.</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setClosingDone(true)}
                    className="btn-nested-cta w-full justify-between py-2.5 px-4 text-xs"
                  >
                    <span>Verifikasi & Tutup Buku Kas Hari Ini</span>
                    <span className="btn-nested-icon !w-6 !h-6">
                      <Lock className="w-3.5 h-3.5 text-white" />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stock Opname Approval Box (Col 6) */}
          <div className="lg:col-span-6 double-bezel-shell">
            <div className="double-bezel-core p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-purple-600" />
                  <h3 className="text-sm font-bold text-[#0B0F17]">Persetujuan Stok Opname (Variance)</h3>
                </div>
                <span className="text-[10px] font-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-bold">
                  Lab Inventaris
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-[#F8F9FA] border border-black/[0.06] space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-[#0B0F17]">SCR-IP12-OLED (Layar iP 12)</span>
                    <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                      Selisih: -1 pcs
                    </span>
                  </div>
                  <div className="text-[11px] text-[#667085] flex justify-between">
                    <span>Sistem: 8 pcs | Fisik: 7 pcs</span>
                    <span>Alasan: Rusak saat kalibrasi teknisi (Defect)</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F8F9FA] border border-black/[0.06] space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-[#0B0F17]">BAT-IP13P-ORIG (Baterai 13 Pro)</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                      Selisih: 0 (Cocok)
                    </span>
                  </div>
                  <div className="text-[11px] text-[#667085] flex justify-between">
                    <span>Sistem: 14 pcs | Fisik: 14 pcs</span>
                    <span>Akurat 100%</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                {stockApprovalDone ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Penyesuaian stok defect berhasil disetujui dan dialihkan ke biaya kerugian part lab.</span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStockApprovalDone(true)}
                      className="btn-nested-cta flex-1 justify-center py-2 px-3 text-xs bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Setujui Penyesuaian Stok (Approve)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Investigasi teknisi station lab dibuka.')}
                      className="btn-pill-secondary text-xs py-2 px-3"
                    >
                      Investigasi
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row: Live Audit Trail Log */}
        <div className="double-bezel-shell">
          <div className="double-bezel-core p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#0066FF]" />
                <h3 className="text-sm font-bold text-[#0B0F17]">Audit Trail Log (Aktivitas Staf Waktu Nyata)</h3>
              </div>
              <span className="text-[10px] text-[#667085] font-mono">Immutable Security Log</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#F8F9FA] border border-black/[0.04] flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-[#0B0F17]">
                    Teknisi <span className="text-[#0066FF]">Ahmad Fauzi</span> menandai unit FXG-TASIK-2026-0849 lolos QC 18 titik.
                  </div>
                  <div className="text-[11px] text-[#667085]">Otomatis menerbitkan Nomor Garansi Resmi WRN-TASIK-2611-0941.</div>
                </div>
                <span className="text-[10px] font-mono text-[#98A2B3]">16:55 WIB</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F9FA] border border-black/[0.04] flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-[#0B0F17]">
                    Kasir <span className="text-emerald-600">Siti Rahmawati</span> memvalidasi pembayaran QRIS Rp 499.000.
                  </div>
                  <div className="text-[11px] text-[#667085]">Order #FXG-TASIK-2026-1405 (Budi Santoso - Face ID).</div>
                </div>
                <span className="text-[10px] font-mono text-[#98A2B3]">16:42 WIB</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F9FA] border border-black/[0.04] flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-[#0B0F17]">
                    Kasir <span className="text-emerald-600">Siti Rahmawati</span> menerima order walk-in baru.
                  </div>
                  <div className="text-[11px] text-[#667085]">Pendaftaran unit iPhone 12 (64GB) #FXG-TASIK-2026-1102.</div>
                </div>
                <span className="text-[10px] font-mono text-[#98A2B3]">16:10 WIB</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
