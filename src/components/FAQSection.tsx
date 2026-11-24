'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { OUTLET_TASIKMALAYA } from '@/lib/constants';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'Keamanan' | 'Teknis' | 'Garansi' | 'Pembayaran';
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    category: 'Keamanan',
    question: 'Apakah data di iPhone saya akan hilang atau di-reset saat diservis?',
    answer:
      'Sama sekali tidak hilang (100% Aman). Teknisi FixGo menerapkan standar Zero-Data-Wipe. Kami tidak meminta passcode kunci layar dan tidak melakukan reset pabrik. Semua data foto, kontak, riwayat chat WhatsApp, hingga akun perbankan Anda tetap utuh seperti sedia kala.',
  },
  {
    id: 2,
    category: 'Teknis',
    question: 'Apakah fitur TrueTone dan Face ID tetap aktif setelah ganti Layar OLED?',
    answer:
      'Ya, tetap aktif 100%. Kami menggunakan alat khusus EEPROM Programmer untuk membaca dan mentransfer serial TrueTone dari layar lama ke layar baru. Kalibrasi dilakukan di clean room lab untuk memastikan modul TrueDepth Face ID tetap berfungsi presisi.',
  },
  {
    id: 3,
    category: 'Teknis',
    question: 'Berapa lama estimasi pengerjaan di Outlet Tasikmalaya? Apakah bisa ditunggu?',
    answer:
      'Pengerjaan sangat ekspres dan bisa ditunggu langsung di outlet! Penggantian baterai membutuhkan waktu 15 - 30 menit, penggantian layar Retina OLED 30 - 45 menit, dan pemisahan backglass laser sekitar 60 menit. Anda bisa menunggu santai di lounge ber-AC kami sambil menyaksikan proses servis melalui meja kaca transparan.',
  },
  {
    id: 4,
    category: 'Garansi',
    question: 'Bagaimana syarat dan cara klaim garansi jika baterai drop atau layar bermasalah?',
    answer:
      'Klaim garansi di FixGo 100% tanpa ribet dan tanpa syarat nota kertas. Cukup sebutkan Nomor WhatsApp Anda atau tunjukkan Kartu Garansi Digital (QR Code) dari website ini. Selama masa garansi aktif (6 s/d 18 bulan) dan tidak ada kerusakan akibat benturan fisik ekstrem atau masuk air, komponen akan langsung diganti baru (1-to-1 Replacement) tanpa biaya tambahan.',
  },
  {
    id: 5,
    category: 'Pembayaran',
    question: 'Metode pembayaran apa saja yang diterima di FixGo Outlet Tasikmalaya?',
    answer:
      'Kami melayani pembayaran tunai (Cash) dan nontunai instan: QRIS (BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana), Transfer Bank, serta Virtual Account. Nota resmi berformat digital & fisik langsung terbit secara otomatis setelah pembayaran terverifikasi.',
  },
  {
    id: 6,
    category: 'Teknis',
    question: 'Bagaimana jika iPhone saya mati total atau terkena air (Water Damage)?',
    answer:
      'Teknisi lab kami menyediakan diagnosa gratis di meja periksa untuk menganalisis jalur korsleting pada IC Power, Motherboard, atau baterai. Kami akan menginformasikan estimasi biaya perbaikan terlebih dahulu untuk persetujuan Anda sebelum pengerjaan dimulai.',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1); // Default first item open

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-black/[0.06] relative">
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="eyebrow-badge">
            <HelpCircle className="w-3.5 h-3.5 text-[#0066FF]" />
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F17]">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm sm:text-base text-[#475467]">
            Pelajari standar keamanan data, protokol teknisi, dan tata cara klaim garansi digital sebelum melakukan perbaikan perangkat Anda.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all border ${
                  isOpen
                    ? 'bg-[#F8F9FA] border-[#0066FF]/30 shadow-sm'
                    : 'bg-white border-black/[0.08] hover:border-black/[0.14]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0066FF] shrink-0">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#0B0F17] leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#0066FF] text-white rotate-180' : 'bg-black/[0.04] text-[#475467]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#475467] leading-relaxed border-t border-black/[0.04] animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Bottom Callout */}
        <div className="p-6 rounded-2xl bg-[#0B0F17] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#0066FF]" />
              <span>Punya pertanyaan lain seputar kendala iPhone Anda?</span>
            </div>
            <p className="text-xs text-white/60">
              Konsultasikan gratis dengan teknisi kami via WhatsApp atau tanyakan langsung ke Asisten AI 24 Jam.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href={OUTLET_TASIKMALAYA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nested-cta text-xs py-2 px-4 whitespace-nowrap"
            >
              <span>Chat Teknisi Lab</span>
              <span className="btn-nested-icon !w-6 !h-6">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
