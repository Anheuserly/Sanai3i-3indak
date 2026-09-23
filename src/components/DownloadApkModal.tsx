"use client";

import React from "react";
import { Download, Smartphone, ShieldCheck, CheckCircle2, AlertTriangle, X, QrCode } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const DownloadApkModal: React.FC = () => {
  const { isDownloadModalOpen, closeDownloadModal } = useApp();

  if (!isDownloadModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 via-primary to-slate-900 p-6 text-white relative">
          <button
            onClick={closeDownloadModal}
            className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>تطبيق أندرويد الرسمي — نابلس</span>
          </div>

          <h2 className="text-2xl font-black mb-1">تحميل تطبيق «صنايعي عندك» (APK)</h2>
          <p className="text-xs text-slate-300 font-medium">
            تثبيت مباشر وسريع لهواتف الأندرويد بدون الحاجة لمتجر التطبيقات.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* File Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-emerald-600/20">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">sanai3i-3indak.apk</h4>
                <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5 font-medium">
                  <span>الإصدار 1.0.0</span>
                  <span>•</span>
                  <span>الحجم ~18.5 MB</span>
                  <span>•</span>
                  <span>Android 8.0+</span>
                </div>
              </div>
            </div>
            
            <a
              href="/downloads/sanai3i-3indak.apk"
              download="sanai3i-3indak.apk"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>تحميل APK</span>
            </a>
          </div>

          {/* Installation Steps */}
          <div className="space-y-3">
            <h4 className="font-black text-xs text-slate-900 border-r-2 border-primary pr-2">
              طريقة التثبيت السريعة على هاتفك (3 خطوات)
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">١</span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  انقر على زر <strong>تحميل APK</strong> وسيبدأ تنزيل الملف على هاتفك مباشرة.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">٢</span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  إذا ظهر لك تنبيه أندرويد <strong className="text-amber-700">"قد يكون الملف ضاراً"</strong>، اختر <strong className="text-emerald-700">"التنزيل على أي حال"</strong> (وهو إشعار أمني قياسي يظهر لأي تطبيق يتم تثبيته من ملف APK مباشر).
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">٣</span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  افتح الملف بعد اكتمال التنزيل واضغط <strong>"تثبيت"</strong> (Install). إذا طُلب منك الإذن، فعّل خيار <strong>"السماح بالتثبيت من هذا المصدر"</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3 text-xs text-emerald-900 font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>الملف مفحوص ونظيف 100% وخالٍ تماماً من أي برمجيات ضارة، ومخصص حصراً لأهلنا في نابلس.</span>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={closeDownloadModal}
            className="px-5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
