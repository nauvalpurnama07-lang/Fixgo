'use client';

import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Printer, 
  Smartphone, 
  Send, 
  PlusCircle, 
  Clock, 
  Receipt, 
  ArrowRight,
  Search,
  Check,
  DollarSign
} from 'lucide-react';
import { IPHONE_MODELS, SERVICE_OPTIONS } from '@/lib/constants';

interface CashierOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  deviceModel: string;
  service: string;
  cost: number;
  paymentStatus: 'WAITING_PAYMENT' | 'PAID';
  serviceStatus: 'WAITING_INSPECTION' | 'IN_PROGRESS' | 'COMPLETED' | 'PICKED_UP';
  paymentMethod?: 'QRIS' | 'CASH' | 'TRANSFER';
}

const INITIAL_CASHIER_ORDERS: CashierOrder[] = [
  {
    id: 'FXG-TASIK-2026-0849',
    customerName: 'Ahmad Fauzi',
    customerPhone: '081234567890',
    deviceModel: 'iPhone 13 Pro (128GB)',
    service: 'Ganti Baterai Original (Garansi 18 Bln)',
    cost: 484000,
    paymentStatus: 'WAITING_PAYMENT',
    serviceStatus: 'IN_PROGRESS',
  },
  {
    id: 'FXG-TASIK-2026-1405',
    customerName: 'Budi Santoso',
    customerPhone: '081388990011',
    deviceModel: 'iPhone 11 (128GB)',
    service: 'Service Sensor Face ID',
    cost: 499000,
    paymentStatus: 'PAID',
    serviceStatus: 'COMPLETED',
    paymentMethod: 'QRIS',
  },
  {
    id: 'FXG-TASIK-2026-1102',
    customerName: 'Siti Rahmawati',
    customerPhone: '085711223344',
    deviceModel: 'iPhone 12 (64GB)',
    service: 'Layar Retina OLED + TrueTone',
    cost: 890000,
    paymentStatus: 'WAITING_PAYMENT',
    serviceStatus: 'WAITING_INSPECTION',
  },
];

export default function CashierTerminalPage() {
  const [orders, setOrders] = useState<CashierOrder[]>(INITIAL_CASHIER_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('FXG-TASIK-2026-0849');
  const [cashAmount, setCashAmount] = useState<string>('500000');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // New Order Form state
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newDevice, setNewDevice] = useState(IPHONE_MODELS[2]);
  const [newService, setNewService] = useState(SERVICE_OPTIONS[0]);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleMarkAsPaid = (method: 'QRIS' | 'CASH' | 'TRANSFER') => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === selectedOrderId
          ? { ...ord, paymentStatus: 'PAID', paymentMethod: method }
          : ord
      )
    );
    setActionNotice(`Pembayaran ${selectedOrder.id} sebesar ${formatRupiah(selectedOrder.cost)} BERHASIL DIVERIFIKASI via ${method}!`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleMarkAsPickedUp = () => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === selectedOrderId
          ? { ...ord, serviceStatus: 'PICKED_UP' }
          : ord
      )
    );
    setActionNotice(`Unit ${selectedOrder.id} resmi diserahkan ke pelanggan (${selectedOrder.customerName}). Tahap pengerjaan SELESAI TOTAL.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleCreateWalkInOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newCustPhone) return;

    const newId = `FXG-TASIK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrd: CashierOrder = {
      id: newId,
      customerName: newCustName,
      customerPhone: newCustPhone,
      deviceModel: newDevice,
      service: newService.title,
      cost: newService.defaultCost,
      paymentStatus: 'WAITING_PAYMENT',
      serviceStatus: 'WAITING_INSPECTION',
    };

    setOrders([newOrd, ...orders]);
    setSelectedOrderId(newId);
    setShowNewOrderModal(false);
    setNewCustName('');
    setNewCustPhone('');

    setActionNotice(`Order walk-in baru #${newId} berhasil didaftarkan ke antrean teknisi lab!`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const totalTodayCash = orders
    .filter((o) => o.paymentStatus === 'PAID')
    .reduce((acc, curr) => acc + curr.cost, 0);

  return (
    <div className="min-h-[100dvh] bg-[#F4F5F7] flex flex-col text-[#0B0F17]">
      <DashboardHeader 
        currentRole="pa" 
        staffName="Siti Rahmawati" 
        staffId="PA-ADMIN-01" 
      />

      {/* POS Top Bar */}
      <div className="bg-white border-b border-black/[0.06] py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              POS
            </div>
            <div>
              <div className="text-xs font-bold text-[#0B0F17] flex items-center gap-2">
                <span>Front Desk Kasir & Customer Relations</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                  Shift Pagi
                </span>
              </div>
              <div className="text-[11px] text-[#667085]">Kasir: Siti Rahmawati • Outlet Tasikmalaya</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            <div>
              <div className="text-[10px] text-[#98A2B3] uppercase">Total Kas Terverifikasi</div>
              <div className="font-extrabold text-emerald-600 text-sm sm:text-base">
                {formatRupiah(totalTodayCash)}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#98A2B3] uppercase">Menunggu Pembayaran</div>
              <div className="font-extrabold text-amber-600">
                {orders.filter((o) => o.paymentStatus === 'WAITING_PAYMENT').length} Transaksi
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowNewOrderModal(true)}
              className="btn-nested-cta text-xs py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 shadow-sm"
            >
              <span>+ Input Order Walk-In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Transaction List (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B0F17] flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#0066FF]" />
              <span>Daftar Transaksi Meja Kasir</span>
            </h2>
            <span className="text-[11px] font-mono text-[#667085] bg-white px-2 py-0.5 rounded-lg border border-black/[0.06]">
              {orders.length} Order
            </span>
          </div>

          <div className="space-y-2.5">
            {orders.map((ord) => {
              const isSelected = ord.id === selectedOrderId;
              return (
                <div
                  key={ord.id}
                  onClick={() => setSelectedOrderId(ord.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-[#0066FF] shadow-md ring-2 ring-[#0066FF]/10'
                      : 'bg-white border-black/[0.06] hover:border-black/[0.15]'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/[0.04]">
                    <div className="space-y-0.5">
                      <div className="text-xs font-mono font-bold text-[#0066FF]">{ord.id}</div>
                      <div className="text-xs font-bold text-[#0B0F17]">{ord.customerName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-[#0B0F17]">{formatRupiah(ord.cost)}</div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                          ord.paymentStatus === 'PAID'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {ord.paymentStatus === 'PAID' ? 'LUNAS' : 'BELUM BAYAR'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#667085]">
                    <span>{ord.deviceModel}</span>
                    <span className="text-[10px] bg-[#F1F3F5] text-[#475467] px-2 py-0.5 rounded font-mono">
                      {ord.serviceStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Billing & Invoice Desk (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="double-bezel-shell">
            <div className="double-bezel-core p-6 sm:p-7 space-y-6">
              
              {/* Order Billing Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded">
                      {selectedOrder.id}
                    </span>
                    <span className="text-xs text-[#667085]">Pelanggan:</span>
                    <span className="text-xs font-bold text-[#0B0F17]">{selectedOrder.customerName}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#475467] mt-1">
                    WhatsApp: <a href={`https://wa.me/${selectedOrder.customerPhone}`} target="_blank" className="text-[#0066FF] font-mono hover:underline">{selectedOrder.customerPhone}</a>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-[#98A2B3] uppercase font-mono">Total Tagihan</div>
                  <div className="text-2xl font-extrabold text-[#0B0F17] font-mono tabular-nums">
                    {formatRupiah(selectedOrder.cost)}
                  </div>
                </div>
              </div>

              {/* Status and Items Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                  <span className="text-[#475467]">Perangkat:</span>
                  <span className="font-bold text-[#0B0F17]">{selectedOrder.deviceModel}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                  <span className="text-[#475467]">Layanan Perbaikan:</span>
                  <span className="font-bold text-[#0B0F17]">{selectedOrder.service}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                  <span className="text-[#475467]">Jasa Teknisi & Pengujian Sensor:</span>
                  <span className="font-bold text-emerald-600 font-mono">GRATIS</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-[#F8F9FA] border border-black/[0.04]">
                  <span className="text-[#475467]">Status Servis Fisik:</span>
                  <span className="font-bold text-[#0066FF] font-mono">{selectedOrder.serviceStatus}</span>
                </div>
              </div>

              {/* Action Alert Banner */}
              {actionNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{actionNotice}</span>
                </div>
              )}

              {/* Payment Section */}
              {selectedOrder.paymentStatus === 'WAITING_PAYMENT' ? (
                <div className="p-5 rounded-2xl bg-[#0B0F17] text-white space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#0066FF]" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Metode Pembayaran Kasir</span>
                    </div>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded font-bold">
                      MENUNGGU PELUNASAN
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleMarkAsPaid('QRIS')}
                      className="p-3 rounded-xl bg-white/10 hover:bg-[#0066FF] text-white flex flex-col items-center gap-1.5 transition active:scale-95 border border-white/10 text-xs"
                    >
                      <QrCode className="w-5 h-5 text-white" />
                      <span className="font-bold">QRIS Instan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMarkAsPaid('CASH')}
                      className="p-3 rounded-xl bg-white/10 hover:bg-emerald-600 text-white flex flex-col items-center gap-1.5 transition active:scale-95 border border-white/10 text-xs"
                    >
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                      <span className="font-bold">Tunai (Cash)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMarkAsPaid('TRANSFER')}
                      className="p-3 rounded-xl bg-white/10 hover:bg-purple-600 text-white flex flex-col items-center gap-1.5 transition active:scale-95 border border-white/10 text-xs"
                    >
                      <CreditCard className="w-5 h-5 text-purple-400" />
                      <span className="font-bold">Bank Transfer</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-white/60">
                    <span>Kasir Kas Fisik: Rp 500.000 (Pas)</span>
                    <button
                      type="button"
                      onClick={() => handleMarkAsPaid('CASH')}
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      Konfirmasi Lunas Tunai
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="font-bold text-sm">Pembayaran Lunas ({selectedOrder.paymentMethod})</div>
                      <div className="text-[11px] text-emerald-700">Tercatat di pembukuan otomatis outlet Tasikmalaya.</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold">
                    PAID
                  </span>
                </div>
              )}

              {/* Dispatch & Customer Handover Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const waText = encodeURIComponent(
                      `Halo Kak ${selectedOrder.customerName}, berikut tanda terima & nota servis FixGo Outlet Tasikmalaya:\n` +
                      `No. Order: ${selectedOrder.id}\nPerangkat: ${selectedOrder.deviceModel}\nTotal: ${formatRupiah(selectedOrder.cost)}\nStatus: ${selectedOrder.paymentStatus}\nTerima kasih!`
                    );
                    window.open(`https://wa.me/${selectedOrder.customerPhone}?text=${waText}`, '_blank');
                  }}
                  className="btn-nested-cta flex-1 justify-center py-2.5 px-4 text-xs"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Kirim Nota ke WhatsApp Klien</span>
                </button>

                {selectedOrder.serviceStatus === 'COMPLETED' && (
                  <button
                    type="button"
                    onClick={handleMarkAsPickedUp}
                    className="btn-nested-cta justify-center py-2.5 px-4 text-xs bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Check className="w-4 h-4 text-white" />
                    <span>Serahkan Unit ke Pelanggan</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* Modal: Input Walk-In Order Baru */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="double-bezel-shell max-w-lg w-full shadow-2xl">
            <form onSubmit={handleCreateWalkInOrder} className="double-bezel-core p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                <h3 className="text-base font-bold text-[#0B0F17] flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-[#0066FF]" />
                  <span>Input Order Walk-in Meja Kasir</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="text-xs text-[#667085] hover:text-[#0B0F17]"
                >
                  Tutup
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Nama Pelanggan</label>
                  <input
                    type="text"
                    required
                    value={newCustName}
                    onChange={(e) => setNewCustName(e.target.value)}
                    placeholder="Nama Lengkap"
                    className="w-full p-2.5 rounded-xl bg-[#F8F9FA] border border-black/[0.08]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">No. WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full p-2.5 rounded-xl bg-[#F8F9FA] border border-black/[0.08]"
                  />
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Model iPhone</label>
                  <select
                    value={newDevice}
                    onChange={(e) => setNewDevice(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F8F9FA] border border-black/[0.08]"
                  >
                    {IPHONE_MODELS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Layanan Perbaikan</label>
                  <select
                    value={newService.id}
                    onChange={(e) => {
                      const found = SERVICE_OPTIONS.find((s) => s.id === e.target.value);
                      if (found) setNewService(found);
                    }}
                    className="w-full p-2.5 rounded-xl bg-[#F8F9FA] border border-black/[0.08]"
                  >
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s.id} value={s.id}>{s.title} ({formatRupiah(s.defaultCost)})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="btn-pill-secondary text-xs py-2 px-4"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-nested-cta text-xs py-2 px-5 bg-[#0066FF]"
                >
                  Daftarkan & Kirim ke Teknisi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
