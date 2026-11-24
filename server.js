require('dotenv').config();
const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini if key is provided
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
let genAI = null;
let model = null;

if (GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: `Kamu adalah Asisten Virtual Resmi FixGo Digital Operational System (Laboratorium Servis iPhone & Gadget Terintegrasi).
Lokasi Outlet Fisik Utama: Tasikmalaya, Jawa Barat. Jam operasional: Setiap hari 10.00 - 20.00 WIB.
Aturan Penting:
1. Panggil pengguna dengan sopan, ramah, dan profesional ('Kak').
2. Berikan informasi harga HANYA berdasarkan database resmi FixGo berikut:
   - Ganti Baterai Original (Garansi 6-18 Bln): iPhone 6-8+ (109k-245k), iP X/XR/XS (199k-324k), iP 11 Series (249k-374k), iP 12 Series (299k-424k), iP 13 Series (359k-484k), iP 14PM (499k-624k).
   - Ganti Layar / LCD Retina OLED: iPhone 7-8+ (199k-249k), iP X-11 (389k-549k), iP 12-13 (680k-1.250k).
   - Service Face ID: iP X/XR (349k), iP 11-12PM (499k), iP 13-14PM (849k).
   - Backglass Laser: iP 8-XR (149k), iP 11-12 (199k-275k), iP 13-14PM (349k-449k).
   - Kamera Depan/Belakang: 85k s/d 1.499k.
3. Semua harga sudah termasuk jasa pasang teknisi lab dan kartu garansi digital tersegel.
4. Jangan pernah mengarang harga di luar database. Jika ada tipe di luar iPhone atau kerusakan mesin/IC berat, arahkan untuk konsultasi langsung dengan teknisi outlet Tasikmalaya.`
    });
}

// Fallback Rule-Based Engine (Guaranteed zero-downtime if AI API is offline)
function getLocalFallbackResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('baterai') || q.includes('battery')) {
        return "Untuk penggantian baterai iPhone di FixGo, semua sudah bergaransi resmi 6 s/d 18 bulan dan termasuk biaya pasang: iPhone 6-8 Plus (109k - 245k), iPhone X/XR/XS (199k - 324k), iPhone 11 Series (249k - 374k), iPhone 12 Series (299k - 424k), iPhone 13 Series (359k - 484k), dan iPhone 14 Pro Max (499k - 624k).";
    }
    if (q.includes('lcd') || q.includes('layar') || q.includes('screen')) {
        return "Penggantian layar LCD / Retina OLED di FixGo dijamin presisi dan TrueTone tetap aktif: iPhone 7-8 Plus mulai 199k, iPhone X/XR/11 mulai 389k - 549k, dan iPhone 12-13 Series mulai 680k - 1.250k. Sudah termasuk garansi pengujian lab.";
    }
    if (q.includes('face id') || q.includes('faceid')) {
        return "Perbaikan sensor Face ID / modul TrueDepth di FixGo bergaransi: iPhone X/XR (349k), iPhone 11 s/d 12 Pro Max (499k), dan iPhone 13 s/d 14 Pro Max (849k). Tanpa perlu mengganti mesin.";
    }
    if (q.includes('garansi') || q.includes('warranty')) {
        return "Setiap perbaikan di FixGo mendapatkan Kartu Garansi Digital Resmi (Hardware Warranty Pass) tersegel dengan masa berlaku 1 s/d 18 bulan sesuai jenis komponen. Status garansi bisa dicek langsung di menu 'Garansi Digital' pada website ini.";
    }
    if (q.includes('alamat') || q.includes('lokasi') || q.includes('toko') || q.includes('outlet') || q.includes('tasik')) {
        return "Outlet fisik utama FixGo saat ini beroperasi di Tasikmalaya, Jawa Barat. Buka setiap hari pukul 10.00 – 20.00 WIB. Anda dapat datang langsung untuk konsultasi dan pemeriksaan gratis di meja teknisi lab kami.";
    }
    if (q.includes('booking') || q.includes('order') || q.includes('pesan')) {
        return "Untuk melakukan booking antrean servis, Kakak bisa langsung mengisi formulir interaktif di bagian menu 'Booking Online' di halaman web ini. Kakak akan mendapatkan Nomor Order resmi dan estimasi biaya instan.";
    }

    return "Halo Kak! FixGo siap melayani perbaikan iPhone (Baterai, Layar OLED, Face ID, Backglass, Kamera, hingga Mesin). Kakak bisa cek estimasi harga di web atau klik tombol WhatsApp untuk konsultasi langsung dengan teknisi kami ya.";
}

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ reply: "Pesan tidak boleh kosong." });
        }

        // Try Gemini AI first if configured
        if (model) {
            try {
                const result = await model.generateContent(message);
                const reply = result.response.text();
                return res.json({ reply });
            } catch (aiErr) {
                console.warn("Gemini API call failed, switching to local grounded engine:", aiErr.message);
            }
        }

        // Fallback to grounded knowledge base
        const reply = getLocalFallbackResponse(message);
        return res.json({ reply });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ reply: "Halo Kak, silakan hubungi teknisi kami via WhatsApp di 0858-6447-9760 untuk bantuan langsung ya." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`FixGo Digital Operational Server running on http://localhost:${PORT}`);
});
