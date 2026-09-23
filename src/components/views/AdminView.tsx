"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Shield, Users, CheckCircle, XCircle, AlertTriangle, FileText, Clock } from "lucide-react";

export const AdminView: React.FC = () => {
  const {
    workerApplications,
    approveWorker,
    rejectWorker,
    fakeReports,
    auditLogs,
  } = useApp();

  const [rejectReason, setRejectReason] = useState("");
  const [activeAppId, setActiveAppId] = useState<string | null>(null);

  const handleReject = (id: string) => {
    if (!rejectReason.trim()) {
      alert("يرجى كتابة سبب الرفض لتوثيقه في السجل وإبلاغ المتقدم.");
      return;
    }
    rejectWorker(id, rejectReason);
    setRejectReason("");
    setActiveAppId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-amber-400 uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800">
            لوحة الإدارة والرقابة
          </span>
          <h2 className="text-2xl font-black mt-2">
            إدارة منصة صنايعي عندك — نابلس
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-1">
            صلاحيات تدقيق طلبات الصنائعية، فض النزاعات، ومكافحة الطلبات الوهمية
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black self-start">
          🛡️ أدمن معتمد
        </span>
      </div>

      {/* Quick Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 mb-1">طلبات صنايعية معلقة</div>
          <div className="text-2xl font-black text-amber-600">{workerApplications.length}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 mb-1">بلاغات طلبات وهمية</div>
          <div className="text-2xl font-black text-red-600">{fakeReports.length}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 mb-1">صنائعية معتمدين بنابلس</div>
          <div className="text-2xl font-black text-emerald-600">84 فني</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 mb-1">إجمالي طلبات الصيانة</div>
          <div className="text-2xl font-black text-primary">312 طلب</div>
        </div>
      </div>

      {/* Review Worker Applications */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              طلبات الانضمام كصنايعي قيد المراجعة ({workerApplications.length})
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              التحقق من الخبرة والمهنة قبل منح صفة "صنايعي" في النظام
            </p>
          </div>
        </div>

        {workerApplications.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs font-bold">
            لا توجد طلبات صنايعية جديدة قيد المراجعة حالياً.
          </div>
        ) : (
          <div className="space-y-4">
            {workerApplications.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-black text-base text-slate-900">
                      {app.name} — <span className="text-primary">{app.profession}</span>
                    </h4>
                    <div className="text-xs text-slate-500 font-semibold mt-1">
                      📍 {app.area} • 📞 {app.phone} • خبرة {app.experienceYears} سنوات
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black self-start">
                    قيد التدقيق
                  </span>
                </div>

                <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed font-medium">
                  {app.description}
                </p>

                {activeAppId === app.id ? (
                  <div className="space-y-3 pt-2">
                    <input
                      type="text"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="اكتب سبب الرفض (مثال: عدم وضوح سنوات الخبرة، خارج نطاق نابلس)..."
                      className="w-full text-xs p-2.5 rounded-xl border border-red-300 bg-red-50/50 outline-none focus:bg-white"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(app.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
                      >
                        تأكيد الرفض مع ذكر السبب
                      </button>
                      <button
                        onClick={() => setActiveAppId(null)}
                        className="bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => approveWorker(app.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>قبول الطلب وترقية الحساب لصنايعي</span>
                    </button>

                    <button
                      onClick={() => setActiveAppId(app.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>رفض الطلب</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fake Request Reports Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>بلاغات الطلبات الوهمية ومكافحة العبث ({fakeReports.length})</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              التحقيق في بلاغات الصنائعية وحماية حقوقهم واتخاذ إجراءات بحق الزبائن المسيئين
            </p>
          </div>
        </div>

        {fakeReports.length === 0 ? (
          <div className="py-6 text-center text-slate-400 text-xs font-bold">
            لا توجد بلاغات نزاع أو طلبات وهمية مفتوحة حالياً.
          </div>
        ) : (
          <div className="space-y-4">
            {fakeReports.map((rep) => (
              <div
                key={rep.id}
                className="p-5 rounded-2xl bg-red-50/50 border border-red-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="font-black text-sm text-red-950">
                    مقدم البلاغ: {rep.workerName}
                  </div>
                  <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                    ضد الزبون: {rep.customerName}
                  </span>
                </div>

                <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-red-100 font-medium">
                  سبب البلاغ: &ldquo;{rep.reason}&rdquo;
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    onClick={() => alert("تم توجيه إنذار رسمي للزبون وتوثيقه في ملفه.")}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all"
                  >
                    توجيه إنذار رسمي للزبون ⚠️
                  </button>
                  <button
                    onClick={() => alert("تم تقييد حساب الزبون مؤقتاً ومنعه من إرسال طلبات.")}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all"
                  >
                    تقييد حساب الزبون مؤقتاً 🚫
                  </button>
                  <button
                    onClick={() => alert("تم تسجيل حماية للصنايعي وتعويض سجله المهني.")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all"
                  >
                    توثيق حماية للصنايعي ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admin Audit Log Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>سجل الرقابة الإدارية الموثق (Audit Logs)</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              سجل محمي وغير قابل للتعديل أو الحذف يدون كافة قرارات الإدارة
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="p-3 font-black">الإجراء المنفذ</th>
                <th className="p-3 font-black">المسؤول (الأدمن)</th>
                <th className="p-3 font-black">المستهدف</th>
                <th className="p-3 font-black">التوقيت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60">
                  <td className="p-3 font-bold text-primary">{log.action}</td>
                  <td className="p-3 text-slate-800">{log.adminName}</td>
                  <td className="p-3 text-slate-600">{log.target}</td>
                  <td className="p-3 text-slate-400">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
