"use client";

import React from "react";
import { CATEGORIES_19 } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

export const CategoryGrid: React.FC = () => {
  const { setSelectedCategory, openResponsibilityModal } = useApp();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    openResponsibilityModal();
  };

  return (
    <section className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-black mb-2">
              <span>🛠️</span>
              <span>19 مهنة معتمدة وموثقة</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              كافة خدمات الصيانة في نابلس
            </h2>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              اختر المهنة التي تحتاجها، وأرسل طلبك مجاناً ليصلك أشطر الفنيين.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {CATEGORIES_19.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="bg-slate-50 hover:bg-white rounded-2xl p-4 border border-slate-200 hover:border-primary hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-primary-light border border-slate-200 group-hover:border-primary/20 flex items-center justify-center text-2xl mb-3 shadow-xs group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-black text-sm text-slate-800 group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] font-medium text-slate-500 mt-1 line-clamp-2 leading-tight">
                {cat.description}
              </p>
              <span className="mt-3 text-[11px] font-extrabold text-accent group-hover:text-accent-dark flex items-center gap-1">
                <span>طلب الفني</span>
                <span>←</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
