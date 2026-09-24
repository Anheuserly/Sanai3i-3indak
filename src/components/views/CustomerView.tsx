"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CategoryGrid } from "@/components/CategoryGrid";
import { LeaderboardWorkers } from "@/components/LeaderboardWorkers";
import { LeaderboardCustomers } from "@/components/LeaderboardCustomers";
import { TrackingTimeline } from "@/components/TrackingTimeline";
import {
  Search,
  MapPin,
  Wrench,
  Shield,
  AlertCircle,
  ArrowLeft,
  Smartphone,
  MessageSquare,
  Lightbulb,
  Bug,
  HardHat,
} from "lucide-react";

export const CustomerView: React.FC = () => {
  const {
    openResponsibilityModal,
    setSelectedCategory,
    openDownloadModal,
    openWorkerApplicationModal,
    openFeedbackModal,
    workersList,
    topCustomers,
    orders,
  } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedCategory("سبّاك ومواسرجي");
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
                  <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    مجاني
                  </span>
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
                <span>⚡ تثبيت مباشر ومستقل</span>
                <span>•</span>
                <span>أندرويد 8.0+</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                حمل تطبيق «صنايعي عندك» APK لهواتف الأندرويد
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                تنزيل مباشر لحزمة التطبيق الرسمية المجمعة. سريع وخفيف ومخصص لأهل نابلس للطلب بلمسة واحدة.
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

      {/* Banner for Worker Application (Interactive Modal Open) */}
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
              سجل معنا كصنايعي معتمد (يمكنك اختيار عدة مهن وحرف تتقنها) وابدأ باستقبال طلبات الصيانة في منطقتك مجاناً وبدون أي اقتطاعات.
            </p>
          </div>
          <button
            onClick={openWorkerApplicationModal}
            className="bg-accent hover:bg-accent-dark text-slate-950 font-black px-6 py-3 rounded-2xl text-sm transition-all whitespace-nowrap shadow-lg shadow-accent/20 flex items-center gap-2 hover:scale-105"
          >
            <HardHat className="w-4 h-4" />
            <span>التقديم لتصبح صنايعي ➔</span>
          </button>
        </div>
      </div>

      {/* 19 Categories Section */}
      <div id="categories">
        <CategoryGrid />
      </div>

      {/* Suggest / Report Bug / Report Worker / Apply Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black mb-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>مركز المجتمع والمشاركة — نابلس</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                صوتك يبني المنصة ويطور خدمات نابلس
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                نحن هنا لخدمتكم 24 ساعة دون توقف. يمكنك تقديم مقترح، الإبلاغ عن خلل فني، تقديم شكوى ضد صنايعي، أو الانضمام لفريق الصنائعية.
              </p>
            </div>

            <button
              onClick={openFeedbackModal}
              className="bg-primary hover:bg-primary-dark text-white font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-xs self-start"
            >
              <span>فتح مركز المقترحات والبلاغات</span>
              <span>←</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={openFeedbackModal}
              className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 hover:border-amber-400 cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">
                تقديم اقتراح تطوير
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                شاركنا فكرة جديدة لتحسين الخدمات أو تغطية مناطق نابلس.
              </p>
            </div>

            <div
              onClick={openFeedbackModal}
              className="p-4 rounded-2xl bg-red-50/60 border border-red-200 hover:border-red-400 cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bug className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">
                الإبلاغ عن خلل فني
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                واجهتك مشكلة في الصفحة أو زر الطلب؟ أبلغنا لنصلحها فوراً.
              </p>
            </div>

            <div
              onClick={openFeedbackModal}
              className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 hover:border-orange-400 cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">
                تقديم شكوى ضد صنايعي
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                في حال وجود مخالفة للأسعار أو المواعيد يتم التحقيق المباشر.
              </p>
            </div>

            <div
              onClick={openWorkerApplicationModal}
              className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 hover:border-emerald-400 cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HardHat className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">
                التقديم كصنايعي
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                سجل مهنك وحرفك المعتمدة وانضم لشبكة فنيي نابلس.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboards Grid */}
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
