"use client";

import React from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { Star, ShieldCheck, MapPin } from "lucide-react";

export const LeaderboardWorkers: React.FC = () => {
  const { workersList, openResponsibilityModal, setSelectedCategory } = useApp();

  const handleRequestWorker = (profession: string) => {
    setSelectedCategory(profession);
    openResponsibilityModal();
  };

  if (!workersList || workersList.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-accent font-black text-xs mb-1">
            <span>🏆</span>
            <span>الترتيب المعتمد في نابلس (قاعدة البيانات)</span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            أفضل {workersList.length} صنايعية في نابلس
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            محسوبة بدقة وفق أعلى متوسط تقييم وعدد الطلبات المكتملة فعلياً
          </p>
        </div>
      </div>

      <div className="space-y-3.5">
        {workersList.map((worker) => (
          <div
            key={worker.id}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={worker.photo}
                  alt={worker.name}
                  width={52}
                  height={52}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-xs"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-sm text-slate-900">
                    {worker.name}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    {worker.rankBadge}
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5 flex items-center gap-2">
                  <span>{worker.profession}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {worker.area}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60">
              <div className="text-right sm:text-left">
                <div className="flex items-center gap-1 font-black text-sm text-amber-600">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{worker.rating.toFixed(2)}</span>
                </div>
                <div className="text-[11px] font-bold text-slate-500">
                  {worker.completedJobs} طلب مكتمل
                </div>
              </div>

              <button
                onClick={() => handleRequestWorker(worker.profession)}
                className="bg-primary hover:bg-primary-dark text-white text-xs font-black px-4 py-2 rounded-xl transition-all shadow-xs"
              >
                طلب الخدمة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
