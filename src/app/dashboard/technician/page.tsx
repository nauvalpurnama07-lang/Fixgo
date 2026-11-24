'use client';

import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { 
  Wrench, 
  Smartphone, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Camera, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Save, 
  ArrowRight, 
  Check, 
  UploadCloud,
  FileText
} from 'lucide-react';
import { SERVICE_STAGES } from '@/lib/constants';
import { ServiceStatus } from '@/types';

interface LabOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  deviceModel: string;
  issue: string;
  status: ServiceStatus;
  stageId: number;
  selectedPartSku: string;
  techNotes: string;
  photosBefore: string[];
  photosAfter: string[];
  warrantyGenerated?: string;
}

const INITIAL_LAB_ORDERS: LabOrder[] = [
  {
    id: 'FXG-TASIK-2026-0849',
    customerName: 'Ahmad Fauzi',
    customerPhone: '0812-3456-7890',
    deviceModel: 'iPhone 13 Pro (128GB)',
    issue: 'Baterai drop cepat di 20%, kesehatan baterai 74%. Minta pasang baterai original garansi 18 bulan.',
    status: 'IN_PROGRESS',
    stageId: 6,
    selectedPartSku: 'BAT-IP13P-ORIG',
    techNotes: 'Lem baterai lama telah diangkat dengan aman. Ruang housing dibersihkan dari residu lem. Sel baterai baru terpasang rapat dan lolos tes resistansi arus.',
    photosBefore: ['/assets/demo-before.jpg'],
    photosAfter: [],
  },
  {
    id: 'FXG-TASIK-2026-1102',
    customerName: 'Siti Rahmawati',
    customerPhone: '0857-1122-3344',
    deviceModel: 'iPhone 12 (64GB)',
    issue: 'Layar retak sudut kanan bawah, sentuhan kadang loncat (ghost touch). Minta TrueTone tetap aktif.',
    status: 'WAITING_INSPECTION',
    stageId: 2,
    selectedPartSku: 'SCR-IP12-OLED',
    techNotes: 'Menunggu pembongkaran modul layar. Alat transfer EEPROM TrueTone telah disiapkan di station.',
    photosBefore: [],
    photosAfter: [],
  },
  {
    id: 'FXG-TASIK-2026-1405',
    customerName: 'Budi Santoso',
    customerPhone: '0813-8899-0011',
    deviceModel: 'iPhone 11 (128GB)',
    issue: 'Face ID tidak bisa mendeteksi wajah setelah terkena cipratan air hujan.',
    status: 'QUALITY_CONTROL',
    stageId: 7,
    selectedPartSku: 'MOD-IP11-TRUEDEPTH',
    techNotes: 'Modul prisma proyektor telah dibersihkan secara ultrasonik dan disolder ulang. Pengujian Face ID di setting iOS berhasil 100%.',
    photosBefore: [],
    photosAfter: [],
  },
];

export default function TechnicianTerminalPage() {
  const [orders, setOrders] = useState<LabOrder[]>(INITIAL_LAB_ORDERS);
  const [activeOrderId, setActiveOrderId] = useState<string>('FXG-TASIK-2026-0849');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0];

  const handleStageChange = (newStageId: number) => {
    const stageObj = SERVICE_STAGES.find((s) => s.id === newStageId);
    if (!stageObj) return;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === activeOrderId) {
          return {
            ...ord,
            stageId: newStageId,
            status: stageObj.key,
          };
        }
        return ord;
      })
    );
  };

  const handleNotesChange = (val: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === activeOrderId ? { ...ord, techNotes: val } : ord))
    );
  };

  const handleCompleteRepairAndWarranty = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newWarranty = `WRN-TASIK-2611-${randomCode}`;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === activeOrderId) {
          return {
            ...ord,
            stageId: 8, // COMPLETED
            status: 'COMPLETED',
            warrantyGenerated: newWarranty,
            techNotes:
              ord.techNotes +
              `\n[QC PASSED 100%]: Seluruh 18 titik sensor, audio, kamera & TrueTone teruji lulus. Garansi Digital #${newWarranty} resmi aktif s/d 18 bulan ke depan.`,
          };
        }
        return ord;
      })
    );

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-[100dvh] bg-[#F4F5F7] flex flex-col text-[#0B0F17]">
      <DashboardHeader 
        currentRole="technician" 
        staffName="Ahmad Fauzi" 
        staffId="TECH-TASIK-02" 
      />

      {/* Lab Station Bar */}
      <div className="bg-white border-b border-black/[0.06] py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <div>
              <div className="text-xs font-bold text-[#0B0F17] flex items-center gap-2">
                <span>Station Lab Clean Room 02</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                  Sterilisasi Aktif
                </span>
              </div>
              <div className="text-[11px] text-[#667085]">Teknisi: Ahmad Fauzi (Level 3 Hardware Master)</div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 text-xs font-mono">
            <div>
              <div className="text-[10px] text-[#98A2B3] uppercase">Antrean Aktif</div>
              <div className="font-extrabold text-[#0B0F17]">{orders.length} Unit</div>
            </div>
            <div>
              <div className="text-[10px] text-[#98A2B3] uppercase">Selesai Hari Ini</div>
              <div className="font-extrabold text-emerald-600">8 Unit</div>
            </div>
            <div>
              <div className="text-[10px] text-[#98A2B3] uppercase">Tingkat Lolos QC</div>
              <div className="font-extrabold text-[#0066FF]">100%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Job Queue List (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B0F17] flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#0066FF]" />
              <span>Antrean Meja Servis</span>
            </h2>
            <span className="text-[11px] font-mono text-[#667085] bg-white px-2 py-0.5 rounded-lg border border-black/[0.06]">
              {orders.length} Perangkat
            </span>
          </div>

          <div className="space-y-2.5">
            {orders.map((ord) => {
              const isSelected = ord.id === activeOrderId;
              return (
                <div
                  key={ord.id}
                  onClick={() => setActiveOrderId(ord.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-[#0066FF] shadow-md ring-2 ring-[#0066FF]/10'
                      : 'bg-white border-black/[0.06] hover:border-black/[0.15] opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/[0.04]">
                    <span className="text-xs font-mono font-bold text-[#0066FF]">{ord.id}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        ord.status === 'COMPLETED'
                          ? 'bg-emerald-50 text-emerald-700'
                          : ord.status === 'IN_PROGRESS'
                          ? 'bg-blue-50 text-[#0066FF]'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-[#0B0F17]">{ord.deviceModel}</div>
                  <div className="text-[11px] text-[#667085] line-clamp-1 mt-0.5">{ord.issue}</div>

                  <div className="flex items-center justify-between mt-3 pt-2 text-[10px] text-[#98A2B3] border-t border-black/[0.04]">
                    <span>Klien: {ord.customerName}</span>
                    <span className="font-mono">Tahap {ord.stageId}/9</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Workstation Inspection & Stage Manager (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="double-bezel-shell">
            <div className="double-bezel-core p-6 sm:p-7 space-y-6">
              
              {/* Active Unit Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded">
                      {activeOrder.id}
                    </span>
                    <span className="text-xs font-semibold text-[#475467]">
                      {activeOrder.customerName} ({activeOrder.customerPhone})
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B0F17] mt-1 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-[#0066FF]" />
                    <span>{activeOrder.deviceModel}</span>
                  </h3>
                </div>

                {activeOrder.warrantyGenerated && (
                  <div className="p-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="text-[10px] text-emerald-700 uppercase font-mono font-semibold">Garansi Resmi Terbit</div>
                    <div className="font-mono font-bold text-emerald-800">{activeOrder.warrantyGenerated}</div>
                  </div>
                )}
              </div>

              {/* Diagnosis Issue Description */}
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-black/[0.06] text-xs space-y-1">
                <div className="font-bold text-[#0B0F17]">Keluhan / Permintaan Pelanggan:</div>
                <div className="text-[#475467] leading-relaxed">{activeOrder.issue}</div>
              </div>

              {/* Interactive 9-Stages Stepper */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0B0F17] uppercase tracking-wider">
                    Siklus 9 Tahapan Servis (Klik untuk Update):
                  </span>
                  <span className="text-[11px] font-mono text-[#0066FF] font-semibold">
                    Status: {activeOrder.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 text-center">
                  {SERVICE_STAGES.map((stg) => {
                    const isDone = stg.id < activeOrder.stageId;
                    const isCurrent = stg.id === activeOrder.stageId;

                    let bgClass = 'bg-[#F1F3F5] text-[#98A2B3]';
                    let dotBg = 'bg-[#D0D5DD] text-white';

                    if (isDone) {
                      bgClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                      dotBg = 'bg-emerald-500 text-white';
                    } else if (isCurrent) {
                      bgClass = 'bg-blue-50 text-[#0066FF] border-[#0066FF] ring-2 ring-[#0066FF]/20';
                      dotBg = 'bg-[#0066FF] text-white';
                    }

                    return (
                      <button
                        key={stg.id}
                        type="button"
                        onClick={() => handleStageChange(stg.id)}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition active:scale-95 ${bgClass}`}
                        title={stg.desc}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold font-mono ${dotBg}`}>
                          {isDone ? <Check className="w-3 h-3" /> : stg.id}
                        </div>
                        <div className="text-[9px] leading-tight font-medium line-clamp-1">{stg.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Spare Part Inventory Deduction & Hardware QC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>Suku Cadang Digunakan (Inventaris Lab):</span>
                  </label>
                  <select
                    value={activeOrder.selectedPartSku}
                    onChange={(e) => {
                      const val = e.target.value;
                      setOrders((prev) =>
                        prev.map((o) => (o.id === activeOrderId ? { ...o, selectedPartSku: val } : o))
                      );
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8F9FA] border border-black/[0.08] text-xs font-mono text-[#0B0F17] focus:outline-none focus:border-[#0066FF]"
                  >
                    <option value="BAT-IP13P-ORIG">BAT-IP13P-ORIG — Baterai iP 13 Pro (Stok: 14)</option>
                    <option value="SCR-IP12-OLED">SCR-IP12-OLED — Layar Retina iP 12 (Stok: 8)</option>
                    <option value="MOD-IP11-TRUEDEPTH">MOD-IP11-TRUEDEPTH — Sensor Face ID iP 11 (Stok: 5)</option>
                    <option value="GLS-IP13-LASER">GLS-IP13-LASER — Backglass Laser iP 13 (Stok: 19)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1.5 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>Foto Dokumentasi Fisik (Before / After):</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => alert('Foto unit sebelum pengerjaan telah diarsipkan ke Cloud Storage Lab.')}
                      className="flex-1 p-2 rounded-xl bg-[#F8F9FA] hover:bg-black/5 border border-dashed border-black/[0.15] text-[11px] text-[#475467] flex items-center justify-center gap-1.5 transition"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>Foto Before (Tersimpan)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Foto unit setelah pengerjaan lolos QC telah diarsipkan.')}
                      className="flex-1 p-2 rounded-xl bg-[#F8F9FA] hover:bg-black/5 border border-dashed border-black/[0.15] text-[11px] text-[#475467] flex items-center justify-center gap-1.5 transition"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Foto After</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Internal Technician Log Note */}
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1.5 flex items-center justify-between">
                  <span>Catatan Teknisi Meja Kerja (Tampil di Tracker Klien):</span>
                  <span className="text-[10px] text-[#98A2B3]">Sinkronisasi Otomatis</span>
                </label>
                <textarea
                  rows={3}
                  value={activeOrder.techNotes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8F9FA] border border-black/[0.08] text-xs font-medium text-[#0B0F17] focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCompleteRepairAndWarranty}
                  className="btn-nested-cta flex-1 justify-between py-3 px-5 group bg-emerald-600 hover:bg-emerald-700"
                >
                  <div className="text-left">
                    <div className="text-xs font-bold">Lolos QC 18 Titik & Terbitkan Garansi Digital</div>
                    <div className="text-[10px] text-white/80">Selesaikan servis & aktifkan nomor garansi resmi</div>
                  </div>
                  <span className="btn-nested-icon !w-7 !h-7 bg-white/20">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 2000);
                  }}
                  className="btn-pill-secondary text-xs py-3 px-5 justify-center"
                >
                  <Save className="w-4 h-4 text-[#0066FF]" />
                  <span>Simpan Progres Meja</span>
                </button>
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Perubahan data teknisi berhasil disimpan ke Cloud Database FixGo!</span>
                </div>
              )}

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
