"use client";

import React, { useState } from "react";
import { X, MessageSquare, AlertTriangle, Bug, Lightbulb, HardHat, Check, ShieldAlert } from "lucide-react";
import { useApp } from "@/context/AppContext";

type ModalTab = "suggestion" | "bug" | "worker_report";

export const FeedbackReportModal: React.FC = () => {
  const {
    isFeedbackModalOpen,
    closeFeedbackModal,
    openWorkerApplicationModal,
    submitFeedbackReport,
    workersList,
  } = useApp();

  const [activeTab, setActiveTab] = useState<ModalTab>("suggestion");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [targetWorker, setTargetWorker] = useState(workersList[0]?.name || "");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("يرجى إدخال اسمك الكريم.");
      return;
    }
    if (!details.trim()) {
      setErrorMsg("يرجى كتابة التفاصيل لنتمكن من المتابعة والمعالجة.");
      return;
    }

    try {
      await submitFeedbackReport({
        type: activeTab,
        name,
        phone,
        title: title || (activeTab === "suggestion" ? "اقتراح تطوير" : activeTab === "bug" ? "بلاغ خلل فني" : "شكوى صنايعي"),
        details,
        targetWorkerName: activeTab === "worker_report" ? targetWorker : undefined,
      });
      setIsSuccess(true);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg("تعذر إرسال البلاغ، يرجى المحاولة لاحقاً.");
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMsg("");
    setName("");
    setPhone("");
    setTitle("");
    setDetails("");
    closeFeedbackModal();
  };

  const handleOpenWorkerApplication = () => {
    handleClose();
    openWorkerApplicationModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 via-primary to-slate-900 p-6 text-white relative flex-shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-xs font-black mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>مركز الشكاوى والمقترحات المباشر — نابلس</span>
          </div>

          <h2 className="text-2xl font-black mb-1">مركز الدعم والتطوير</h2>
          <p className="text-xs text-slate-300 font-medium">
            صوتك وملاحظاتك تصل مباشرة لمؤسسي المنصة لمتابعتها والتحسين المستمر دون وسطاء.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="bg-slate-100 p-2 grid grid-cols-3 gap-1.5 border-b border-slate-200 flex-shrink-0">
          <button
            type="button"
            onClick={() => { setActiveTab("suggestion"); setIsSuccess(false); }}
            className={`py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "suggestion"
                ? "bg-white text-primary shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>تقديم اقتراح</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("bug"); setIsSuccess(false); }}
            className={`py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "bug"
                ? "bg-white text-red-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Bug className="w-3.5 h-3.5 text-red-500" />
            <span>بلاغ خلل فني</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("worker_report"); setIsSuccess(false); }}
            className={`py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "worker_report"
                ? "bg-white text-orange-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
            <span>شكوى صنايعي</span>
          </button>
        </div>

        {/* Worker Application Quick Banner */}
        <div className="bg-emerald-50 px-6 py-2.5 border-b border-emerald-100 flex items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <HardHat className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>هل أنت فني وتريد الانضمام كصنايعي؟</span>
          </div>
          <button
            onClick={handleOpenWorkerApplication}
            className="text-xs font-black text-emerald-700 hover:text-emerald-900 underline whitespace-nowrap"
          >
            التقديم هنا ➔
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-black">
                ✓
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                تم استلام مشاركتك بنجاح!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                شكراً يا <strong>{name}</strong>. تم تسجيل رسالتك في لوحة تحكم المؤسسين وسيتم مراجعتها واتخاذ الإجراء اللازم فوراً.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="bg-primary hover:bg-primary-dark text-white font-black px-6 py-2.5 rounded-xl text-sm transition-all"
                >
                  إغلاق
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    اسمك الكريم: *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: أحمد عبد الله"
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رقم الهاتف (اختياري للمتابعة):
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="059-XXXXXXX"
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary outline-none text-right"
                  />
                </div>
              </div>

              {activeTab === "worker_report" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    اسم الصنايعي المشتكى عليه: *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetWorker}
                    onChange={(e) => setTargetWorker(e.target.value)}
                    placeholder="اكتب اسم الصنايعي أو مهنته أو رقم هاتفه..."
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {activeTab === "suggestion"
                    ? "عنوان الاقتراح أو الفكرة:"
                    : activeTab === "bug"
                    ? "وصف مختصر للمشكلة الفنية:"
                    : "سبب الشكوى أو المخالفة:"}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    activeTab === "suggestion"
                      ? "مثلاً: إضافة مهنة جديدة، تحسين خريطة نابلس..."
                      : activeTab === "bug"
                      ? "مثلاً: خطأ في تحميل الصفحة أو زر الطلب..."
                      : "مثلاً: عدم الالتزام بالموعد، رفع السعر غير المتفق عليه..."
                  }
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  التفاصيل والشرح: *
                </label>
                <textarea
                  rows={4}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={
                    activeTab === "suggestion"
                      ? "اشرح فكرتك بالتفصيل وكيف تفيد أهل نابلس والصنائعية..."
                      : activeTab === "bug"
                      ? "اشرح متى حدث الخطأ وعلى أي صفحة وما نوع هاتفك..."
                      : "اشرح ما جرى مع الصنايعي بالتفصيل ورقم الطلب إن وجد..."
                  }
                  className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-black text-xs sm:text-sm py-3 rounded-xl transition-all shadow-md"
                >
                  {activeTab === "suggestion"
                    ? "💡 إرسال الاقتراح"
                    : activeTab === "bug"
                    ? "🪲 إرسال بلاغ الخلل"
                    : "⚠️ رفع الشكوى للإدارة"}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
