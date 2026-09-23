"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { REQUEST_STATUS_LIST } from "@/data/mockData";
import { Clock, Phone, MapPin, CheckCircle, ChevronLeft } from "lucide-react";

export const TrackingTimeline: React.FC = () => {
  const { activeStatusIndex, advanceStatus, orders } = useApp();
  const current = REQUEST_STATUS_LIST[activeStatusIndex];
  const activeOrder = orders.length > 0 ? orders[0] : null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-black mb-2">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            تتبع حي ومباشر (قاعدة البيانات)
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            حالة الطلب {activeOrder ? activeOrder.id : '#REQ-101'}
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            {activeOrder
              ? `${activeOrder.profession} — ${activeOrder.description} — ${activeOrder.area}`
              : 'صيانة سباكة وتسريب مياه في مجلى المطبخ — رفيديا، نابلس'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={advanceStatus}
            className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <span>محاكاة المرحلة التالية</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Assigned Worker Profile Card */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-13 h-13 rounded-2xl bg-primary text-white font-black text-lg flex items-center justify-center">
            خليل
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-sm text-slate-900">
                الأسطى خليل النابلسي
              </h4>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                معتمد ✓
              </span>
            </div>
            <div className="text-xs text-slate-500 font-semibold mt-0.5 flex items-center gap-2">
              <span>سبّاك ممتاز</span>
              <span>•</span>
              <span className="text-amber-600 font-bold">★ 4.98 (164 تقييم)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:0599123456"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-2 rounded-xl transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>اتصال بالفني</span>
          </a>
        </div>
      </div>

      {/* 7 Statuses Stepper */}
      <div className="relative space-y-6 before:absolute before:top-4 before:bottom-4 before:right-4.5 before:w-0.5 before:bg-slate-200">
        {REQUEST_STATUS_LIST.slice(0, 5).map((st, idx) => {
          const isDone = idx < activeStatusIndex;
          const isCurrent = idx === activeStatusIndex;

          return (
            <div key={st.key} className="relative flex items-start gap-4 z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all flex-shrink-0 ${
                  isDone
                    ? "bg-emerald-600 text-white shadow-sm"
                    : isCurrent
                    ? "bg-primary text-white ring-4 ring-primary-light scale-110"
                    : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}
              >
                {isDone ? <CheckCircle className="w-5 h-5" /> : st.icon}
              </div>

              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between">
                  <h5
                    className={`font-black text-sm ${
                      isCurrent
                        ? "text-primary"
                        : isDone
                        ? "text-slate-800"
                        : "text-slate-400"
                    }`}
                  >
                    {st.label}
                  </h5>
                  {isCurrent && (
                    <span className="text-[11px] font-bold text-blue-600 animate-pulse">
                      ● المرحلة الجارية الآن
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {st.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
