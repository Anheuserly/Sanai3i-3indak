"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Award, CheckCircle } from "lucide-react";

export const LeaderboardCustomers: React.FC = () => {
  const { topCustomers } = useApp();

  return (
    <div className="bg-gradient-to-br from-purple-50/50 via-white to-slate-50 rounded-3xl p-6 border border-purple-100/80 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-1.5 text-purple-700 font-black text-xs mb-1">
            <Award className="w-4 h-4" />
            <span>لوحة التميز والمصداقية (قاعدة البيانات)</span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            أكثر الزبائن طلباً في نابلس
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            محسوبة حصراً على أساس الطلبات المكتملة الناجحة في نابلس
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {topCustomers.map((cust) => (
          <div
            key={cust.id}
            className="p-4 rounded-2xl bg-white border border-purple-100/60 shadow-xs flex items-center justify-between hover:border-purple-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 font-black text-base flex items-center justify-center">
                {cust.name.slice(0, 2)}
              </div>
              <div>
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <span>{cust.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    {cust.badge}
                  </span>
                </h4>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  📍 {cust.area}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-purple-50 text-purple-900 px-3.5 py-1.5 rounded-xl border border-purple-200/50">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-black">{cust.completedOrders} طلب منجز</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
