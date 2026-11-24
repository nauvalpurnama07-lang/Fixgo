'use client';

import React, { useState, useEffect } from 'react';
import { Search, Info, Check, Sparkles, User, Wrench, ShieldCheck, Clock } from 'lucide-react';
import { SERVICE_STAGES } from '@/lib/constants';

interface ServiceTrackerProps {
  externalOrder?: {
    id: string;
    device: string;
    service: string;
  } | null;
}

export default function ServiceTracker({ externalOrder }: ServiceTrackerProps) {
  const [orderQuery, setOrderQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState('FXG-2611-0849');
  const [deviceInfo, setDeviceInfo] = useState('iPhone 13 Pro (128GB)');
  const [serviceInfo, setServiceInfo] = useState('Pergantian Baterai Garansi 18 Bln');
  const [currentStageId, setCurrentStageId] = useState(6); // Default: In Progress
  const [techNotes, setTechNotes] = useState(
    'Baterai lama telah dilepas aman, residu lem dibersihkan, lem baterai baru terpasang rapi. Sedang menjalani tes siklus pengisian daya dan kalibrasi sistem.'
  );

  // Sync when user completes a booking on the same page
  useEffect(() => {
    if (externalOrder) {
      setActiveOrder(externalOrder.id);
      setDeviceInfo(externalOrder.device);
      setServiceInfo(externalOrder.service);
      setCurrentStageId(1); // 1 = ORDER_RECEIVED
      setTechNotes(
        `Pesanan baru (${externalOrder.id}) telah didaftarkan ke antrean sistem lab FixGo Outlet Tasikmalaya. Menunggu serah terima unit di meja resepsionis.`
      );
    }
  }, [externalOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = orderQuery.trim().toUpperCase() || 'FXG-2611-0849';
    setActiveOrder(query);

    if (query.includes('TASIK')) {
      setCurrentStageId(1);
      setTechNotes(
        `Pesanan ${query} tercatat di sistem FixGo Outlet Tasikmalaya. Status saat ini: Menunggu konfirmasi antrean teknisi lab.`
      );
    } else {
      setCurrentStageId(6);
      setTechNotes(
        `Pengecekan teknisi untuk unit ${query}: Komponen presisi terpasang rapi. Segel garansi resmi FixGo siap diaplikasikan setelah melewati 18 titik pengujian QC.`
      );
    }
  };

  const currentStageObj = SERVICE_STAGES.find((s) => s.id === currentStageId) || SERVICE_STAGES[5];

  return (
    <section id="tracker" className="py-24 bg-white border-y border-black/[0.06] relative">
      <div className="container mx-auto px-4 max-w-5xl space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="eyebrow-badge">
            <span className="status-live-dot"></span>
            LIVE SERVICE TRACKER
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F17]">
            Pantau Status Pengerjaan Real-time
          </h2>
          <p className="text-sm sm:text-base text-[#475467]">
            Transparansi penuh tanpa rasa was-was. Periksa status pengerjaan, hasil diagnosa, hingga catatan teknisi langsung dari sistem operasional lab kami.
          </p>
        </div>

        {/* Tracker Search Input Card */}
        <div className="double-bezel-shell max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="double-bezel-core p-4 sm:p-5 flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Contoh: FXG-2611-0849 atau no. WA"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border border-black/[0.08] text-sm font-medium text-[#0B0F17] focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition font-mono uppercase"
              />
            </div>
            <button type="submit" className="btn-nested-cta w-full sm:w-auto justify-center text-xs py-3 px-5">
              <span>Lacak Servis</span>
              <span className="btn-nested-icon !w-6 !h-6">
                <Search className="w-3.5 h-3.5 text-white" />
              </span>
            </button>
          </form>
        </div>

        {/* Live 9-Stages Timeline Result Card */}
        <div className="double-bezel-shell">
          <div className="double-bezel-core p-6 sm:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0066FF] uppercase tracking-wider">No. Order Terverifikasi</span>
                  <span className="text-[10px] bg-blue-50 text-[#0066FF] px-2 py-0.5 rounded-full font-mono font-bold">Outlet Tasikmalaya</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B0F17] font-mono mt-0.5">{activeOrder}</h3>
                <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
                  <span className="font-semibold text-[#0B0F17]">{deviceInfo}</span> • {serviceInfo}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-[#0066FF] border border-blue-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Tahap {currentStageId}/9: {currentStageObj.label}</span>
                </span>
              </div>
            </div>

            {/* 9 Stages Stepper Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#475467] uppercase tracking-wider">
                  Siklus 9 Tahapan Pengerjaan FixGo:
                </span>
                <span className="text-[11px] text-[#98A2B3]">
                  Klik tahapan untuk simulasi inspeksi
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-center">
                {SERVICE_STAGES.map((stage) => {
                  const isDone = stage.id < currentStageId;
                  const isCurrent = stage.id === currentStageId;

                  let badgeBg = "bg-[#F1F3F5] text-[#98A2B3] border-transparent";
                  let dotBg = "bg-[#D0D5DD] text-white";
                  let textClass = "text-[#98A2B3]";

                  if (isDone) {
                    badgeBg = "bg-emerald-50 text-emerald-700 border-emerald-200";
                    dotBg = "bg-emerald-500 text-white";
                    textClass = "text-[#0B0F17] font-semibold";
                  } else if (isCurrent) {
                    badgeBg = "bg-blue-50 text-[#0066FF] border-[#0066FF]/30 ring-2 ring-[#0066FF]/20";
                    dotBg = "bg-[#0066FF] text-white";
                    textClass = "text-[#0066FF] font-bold";
                  }

                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => {
                        setCurrentStageId(stage.id);
                        setTechNotes(`Status diperbarui ke ${stage.label} (${stage.desc}). Teknisi outlet Tasikmalaya memastikan protokol presisi terpenuhi.`);
                      }}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border ${badgeBg} transition-all cursor-pointer hover:scale-105 active:scale-95`}
                      title={stage.desc}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${dotBg}`}>
                        {isDone ? <Check className="w-3.5 h-3.5" /> : stage.id}
                      </div>
                      <div className={`text-[10px] leading-tight ${textClass}`}>{stage.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Stage Description & Technician Live Notes */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 p-4 rounded-xl bg-[#F8F9FA] border border-black/[0.06] flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-[#0B0F17] flex items-center gap-1.5">
                    <span>Catatan Teknisi Lab (Tasikmalaya)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-[#475467] leading-relaxed">{techNotes}</div>
                </div>
              </div>

              <div className="md:col-span-4 p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-blue-200 flex items-center justify-center text-[#0066FF] shrink-0 font-bold text-xs">
                  LAB
                </div>
                <div className="text-xs">
                  <div className="font-bold text-[#0B0F17]">Teknisi Penanggung Jawab</div>
                  <div className="text-[#475467] text-[11px]">Station 02 • Clean Room Tasik</div>
                  <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3" /> Sertifikasi Level 3 Hardware
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
