"use client";

import React, { useState } from "react";
import { Shield, HardHat, Crown, Lock, X, ArrowLeft, CheckCircle2, UserCheck } from "lucide-react";
import { useApp, UserRole } from "@/context/AppContext";

export const StaffLoginModal: React.FC = () => {
  const { isStaffModalOpen, closeStaffModal, setCurrentRole } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>("worker");
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isStaffModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow easy testing for admins / workers / owners while keeping customer view default
    setCurrentRole(selectedRole);
    closeStaffModal();
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
            <span>بوابة الشركاء والإدارة — نابلس</span>
          </div>

          <h2 className="text-2xl font-black mb-1">دخول الكادر والفنيين</h2>
          <p className="text-xs text-slate-300 font-medium">
            هذا القسم محمي ومخصص فقط للصنائعية المسجلين وفريق الإدارة. الزبائن يتصفحون قسم الزبون العادي فقط.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              اختر دورك الوظيفي:
            </label>
            <div className="grid grid-cols-3 gap-2">
              
              <button
                type="button"
                onClick={() => setSelectedRole("worker")}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedRole === "worker"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-black shadow-sm ring-2 ring-emerald-600/20"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600 font-bold"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${selectedRole === "worker" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                  <HardHat className="w-4 h-4" />
                </div>
                <span className="text-xs">صنايعي</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("admin")}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedRole === "admin"
                    ? "border-amber-600 bg-amber-50 text-amber-950 font-black shadow-sm ring-2 ring-amber-600/20"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600 font-bold"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${selectedRole === "admin" ? "bg-amber-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs">أدمن</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("owner_admin")}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedRole === "owner_admin"
                    ? "border-purple-600 bg-purple-50 text-purple-950 font-black shadow-sm ring-2 ring-purple-600/20"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600 font-bold"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${selectedRole === "owner_admin" ? "bg-purple-700 text-white" : "bg-slate-100 text-slate-500"}`}>
                  <Crown className="w-4 h-4" />
                </div>
                <span className="text-xs">مالك المنصة</span>
              </button>

            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              رمز الدخول أو رقم الهاتف المسجل:
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="أدخل رمز التحقق (أو اضغط دخول للمعاينة)"
              className="w-full text-xs font-semibold p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed font-medium">
            💡 <strong>توضيح الخصوصية:</strong> الزبائن العاديون يشاهدون فقط واجهة طلب الصيانة وتصفح المهن، بينما تظل لوحات إدارة الصنائعية والنزاعات والتحكم مقتصرة على أصحاب الحسابات المصرحة.
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-black py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span>دخول لوحة التحكم</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
};
