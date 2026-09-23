"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CategoryGrid } from "@/components/CategoryGrid";
import { LeaderboardWorkers } from "@/components/LeaderboardWorkers";
import { LeaderboardCustomers } from "@/components/LeaderboardCustomers";
import { TrackingTimeline } from "@/components/TrackingTimeline";
import { Search, MapPin, Wrench, Shield, AlertCircle, ArrowLeft, Smartphone } from "lucide-react";

export const CustomerView: React.FC = () => {
  const { openResponsibilityModal, setSelectedCategory, openDownloadModal } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedCategory("سبّاك");
      openResponsibilityModal();
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-slate-50 to-white pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-light text-amber-950 font-black text-xs border border-amber-300 shadow-xs">
              <span className="text-base">🇵🇸</span>
              <span>المنصة الرائدة في نابلس، فلسطين</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              صنايعي شاطر ومضمون <br />
              <span className="text-primary">لحد عندك في نابلس</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-semibold max-w-2xl mx-auto leading-relaxed">
              اطلب فني صيانة لمنزلك في دقائق، مجاناً وبدون أي وسيط مالي. تدفع الأجرة مباشرة للصنايعي نقداً بعد إتمام العمل.
            </p>

            {/* Quick Problem Search Bar */}
            <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto">
              <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 flex flex-col sm:flex-row items-center gap-2">
                <div className="flex items-center gap-2 flex-1 w-full px-3">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ما الذي يحتاج لصيانة؟ (مثلاً: تسريب مياه، قاطع كهرباء...)"
                    className="w-full text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none bg-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-black px-7 py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>طلب صنايعي الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Free Service Guarantee Badge & APK CTA */}
            <div className="flex flex-col items-center gap-4 pt-2">
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>الطلب مجاني 100% للزبائن</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>فنيون معتمدون ومفحوصون</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>دفع نقدي مباشر بعد الإنجاز</span>
                </div>
              </div>

              {/* Direct APK Download Quick Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={openDownloadModal}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-2 border-emerald-300 font-black px-6 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-xs transition-all hover:scale-105"
                >
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>تثبيت التطبيق على هاتفك — تحميل ملف APK المباشر</span>
                  <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">مجاني</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Direct APK Download Feature Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4 text-center md:text-right">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Smartphone className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 text-[11px] font-black text-accent">
                <span>⚡ تثبيت مباشر بدون متجر</span>
                <span>•</span>
                <span>أندرويد 8.0+</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                حمل تطبيق «صنايعي عندك» APK لهواتف الأندرويد
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                تنزيل مباشر لحزمة التطبيق الرسمية (~18.5 MB) دون الحاجة لمتجر Google Play. سريع وخفيف ومخصص لأهل نابلس.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openDownloadModal}
              className="bg-accent hover:bg-accent-dark text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all whitespace-nowrap shadow-lg shadow-accent/20 flex items-center gap-2 hover:scale-105"
            >
              <span>تحميل ملف APK الآن</span>
              <span>↓</span>
            </button>
          </div>
        </div>
      </div>

      {/* Banner for Worker Application */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <span className="px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-black inline-block">
              فرصة عمل لأصحاب المهن في نابلس
            </span>
            <h3 className="text-2xl font-black">
              هل أنت فني أو صنايعي محترف؟
            </h3>
            <p className="text-emerald-100/90 text-sm max-w-xl">
              سجل معنا كصنايعي معتمد وابدأ باستقبال طلبات الصيانة في منطقتك مجاناً وبدون أي اقتطاعات.
            </p>
          </div>
          <button
            onClick={() => {
              alert("سيتم نقلك لنموذج التقديم كصنايعي معتمد في نابلس.");
            }}
            className="bg-accent hover:bg-accent-dark text-slate-950 font-black px-6 py-3 rounded-2xl text-sm transition-all whitespace-nowrap shadow-lg shadow-accent/20"
          >
            التقديم لتصبح صنايعي ➔
          </button>
        </div>
      </div>

      {/* 19 Categories Section */}
      <div id="categories">
        <CategoryGrid />
      </div>

      {/* Leaderboards Grid (Top 5 Workers & Top 3 Customers) */}
      <section id="leaderboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LeaderboardWorkers />
          <LeaderboardCustomers />
        </div>
      </section>

      {/* Live Tracking Section */}
      <section id="tracking" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrackingTimeline />
      </section>

    </div>
  );
};
