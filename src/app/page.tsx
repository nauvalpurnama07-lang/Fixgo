'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceTracker from '@/components/ServiceTracker';
import BookingEstimator from '@/components/BookingEstimator';
import CatalogBento from '@/components/CatalogBento';
import WarrantyPass from '@/components/WarrantyPass';
import FAQSection from '@/components/FAQSection';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import AssistantModal from '@/components/AssistantModal';
import MobileStickyBar from '@/components/MobileStickyBar';

export default function HomePage() {
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    device: string;
    service: string;
  } | null>(null);

  const handleOrderCreated = (orderId: string, device: string, service: string) => {
    setCreatedOrder({ id: orderId, device, service });
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-[#FAFAFB] pb-16 lg:pb-0">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServiceTracker externalOrder={createdOrder} />
        <BookingEstimator onOrderCreated={handleOrderCreated} />
        <CatalogBento />
        <WarrantyPass />
        <FAQSection />
        <LocationSection />
      </main>
      <Footer />
      <AssistantModal />
      <MobileStickyBar />
    </div>
  );
}
