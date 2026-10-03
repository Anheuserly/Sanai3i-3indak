"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Category,
  Worker,
  TopCustomer,
  ServiceRequest,
  WorkerApplication,
  FakeReport,
  UserFeedbackReport,
  AuditLog,
  UserRole,
  NABLUS_AREAS,
} from "@/types";
import {
  INITIAL_CATEGORIES,
  INITIAL_WORKERS,
  INITIAL_TOP_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_APPLICATIONS,
  FOUNDER_EMAILS,
} from "@/data/mockData";
import * as api from "@/lib/api";

export type { UserRole };

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUserEmail?: string;
  setCurrentUserEmail: (email: string) => void;
  loginAsOwner: (email: string) => boolean;
  activeStatusIndex: number;
  advanceStatus: (orderId?: string) => Promise<void>;
  updateOrderStatusSpecific: (orderId: string, newStatus: ServiceRequest['status']) => Promise<void>;
  claimOrder: (orderId: string, workerName: string) => Promise<void>;
  categories: Category[];
  workersList: Worker[];
  topCustomers: TopCustomer[];
  orders: ServiceRequest[];
  workerApplications: WorkerApplication[];
  approveWorker: (id: string, assignOrderId?: string) => Promise<void>;
  rejectWorker: (id: string, reason: string) => Promise<void>;
  assignOrderToWorker: (orderId: string, worker: Worker) => Promise<void>;
  fakeReports: FakeReport[];
  submitFakeReport: (reason: string, requestId?: string) => Promise<void>;
  feedbackReports: UserFeedbackReport[];
  submitFeedbackReport: (data: Omit<UserFeedbackReport, 'id' | 'timestamp' | 'status'>) => Promise<void>;
  auditLogs: AuditLog[];
  areas: string[];
  isLoading: boolean;
  isOffline: boolean;
  refreshAll: () => Promise<void>;
  isResponsibilityModalOpen: boolean;
  openResponsibilityModal: (preferredWorker?: Worker) => void;
  closeResponsibilityModal: () => void;
  isDownloadModalOpen: boolean;
  openDownloadModal: () => void;
  closeDownloadModal: () => void;
  isStaffModalOpen: boolean;
  openStaffModal: () => void;
  closeStaffModal: () => void;
  isWorkerApplicationModalOpen: boolean;
  openWorkerApplicationModal: () => void;
  closeWorkerApplicationModal: () => void;
  isFeedbackModalOpen: boolean;
  openFeedbackModal: () => void;
  closeFeedbackModal: () => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  preferredWorker?: Worker | null;
  setPreferredWorker: (worker?: Worker | null) => void;
  submitNewRequest: (cat: string, desc: string, area: string, worker?: Worker) => Promise<void>;
  submitWorkerApplication: (appData: Omit<WorkerApplication, 'id' | 'status'>) => Promise<void>;
  activeWorker: Worker;
  setActiveWorker: (worker: Worker) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentRole, setCurrentRole] = useState<UserRole>("customer");
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [activeStatusIndex, setActiveStatusIndex] = useState<number>(2); // 'worker_on_way'
  const [isResponsibilityModalOpen, setIsResponsibilityModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [isWorkerApplicationModalOpen, setIsWorkerApplicationModalOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("سبّاك ومواسرجي");

  // Handled application IDs stored to avoid resurrection
  const [handledApplicationIds, setHandledApplicationIds] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sanai3i_handled_apps_v2");
        if (stored) return new Set<string>(JSON.parse(stored));
      } catch (e) {
        console.warn("Failed to load handled apps from localStorage", e);
      }
    }
    return new Set<string>();
  });

  const saveHandledApps = (ids: Set<string>) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sanai3i_handled_apps_v2", JSON.stringify(Array.from(ids)));
      } catch (e) {
        console.warn("Failed to save handled apps to localStorage", e);
      }
    }
  };

  // Rock-Solid Default State initialized with all 19 categories and top workers
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [workersList, setWorkersList] = useState<Worker[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sanai3i_workers_cache_v2");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_WORKERS;
  });

  const saveWorkersCache = (workers: Worker[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sanai3i_workers_cache_v2", JSON.stringify(workers));
      } catch (e) {}
    }
  };

  const [activeWorker, setActiveWorker] = useState<Worker>(INITIAL_WORKERS[0]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>(INITIAL_TOP_CUSTOMERS);
  const [orders, setOrders] = useState<ServiceRequest[]>(INITIAL_ORDERS);
  const [workerApplications, setWorkerApplications] = useState<WorkerApplication[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sanai3i_handled_apps_v2");
        const handled = stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
        return INITIAL_APPLICATIONS.filter((a) => !handled.has(a.id));
      } catch (e) {}
    }
    return INITIAL_APPLICATIONS;
  });
  const [preferredWorker, setPreferredWorker] = useState<Worker | null | undefined>(undefined);
  const [fakeReports, setFakeReports] = useState<FakeReport[]>([]);
  const [feedbackReports, setFeedbackReports] = useState<UserFeedbackReport[]>([
    {
      id: "FB-1",
      type: "suggestion",
      name: "م. طارق العمد",
      phone: "0599112233",
      title: "إضافة خريطة تفاعلية لأحياء نابلس",
      details: "نقترح ربط مواقع الطلبات بخريطة واضحة تحدد مسار الفنيين من رفيديا والمخفية.",
      timestamp: "منذ يومين",
      status: "reviewed",
    },
    {
      id: "FB-2",
      type: "bug",
      name: "سامر النابلسي",
      title: "تأكيد زر تنزيل الـ APK المباشر",
      details: "الملف يحمل بصيغة سريعة ونرجو تثبيت زر التنزيل في رأس الصفحة.",
      timestamp: "منذ 4 ساعات",
      status: "pending",
    },
  ]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: "LOG-1",
      adminName: "مؤسس المنصة",
      action: "بدء إطلاق المنصة في نابلس",
      target: "تفعيل الـ 19 مهنة المعتمدة",
      timestamp: "2026-09-24",
    },
  ]);
  const [areas, setAreas] = useState<string[]>(NABLUS_AREAS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  // Load all data live from server if available; fallback gracefully to initial data
  const loadData = useCallback(async () => {
    try {
      const [
        catsRes,
        workersRes,
        custRes,
        ordersRes,
        appsRes,
        reportsRes,
        logsRes,
        areasRes,
      ] = await Promise.all([
        api.fetchCategories().catch(() => null),
        api.fetchWorkers().catch(() => null),
        api.fetchCustomers().catch(() => null),
        api.fetchOrders().catch(() => null),
        api.fetchApplications().catch(() => null),
        api.fetchFakeReports().catch(() => null),
        api.fetchAuditLogs().catch(() => null),
        api.fetchAreas().catch(() => null),
      ]);

      if (catsRes && catsRes.length > 0) {
        setCategories(catsRes);
      }
      if (workersRes && workersRes.length > 0) {
        // Merge server workers with local cache
        const existingIds = new Set(workersRes.map((w) => w.id));
        const mergedWorkers = [...workersRes];
        for (const localW of workersList) {
          if (!existingIds.has(localW.id)) {
            mergedWorkers.push(localW);
          }
        }
        setWorkersList(mergedWorkers);
        saveWorkersCache(mergedWorkers);
        if (mergedWorkers[0]) setActiveWorker(mergedWorkers[0]);
      }
      if (custRes && custRes.length > 0) setTopCustomers(custRes);
      if (ordersRes && ordersRes.length > 0) setOrders(ordersRes);
      if (appsRes) {
        const stored = typeof window !== "undefined" ? localStorage.getItem("sanai3i_handled_apps_v2") : null;
        const handled = stored ? new Set<string>(JSON.parse(stored)) : handledApplicationIds;
        const validApps = appsRes.filter((a) => !handled.has(a.id) && (a.status === 'under_review' || a.status === 'pending'));
        setWorkerApplications(validApps);
      }
      if (reportsRes && reportsRes.length > 0) setFakeReports(reportsRes);
      if (logsRes && logsRes.length > 0) setAuditLogs(logsRes);
      if (areasRes && areasRes.length > 0) setAreas(areasRes);

      setIsOffline(false);
    } catch (err) {
      console.warn("[AppContext] Operating in standalone/client mode with offline defaults:", err);
      setIsOffline(true);
    }
  }, [handledApplicationIds, workersList]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Login as Owner using designated founder email
  const loginAsOwner = (email: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const isFounder = FOUNDER_EMAILS.some((f) => f.toLowerCase() === cleanEmail);
    if (isFounder) {
      setCurrentUserEmail(cleanEmail);
      setCurrentRole("owner");
      return true;
    }
    return false;
  };

  // Claim Order (moves to in-hand / accepted for the worker)
  const claimOrder = async (orderId: string, workerName: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: "accepted", assignedWorkerName: workerName, workerName }
          : o
      )
    );
    try {
      await api.updateOrderStatus(orderId, "accepted", workerName, activeWorker.id);
    } catch (err) {
      console.warn("Could not sync order claim with backend, local state updated.");
    }
  };

  // Assign Order to a specific Worker by Owner or Customer
  const assignOrderToWorker = async (orderId: string, worker: Worker) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "accepted",
              assignedWorkerName: worker.name,
              workerName: worker.name,
              workerId: worker.id,
            }
          : o
      )
    );
    try {
      await api.updateOrderStatus(orderId, "accepted", worker.name, worker.id);
    } catch (err) {
      console.warn("Could not sync assignment to backend, updated locally:", err);
    }
  };

  // Specific Order Status Update
  const updateOrderStatusSpecific = async (
    orderId: string,
    newStatus: ServiceRequest["status"]
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    try {
      await api.updateOrderStatus(orderId, newStatus, activeWorker.name, activeWorker.id);
    } catch (err) {
      console.warn("Could not sync status update with backend, local state updated.");
    }
  };

  // Advance Order Lifecycle Stepper
  const advanceStatus = async (orderId?: string) => {
    const targetOrder = orderId
      ? orders.find((o) => o.id === orderId)
      : orders[0];

    const statuses: ServiceRequest["status"][] = [
      "pending",
      "accepted",
      "worker_on_way",
      "in_progress",
      "completed",
    ];

    if (targetOrder) {
      const currentIndex = statuses.indexOf(targetOrder.status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      const nextStatus = statuses[nextIndex];
      setActiveStatusIndex(nextIndex);
      await updateOrderStatusSpecific(targetOrder.id, nextStatus);
    } else {
      setActiveStatusIndex((prev) => (prev + 1) % statuses.length);
    }
  };

  // Worker Application Approval - ONLY by Owner
  const approveWorker = async (id: string, assignOrderId?: string) => {
    const app = workerApplications.find((a) => a.id === id);
    if (!app) return;

    // Permanently record handled ID
    const newHandled = new Set(handledApplicationIds);
    newHandled.add(id);
    setHandledApplicationIds(newHandled);
    saveHandledApps(newHandled);

    setWorkerApplications((prev) => prev.filter((a) => a.id !== id));

    // Create a new verified worker entry
    const newWorker: Worker = {
      id: `wrk-${Date.now()}`,
      name: app.name,
      profession: app.professions?.[0] || app.profession,
      professions: app.professions && app.professions.length > 0 ? app.professions : [app.profession],
      area: app.area,
      phone: app.phone,
      rating: 5.0,
      ratingCount: 1,
      completedJobs: 0,
      photo: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200",
      rankBadge: "⭐ فني معتمد جديد",
      experienceYears: app.experienceYears || 5,
      description: app.description || `فني معتمد في نابلس (${app.professions?.join("، ") || app.profession}).`,
      isVerified: true,
      isAvailable: true,
    };

    const updatedWorkers = [newWorker, ...workersList];
    setWorkersList(updatedWorkers);
    saveWorkersCache(updatedWorkers);

    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      adminName: "مالك المنصة (المؤسس)",
      action: "قبول طلب انضمام صنايعي جديد وتفعيل صلاحياته",
      target: `${app.name} (${app.professions?.join("، ") || app.profession})${assignOrderId ? ` - تم التعيين للطلب #${assignOrderId}` : ''}`,
      timestamp: new Date().toISOString().split("T")[0],
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    if (assignOrderId) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === assignOrderId
            ? {
                ...o,
                status: "accepted",
                assignedWorkerName: newWorker.name,
                workerName: newWorker.name,
                workerId: newWorker.id,
              }
            : o
        )
      );
    }

    try {
      await api.approveApplication(id, {
        workerName: app.name,
        professions: app.professions && app.professions.length > 0 ? app.professions : [app.profession],
        profession: app.profession,
        phone: app.phone,
        area: app.area,
        assignOrderId: assignOrderId,
      });
      await api.createAuditLog(newLog);
    } catch (err) {
      console.warn("Could not sync approval with backend:", err);
    }
  };

  // Worker Application Rejection - ONLY by Owner
  const rejectWorker = async (id: string, reason: string) => {
    const app = workerApplications.find((a) => a.id === id);

    // Permanently record handled ID
    const newHandled = new Set(handledApplicationIds);
    newHandled.add(id);
    setHandledApplicationIds(newHandled);
    saveHandledApps(newHandled);

    setWorkerApplications((prev) => prev.filter((a) => a.id !== id));

    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      adminName: "مالك المنصة (المؤسس)",
      action: "رفض طلب انضمام صنايعي",
      target: `${app?.name || id} - السبب: ${reason}`,
      timestamp: new Date().toISOString().split("T")[0],
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    try {
      await api.rejectApplication(id, reason, "مالك المنصة (المؤسس)");
      await api.createAuditLog(newLog);
    } catch (err) {
      console.warn("Could not sync rejection with backend:", err);
    }
  };

  // Submit Worker Application (Multi-profession)
  const submitWorkerApplication = async (
    appData: Omit<WorkerApplication, "id" | "status">
  ) => {
    const newApp: WorkerApplication = {
      id: `APP-${Date.now()}`,
      ...appData,
      status: "pending",
    };
    setWorkerApplications((prev) => [newApp, ...prev]);

    try {
      await api.createApplication({
        name: appData.name,
        phone: appData.phone,
        profession: appData.professions?.join("، ") || appData.profession,
        experienceYears: appData.experienceYears,
        area: appData.area,
        description: appData.description,
      });
    } catch (err) {
      console.warn("Could not sync application to server, saved locally:", err);
    }
  };

  // Submit Fake Report
  const submitFakeReport = async (reason: string, requestId?: string) => {
    const newRep: FakeReport = {
      id: `REP-${Date.now()}`,
      workerName: activeWorker.name,
      customerName: "زبون نابلس",
      requestId: requestId || orders[0]?.id || "REQ-101",
      reason,
      status: "pending",
    };
    setFakeReports((prev) => [newRep, ...prev]);

    try {
      await api.createFakeReport({
        workerName: activeWorker.name,
        customerName: "زبون نابلس",
        requestId: newRep.requestId,
        reason,
      });
    } catch (err) {
      console.warn("Could not sync fake report to server:", err);
    }
  };

  // Submit Feedback / Bug Report / Worker Complaint
  const submitFeedbackReport = async (
    data: Omit<UserFeedbackReport, "id" | "timestamp" | "status">
  ) => {
    const newFeedback: UserFeedbackReport = {
      id: `FB-${Date.now()}`,
      ...data,
      timestamp: "الآن",
      status: "pending",
    };
    setFeedbackReports((prev) => [newFeedback, ...prev]);
  };

  // Modals Controls
  const openResponsibilityModal = (worker?: Worker) => {
    if (worker) {
      setPreferredWorker(worker);
      setSelectedCategory(worker.profession);
    } else {
      setPreferredWorker(undefined);
    }
    setIsResponsibilityModalOpen(true);
  };
  const closeResponsibilityModal = () => {
    setIsResponsibilityModalOpen(false);
    setPreferredWorker(undefined);
  };

  const openDownloadModal = () => setIsDownloadModalOpen(true);
  const closeDownloadModal = () => setIsDownloadModalOpen(false);

  const openStaffModal = () => setIsStaffModalOpen(true);
  const closeStaffModal = () => setIsStaffModalOpen(false);

  const openWorkerApplicationModal = () => setIsWorkerApplicationModalOpen(true);
  const closeWorkerApplicationModal = () => setIsWorkerApplicationModalOpen(false);

  const openFeedbackModal = () => setIsFeedbackModalOpen(true);
  const closeFeedbackModal = () => setIsFeedbackModalOpen(false);

  // Submit New Service Request
  const submitNewRequest = async (cat: string, desc: string, area: string, worker?: Worker) => {
    setActiveStatusIndex(0); // 'pending'
    const targetWorker = worker || preferredWorker;
    const newReq: ServiceRequest = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      customerName: "أنا (طلب جديد)",
      profession: cat,
      area: area,
      description: desc,
      status: targetWorker ? "accepted" : "pending",
      time: "الآن",
      assignedWorkerName: targetWorker?.name,
      workerName: targetWorker?.name,
      workerId: targetWorker?.id,
    };
    setOrders((prev) => [newReq, ...prev]);
    closeResponsibilityModal();

    try {
      await api.createOrder({
        category: cat,
        description: desc,
        area: area,
        customerName: "أنا (طلب جديد)",
        workerName: targetWorker?.name,
        workerId: targetWorker?.id,
      });
    } catch (err) {
      console.warn("Could not sync new order to server, stored locally:", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUserEmail,
        setCurrentUserEmail,
        loginAsOwner,
        activeStatusIndex,
        advanceStatus,
        updateOrderStatusSpecific,
        claimOrder,
        categories,
        workersList,
        topCustomers,
        orders,
        workerApplications,
        approveWorker,
        rejectWorker,
        assignOrderToWorker,
        fakeReports,
        submitFakeReport,
        feedbackReports,
        submitFeedbackReport,
        auditLogs,
        areas,
        isLoading,
        isOffline,
        refreshAll: loadData,
        isResponsibilityModalOpen,
        openResponsibilityModal,
        closeResponsibilityModal,
        isDownloadModalOpen,
        openDownloadModal,
        closeDownloadModal,
        isStaffModalOpen,
        openStaffModal,
        closeStaffModal,
        isWorkerApplicationModalOpen,
        openWorkerApplicationModal,
        closeWorkerApplicationModal,
        isFeedbackModalOpen,
        openFeedbackModal,
        closeFeedbackModal,
        selectedCategory,
        setSelectedCategory,
        preferredWorker,
        setPreferredWorker,
        submitNewRequest,
        submitWorkerApplication,
        activeWorker,
        setActiveWorker,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
