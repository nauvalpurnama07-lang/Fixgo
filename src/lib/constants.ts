import { ServiceStatus } from '@/types';

export const SERVICE_STAGES: { id: number; key: ServiceStatus; label: string; desc: string }[] = [
  { id: 1, key: 'ORDER_RECEIVED', label: 'Order Received', desc: 'Pesanan masuk ke sistem lab' },
  { id: 2, key: 'WAITING_INSPECTION', label: 'Waiting Inspection', desc: 'Menunggu giliran cek teknisi' },
  { id: 3, key: 'CUSTOMER_APPROVAL', label: 'Customer Approval', desc: 'Persetujuan biaya perbaikan' },
  { id: 4, key: 'WAITING_PAYMENT', label: 'Waiting Payment', desc: 'Menunggu pembayaran QRIS/VA' },
  { id: 5, key: 'PAID', label: 'Paid', desc: 'Pembayaran terverifikasi' },
  { id: 6, key: 'IN_PROGRESS', label: 'In Progress', desc: 'Sedang dikerjakan teknisi lab' },
  { id: 7, key: 'QUALITY_CONTROL', label: 'Quality Control', desc: 'Pengujian 18 titik sensor & fungsi' },
  { id: 8, key: 'COMPLETED', label: 'Completed', desc: 'Pengerjaan selesai & garansi aktif' },
  { id: 9, key: 'PICKED_UP', label: 'Picked Up', desc: 'Perangkat telah diserahkan' },
];

export const IPHONE_MODELS = [
  'iPhone 11 Series',
  'iPhone 12 Series',
  'iPhone 13 Series',
  'iPhone 14 Series',
  'iPhone 15 Series',
];

export const SERVICE_OPTIONS = [
  {
    id: 'battery',
    title: 'Ganti Baterai High Capacity',
    desc: 'Garansi resmi 12 s/d 18 bulan',
    defaultCost: 384000,
  },
  {
    id: 'screen',
    title: 'Ganti Layar (Retina OLED)',
    desc: 'Warna akurat, TrueTone tetap aktif',
    defaultCost: 890000,
  },
  {
    id: 'faceid',
    title: 'Service Sensor Face ID',
    desc: 'Perbaikan modul TrueDepth tanpa ganti mesin',
    defaultCost: 499000,
  },
  {
    id: 'backglass',
    title: 'Backglass & Housing Chassis',
    desc: 'Pemisahan presisi teknologi laser',
    defaultCost: 275000,
  },
];

export const OUTLET_TASIKMALAYA = {
  name: 'FixGo Outlet Tasikmalaya',
  address: 'Pusat Layanan Servis FixGo, Kota Tasikmalaya, Jawa Barat',
  operationalHours: 'Senin – Minggu: 10:00 – 20:00 WIB',
  phone: '0858-6447-9760',
  whatsappUrl: 'https://wa.me/6285864479760',
};
