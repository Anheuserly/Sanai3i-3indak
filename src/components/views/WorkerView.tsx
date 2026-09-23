"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { HardHat, CheckCircle2, Clock, AlertTriangle, MapPin, Phone, ShieldCheck, Star } from "lucide-react";

export const WorkerView: React.FC = () => {
  const {
    activeStatusIndex,
    advanceStatus,
    submitFakeReport,
  } = useApp();

  const [isAvailable, setIsAvailable] = useState(true);
  const [fakeReportText, setFakeReportText] = useState("");
  const [showFakeModal, setShowFakeModal] = useState(false);

  const incomingRequests = [
    {
      id: "REQ-104",
      customerName: "طارق قادري",
      profession: "سبّاك",
      area: "المخفية، نابلس",
      details: "انكسار صمام مياه الحمام الرئيسي وتدفق مياه بحاجة لتدخل فوري.",
      time: "منذ 4 دقائق",
    },
    {
      id: "REQ-105",
      customerName: "منى استيتية",
      profession: "سبّاك",
      area: "البلدة القديمة - حارة الياسمينة",
      details: "انسداد في شبكة تصريف المغسلة والمجلى.",
      time: "منذ 15 دقيقة",
    },
  ];

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (fakeReportText.trim()) {
      submitFakeReport(fakeReportText);
      alert("تم رفع البلاغ بنجاح إلى الإدارة للتحقيق الفوري وحماية سجلك.");
      setFakeReportText("");
      setShowFakeModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Worker Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-emerald-600/20">
            خليل
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900">
                الأسطى خليل النابلسي
              </h2>
              <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                صنايعي معتمد ✓
              </span>
            </div>
            <p className="text-slate-500 text-xs font-semibold mt-1">
              مهنة السباكة والتسريبات • رفيديا وكافة مناطق نابلس
            </p>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <span className="text-xs font-extrabold text-slate-700">
            حالة استقبال الطلبات:
          </span>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              isAvailable
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAvailable ? "bg-white animate-pulse" : "bg-slate-400"}`}></span>
            <span>{isAvailable ? "متاح للعمل الآن في نابلس" : "غير متاح حالياً"}</span>
          </button>
        </div>
      </div>

      {/* Free Intro Month Notification */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 flex-shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-black text-emerald-950">
            الشهر الأول مجاني بالكامل لكافة الصنائعية في نابلس
          </h4>
          <p className="text-xs text-emerald-900/90 leading-relaxed font-medium">
            لا توجد أي رسوم أو عمولات مقتطعة داخل التطبيق على قبول الطلبات. الدفع يتم نقداً ومباشرة بينك وبين الزبون بعد إنجاز العمل وفق ما تتفقان عليه.
          </p>
        </div>
      </div>

      {/* Active Job Management & Anti-Abuse Button */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-black text-blue-600 px-3 py-1 rounded-full bg-blue-50">
              الطلب قيد التنفيذ
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-2">
              إدارة الطلب الحالي #REQ-102
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              الزبون: أحمد النابلسي • رفيديا قرب جامعة النجاح
            </p>
          </div>

          {/* Report Fake Request Button */}
          <button
            onClick={() => setShowFakeModal(true)}
            className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 self-start"
          >
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>الإبلاغ عن طلب وهمي 🚨</span>
          </button>
        </div>

        {/* Status Updater Stepper Buttons */}
        <div className="space-y-3">
          <span className="block text-xs font-black text-slate-700">
            تحديث مرحلة الخدمة للزبون:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={advanceStatus}
              className="p-3.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 font-black text-xs text-blue-900 text-center transition-all"
            >
              🛵 1. أنا في الطريق الآن
            </button>
            <button
              onClick={advanceStatus}
              className="p-3.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 font-black text-xs text-amber-900 text-center transition-all"
            >
              🔧 2. وصلت وبدأت بالعمل
            </button>
            <button
              onClick={advanceStatus}
              className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 font-black text-xs text-emerald-900 text-center transition-all"
            >
              ✅ 3. تم إنجاز العمل واستلام الأجرة نقداً
            </button>
          </div>
        </div>
      </div>

      {/* Incoming Matching Requests */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900">
          الطلبات الجديدة المطابقة لمهنتك في نابلس ({incomingRequests.length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {incomingRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {req.area}
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  {req.time}
                </span>
              </div>

              <div>
                <h4 className="font-black text-base text-slate-900">
                  الزبون: {req.customerName}
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  {req.details}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => alert(`تم قبول الطلب ${req.id} بنجاح، تواصل مع الزبون.`)}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-black text-xs py-2.5 rounded-xl transition-all shadow-xs"
                >
                  🤝 قبول الطلب
                </button>
                <button
                  onClick={() => alert("تم تجاهل الطلب.")}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all"
                >
                  تجاهل
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fake Report Modal */}
      {showFakeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-xl font-black text-slate-900">
                الإبلاغ عن طلب وهمي أو غير جاد
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              نظام "صنايعي عندك" يحمي وقت وجهد الصنائعية. إذا كان موقع الزبون وهمياً، أو امتنع عن الدفع، اكتب التفاصيل وسيتحقق الأدمن فوراً لاتخاذ إجراء بحقه.
            </p>

            <textarea
              rows={4}
              value={fakeReportText}
              onChange={(e) => setFakeReportText(e.target.value)}
              placeholder="اكتب أسباب البلاغ بالتفصيل (مثال: وصلت للموقع والزبون مغلق الهاتف، أو الموقع غير صحيح)..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium outline-none focus:border-red-500 focus:bg-white resize-none"
            />

            <div className="flex items-center gap-3">
              <button
                onClick={handleReport}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black text-sm py-3 rounded-xl transition-all shadow-md"
              >
                إرسال البلاغ للإدارة
              </button>
              <button
                onClick={() => setShowFakeModal(false)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
