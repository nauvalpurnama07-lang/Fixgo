'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, QrCode, Search, Smartphone, Calendar, AlertCircle, Copy, Check, Download } from 'lucide-react';

interface WarrantyRecord {
  warrantyCode: string;
  orderId: string;
  customerName: string;
  deviceModel: string;
  component: string;
  warrantyPeriod: string;
  startDate: string;
  expiryDate: string;
  remainingDays: number;
  status: 'ACTIVE' | 'EXPIRED' | 'CLAIMED';
}

const SAMPLE_WARRANTIES: Record<string, WarrantyRecord> = {
  'WRN-TASIK-2611-0941': {
    warrantyCode: 'WRN-TASIK-2611-0941',
    orderId: 'FXG-TASIK-2611-0849',
    customerName: 'Ahmad Fauzi',
    deviceModel: 'iPhone 13 Pro (128GB)',
    component: 'Baterai Original High Capacity',
    warrantyPeriod: '18 Bulan Resmi FixGo',
    startDate: '14 November 2026',
    expiryDate: '14 Mei 2028',
    remainingDays: 546,
    status: 'ACTIVE',
  },
  'WRN-TASIK-1205-0321': {
    warrantyCode: 'WRN-TASIK-1205-0321',
    orderId: 'FXG-TASIK-1205-7712',
    customerName: 'Siti Rahmawati',
    deviceModel: 'iPhone 12 (64GB)',
    component: 'Layar Retina OLED + TrueTone',
    warrantyPeriod: '12 Bulan Resmi FixGo',
    startDate: '10 Mei 2026',
    expiryDate: '10 Mei 2027',
    remainingDays: 177,
    status: 'ACTIVE',
  },
};

export default function WarrantyPass() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWarranty, setActiveWarranty] = useState<WarrantyRecord>(SAMPLE_WARRANTIES['WRN-TASIK-2611-0941']);
  const [copiedCode, setCopiedCode] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();

    if (!query) {
      setActiveWarranty(SAMPLE_WARRANTIES['WRN-TASIK-2611-0941']);
      setSearchError(false);
      return;
    }

    // Check if query matches known warranty code or order ID
    if (SAMPLE_WARRANTIES[query]) {
      setActiveWarranty(SAMPLE_WARRANTIES[query]);
      setSearchError(false);
    } else if (query.includes('TASIK') || query.includes('FXG') || query.includes('WRN')) {
      // Dynamic fallback for newly created orders/warranties
      const generated: WarrantyRecord = {
        warrantyCode: query.startsWith('WRN-') ? query : `WRN-TASIK-${Math.floor(1000 + Math.random() * 9000)}`,
        orderId: query.startsWith('FXG-') ? query : `FXG-TASIK-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: 'Pelanggan Terdaftar',
        deviceModel: 'iPhone Series Terverifikasi',
        component: 'Komponen Hardware Terpasang Lab',
        warrantyPeriod: '12 Bulan Garansi Toko',
        startDate: '14 November 2026',
        expiryDate: '14 November 2027',
        remainingDays: 365,
        status: 'ACTIVE',
      };
      setActiveWarranty(generated);
      setSearchError(false);
    } else {
      setSearchError(true);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="warranty" className="py-24 bg-[#FAFAFB]">
      <div className="container mx-auto px-4 max-w-5xl space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="eyebrow-badge">
            <span className="status-live-dot"></span>
            DIGITAL HARDWARE WARRANTY PASS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F17]">
            Sistem Garansi Digital Terintegrasi
          </h2>
          <p className="text-sm sm:text-base text-[#475467]">
            Bebas khawatir nota kertas hilang atau pudar. Setiap perbaikan yang selesai otomatis mendapatkan kartu garansi digital unik yang tersimpan di cloud FixGo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Digital Pass Mockup (Apple Wallet Aesthetics) */}
          <div className="lg:col-span-7">
            <div className="warranty-pass-card p-6 sm:p-8 space-y-6">
              {/* Pass Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tracking-tight">FixGo</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
                    Certified Hardware Pass
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Garansi Aktif</span>
                </div>
              </div>

              {/* Unique Codes Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                <div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider font-mono">Kode Unik Garansi</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-lg sm:text-xl font-bold font-mono text-white tracking-wider">
                      {activeWarranty.warrantyCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(activeWarranty.warrantyCode)}
                      className="text-white/60 hover:text-white p-1 rounded transition"
                      title="Salin Kode Garansi"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider font-mono">Terkoneksi ke No. Order</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white/90 mt-1">
                    {activeWarranty.orderId}
                  </div>
                </div>
              </div>

              {/* Pass Detail Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-white/10">
                <div>
                  <div className="text-white/50">Pemilik & Perangkat:</div>
                  <div className="font-bold text-white mt-0.5">{activeWarranty.deviceModel}</div>
                  <div className="text-[11px] text-white/70">{activeWarranty.customerName}</div>
                </div>
                <div>
                  <div className="text-white/50">Komponen Diganti:</div>
                  <div className="font-bold text-white mt-0.5">{activeWarranty.component}</div>
                  <div className="text-[11px] text-white/70">{activeWarranty.warrantyPeriod}</div>
                </div>
                <div>
                  <div className="text-white/50">Tanggal Terbit Lab:</div>
                  <div className="font-bold text-white mt-0.5">{activeWarranty.startDate}</div>
                </div>
                <div>
                  <div className="text-white/50">Berlaku Sampai:</div>
                  <div className="font-bold text-emerald-400 mt-0.5">{activeWarranty.expiryDate}</div>
                  <div className="text-[10px] text-emerald-300 font-mono mt-0.5">
                    Sisa {activeWarranty.remainingDays} Hari Aktif
                  </div>
                </div>
              </div>

              {/* Security Barcode & QR Code Seal */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-8 w-44 bg-white/20 rounded flex items-center px-2 text-[9px] font-mono tracking-widest text-white/70 overflow-hidden select-none">
                    |||||| | |||||||| || |||||| |
                  </div>
                  <div className="text-[9px] text-white/40 font-mono">
                    SECURE TOKEN • OUTLET TASIKMALAYA VERIFIED
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center text-black shadow-md">
                  <QrCode className="w-10 h-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Warranty Search Form & Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="double-bezel-shell">
              <div className="double-bezel-core p-6 sm:p-7 space-y-5">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#0B0F17]">Cek Keabsahan Garansi Anda</h3>
                  <p className="text-xs text-[#475467] leading-relaxed">
                    Masukkan <strong>Kode Garansi</strong> (contoh: <code className="text-[#0066FF] font-mono">WRN-TASIK-2611-0941</code>) atau <strong>Nomor Order</strong> untuk mengecek validitas suku cadang Anda.
                  </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1">
                      Nomor Garansi / No. Order Servis
                    </label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="WRN-TASIK-... atau FXG-TASIK-..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-black/[0.08] text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]"
                    />
                  </div>
                  <button type="submit" className="btn-nested-cta w-full justify-between py-2.5 px-4 text-xs">
                    <span>Verifikasi Data Garansi</span>
                    <span className="btn-nested-icon !w-6 !h-6">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    </span>
                  </button>
                </form>

                {searchError && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      Format kode tidak dikenali. Coba gunakan contoh kode: <button type="button" onClick={() => setSearchQuery('WRN-TASIK-2611-0941')} className="font-mono underline font-bold">WRN-TASIK-2611-0941</button>
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-[#344054] space-y-2">
                  <div className="font-bold text-[#0066FF] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                    <span>Keunggulan Garansi Digital FixGo:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#475467]">
                    <li><strong>Tidak ada risiko nota hilang</strong> — Tersimpan otomatis di cloud toko.</li>
                    <li><strong>Klaim 1-Detik</strong> — Cukup sebutkan No. HP / scan QR Code di outlet.</li>
                    <li><strong>Terverifikasi Suku Cadang</strong> — Mengunci nomor seri komponen asli dari lab.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
