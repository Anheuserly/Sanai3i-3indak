"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";

export const ResponsibilityModal: React.FC = () => {
  const {
    isResponsibilityModalOpen,
    closeResponsibilityModal,
    selectedCategory,
    setSelectedCategory,
    submitNewRequest,
    categories,
    areas,
  } = useApp();

  const [description, setDescription] = useState<string>(
    "تسريب مياه حاد أسفل مجلى المطبخ بحاجة لتبديل وصلة صمام وتثبيت."
  );
  const [area, setArea] = useState<string>("رفيديا");
  const [confirmed, setConfirmed] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isResponsibilityModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) {
      alert("يجب الإقرار والموافقة على مسؤولية دفع أجرة الصنايعي نقداً لإتمام الطلب.");
      return;
    }
    submitNewRequest(selectedCategory, description, area);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      closeResponsibilityModal();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeResponsibilityModal}
          className="absolute top-6 left-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              تم إرسال طلبك بنجاح!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              يجري الآن إشعار الصنائعية المعتمدين في نابلس ({area}). الدفع يتم نقداً ومباشرة للصنايعي بعد إنجاز العمل.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                طلب مجاني تماماً من التطبيق
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                طلب صنايعي في نابلس
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                حدد المهنة والمشكلة وسيتواصل معك أقرب فني متاح في منطقتك.
              </p>
            </div>

            {/* Category Picker */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                المهنة المطلوبة (من بين 19 مهنة)
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-800 outline-none focus:border-primary focus:bg-white transition-all"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.icon} {c.name} — {c.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                اشرح العطل أو المشكلة بدقة
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتب تفاصيل ما يحتاج إلى صيانة..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800 outline-none focus:border-primary focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Nablus Area Selector */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                المنطقة داخل نابلس
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-800 outline-none focus:border-primary focus:bg-white transition-all"
              >
                {areas.map((a) => (
                  <option key={a} value={a}>
                    📍 نابلس — {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Mandatory Responsibility Disclaimer Card */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>تأكيد طلب الصنايعي وإقرار الأجرة</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                &ldquo;يرجى إرسال الطلب فقط إذا كنت بحاجة فعلية إلى الخدمة ومستعدًا لاستقبال الصنايعي. أنت مسؤول عن دفع أجرة الصنايعي مباشرة بعد إنجاز الخدمة، وفقًا لما يتم الاتفاق عليه معه. التطبيق لا يحدد أجرة الخدمة ولا يستوفيها من الزبون.&rdquo;
              </p>
            </div>

            {/* Mandatory Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-50 select-none">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary border-slate-300"
              />
              <span className="text-xs font-extrabold text-slate-800 leading-relaxed">
                أؤكد أنني بحاجة فعلية إلى هذه الخدمة، وأتحمل مسؤولية دفع أجرة الصنايعي بعد إنجاز المطلوب.
              </span>
            </label>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={!confirmed}
              className={`w-full h-12 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                confirmed
                  ? "bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 scale-[1.01]"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>تأكيد ونشر الطلب مجاناً في نابلس</span>
              <span>➔</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
