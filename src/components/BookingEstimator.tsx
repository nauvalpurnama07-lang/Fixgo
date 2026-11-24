'use client';

import React, { useState, useRef } from 'react';
import { Send, AlertCircle, CheckCircle2, Copy, Check, ArrowRight, X, Shield, Sparkles, Lock, Eye, PackageCheck } from 'lucide-react';
import { IPHONE_MODELS, SERVICE_OPTIONS } from '@/lib/constants';

interface BookingEstimatorProps {
  onOrderCreated?: (orderId: string, device: string, service: string) => void;
}

export default function BookingEstimator({ onOrderCreated }: BookingEstimatorProps) {
  const [selectedDevice, setSelectedDevice] = useState(IPHONE_MODELS[2]); // iPhone 13 Series
  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[0]); // Battery
  const [selectedWarranty, setSelectedWarranty] = useState<'6' | '12' | '18'>('12');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Custom Modal States
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState<string>('');
  const [copiedOrder, setCopiedOrder] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Dynamic price calculation based on service & warranty tier
  const calculateTotalCost = () => {
    let base = selectedService.defaultCost;
    if (selectedService.id === 'battery') {
      if (selectedWarranty === '6') base = 359000;
      else if (selectedWarranty === '12') base = 384000;
      else if (selectedWarranty === '18') base = 484000;
    }
    return base;
  };

  const totalCost = calculateTotalCost();

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const buildWhatsAppMessage = (orderId: string) => {
    const rawMessage = 
      `Halo Admin FixGo Tasikmalaya, saya ingin konfirmasi booking servis resmi:\n\n` +
      `*No. Order:* ${orderId}\n` +
      `*Nama Pelanggan:* ${customerName.trim()}\n` +
      `*Nomor WhatsApp:* ${customerPhone.trim()}\n` +
      `*Model Perangkat:* ${selectedDevice}\n` +
      `*Jenis Kerusakan:* ${selectedService.title}\n` +
      `*Pilihan Garansi:* ${selectedWarranty} Bulan Resmi FixGo\n` +
      `*Estimasi Biaya:* ${formatRupiah(totalCost)} (Sudah termasuk suku cadang & jasa)\n` +
      `*Catatan Keluhan:* ${customerNotes.trim() || 'Tidak ada catatan tambahan'}\n\n` +
      `Mohon info ketersediaan antrean teknisi di outlet Tasikmalaya. Terima kasih!`;
    return encodeURIComponent(rawMessage);
  };

  const handleSubmitOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!customerName.trim()) {
      setValidationMessage('Nama Lengkap belum diisi. Mohon masukkan nama pemilik perangkat.');
      setShowValidationModal(true);
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setValidationMessage('Nomor WhatsApp aktif belum valid. Mohon masukkan minimal 9-13 digit nomor (contoh: 081234567890).');
      setShowValidationModal(true);
      return;
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `FXG-TASIK-${randomCode}`;
    setGeneratedOrder(newOrderId);

    // Notify parent tracker if connected
    if (onOrderCreated) {
      onOrderCreated(newOrderId, selectedDevice, selectedService.title);
    }

    // Direct to Admin WhatsApp (0858-6447-9760 / 6285864479760) with prefilled message
    const waText = buildWhatsAppMessage(newOrderId);
    const waUrl = `https://wa.me/6285864479760?text=${waText}`;
    window.open(waUrl, '_blank');

    // Show confirmation modal on web
    setShowSuccessModal(true);
  };

  const handleCopyOrder = () => {
    if (generatedOrder) {
      navigator.clipboard.writeText(generatedOrder);
      setCopiedOrder(true);
      setTimeout(() => setCopiedOrder(false), 2000);
    }
  };

  return (
    <section id="booking" className="py-24 bg-[#FAFAFB] relative">
      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="eyebrow-badge">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            INSTANT ORDER SYSTEM
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B0F17]">
            Pemesanan Servis & Estimasi Biaya
          </h2>
          <p className="text-sm sm:text-base text-[#475467]">
            Pilih tipe iPhone dan kerusakan perangkat Anda. Sistem akan mengalkulasi estimasi biaya resmi secara transparan dan menghubungkan Anda langsung ke admin lab Tasikmalaya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Device Model */}
            <div className="double-bezel-shell">
              <div className="double-bezel-core p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0066FF] uppercase tracking-wider">Langkah 1</span>
                  <span className="text-xs text-[#98A2B3] font-medium">Pilih Seri iPhone</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B0F17]">Model Perangkat Anda</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {IPHONE_MODELS.map((model) => {
                    const isSelected = selectedDevice === model;
                    return (
                      <button
                        key={model}
                        type="button"
                        onClick={() => setSelectedDevice(model)}
                        className={`p-3 rounded-xl text-xs text-left transition active:scale-[0.98] ${
                          isSelected
                            ? 'border-2 border-[#0066FF] bg-blue-50/50 text-[#0066FF] font-bold shadow-sm'
                            : 'border border-black/[0.08] text-[#344054] font-semibold hover:border-[#0066FF] bg-white'
                        }`}
                      >
                        {model}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 2: Service / Component */}
            <div className="double-bezel-shell">
              <div className="double-bezel-core p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0066FF] uppercase tracking-wider">Langkah 2</span>
                  <span className="text-xs text-[#98A2B3] font-medium">Pilih Layanan</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B0F17]">Komponen / Kerusakan</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICE_OPTIONS.map((srv) => {
                    const isSelected = selectedService.id === srv.id;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setSelectedService(srv)}
                        className={`p-3.5 rounded-xl text-left transition flex items-center justify-between active:scale-[0.98] ${
                          isSelected
                            ? 'border-2 border-[#0066FF] bg-blue-50/50 shadow-sm'
                            : 'border border-black/[0.08] bg-white hover:border-[#0066FF]'
                        }`}
                      >
                        <div>
                          <div className={`text-xs font-bold ${isSelected ? 'text-[#0066FF]' : 'text-[#0B0F17]'}`}>
                            {srv.title}
                          </div>
                          <div className="text-[11px] text-[#475467]">{srv.desc}</div>
                        </div>
                        <span className={`text-xs font-bold font-mono ${isSelected ? 'text-[#0066FF]' : 'text-[#0B0F17]'}`}>
                          {formatRupiah(srv.defaultCost)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Warranty Duration Tier Selector */}
                {selectedService.id === 'battery' && (
                  <div className="pt-3 border-t border-black/[0.04] space-y-2">
                    <div className="text-xs font-semibold text-[#475467]">Pilihan Perlindungan Garansi:</div>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedWarranty('6')}
                        className={`p-2 rounded-xl text-xs font-medium text-center transition ${
                          selectedWarranty === '6'
                            ? 'bg-[#0066FF] text-white font-bold'
                            : 'bg-[#F8F9FA] text-[#475467] border border-black/[0.06] hover:border-[#0066FF]'
                        }`}
                      >
                        Garansi 6 Bulan
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedWarranty('12')}
                        className={`p-2 rounded-xl text-xs font-medium text-center transition ${
                          selectedWarranty === '12'
                            ? 'bg-[#0066FF] text-white font-bold'
                            : 'bg-[#F8F9FA] text-[#475467] border border-black/[0.06] hover:border-[#0066FF]'
                        }`}
                      >
                        Garansi 12 Bulan ★
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedWarranty('18')}
                        className={`p-2 rounded-xl text-xs font-medium text-center transition ${
                          selectedWarranty === '18'
                            ? 'bg-[#0066FF] text-white font-bold'
                            : 'bg-[#F8F9FA] text-[#475467] border border-black/[0.06] hover:border-[#0066FF]'
                        }`}
                      >
                        Garansi 18 Bulan Pro
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Customer Information */}
            <div className="double-bezel-shell">
              <div className="double-bezel-core p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0066FF] uppercase tracking-wider">Langkah 3</span>
                  <span className="text-xs text-[#98A2B3] font-medium">Informasi Pelanggan</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B0F17]">Data Kontak Pemilik</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">Nama Lengkap</label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nama Lengkap Anda"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-black/[0.08] text-xs font-medium text-[#0B0F17] focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">Nomor WhatsApp Aktif</label>
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-black/[0.08] text-xs font-medium text-[#0B0F17] focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#344054] mb-1.5">Catatan Keluhan / Gejala Kerusakan</label>
                    <textarea
                      rows={2}
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="Contoh: Baterai cepat drop di 20%, ada gores halus di pojok atas..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-black/[0.08] text-xs font-medium text-[#0B0F17] focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary & Action Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="double-bezel-shell">
              <div className="double-bezel-core p-6 sm:p-7 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                  <div className="text-sm font-bold text-[#0B0F17]">Ringkasan Estimasi Biaya</div>
                  <span className="text-[11px] font-semibold text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded-full">
                    Termasuk Jasa Pasang
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-[#475467]">
                    <span>Perangkat</span>
                    <span className="font-bold text-[#0B0F17]">{selectedDevice}</span>
                  </div>
                  <div className="flex justify-between text-[#475467]">
                    <span>Jenis Layanan</span>
                    <span className="font-bold text-[#0B0F17]">{selectedService.title}</span>
                  </div>
                  <div className="flex justify-between text-[#475467]">
                    <span>Biaya Jasa Pemasangan</span>
                    <span className="font-bold text-emerald-600 font-mono">GRATIS</span>
                  </div>
                  <div className="flex justify-between text-[#475467]">
                    <span>Garansi Komponen</span>
                    <span className="font-bold text-[#0B0F17]">{selectedWarranty} Bulan Resmi</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#667085] font-medium">Total Estimasi Resmi:</div>
                    <div className="text-2xl font-extrabold text-[#0066FF] font-mono tabular-nums">
                      {formatRupiah(totalCost)}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-[#98A2B3]">
                    Estimasi pengerjaan:
                    <br />
                    <span className="font-bold text-[#0B0F17]">30 - 45 Menit</span>
                  </div>
                </div>

                {/* Primary Button: Directly connects to Admin WhatsApp & Generates Order */}
                <button
                  type="button"
                  onClick={() => handleSubmitOrder()}
                  className="btn-nested-cta w-full justify-between py-3 px-5 group"
                >
                  <div className="text-left">
                    <div className="text-xs font-bold">Booking ke WhatsApp Admin</div>
                    <div className="text-[10px] text-white/70 font-normal">0858-6447-9760 • Outlet Tasikmalaya</div>
                  </div>
                  <span className="btn-nested-icon !w-8 !h-8 group-hover:scale-105">
                    <Send className="w-4 h-4 text-white" />
                  </span>
                </button>

                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5 text-[11px] text-[#344054]">
                  <Shield className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                  <div>
                    Tombol ini otomatis membuat <strong>Nomor Order Resmi</strong> dan langsung membuka obrolan WhatsApp dengan Admin Toko FixGo Tasikmalaya.
                  </div>
                </div>

                {/* Micro Privacy Guarantee Tag */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-emerald-700 font-semibold bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-200/60">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Jaminan Privasi: Passcode tidak diminta • Data 100% aman</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- 3 CORE TRUST SEALS (ZERO-DATA-WIPE GUARANTEE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex items-start gap-3.5 hover:border-emerald-200 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-[#0B0F17]">Zero-Data-Wipe Guarantee</h4>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">100% AMAN</span>
              </div>
              <p className="text-[11px] text-[#475467] leading-relaxed">
                Data foto, chat, dan file pribadi Anda tetap aman. Kami tidak meminta passcode kunci layar dan tidak melakukan reset pabrik.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex items-start gap-3.5 hover:border-blue-200 transition">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 border border-blue-100">
              <Eye className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-[#0B0F17]">Meja Servis Transparan</h4>
                <span className="text-[9px] bg-blue-100 text-[#0066FF] font-bold px-1.5 py-0.2 rounded">OPEN LAB</span>
              </div>
              <p className="text-[11px] text-[#475467] leading-relaxed">
                Konsep laboratorium terbuka di outlet Tasikmalaya. Anda bebas menyaksikan langsung seluruh proses pengerjaan unit tanpa sekat.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex items-start gap-3.5 hover:border-purple-200 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-[#0B0F17]">Suku Cadang Tersegel Baru</h4>
                <span className="text-[9px] bg-purple-100 text-purple-700 font-bold px-1.5 py-0.2 rounded">ORIGINAL</span>
              </div>
              <p className="text-[11px] text-[#475467] leading-relaxed">
                Segel kemasan komponen baru dibuka tepat di hadapan Anda, lengkap dengan pengujian 18 titik QC dan garansi digital s/d 18 bulan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CUSTOM POPUP 1: VALIDATION ALERT MODAL (Replaces window.alert) --- */}
      {showValidationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="double-bezel-shell max-w-md w-full shadow-2xl">
            <div className="double-bezel-core p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Verifikasi Data</div>
                    <h4 className="text-sm font-bold text-[#0B0F17]">Informasi Belum Lengkap</h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowValidationModal(false)}
                  className="w-7 h-7 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-xs text-[#475467] transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#475467] leading-relaxed">
                {validationMessage || 'Mohon cantumkan Nama Lengkap dan Nomor WhatsApp aktif Anda agar antrean teknisi di outlet Tasikmalaya dapat dijadwalkan.'}
              </p>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowValidationModal(false);
                    if (!customerName.trim()) {
                      nameInputRef.current?.focus();
                    } else if (!customerPhone.trim()) {
                      phoneInputRef.current?.focus();
                    }
                  }}
                  className="btn-nested-cta text-xs py-2 px-4"
                >
                  <span>Lengkapi Sekarang</span>
                  <span className="btn-nested-icon !w-5 !h-5">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CUSTOM POPUP 2: ORDER SUCCESS CONFIRMATION MODAL --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="double-bezel-shell max-w-lg w-full shadow-2xl">
            <div className="double-bezel-core p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Antrean Terdaftar</div>
                    <h3 className="text-base font-extrabold text-[#0B0F17]">Pesanan Servis Berhasil Dibuat!</h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="w-7 h-7 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-xs text-[#475467] transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Order Number Box with One-Click Copy */}
              <div className="p-4 rounded-2xl bg-[#0B0F17] text-white flex items-center justify-between border border-white/10">
                <div className="space-y-0.5">
                  <div className="text-[10px] uppercase font-mono text-white/50">Nomor Order Pelacakan</div>
                  <div className="text-xl font-bold font-mono text-white tracking-wider">{generatedOrder}</div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyOrder}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition active:scale-95"
                >
                  {copiedOrder ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* Order Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                  <span className="text-[#667085]">Pemilik:</span>
                  <span className="font-bold text-[#0B0F17]">{customerName} ({customerPhone})</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                  <span className="text-[#667085]">Perangkat:</span>
                  <span className="font-bold text-[#0B0F17]">{selectedDevice}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                  <span className="text-[#667085]">Layanan:</span>
                  <span className="font-bold text-[#0B0F17]">{selectedService.title}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                  <span className="text-[#667085]">Garansi Terpilih:</span>
                  <span className="font-bold text-[#0B0F17]">{selectedWarranty} Bulan Resmi</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                  <span className="text-[#667085]">Estimasi Biaya:</span>
                  <span className="font-bold text-[#0066FF] font-mono">{formatRupiah(totalCost)}</span>
                </div>
              </div>

              {/* Dual Modal Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const waText = buildWhatsAppMessage(generatedOrder);
                    window.open(`https://wa.me/6285864479760?text=${waText}`, '_blank');
                  }}
                  className="btn-nested-cta flex-1 justify-center py-2.5 px-4 text-xs"
                >
                  <span>Buka Ulang WhatsApp Admin</span>
                  <span className="btn-nested-icon !w-6 !h-6">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="btn-pill-secondary justify-center text-xs py-2.5 px-4"
                >
                  Tutup & Pantau Web
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
