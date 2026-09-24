"use client";

import React, { useState } from "react";
import { X, HardHat, Check, AlertCircle, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const WorkerApplicationModal: React.FC = () => {
  const {
    isWorkerApplicationModalOpen,
    closeWorkerApplicationModal,
    categories,
    areas,
    submitWorkerApplication,
  } = useApp();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [experienceYears, setExperienceYears] = useState(5);
  const [area, setArea] = useState(areas[0] || "رفيديا، نابلس");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isWorkerApplicationModalOpen) return null;

  const toggleProfession = (profName: string) => {
    if (selectedProfessions.includes(profName)) {
      setSelectedProfessions((prev) => prev.filter((p) => p !== profName));
    } else {
      setSelectedProfessions((prev) => [...prev, profName]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("يرجى كتابة الاسم الكامل.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("يرجى إدخال رقم الهاتف للتواصل والتحقق.");
      return;
    }
    if (selectedProfessions.length === 0) {
      setErrorMsg("يرجى اختيار مهنة واحدة على الأقل من القائمة (يمكنك اختيار عدة مهن).");
      return;
    }

    try {
      await submitWorkerApplication({
        name,
        phone,
        professions: selectedProfessions,
        profession: selectedProfessions.join("، "),
        experienceYears,
        area,
        description,
      });
      setIsSubmitted(true);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.");
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setErrorMsg("");
    setName("");
    setPhone("");
    setSelectedProfessions([]);
    setDescription("");
    closeWorkerApplicationModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 p-6 text-white relative flex-shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-xs font-black mb-3">
            <HardHat className="w-3.5 h-3.5" />
            <span>طلب انضمام شريك مهني — نابلس</span>
          </div>

          <h2 className="text-2xl font-black mb-1">التقديم للانضمام كصنايعي معتمد</h2>
          <p className="text-xs text-emerald-100 font-medium">
            سجل خبراتك وانضم لنخبة الحرفيين في نابلس. يمكنك اختيار أكثر من تخصص معتمد.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-black">
                ✓
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                تم استلام طلبك بنجاح!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                شكراً لك يا <strong>{name}</strong>. تم تحويل طلبك لمالكي المنصة (المؤسسين) للتحقق وتفعيل ملفك المهني في المهن المحددة:
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {selectedProfessions.map((prof) => (
                  <span
                    key={prof}
                    className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold"
                  >
                    ✓ {prof}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 pt-2 font-medium">
                تطبيق «صنايعي عندك» مجاني 100% للشهر الأول ولا يتقاضى أي عمولة نقدية.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="bg-primary hover:bg-primary-dark text-white font-black px-6 py-2.5 rounded-xl text-sm transition-all"
                >
                  إغلاق ومتابعة التصفح
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الاسم الكامل (كما يظهر للزبائن): *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: المعلم عمر الشخشير"
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الهاتف المحمول (للتواصل في نابلس): *
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="059-XXXXXXX أو 056-XXXXXXX"
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 outline-none text-right"
                  />
                </div>
              </div>

              {/* Multi-Profession Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-slate-800">
                    حدد المهن والحرف التي تتقنها: * (يمكنك اختيار أكثر من مهنة)
                  </label>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    تم اختيار: {selectedProfessions.length} مهنة
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-slate-200 rounded-2xl bg-slate-50/50">
                  {categories.map((cat) => {
                    const isSelected = selectedProfessions.includes(cat.name);
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => toggleProfession(cat.name)}
                        className={`p-2.5 rounded-xl text-right text-xs font-bold transition-all flex items-center justify-between border ${
                          isSelected
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400"
                        }`}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <span>{cat.icon}</span>
                          <span className="truncate">{cat.name}</span>
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experience and Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    سنوات الخبرة العملية:
                  </label>
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(parseInt(e.target.value, 10))}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 outline-none"
                  >
                    <option value={1}>سنة واحدة</option>
                    <option value={3}>3 سنوات</option>
                    <option value={5}>5 سنوات</option>
                    <option value={8}>8 سنوات</option>
                    <option value={10}>10 سنوات فأكثر</option>
                    <option value={15}>15 سنة فأكثر (معلم قديم)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    منطقة السكن والعمل الرئيسية في نابلس:
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 outline-none"
                  >
                    {areas.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description & Tools */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  نبذة عن خبرتك، المعدات المتوفرة لديك، وساعات تواجدك:
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="مثال: أمتلك سيارة ومعدات تمديدات صحية وكشف تسريبات حديثة، متفرغ لكافة أعمال الصيانة في رفيديا والبلدة القديمة..."
                  className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 outline-none resize-none"
                />
              </div>

              {/* Notice */}
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-[11px] text-emerald-900 leading-relaxed font-semibold">
                🛡️ <strong>إشعار الأمان:</strong> تتم مراجعة كافة الطلبات من قبل مؤسسي المنصة مباشرة. لا يمكن لأي صنايعي آخر قبول أو رفض طلبك.
              </div>

              {/* Submit CTA */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>إرسال طلب الانضمام للمراجعة</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-3.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all"
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
