import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FixGo — Sistem Operasional & Layanan Servis Gadget Berstandar Laboratorium',
  description: 'Platform operasional servis terintegrasi FixGo: perbaikan transparan, suku cadang terverifikasi, pelacakan pengerjaan real-time, dan kartu garansi digital resmi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAFAFB] text-[#0B0F17] antialiased selection:bg-[#0066FF] selection:text-white">
        {children}
      </body>
    </html>
  );
}
