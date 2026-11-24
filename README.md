# FixGo Operating System (FixGo H-OS)

> **Commercial iPhone Repair Operating System & Multi-Terminal Lab Management Platform**  
> Tailored for Apple Device Repair Centers & Authorized Independent Service Providers (Tasikmalaya Outlet, West Java).

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.6-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-SDK-ffca28?logo=firebase)](https://firebase.google.com/)

---

## ⚡ Overview

**FixGo** is an end-to-end operational software suite built to manage high-turnaround Apple iPhone repair workflows. It integrates a customer-facing transparency portal with role-segregated operational terminals (POS Cashier, Hardware Technician, and Store Owner), backed by Next.js 16 Proxy RBAC security.

---

## 🚀 Key Modules & Architecture

### 1. Public Customer Experience Portal (`/`)
* **Live Service Tracker:** Real-time 9-stage hardware repair timeline tracking with instant warranty pass synchronization.
* **Smart Booking Estimator:** 4-step repair cost calculator with transparent tiering (6 / 12 / 18 months warranty) and direct WhatsApp dispatch (`0858-6447-9760`).
* **Digital Warranty Pass:** Apple Wallet style digital card featuring dynamic QR codes, serial validation, and expiration countdowns.
* **Interactive Catalog & Bento Grid:** Service tier breakdowns (OLED/In-Cell screen swaps, battery calibration, logic board micro-soldering).
* **AI Lab Assistant:** 24/7 intelligent triage assistant with quick-response chips and smooth escalation to human technicians.

### 2. Cashier & Front-Office POS Terminal (`/dashboard/cashier`)
* **Walk-In Intake:** Rapid intake forms capturing device IMEI/Serial, passcode bypass permission, and physical cosmetic condition.
* **POS Billing & Checkout:** Cash, Bank Transfer, and dynamic QRIS payment processing with instant invoice generation.
* **WhatsApp Dispatcher:** One-click automated message delivery with formatted repair receipts and tracking links.

### 3. Technician & Lab Workstation Terminal (`/dashboard/technician`)
* **Repair Queue:** Live device triage classified by urgency and technician assignment.
* **9-Stage Status Pipeline:** Diagnostic &rarr; Disassembly &rarr; Micro-soldering / Part Replacement &rarr; Reassembly &rarr; 18-Point QC Inspection.
* **Digital Warranty Generator:** Direct publication of authentic warranty passes (`WRN-TASIK-XXXX`) upon QC sign-off.

### 4. Owner & Executive Suite (`/dashboard/owner`)
* **Financial Analytics:** Gross revenue, net margin tracking, spare parts cost (HPP), and daily cash closing reconciliation.
* **Inventory Control:** Stock alerts, unit shrinkage indicators, and part variance auditing.
* **Audit Trail:** Real-time chronological system logs tracking staff activities and status transitions.

---

## 🛡️ Security & Access Control

* **Next.js 16 Proxy RBAC (`src/proxy.ts`):** Edge-compatible proxy middleware guarding all `/dashboard/*` endpoints.
* **Encrypted Operational Sessions:** Stored in secure HTTP-only cookies (`fixgo_session`) verified on every request.
* **Role-Based Redirection:** Automatic 307 interception for unauthenticated requests directing to `/dashboard/login?reason=unauthorized`.
* **Zero-Obvious Entry:** Public UI has no obvious admin buttons; access is managed via discreet keyboard shortcuts (`Ctrl + Shift + L`), logo triggers, or dedicated operational subdomains (`pos.fixgo.id`).

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 16.4.6](https://nextjs.org/) (App Router, Turbopack, `proxy.ts` architecture)
* **Language:** TypeScript 5
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom industrial dark-mode palette
* **Icons:** [Lucide React](https://lucide.dev/)
* **Backend & Realtime:** Firebase SDK & Firestore
* **Deployment Ready:** Vercel, Node.js Docker runtime, or Cloudflare Pages

---

## 💻 Getting Started

### Prerequisites
* Node.js 20.x or higher
* npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nauvalpurnama07-lang/Fixgo.git
   cd Fixgo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Operational Terminal Demo Access

For testing internal terminals in development:

| Role | PIN | Direct Route |
| :--- | :--- | :--- |
| **Kasir / POS** | `1234` | `/dashboard/cashier` |
| **Teknisi Lab** | `5678` | `/dashboard/technician` |
| **Owner / Executive** | `8888` | `/dashboard/owner` |

---

## 📍 Outlet Information

* **Location:** Outlet Tasikmalaya, West Java, Indonesia
* **Official WhatsApp:** [+62 858-6447-9760](https://wa.me/6285864479760)
* **Hours:** Senin - Minggu: 09:00 - 21:00 WIB

---

## 📄 License

Proprietary software for FixGo Apple Service & Lab. All rights reserved.
