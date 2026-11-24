import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;
let model: ReturnType<GoogleGenerativeAI['getGenerativeModel']> | null = null;

if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: `Kamu adalah Asisten Virtual Resmi FixGo Hardware Diagnostic Lab (Laboratorium Servis iPhone & Gadget Terintegrasi Outlet Tasikmalaya).
Lokasi Outlet Fisik: Kota Tasikmalaya, Jawa Barat.
Jam Operasional: Setiap hari (Senin - Minggu) pukul 10:00 - 20:00 WIB.
WhatsApp Admin: 0858-6447-9760.

Aturan Utama:
1. Panggil pengguna dengan sopan, ramah, dan solutif ('Kak').
2. Gunakan gaya bahasa profesional berstandar Apple Hardware Specialist.
3. Berikan informasi biaya HANYA berdasarkan katalog resmi FixGo berikut:
   - Ganti Baterai Original High Capacity:
     * iPhone 6 / 7 / 8 Plus: Rp 109.000 - Rp 245.000 (Garansi 6-18 Bln)
     * iPhone X / XR / XS: Rp 199.000 - Rp 324.000 (Garansi 6-18 Bln)
     * iPhone 11 Series: Rp 249.000 - Rp 374.000 (Garansi 6-18 Bln)
     * iPhone 12 Series: Rp 299.000 - Rp 424.000 (Garansi 6-18 Bln)
     * iPhone 13 Series: Rp 359.000 - Rp 484.000 (Garansi 6-18 Bln)
     * iPhone 14 Pro Max: Rp 499.000 - Rp 624.000 (Garansi 6-18 Bln)
   - Ganti Layar / Retina OLED (TrueTone Aktif & Sensitivitas 100%):
     * iPhone 7 / 8 Plus: Rp 199.000 - Rp 249.000
     * iPhone X / XR / 11: Rp 389.000 - Rp 549.000
     * iPhone 12 / 13 Series: Rp 680.000 - Rp 1.250.000
     * iPhone 14 / 15 Series: Konsultasi khusus teknisi lab
   - Perbaikan Sensor Face ID / Modul TrueDepth:
     * iPhone X / XR: Rp 349.000
     * iPhone 11 - 12 Pro Max: Rp 499.000
     * iPhone 13 - 14 Pro Max: Rp 849.000
   - Backglass Laser Chassis (Pemisahan Laser Presisi):
     * iPhone 8 s/d XR: Rp 149.000
     * iPhone 11 - 12 Series: Rp 199.000 - Rp 275.000
     * iPhone 13 - 14 Pro Max: Rp 349.000 - Rp 449.000
   - Modul Kamera & Lensa Kaca: Mulai Rp 85.000 s/d Rp 1.499.000
4. Keunggulan FixGo:
   - Semua harga SUDAH TERMASUK biaya jasa pasang teknisi berlisensi dan uji sensor QC 18 titik.
   - Garansi resmi fisik & digital (Apple Wallet Pass) hingga 18 bulan tanpa risiko nota hilang.
   - Pengerjaan rata-rata ekspres 15 - 45 menit bisa ditunggu di outlet Tasikmalaya.
5. Jika pengguna menanyakan konsultasi kerusakan mesin/IC, air (water damage), atau ingin reservasi, sarankan untuk booking di web atau chat WhatsApp teknisi di 0858-6447-9760.`,
  });
}

function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('baterai') || q.includes('battery') || q.includes('health') || q.includes('drop')) {
    return 'Penggantian baterai iPhone di FixGo sudah termasuk biaya pasang, kalibrasi sistem, dan Kartu Garansi Digital Resmi:\n\n' +
      '• iPhone 6 - 8 Plus: Rp 109.000 - Rp 245.000\n' +
      '• iPhone X / XR / XS: Rp 199.000 - Rp 324.000\n' +
      '• iPhone 11 Series: Rp 249.000 - Rp 374.000\n' +
      '• iPhone 12 Series: Rp 299.000 - Rp 424.000\n' +
      '• iPhone 13 Series: Rp 359.000 - Rp 484.000\n' +
      '• iPhone 14 Pro Max: Rp 499.000 - Rp 624.000\n\n' +
      'Tersedia pilihan masa garansi 6, 12, hingga 18 bulan resmi.';
  }

  if (q.includes('lcd') || q.includes('layar') || q.includes('screen') || q.includes('pecah') || q.includes('garis')) {
    return 'Layanan pergantian layar di FixGo menggunakan panel presisi tinggi dengan fitur TrueTone tetap aktif:\n\n' +
      '• iPhone 7 - 8 Plus: Rp 199.000 - Rp 249.000\n' +
      '• iPhone X / XR / 11: Rp 389.000 - Rp 549.000\n' +
      '• iPhone 12 / 13 Series: Rp 680.000 - Rp 1.250.000\n' +
      '• iPhone 14 / 15 Series: Konsultasi khusus teknisi lab\n\n' +
      'Pengerjaan sekitar 30 menit dan sudah melewati kalibrasi 18 titik sensor sentuh.';
  }

  if (q.includes('face id') || q.includes('faceid') || q.includes('truedepth') || q.includes('sensor')) {
    return 'Perbaikan Face ID di FixGo fokus memperbaiki modul TrueDepth & proyektor titik tanpa perlu mengganti mesin induk:\n\n' +
      '• iPhone X / XR: Rp 349.000\n' +
      '• iPhone 11 s/d 12 Pro Max: Rp 499.000\n' +
      '• iPhone 13 s/d 14 Pro Max: Rp 849.000\n\n' +
      'Data ponsel Anda tetap 100% aman dan bergaransi resmi.';
  }

  if (q.includes('backglass') || q.includes('kaca belakang') || q.includes('laser') || q.includes('casing') || q.includes('housing')) {
    return 'Pergantian kaca belakang pecah menggunakan teknologi laser presisi tanpa membongkar mesin utama:\n\n' +
      '• iPhone 8 s/d XR: Rp 149.000\n' +
      '• iPhone 11 - 12 Series: Rp 199.000 - Rp 275.000\n' +
      '• iPhone 13 - 14 Pro Max: Rp 349.000 - Rp 449.000\n\n' +
      'Hasil rapi, rapat seperti pabrikan, dan tahan air.';
  }

  if (q.includes('kamera') || q.includes('camera') || q.includes('getar') || q.includes('bintik')) {
    return 'Perbaikan modul kamera (autofokus getar, bintik hitam, atau kaca lensa pecah) berkisar mulai Rp 85.000 untuk lensa luar hingga Rp 1.499.000 untuk modul kamera sensor ganda/tiga.';
  }

  if (q.includes('garansi') || q.includes('warranty') || q.includes('klaim')) {
    return 'FixGo menerapkan sistem Garansi Digital Resmi (Hardware Warranty Pass) berjangka 6 s/d 18 bulan:\n\n' +
      '1. Tanpa risiko nota fisik hilang (tercatat di cloud toko).\n' +
      '2. Dilengkapi QR Code & Barcode unik.\n' +
      '3. Klaim instan di outlet Tasikmalaya cukup sebutkan nomor HP atau scan QR Code Anda.';
  }

  if (q.includes('alamat') || q.includes('lokasi') || q.includes('toko') || q.includes('outlet') || q.includes('tasik') || q.includes('buka') || q.includes('jam')) {
    return 'Outlet fisik utama FixGo beralamat di Pusat Layanan Servis FixGo, Kota Tasikmalaya, Jawa Barat.\n\n' +
      '• Jam Buka: Setiap hari (Senin - Minggu) pukul 10:00 - 20:00 WIB.\n' +
      '• WhatsApp Admin: 0858-6447-9760\n\n' +
      'Pemeriksaan awal dan diagnosa kerusakan unit di tempat sepenuhnya GRATIS!';
  }

  if (q.includes('booking') || q.includes('pesan') || q.includes('antrean') || q.includes('order')) {
    return 'Kakak bisa langsung melakukan reservasi melalui fitur "Booking Online" di halaman ini. Sistem akan otomatis memberikan Nomor Order resmi (FXG-TASIK-XXXX) dan menghubungkan Kakak ke WhatsApp admin untuk konfirmasi jadwal.';
  }

  return 'Halo Kak! Saya Asisten AI Resmi FixGo Lab Tasikmalaya. Saya siap membantu estimasi biaya servis (Baterai, Layar OLED, Face ID, Backglass Laser, Kamera, dll). Kakak sedang mengalami kendala apa pada iPhone-nya?';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ reply: 'Pesan tidak boleh kosong.' }, { status: 400 });
    }

    if (model) {
      try {
        const result = await model.generateContent(message);
        const reply = result.response.text();
        return NextResponse.json({ reply });
      } catch (err: unknown) {
        console.warn('Gemini call failed, fallback to local grounded rules:', (err as Error).message);
      }
    }

    const reply = getLocalFallbackResponse(message);
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    console.error('API Chat Error:', err);
    return NextResponse.json(
      { reply: 'Halo Kak, silakan hubungi teknisi kami via WhatsApp di 0858-6447-9760 untuk bantuan langsung ya.' },
      { status: 500 }
    );
  }
}
