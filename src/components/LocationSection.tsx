'use client';

import React from 'react';
import { MapPin, Clock, Phone, ArrowUpRight, Navigation, Sparkles } from 'lucide-react';
import { OUTLET_TASIKMALAYA } from '@/lib/constants';

export default function LocationSection() {
  return (
    <section id="location" className="py-24 bg-white border-t border-black/[0.06]">
      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="eyebrow-badge">
                <span className="status-live-dot"></span>
                PUSAT OPERASIONAL UTAMA
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F17]">
              Kunjungi Outlet Fisik FixGo Tasikmalaya
            </h2>
            <p className="text-sm text-[#475467] leading-relaxed">
              Konsultasikan masalah gadget Anda langsung di lab servis kami. Teknisi kami siap melakukan pemeriksaan diagnostik gratis di tempat sebelum Anda memutuskan tindakan servis.
            </p>

            <div className="space-y-4 pt-2 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#0B0F17]">Alamat Outlet Tasikmalaya:</div>
                  <div className="text-[#475467] leading-relaxed">{OUTLET_TASIKMALAYA.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#0B0F17] flex items-center gap-2">
                    <span>Jam Operasional:</span>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Buka Sekarang
                    </span>
                  </div>
                  <div className="text-[#475467]">{OUTLET_TASIKMALAYA.operationalHours}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#0B0F17]">WhatsApp CS & Admin Outlet:</div>
                  <a
                    href={OUTLET_TASIKMALAYA.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0066FF] hover:underline font-mono font-bold"
                  >
                    {OUTLET_TASIKMALAYA.phone}
                  </a>
                  <div className="text-[10px] text-[#98A2B3]">Respon cepat dalam hitungan menit</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={OUTLET_TASIKMALAYA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-nested-cta text-xs py-2 px-4 justify-between"
              >
                <span>Chat Admin WhatsApp</span>
                <span className="btn-nested-icon !w-6 !h-6">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </span>
              </a>
              <a
                href="https://maps.google.com/?q=Tasikmalaya"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-secondary text-xs py-2 px-4 justify-center"
              >
                <Navigation className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Buka Google Maps</span>
              </a>
            </div>
          </div>

          {/* Embedded Map Container */}
          <div className="lg:col-span-7">
            <div className="double-bezel-shell">
              <div className="double-bezel-core overflow-hidden h-[380px] rounded-[calc(2rem-0.375rem)] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126600.0!2d108.2!3d-7.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6573c8801d0001%3A0x401e8f1fc28c680!2sTasikmalaya%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Outlet FixGo Tasikmalaya"
                ></iframe>

                {/* Floating Map Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#0B0F17]/90 backdrop-blur-md text-white p-3.5 rounded-2xl border border-white/10 shadow-xl flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-[#0066FF] flex items-center justify-center text-white shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">FixGo Hardware Lab Tasikmalaya</div>
                    <div className="text-[11px] text-white/70">Pusat Layanan Resmi iPhone & iPad</div>
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
