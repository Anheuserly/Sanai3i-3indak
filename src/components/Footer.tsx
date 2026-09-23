"use client";

import React from "react";
import Link from "next/link";
import { Wrench, Shield, MapPin, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">صنايعي عندك</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              المنصة المحلية الأولى المخصصة لربط الزبائن بأمهر الصنائعية والفنيين المعتمدين في مدينة نابلس، فلسطين. صيانة منزلية فورية وموثوقة، بدون تعقيدات وبدون أي رسوم عبر التطبيق.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>نابلس، جبل النار — فلسطين</span>
            </div>
          </div>

          {/* Core Guarantees & Zero Payment */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white border-r-2 border-accent pr-2">
              السياسة المالية الشفافة
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>إنشاء ونشر الطلبات مجاني تماماً للزبائن</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>الشهر الأول مجاني بالكامل للصنائعية</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>الدفع نقدي ومباشر بين الطرفين بعد الإنجاز</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">⚠</span>
                <span>لا توجد أي بطاقات دفع أو محافظ داخل التطبيق</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white border-r-2 border-primary pr-2">
              روابط سريعة
            </h4>
            <div className="flex flex-col gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
              <Link href="#categories" className="hover:text-white transition-colors">المهن الـ 19 في نابلس</Link>
              <Link href="#leaderboard" className="hover:text-white transition-colors">أفضل الصنائعية</Link>
              <Link href="#tracking" className="hover:text-white transition-colors">تتبع الطلبات</Link>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} — منصة صنايعي عندك (نابلس، فلسطين)
          </div>
          <div className="flex items-center gap-1">
            صُمم وطُوّر بحب 
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> 
            لأهلنا في نابلس
          </div>
        </div>
      </div>
    </footer>
  );
};
