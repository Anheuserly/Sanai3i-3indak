"use client";

import React, { useState } from "react";
import { HardHat, Crown, Lock, X, AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { FOUNDER_EMAILS } from "@/data/mockData";

export const StaffLoginModal: React.FC = () => {
  const { isStaffModalOpen, closeStaffModal, setCurrentRole, loginAsOwner } = useApp();
  const [selectedRole, setSelectedRole] = useState<"worker" | "owner">("owner");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isStaffModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (selectedRole === "owner") {
      const email = emailInput.trim();
      if (!email) {
        setErrorMsg("يرجى إدخال البريد الإلكتروني المعتمد للمؤسس/المالك.");
        return;
      }
      const success = loginAsOwner(email);
      if (success) {
        closeStaffModal();
      } else {
        setErrorMsg(
          "هذا البريد غير مسجل ضمن قائمة مؤسسي ومالكي المنصة المعتمدين في قاعدة البيانات."
        );
      }
    } else {
      // Worker login
      setCurrentRole("worker");
      closeStaffModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 via-primary to-slate-900 p-6 text-white relative">
          <button
            onClick={closeStaffModal}
            className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-xs font-black mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>بوابة الشركاء والمؤسسين — نابلس</span>
          </div>

          <h2 className="text-2xl font-black mb-1">تسجيل دخول الإدارة والفنيين</h2>
          <p className="text-xs text-slate-300 font-medium">
            هذا القسم مخصص حصرياً للمؤسسين والصنائعية المعتمدين. الزبائن يتصفحون قسم الزبون فقط.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              اختر دورك المصرح به:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("owner");
                  setErrorMsg("");
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedRole === "owner"
                    ? "border-purple-600 bg-purple-50 text-purple-950 font-black shadow-sm ring-2 ring-purple-600/20"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600 font-bold"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    selectedRole === "owner"
                      ? "bg-purple-700 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Crown className="w-5 h-5 text-amber-300" />
                </div>
                <span className="text-xs">مالك المنصة (المؤسس)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole("worker");
                  setErrorMsg("");
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedRole === "worker"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-black shadow-sm ring-2 ring-emerald-600/20"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600 font-bold"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    selectedRole === "worker"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <HardHat className="w-5 h-5" />
                </div>
                <span className="text-xs">صنايعي معتمد</span>
              </button>
            </div>
          </div>

          {selectedRole === "owner" ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                البريد الإلكتروني المعتمد للمؤسس: *
              </label>
              <input
                type="email"
                required
                dir="ltr"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="owner@sanai3i.ps أو بريدك المسجل"
                className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-600 outline-none text-left"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[10px] text-slate-400 font-bold self-center">
                  أمثلة معتمدة:
                </span>
                {FOUNDER_EMAILS.slice(0, 3).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setEmailInput(f)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 font-mono"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                رقم هاتف الفني المسجل في نابلس:
              </label>
              <input
                type="tel"
                dir="ltr"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="059-XXXXXXX (أو اضغط دخول للمعاينة)"
                className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 outline-none text-right"
              />
            </div>
          )}

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed font-medium">
            🔒 <strong>حوكمة الصلاحيات:</strong> قبول ورفض الصنائعية ومراقبة النزاعات والمقترحات محصورة بمالكي المنصة حصراً عبر البريد المعتمد.
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-black text-xs py-3.5 rounded-xl transition-all shadow-md"
          >
            تأكيد الدخول
          </button>
        </form>
      </div>
    </div>
  );
};
