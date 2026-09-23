"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Crown, ShieldAlert, UserPlus, UserMinus, Settings, CheckCircle2 } from "lucide-react";

export const OwnerAdminView: React.FC = () => {
  const { promoteToAdmin, demoteAdmin, auditLogs } = useApp();

  const [newAdminName, setNewAdminName] = useState("");
  const [currentAdmins, setCurrentAdmins] = useState<string[]>([
    "فؤاد كنعان (أدمن تشغيل)",
    "سمير جابر (أدمن متابعة)",
  ]);

  const handlePromote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminName.trim()) {
      alert("يرجى كتابة اسم أو هاتف المستخدم لتعيينه كأدمن.");
      return;
    }
    promoteToAdmin(newAdminName);
    setCurrentAdmins((prev) => [...prev, `${newAdminName} (أدمن جديد)`]);
    alert(`تمت ترقية ${newAdminName} كأدمن بنجاح وتوثيق العملية في سجل الرقابة.`);
    setNewAdminName("");
  };

  const handleDemote = (adminName: string) => {
    if (confirm(`هل أنت متأكد من سحب صلاحية الأدمن من ${adminName}؟`)) {
      demoteAdmin(adminName);
      setCurrentAdmins((prev) => prev.filter((a) => a !== adminName));
      alert(`تم سحب صلاحية الأدمن من ${adminName}.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Owner Header */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-800/60 text-purple-200 text-xs font-black mb-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>الصلاحية العليا لمنصة صنايعي عندك</span>
          </div>
          <h2 className="text-3xl font-black">
            بوابة مالك التطبيق (المؤسس)
          </h2>
          <p className="text-purple-200/80 text-xs font-semibold mt-1">
            إدارة مسؤولي النظام (الأدمن)، حوكمة الصلاحيات، وضبط سياسات المنصة في نابلس
          </p>
        </div>
        <span className="px-4 py-1.5 rounded-full bg-purple-600 text-white font-black text-xs self-start shadow-md">
          👑 مالك التطبيق (Owner Admin)
        </span>
      </div>

      {/* Security Mandate Card */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>الضوابط الأمنية الصارمة للمالكين (المؤسسَين)</span>
        </div>
        <ul className="text-xs text-amber-900 leading-relaxed space-y-1.5 font-medium list-disc list-inside">
          <li>حسابات المالكين محصنة تماماً ولا يمكن لأي أدمن عادي تعديلها، إيقافها، أو خفض رتبتها.</li>
          <li>لا توجد أي أكواد سرية (RCON codes) في التطبيق تسمح لأي شخص بترقية نفسه.</li>
          <li>صلاحية تعيين الأدمن أو سحب صلاحيته حكر على المؤسسَين فقط عبر هذه الشاشة.</li>
          <li>كل حركة ترقية أو سحب صلاحية تُسجل فوراً في سجل التدقيق غير القابل للتعديل.</li>
        </ul>
      </div>

      {/* Admin Management Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h3 className="text-xl font-black text-slate-900">
            إدارة وتعيين مسؤولي النظام (الأدمن)
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">
            اختر مستخدماً مسجلاً لمنحه صلاحيات الأدمن، أو اسحب الصلاحية لإعادته لدوره السابق
          </p>
        </div>

        {/* Add New Admin Form */}
        <form onSubmit={handlePromote} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newAdminName}
            onChange={(e) => setNewAdminName(e.target.value)}
            placeholder="اكتب اسم أو رقم هاتف المستخدم المسجل لتعيينه كأدمن..."
            className="flex-1 h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-bold text-slate-800 outline-none focus:border-purple-600 focus:bg-white transition-all"
          />
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            <span>تعيين كأدمن</span>
          </button>
        </form>

        {/* Current Admins List */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-black text-slate-700">
            مسؤولو النظام الحاليون في نابلس ({currentAdmins.length}):
          </h4>
          <div className="space-y-2">
            {currentAdmins.map((adm) => (
              <div
                key={adm}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center">
                    🛡️
                  </div>
                  <span className="font-extrabold text-xs text-slate-800">{adm}</span>
                </div>
                <button
                  onClick={() => handleDemote(adm)}
                  className="text-red-600 hover:text-red-700 font-extrabold text-xs flex items-center gap-1 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all"
                >
                  <UserMinus className="w-3.5 h-3.5" />
                  <span>إزالة صلاحية الأدمن</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Settings & Categories */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              إعدادات منصة نابلس والتصنيفات المهنية
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              المهن الـ 19 مفعلة وتستقبل الطلبات في كافة أحياء نابلس
            </p>
          </div>
          <button
            onClick={() => alert("جميع المهن الـ 19 مفعلة بنجاح.")}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>ضبط وتحديث المهن</span>
          </button>
        </div>
      </div>

    </div>
  );
};
