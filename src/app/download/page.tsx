"use client";

import React from "react";
import Link from "next/link";
import { Download, Smartphone, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Star, Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function DownloadPage() {
  const { openDownloadModal } = useApp();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-primary">تحميل التطبيق</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-slate-900 via-primary to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-10 relative overflow-hidden text-center sm:text-right flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black">
              <Smartphone className="w-4 h-4" />
              <span>تطبيق أندرويد المستقل — نابلس</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black leading-tight">
              حمل تطبيق «صنايعي عندك» <br />
              <span className="text-accent">بصيغة APK مباشرة</span>
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              احصل على التطبيق فوراً على هاتفك الذكي واستمتع بأسرع خدمة لطلب أمهر الفنيين وأصحاب المهن في نابلس بدون الحاجة لحساب متجر التطبيقات.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <a
                href="/downloads/sanai3i-3indak.apk"
                download="sanai3i-3indak.apk"
                className="bg-accent hover:bg-accent-dark text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-accent/20 transition-transform active:scale-95"
              >
                <Download className="w-5 h-5" />
                <span>تحميل ملف APK الآن (~18.5 MB)</span>
              </a>

              <button
                onClick={openDownloadModal}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl text-xs transition-colors border border-white/10"
              >
                دليل التثبيت السريع
              </button>
            </div>
          </div>

          <div className="w-44 h-44 rounded-3xl bg-white/10 border-2 border-white/20 flex flex-col items-center justify-center p-4 text-center backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
              <Smartphone className="w-8 h-8" />
            </div>
            <div className="font-black text-sm">أندرويد 8.0+</div>
            <div className="text-[10px] text-slate-300 mt-1">تحديث سبتمبر 2026</div>
          </div>
        </div>

        {/* 3 Steps Guide */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-6 border-r-4 border-primary pr-3">
            خطوات تثبيت ملف APK على أجهزة الأندرويد
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-primary text-white font-black flex items-center justify-center text-sm">
                ١
              </div>
              <h3 className="font-bold text-slate-900 text-sm">تحميل الملف</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                اضغط على زر التنزيل أعلاه وسيبدأ متصفح هاتفك بحفظ ملف <code className="font-mono text-primary font-bold">sanai3i-3indak.apk</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-primary text-white font-black flex items-center justify-center text-sm">
                ٢
              </div>
              <h3 className="font-bold text-slate-900 text-sm">تأكيد التنزيل</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                في حال ظهر إشعار "قد يكون الملف ضاراً"، اختر "التنزيل على أي حال" (إشعار عام يظهر لأي ملف APK خارجي).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-primary text-white font-black flex items-center justify-center text-sm">
                ٣
              </div>
              <h3 className="font-bold text-slate-900 text-sm">التثبيت والتشغيل</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                افتح الملف من التنزيلات واضغط "تثبيت". فعّل خيار السماح بالتثبيت من المتصفح عند المطالبة.
              </p>
            </div>
          </div>
        </div>

        {/* Safety & Integrity Guarantee */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4 text-emerald-950">
          <div className="p-2.5 bg-emerald-600 text-white rounded-xl flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-sm">ضمان الأمان والخصوصية</h4>
            <p className="text-xs leading-relaxed text-emerald-900 font-medium">
              حزمة التطبيق الرسمية خالية تماماً من أي إعلانات أو برمجيات خبيثة أو أذونات غير ضرورية. صُممت خصيصاً لتوفير تجربة سهلة وسريعة لأهلنا في مدينة نابلس.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
