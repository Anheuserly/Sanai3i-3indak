"use client";

import React from "react";
import Link from "next/link";
import { useApp, UserRole } from "@/context/AppContext";
import { Wrench, MapPin, Shield, User, HardHat, Crown, Bell, HelpCircle, Download, ArrowRight, LogOut } from "lucide-react";

export const Navbar: React.FC = () => {
  const { currentRole, setCurrentRole, openResponsibilityModal, openDownloadModal } = useApp();

  const isStaffMode = currentRole !== "customer";

  const roleNames: Record<UserRole, { label: string; color: string; icon: React.ReactNode }> = {
    customer: { label: "زبون", color: "bg-primary text-white", icon: <User className="w-3.5 h-3.5" /> },
    worker: { label: "صنايعي معتمد", color: "bg-emerald-600 text-white", icon: <HardHat className="w-3.5 h-3.5" /> },
    admin: { label: "مشرف / أدمن", color: "bg-amber-600 text-white", icon: <Shield className="w-3.5 h-3.5" /> },
    owner_admin: { label: "مالك المنصة", color: "bg-purple-700 text-white", icon: <Crown className="w-3.5 h-3.5" /> },
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      
      {/* Staff Mode Top Bar (Only visible when logged into Worker/Admin/Owner modes) */}
      {isStaffMode && (
        <div className="bg-slate-900 text-white px-4 py-1.5 text-xs flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400">وضع التصفح النشط:</span>
            <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] flex items-center gap-1 ${roleNames[currentRole].color}`}>
              {roleNames[currentRole].icon}
              <span>{roleNames[currentRole].label}</span>
            </span>
          </div>
          <button
            onClick={() => setCurrentRole("customer")}
            className="text-accent hover:text-white font-bold flex items-center gap-1 text-[11px] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>الخروج والعودة لوضع الزبون العادي</span>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-primary block leading-none">
                  صنايعي عندك
                </span>
                <span className="text-xs font-bold text-accent mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  نابلس، فلسطين
                </span>
              </div>
            </Link>
          </div>

          {/* Clean Navigation Links for Customers */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <Link href="/#categories" className="hover:text-primary transition-colors">المهن الـ 19</Link>
            <Link href="/#leaderboard" className="hover:text-primary transition-colors">أفضل الصنائعية</Link>
            <Link href="/#tracking" className="hover:text-primary transition-colors">تتبع طلبي</Link>
            <Link href="/faq" className="hover:text-primary transition-colors">الأسئلة والمساعدة</Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Direct APK Download Button */}
            <button
              onClick={openDownloadModal}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs"
              title="تحميل تطبيق الأندرويد بصيغة APK"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">تحميل APK</span>
            </button>

            {/* Request Worker CTA */}
            <button
              onClick={openResponsibilityModal}
              className="bg-accent hover:bg-accent-dark text-slate-950 font-black px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <span>⚡</span>
              <span>طلب صنايعي</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
