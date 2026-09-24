"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  HardHat,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  ShieldCheck,
  Star,
  Check,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Worker, ServiceRequest } from "@/types";

export const WorkerView: React.FC = () => {
  const {
    activeWorker,
    setActiveWorker,
    workersList,
    orders,
    claimOrder,
    updateOrderStatusSpecific,
    submitFakeReport,
  } = useApp();

  const [isAvailable, setIsAvailable] = useState(true);
  const [fakeReportText, setFakeReportText] = useState("");
  const [showFakeModal, setShowFakeModal] = useState(false);
  const [selectedFakeOrderId, setSelectedFakeOrderId] = useState<string>("");

  const workerProfessions = activeWorker.professions || [activeWorker.profession];

  // Orders in hand (claimed by or assigned to this worker)
  const myClaimedOrders = orders.filter(
    (o) =>
      o.assignedWorkerName === activeWorker.name ||
      (o.status !== "pending" && o.status !== "cancelled" && o.status !== "completed")
  );

  // Available new incoming requests (pending)
  const availableOrders = orders.filter((o) => o.status === "pending");

  const checkTradeMatch = (orderCategory: string): boolean => {
    return workerProfessions.some(
      (prof) =>
        prof.toLowerCase().includes(orderCategory.toLowerCase()) ||
        orderCategory.toLowerCase().includes(prof.toLowerCase())
    );
  };

  const handleClaim = async (order: ServiceRequest) => {
    if (!checkTradeMatch(order.profession)) {
      alert(`عذراً، هذا الطلب (${order.profession}) يقع خارج تخصصاتك المعتمدة.`);
      return;
    }
    await claimOrder(order.id, activeWorker.name);
  };

  const handleStepStatus = async (
    orderId: string,
    newStatus: ServiceRequest["status"]
  ) => {
    await updateOrderStatusSpecific(orderId, newStatus);
  };

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (fakeReportText.trim()) {
      submitFakeReport(fakeReportText, selectedFakeOrderId);
      alert("تم رفع البلاغ بنجاح إلى مؤسسي المنصة للتحقيق الفوري وحماية سجلك المهني.");
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
            🛠️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900">
                لوحة فني الصيانة — {activeWorker.name}
              </h2>
              <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                {activeWorker.rankBadge}
              </span>
            </div>
            <p className="text-slate-500 text-xs font-semibold mt-1">
              📍 {activeWorker.area} • تقييم ⭐ {activeWorker.rating.toFixed(2)} ({activeWorker.completedJobs} طلب منجز)
            </p>
            {/* Registered professions badges */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] font-bold text-slate-400">
                تخصصاتك المعتمدة:
              </span>
              {workerProfessions.map((prof, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200"
                >
                  ✓ {prof}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Worker Switcher & Availability Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-500">
              معاينة كفني:
            </label>
            <select
              value={activeWorker.id}
              onChange={(e) => {
                const found = workersList.find((w) => w.id === e.target.value);
                if (found) setActiveWorker(found);
              }}
              className="text-xs font-bold p-2 rounded-xl border border-slate-200 bg-slate-50"
            >
              {workersList.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.profession})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <span className="text-xs font-extrabold text-slate-700">
              الاستقبال:
            </span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                isAvailable
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isAvailable ? "bg-white animate-pulse" : "bg-slate-400"
                }`}
              ></span>
              <span>{isAvailable ? "متاح في نابلس" : "مشغول"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Free Month Notice */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-950 font-medium leading-relaxed">
          <strong>ضمان الاستقلالية والنقدية:</strong> الشهر الأول مجاني بالكامل. يتم استلام الأجرة يداً بيد نقداً (كاش) من الزبون بعد انتهاء العمل بدون اقتطاع أي عمولة إلكترونية.
        </p>
      </div>

      {/* SECTION 1: IN HAND ORDERS (الطلبات في حوزتي / قيد التنفيذ) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>💼 الطلبات في حوزتي (قيد التنفيذ والمتابعة)</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
                {myClaimedOrders.length}
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              تحكم في مرحلة وصولك وتنفيذك للخدمة. الزبون يرى تحديثك لحظة بلحظة.
            </p>
          </div>
        </div>

        {myClaimedOrders.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs font-bold space-y-2">
            <p>لا توجد طلبات في حوزتك حالياً.</p>
            <p className="text-slate-400 font-normal">
              اختر أحد الطلبات المطابقة لمهنتك من القائمة أدناه واضغط "قبول الطلب" لتضمه لحوزتك.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {myClaimedOrders.map((order) => {
              const isAccepted = order.status === "accepted";
              const isOnWay = order.status === "worker_on_way";
              const isInProgress = order.status === "in_progress";
              const isCompleted = order.status === "completed";

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-primary/20 shadow-md space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-xs">
                          {order.profession}
                        </span>
                        <h4 className="font-black text-lg text-slate-900">
                          الطلب #{order.id} — الزبون: {order.customerName}
                        </h4>
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-1">
                        📍 {order.area} • وقت الطلب: {order.time}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedFakeOrderId(order.id);
                        setShowFakeModal(true);
                      }}
                      className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs px-3.5 py-2 rounded-xl transition-all self-start flex items-center gap-1.5"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>إبلاغ عن طلب وهمي</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
                    {order.description}
                  </p>

                  {/* IN-HAND STATUS STEPPER */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-black text-slate-800">
                      مرحلة تنفيذ الطلب الحالية (اضغط لنقل الحالة فوراً):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                      {/* Step 1: Accepted */}
                      <button
                        type="button"
                        onClick={() => handleStepStatus(order.id, "accepted")}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                          isAccepted
                            ? "bg-primary text-white border-primary shadow-sm font-black"
                            : "bg-slate-50 border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
                        }`}
                      >
                        <span className="text-sm">🤝</span>
                        <span className="text-xs">1. تم قبول الطلب</span>
                        {isAccepted && (
                          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                            نشط حالياً
                          </span>
                        )}
                      </button>

                      {/* Step 2: On The Way */}
                      <button
                        type="button"
                        onClick={() => handleStepStatus(order.id, "worker_on_way")}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                          isOnWay
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm font-black"
                            : "bg-slate-50 border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
                        }`}
                      >
                        <span className="text-sm">🛵</span>
                        <span className="text-xs">2. أنا في الطريق</span>
                        {isOnWay && (
                          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                            نشط حالياً
                          </span>
                        )}
                      </button>

                      {/* Step 3: In Progress */}
                      <button
                        type="button"
                        onClick={() => handleStepStatus(order.id, "in_progress")}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                          isInProgress
                            ? "bg-amber-600 text-white border-amber-600 shadow-sm font-black"
                            : "bg-slate-50 border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
                        }`}
                      >
                        <span className="text-sm">🔧</span>
                        <span className="text-xs">3. جاري العمل والفحص</span>
                        {isInProgress && (
                          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                            نشط حالياً
                          </span>
                        )}
                      </button>

                      {/* Step 4: Completed */}
                      <button
                        type="button"
                        onClick={() => handleStepStatus(order.id, "completed")}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                          isCompleted
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-sm font-black"
                            : "bg-slate-50 border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
                        }`}
                      >
                        <span className="text-sm">✅</span>
                        <span className="text-xs">4. تم الإنجاز نقداً</span>
                        {isCompleted && (
                          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                            مكتمل ✓
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 2: AVAILABLE NEW REQUESTS (Strict Trade Matching) */}
      <div className="space-y-4 pt-6">
        <div>
          <h3 className="text-xl font-black text-slate-900">
            الطلبات الجديدة الواردة في نابلس ({availableOrders.length})
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            يمكنك فقط قبول الطلبات التي تطابق تخصصاتك المهنية المعتمدة ({workerProfessions.join("، ")}).
          </p>
        </div>

        {availableOrders.length === 0 ? (
          <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 text-xs font-bold">
            لا توجد طلبات جديدة معلقة حالياً في نابلس.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableOrders.map((req) => {
              const isTradeMatch = checkTradeMatch(req.profession);

              return (
                <div
                  key={req.id}
                  className={`bg-white rounded-3xl p-5 border transition-all space-y-4 ${
                    isTradeMatch
                      ? "border-emerald-300 shadow-sm hover:border-emerald-500"
                      : "border-slate-200 opacity-75 bg-slate-50/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-full ${
                        isTradeMatch
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {req.profession}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      📍 {req.area} • {req.time}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-base text-slate-900">
                      الزبون: {req.customerName}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                      {req.description}
                    </p>
                  </div>

                  {/* Trade Match Notice & Action */}
                  <div className="pt-2">
                    {isTradeMatch ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleClaim(req)}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <span>🤝 قبول الطلب وضمه لحوزتي</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-2 text-[11px] text-slate-500 font-bold">
                        <Lock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>
                          خارج تخصصك المعتمد ({req.profession}). لا يمكن قبول هذا الطلب.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
              نظام "صنايعي عندك" يحمي وقت وجهد الصنائعية. إذا كان موقع الزبون وهمياً، أو امتنع عن الدفع، اكتب التفاصيل وسيتحقق مؤسسو المنصة فوراً لاتخاذ إجراء بحقه.
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
