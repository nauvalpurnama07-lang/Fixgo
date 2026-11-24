'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Wrench, User, Crown, LogOut, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { UserRole } from '@/types';

interface DashboardHeaderProps {
  currentRole: UserRole;
  staffName: string;
  staffId: string;
}

export default function DashboardHeader({ currentRole, staffName, staffId }: DashboardHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear session cookie completely
    document.cookie = 'fixgo_staff_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/dashboard/login');
  };

  const handleSwitchTerminal = (targetRole: UserRole, targetPath: string) => {
    // Update session cookie for the new role
    const sessionData = {
      role: targetRole,
      staffId: targetRole === 'owner' ? 'OWNER-TASIK-01' : targetRole === 'pa' ? 'PA-ADMIN-01' : 'TECH-TASIK-02',
      loggedInAt: Date.now(),
    };
    document.cookie = `fixgo_staff_session=${encodeURIComponent(
      JSON.stringify(sessionData)
    )}; path=/; max-age=86400; SameSite=Lax`;
    router.push(targetPath);
  };

  const roleConfigs = {
    technician: {
      label: 'Teknisi Lab Specialist',
      icon: Wrench,
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      terminalPath: '/dashboard/technician',
    },
    pa: {
      label: 'Kasir & Front Desk (PA)',
      icon: User,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      terminalPath: '/dashboard/cashier',
    },
    owner: {
      label: 'Executive Store Owner',
      icon: Crown,
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      terminalPath: '/dashboard/owner',
    },
    customer: {
      label: 'Pelanggan',
      icon: User,
      badgeColor: 'bg-white/10 text-white border-white/20',
      terminalPath: '/',
    },
  };

  const config = roleConfigs[currentRole] || roleConfigs.technician;
  const RoleIcon = config.icon;

  return (
    <header className="bg-[#0B0F17] border-b border-white/10 sticky top-0 z-40 text-white backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Brand & Outlet Info */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard/login" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0066FF] to-blue-400 flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight flex items-center gap-1.5">
                <span>FixGo H-OS</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/70">v2.0</span>
              </div>
              <div className="text-[10px] text-white/50 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Outlet Tasikmalaya</span>
              </div>
            </div>
          </Link>

          {/* Quick Switch Terminal Pill (For Seamless Multi-Role Testing) */}
          <div className="hidden md:flex items-center gap-1 pl-4 ml-2 border-l border-white/10 text-[11px]">
            <span className="text-white/40 mr-1 text-[10px] font-mono">Ganti Terminal:</span>
            <button
              type="button"
              onClick={() => handleSwitchTerminal('technician', '/dashboard/technician')}
              className={`px-2.5 py-1 rounded-lg transition ${
                currentRole === 'technician' ? 'bg-[#0066FF] text-white font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Teknisi
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTerminal('pa', '/dashboard/cashier')}
              className={`px-2.5 py-1 rounded-lg transition ${
                currentRole === 'pa' ? 'bg-emerald-600 text-white font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Kasir / PA
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTerminal('owner', '/dashboard/owner')}
              className={`px-2.5 py-1 rounded-lg transition ${
                currentRole === 'owner' ? 'bg-amber-600 text-white font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Owner
            </button>
          </div>
        </div>

        {/* Right: Staff Identity & Actions */}
        <div className="flex items-center gap-3">
          {/* Active Role Badge */}
          <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${config.badgeColor}`}>
            <RoleIcon className="w-3.5 h-3.5" />
            <span>{config.label}</span>
          </div>

          {/* Staff ID & Name */}
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white leading-tight">{staffName}</div>
            <div className="text-[10px] font-mono text-white/50">{staffId}</div>
          </div>

          {/* View Public Web */}
          <Link
            href="/"
            target="_blank"
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition"
            title="Buka Website Publik Pelanggan"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium border border-rose-500/20 transition active:scale-95"
            title="Keluar dari Terminal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>

      </div>
    </header>
  );
}
