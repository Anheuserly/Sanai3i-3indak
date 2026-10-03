"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Star,
  Phone,
  CheckCircle,
  Check,
  X,
} from "lucide-react";
import { Worker } from "@/types";

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
    categories,
    areas,
  } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  // Craftsmen Directory Filter States
  const [directorySearch, setDirectorySearch] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");

  const filteredDirectoryWorkers = workersList.filter((w) => {
    const matchesSearch =
      directorySearch.trim() === "" ||
      w.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      w.profession.toLowerCase().includes(directorySearch.toLowerCase()) ||
      (w.professions && w.professions.some((p) => p.toLowerCase().includes(directorySearch.toLowerCase()))) ||
      w.area.toLowerCase().includes(directorySearch.toLowerCase()) ||
      (w.phone && w.phone.includes(directorySearch));

    const matchesTrade =
      selectedTrade === "all" ||
      w.profession === selectedTrade ||
      (w.professions && w.professions.includes(selectedTrade));

    const matchesArea =
      selectedArea === "all" ||
      w.area.toLowerCase().includes(selectedArea.toLowerCase());

    return matchesSearch && matchesTrade && matchesArea;
  });

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

      {/* Certified Craftsmen Directory & Direct Booking Section */}
      <section id="craftsmen" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>فنيون معتمدون ومفحوصون في نابلس</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                دليل الصنائعية المعتمدين في نابلس ({workersList.length})
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                تصفح الصنائعية المعتمدين في حيك، اتصل مباشرة بالفني أو اطلب الخدمة فورياً بدون أي عمولة أو وسيط.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedTrade("all");
                setSelectedArea("all");
                setDirectorySearch("");
              }}
              className="text-xs font-bold text-slate-500 hover:text-primary transition-colors self-start md:self-auto"
            >
              إعادة ضبط الفلاتر ⟲
            </button>
          </div>

          {/* Search Bar & Area / Trade Filters */}
          <div className="space-y-3">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                placeholder="ابحث عن صنايعي بالاسم، التخصص، رقم الهاتف، أو اسم الحي في نابلس..."
                className="w-full text-xs font-bold pl-3 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-all shadow-xs"
              />
              {directorySearch && (
                <button
                  onClick={() => setDirectorySearch("")}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Filter Chips: Trade & Area */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Category / Trade Select */}
              <div className="flex-1">
                <label className="block text-[11px] font-black text-slate-500 mb-1">
                  المهنة المطلوبة:
                </label>
                <select
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white"
                >
                  <option value="all">جميع المهن ({categories.length} مهنة)</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area Select */}
              <div className="flex-1">
                <label className="block text-[11px] font-black text-slate-500 mb-1">
                  الحي داخل نابلس:
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white"
                >
                  <option value="all">كافة مناطق وأحياء نابلس</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      📍 نابلس — {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Directory Grid */}
          {filteredDirectoryWorkers.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-bold bg-slate-50 rounded-2xl border border-slate-100">
              لا يوجد صنايعية مطابقين لبحثك حالياً. جرب اختيار مهنة أو منطقة أخرى.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDirectoryWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-emerald-300 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between gap-4 group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image
                            src={worker.photo}
                            alt={worker.name}
                            width={54}
                            height={54}
                            className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-xs group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-black text-sm text-slate-900">
                              {worker.name}
                            </h4>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 mt-1 inline-block">
                            {worker.rankBadge || "صنايعي معتمد"}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                          worker.isAvailable !== false
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {worker.isAvailable !== false ? "● متاح الآن" : "غير متاح"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold mt-3.5">
                      <div className="flex items-center gap-1 text-amber-600 font-black">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{worker.rating.toFixed(2)}</span>
                      </div>
                      <span>•</span>
                      <span>{worker.completedJobs} طلب منجز</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {worker.area}
                      </span>
                    </div>

                    {/* Trade Badges */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {(worker.professions && worker.professions.length > 0
                        ? worker.professions
                        : [worker.profession]
                      ).map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 text-[11px] font-bold border border-purple-200"
                        >
                          🛠️ {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Direct Call & Instant Booking */}
                  <div className="pt-3 border-t border-slate-200/60 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openResponsibilityModal(worker)}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white text-xs font-black py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>طلب فوري لهذا الفني</span>
                      <span>➔</span>
                    </button>

                    {worker.phone && (
                      <a
                        href={`tel:${worker.phone}`}
                        className="px-3.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-black flex items-center gap-1 transition-all"
                        title="اتصال هاتفي مباشر"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">اتصال</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
