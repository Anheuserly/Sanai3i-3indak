"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Crown,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Clock,
  Shield,
  Lightbulb,
  Bug,
  HardHat,
  MessageSquare,
  Users,
  Check,
} from "lucide-react";

export const OwnerView: React.FC = () => {
  const {
    workerApplications,
    approveWorker,
    rejectWorker,
    fakeReports,
    feedbackReports,
    auditLogs,
    workersList,
    orders,
    categories,
    currentUserEmail,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    "applications" | "feedbacks" | "orders" | "fake_reports" | "audit"
  >("applications");
  const [rejectReason, setRejectReason] = useState("");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const handleReject = (id: string) => {
    if (!rejectReason.trim()) {
      alert("يرجى كتابة سبب الرفض لتوثيقه في السجل وإبلاغ المتقدم.");
      return;
    }
    rejectWorker(id, rejectReason);
    setRejectReason("");
    setSelectedAppId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Owner Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-primary text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-800/60 text-purple-200 text-xs font-black mb-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>بوابة التحكم والإدارة العليا — حصرية للمؤسسين</span>
          </div>
          <h2 className="text-3xl font-black">لوحة تحكم مالك المنصة (المؤسس)</h2>
          <p className="text-purple-200/80 text-xs font-semibold mt-1">
            صلاحيات كاملة لاعتماد الصنائعية، متابعة البلاغات، مراجعة المقترحات، ومراقبة كافة الطلبات في نابلس
          </p>
          {currentUserEmail && (
            <div className="text-[11px] text-amber-300 font-mono mt-1">
              تم التحقق بحساب المالك المعتمد: {currentUserEmail}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <span className="px-4 py-1.5 rounded-full bg-purple-600 text-white font-black text-xs shadow-md flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>مالك المنصة والمؤسس</span>
          </span>
          <span className="text-[11px] text-slate-300">
            الوصول مقيد ومحمي بقاعدة البيانات
          </span>
        </div>
      </div>

      {/* Quick Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab("applications")}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeTab === "applications"
              ? "bg-purple-50 border-purple-400 ring-2 ring-purple-400/20"
              : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          <div className="text-xs font-bold text-slate-500 mb-1">
            طلبات انضمام الصنائعية
          </div>
          <div className="text-2xl font-black text-purple-700">
            {workerApplications.length} طلب
          </div>
        </div>

        <div
          onClick={() => setActiveTab("feedbacks")}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeTab === "feedbacks"
              ? "bg-amber-50 border-amber-400 ring-2 ring-amber-400/20"
              : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          <div className="text-xs font-bold text-slate-500 mb-1">
            المقترحات والشكاوى
          </div>
          <div className="text-2xl font-black text-amber-600">
            {feedbackReports.length} مشاركة
          </div>
        </div>

        <div
          onClick={() => setActiveTab("orders")}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeTab === "orders"
              ? "bg-blue-50 border-blue-400 ring-2 ring-blue-400/20"
              : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          <div className="text-xs font-bold text-slate-500 mb-1">
            إجمالي طلبات الصيانة
          </div>
          <div className="text-2xl font-black text-primary">
            {orders.length} طلب
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs font-bold text-slate-500 mb-1">
            المهن الـ 19 النشطة
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {categories.length} مهنة مفعلة
          </div>
        </div>
      </div>

      {/* Owner Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            activeTab === "applications"
              ? "bg-purple-700 text-white shadow-sm"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <HardHat className="w-3.5 h-3.5" />
          <span>مراجعة واعتماد الصنائعية ({workerApplications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("feedbacks")}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            activeTab === "feedbacks"
              ? "bg-purple-700 text-white shadow-sm"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>المقترحات وبلاغات الخلل والشكاوى ({feedbackReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            activeTab === "orders"
              ? "bg-purple-700 text-white shadow-sm"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>مراقبة كافة الطلبات ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("fake_reports")}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            activeTab === "fake_reports"
              ? "bg-purple-700 text-white shadow-sm"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>بلاغات الطلبات الوهمية ({fakeReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            activeTab === "audit"
              ? "bg-purple-700 text-white shadow-sm"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>سجل الرقابة والتدقيق</span>
        </button>
      </div>

      {/* TAB 1: WORKER APPLICATIONS (Acceptance ONLY by Owner) */}
      {activeTab === "applications" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                طلبات الانضمام كصنايعي ({workerApplications.length})
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                بصفتك مالك المنصة، يمكنك تدقيق خبرات المتقدمين في المهن المتعددة والموافقة عليها. (الصنائعية لا يملكون صلاحية قبول بعضهم).
              </p>
            </div>
          </div>

          {workerApplications.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-xs font-bold bg-slate-50 rounded-2xl border border-slate-100">
              لا توجد طلبات انضمام معلقة حالياً.
            </div>
          ) : (
            <div className="space-y-4">
              {workerApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-lg text-slate-900">
                          {app.name}
                        </h4>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          خبرة {app.experienceYears} سنوات
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-semibold mt-1">
                        📍 {app.area} • 📞 <span dir="ltr">{app.phone}</span>
                      </div>

                      {/* Multi-professions tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        <span className="text-[11px] font-black text-slate-500 self-center">
                          المهن المطلوبة:
                        </span>
                        {(app.professions || [app.profession]).map((p, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200"
                          >
                            🛠️ {p}
                          </span>
                        ))}
                      </div>

                      {app.description && (
                        <p className="text-xs text-slate-600 mt-2 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed font-medium">
                          "{app.description}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-start">
                      <button
                        onClick={() => approveWorker(app.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>اعتماد وترقية لصنايعي</span>
                      </button>

                      <button
                        onClick={() => setSelectedAppId(selectedAppId === app.id ? null : app.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>رفض الطلب</span>
                      </button>
                    </div>
                  </div>

                  {selectedAppId === app.id && (
                    <div className="pt-3 border-t border-slate-200 space-y-2">
                      <label className="block text-xs font-bold text-red-700">
                        سبب الرفض (سيوثق في السجل):
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="مثلاً: معلومات غير مكتملة، خارج نطاق نابلس..."
                          className="flex-1 text-xs font-bold p-2.5 rounded-xl border border-red-200 outline-none focus:border-red-500"
                        />
                        <button
                          onClick={() => handleReject(app.id)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-4 py-2.5 rounded-xl"
                        >
                          تأكيد الرفض
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: USER FEEDBACK & BUG REPORTS & WORKER COMPLAINTS */}
      {activeTab === "feedbacks" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900">
              المقترحات وبلاغات الخلل الفني وشكاوى الصنائعية ({feedbackReports.length})
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              الرسائل المباشرة المرسلة من أهالي نابلس ومستخدمي التطبيق للمؤسسين
            </p>
          </div>

          <div className="space-y-3.5">
            {feedbackReports.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                        item.type === "suggestion"
                          ? "bg-amber-100 text-amber-900"
                          : item.type === "bug"
                          ? "bg-red-100 text-red-900"
                          : "bg-orange-100 text-orange-900"
                      }`}
                    >
                      {item.type === "suggestion"
                        ? "💡 اقتراح تطوير"
                        : item.type === "bug"
                        ? "🪲 خلل فني"
                        : "⚠️ شكوى ضد صنايعي"}
                    </span>
                    <h4 className="font-black text-sm text-slate-900">{item.title}</h4>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">
                    {item.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-100">
                  {item.details}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>
                    المرسل: <strong>{item.name}</strong> {item.phone && `(${item.phone})`}
                  </span>
                  {item.targetWorkerName && (
                    <span className="text-orange-700 font-bold">
                      الصنايعي المشتكى عليه: {item.targetWorkerName}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REAL-TIME ORDERS */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900">
              مراقبة طلبات الصيانة المباشرة في نابلس ({orders.length})
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              متابعة حالة كل طلب بين الزبون والصنايعي المعتمد
            </p>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-slate-900">
                      #{order.id}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {order.profession}
                    </span>
                    <span className="text-xs text-slate-500">
                      📍 {order.area}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    الزبون: {order.customerName} • {order.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-xl ${
                      order.status === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : order.status === "worker_on_way"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "in_progress"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-200 text-slate-800"
                    }`}
                  >
                    {order.status === "completed"
                      ? "✓ مكتمل"
                      : order.status === "worker_on_way"
                      ? "🛵 في الطريق"
                      : order.status === "in_progress"
                      ? "🔧 جاري العمل"
                      : order.status === "accepted"
                      ? "🤝 تم القبول"
                      : "⏳ بانتظار صنايعي"}
                  </span>
                  {order.assignedWorkerName && (
                    <span className="text-xs font-bold text-slate-600">
                      الفني: {order.assignedWorkerName}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FAKE REPORTS */}
      {activeTab === "fake_reports" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900">
              بلاغات الطلبات الوهمية ({fakeReports.length})
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              بلاغات مرفوعة من الصنائعية لحماية أوقاتهم وسجلاتهم المهنية
            </p>
          </div>

          {fakeReports.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs font-bold bg-slate-50 rounded-2xl border border-slate-100">
              لا توجد بلاغات طلبات وهمية مسجلة حالياً.
            </div>
          ) : (
            <div className="space-y-3">
              {fakeReports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 rounded-2xl bg-red-50/60 border border-red-200 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-black text-red-900">
                    <span>بلاغ رقم: {rep.id}</span>
                    <span>طلب: {rep.requestId}</span>
                  </div>
                  <p className="text-xs text-red-950 font-medium leading-relaxed">
                    السبب: {rep.reason}
                  </p>
                  <div className="text-[11px] text-red-700 font-semibold">
                    المبلغ: {rep.workerName} • ضد: {rep.customerName}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: AUDIT LOG */}
      {activeTab === "audit" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900">
              سجل التدقيق والرقابة الشامل
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              توثيق زمني غير قابل للحذف لكافة الإجراءات الرقابية
            </p>
          </div>

          <div className="space-y-2.5">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">{log.adminName}</span>
                  <span className="mx-2 text-slate-400">•</span>
                  <span className="text-primary font-black">{log.action}</span>
                  <span className="mx-2 text-slate-400">•</span>
                  <span className="text-slate-600 font-medium">{log.target}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
