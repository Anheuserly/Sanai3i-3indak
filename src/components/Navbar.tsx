"use client";

import React from "react";
import Link from "next/link";
import { useApp, UserRole } from "@/context/AppContext";
import { Wrench, MapPin, Shield, User, HardHat, Crown, Bell } from "lucide-react";

export const Navbar: React.FC = () => {
  const { currentRole, setCurrentRole, openResponsibilityModal } = useApp();

  const roles: { key: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
    { key: "customer", label: "زبون", icon: <User className="w-4 h-4" />, color: "bg-primary text-white" },
    { key: "worker", label: "صنايعي", icon: <HardHat className="w-4 h-4" />, color: "bg-emerald-600 text-white" },
    { key: "admin", label: "أدمن", icon: <Shield className="w-4 h-4" />, color: "bg-amber-600 text-white" },
    { key: "owner_admin", label: "مالك التطبيق", icon: <Crown className="w-4 h-4" />, color: "bg-purple-700 text-white" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
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

          {/* Interactive Role Switcher in Center */}
          <div className="hidden md:flex items-center bg-slate-100 p-1.5 rounded-full border border-slate-200">
            {roles.map((r) => {
              const isActive = currentRole === r.key;
              return (
                <button
                  key={r.key}
                  onClick={() => setCurrentRole(r.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                    isActive
                      ? `${r.color} shadow-sm scale-105`
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  {r.icon}
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Header Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={openResponsibilityModal}
              className="bg-accent hover:bg-accent-dark text-slate-950 font-black px-5 py-2.5 rounded-xl text-sm shadow-sm transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>⚡</span>
              <span>طلب صنايعي (مجاني)</span>
            </button>
          </div>

        </div>

        {/* Mobile Role Switcher Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 overflow-x-auto">
          {roles.map((r) => {
            const isActive = currentRole === r.key;
            return (
              <button
                key={r.key}
                onClick={() => setCurrentRole(r.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? `${r.color} shadow-sm`
                    : "text-slate-600 bg-slate-50"
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
