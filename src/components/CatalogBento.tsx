'use client';

import React from 'react';
import { BatteryCharging, Smartphone, ScanFace, Sparkles, Camera, ArrowUpRight } from 'lucide-react';

export default function CatalogBento() {
  return (
    <section id="services" className="py-24 bg-white border-t border-black/[0.06]">
      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="eyebrow-badge">KATALOG RESMI FIXGO</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F17]">
            Daftar Harga Transparan Tanpa Biaya Tersembunyi
          </h2>
          <p className="text-sm sm:text-base text-[#475467]">
            Seluruh harga sudah mencakup suku cadang bergaransi resmi dan biaya jasa teknisi berpengalaman.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento 1: Battery Replacement (Col 7) */}
          <div className="md:col-span-7 double-bezel-shell">
            <div className="double-bezel-core p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                    <BatteryCharging className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B0F17]">Ganti Baterai Original Bergaransi</h3>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Garansi s/d 18 Bln
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[#667085] uppercase tracking-wider border-b border-black/[0.06]">
                    <tr>
                      <th className="py-2.5 font-semibold">Tipe iPhone</th>
                      <th className="py-2.5 font-semibold text-center">Garansi 6 Bln</th>
                      <th className="py-2.5 font-semibold text-center text-[#0066FF]">Garansi 12 Bln</th>
                      <th className="py-2.5 font-semibold text-center">Garansi 18 Bln</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] text-[#344054] font-mono tabular-nums">
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-[#0B0F17]">iPhone 6 / 7 / 8 Plus</td>
                      <td className="py-2.5 text-center">109k - 120k</td>
                      <td className="py-2.5 text-center font-bold text-[#0066FF]">134k - 145k</td>
                      <td className="py-2.5 text-center">234k - 245k</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-[#0B0F17]">iPhone X / XR / XS</td>
                      <td className="py-2.5 text-center">199k</td>
                      <td className="py-2.5 text-center font-bold text-[#0066FF]">224k</td>
                      <td className="py-2.5 text-center">324k</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-[#0B0F17]">iPhone 11 Series</td>
                      <td className="py-2.5 text-center">249k</td>
                      <td className="py-2.5 text-center font-bold text-[#0066FF]">274k</td>
                      <td className="py-2.5 text-center">374k</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-[#0B0F17]">iPhone 12 Series</td>
                      <td className="py-2.5 text-center">299k</td>
                      <td className="py-2.5 text-center font-bold text-[#0066FF]">324k</td>
                      <td className="py-2.5 text-center">424k</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-[#0B0F17]">iPhone 13 Series</td>
                      <td className="py-2.5 text-center">359k</td>
                      <td className="py-2.5 text-center font-bold text-[#0066FF]">384k</td>
                      <td className="py-2.5 text-center">484k</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-sans font-medium text-[#0B0F17]">iPhone 14 Pro Max</td>
                      <td className="py-2.5 text-center">499k</td>
                      <td className="py-2.5 text-center font-bold text-[#0066FF]">524k</td>
                      <td className="py-2.5 text-center">624k</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bento 2: Screen & OLED (Col 5) */}
          <div className="md:col-span-5 double-bezel-shell">
            <div className="double-bezel-core p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#0B0F17]">Screen & Retina OLED</h3>
              </div>
              <p className="text-xs text-[#475467] leading-relaxed">
                Penggantian layar pecah / sentuh bermasalah dengan komponen presisi tinggi. TrueTone tetap aktif dan sensitivitas sentuhan 100% mulus.
              </p>
              <div className="space-y-2 text-xs pt-2 font-mono">
                <div className="flex justify-between py-1.5 border-b border-black/[0.04]">
                  <span className="font-sans text-[#475467]">iPhone 7 - 8 Plus</span>
                  <span className="font-bold text-[#0B0F17]">199k - 249k</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-black/[0.04]">
                  <span className="font-sans text-[#475467]">iPhone X / XR / 11</span>
                  <span className="font-bold text-[#0B0F17]">389k - 549k</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-black/[0.04]">
                  <span className="font-sans text-[#475467]">iPhone 12 / 13 Series</span>
                  <span className="font-bold text-[#0B0F17]">680k - 1.250k</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-sans text-[#475467]">iPhone 14 / 15 Pro Max</span>
                  <span className="font-bold text-[#0066FF]">Konsultasi Khusus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento 3: Face ID (Col 4) */}
          <div className="md:col-span-4 double-bezel-shell">
            <div className="double-bezel-core p-6 space-y-3">
              <div className="flex items-center gap-2">
                <ScanFace className="w-4 h-4 text-[#0066FF]" />
                <span className="text-xs font-bold text-[#0066FF] uppercase">Sensor Precision</span>
              </div>
              <h4 className="text-base font-bold text-[#0B0F17]">Service Sensor Face ID</h4>
              <p className="text-xs text-[#475467] leading-relaxed">
                Mengatasi Face ID mati akibat air, benturan, atau sensor TrueDepth tidak terbaca tanpa perlu ganti mesin.
              </p>
              <div className="pt-3 font-mono text-xs space-y-1.5">
                <div className="flex justify-between"><span>iP X / XR:</span> <b>349k</b></div>
                <div className="flex justify-between"><span>iP 11 - 12PM:</span> <b>499k</b></div>
                <div className="flex justify-between text-[#0066FF]"><span>iP 13 - 14PM:</span> <b>849k</b></div>
              </div>
            </div>
          </div>

          {/* Bento 4: Backglass Laser (Col 4) */}
          <div className="md:col-span-4 double-bezel-shell">
            <div className="double-bezel-core p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0066FF]" />
                <span className="text-xs font-bold text-[#0066FF] uppercase">Laser Technology</span>
              </div>
              <h4 className="text-base font-bold text-[#0B0F17]">Backglass & Housing</h4>
              <p className="text-xs text-[#475467] leading-relaxed">
                Penggantian kaca belakang pecah dengan mesin laser tanpa membongkar mesin utama perangkat Anda.
              </p>
              <div className="pt-3 font-mono text-xs space-y-1.5">
                <div className="flex justify-between"><span>iP 8 s/d XR:</span> <b>149k</b></div>
                <div className="flex justify-between"><span>iP 11 - 12 Series:</span> <b>199k - 275k</b></div>
                <div className="flex justify-between text-[#0066FF]"><span>iP 13 - 14PM:</span> <b>349k - 449k</b></div>
              </div>
            </div>
          </div>

          {/* Bento 5: Camera Module (Col 4) */}
          <div className="md:col-span-4 double-bezel-shell">
            <div className="double-bezel-core p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#0066FF]" />
                <span className="text-xs font-bold text-[#0066FF] uppercase">Optics & Focus</span>
              </div>
              <h4 className="text-base font-bold text-[#0B0F17]">Kamera Depan & Belakang</h4>
              <p className="text-xs text-[#475467] leading-relaxed">
                Mengatasi kamera bergetar, bintik hitam, autofokus gagal, atau lensa kaca pecah dengan modul bergaransi.
              </p>
              <div className="pt-3 font-mono text-xs space-y-1.5">
                <div className="flex justify-between"><span>Kamera Depan:</span> <b>85k - 999k</b></div>
                <div className="flex justify-between"><span>Kamera Belakang:</span> <b>109k - 1.499k</b></div>
                <div className="flex justify-between text-emerald-600"><span>Garansi Pengerjaan:</span> <b>30 Hari</b></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Footer Callout */}
        <div className="p-6 rounded-2xl bg-[#0B0F17] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#0066FF]" />
              <span>Semua Biaya Termasuk Jasa Teknisi & Pengujian Sensor 18 Titik</span>
            </div>
            <p className="text-xs text-white/60">
              Tidak ada biaya tersembunyi. Nota fisik dan sertifikat garansi digital otomatis terbit setelah selesai.
            </p>
          </div>
          <a href="#booking" className="btn-nested-cta text-xs py-2 px-4 whitespace-nowrap">
            <span>Hitung Estimasi Servis</span>
            <span className="btn-nested-icon !w-6 !h-6">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
