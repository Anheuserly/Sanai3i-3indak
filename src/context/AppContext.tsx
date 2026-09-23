"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Category,
  Worker,
  TopCustomer,
  ServiceRequest,
  WorkerApplication,
  FakeReport,
  AuditLog,
  NABLUS_AREAS,
} from "@/types";
import * as api from "@/lib/api";

export type UserRole = "customer" | "worker" | "admin" | "owner_admin";

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeStatusIndex: number;
  advanceStatus: () => void;
  categories: Category[];
  workersList: Worker[];
  topCustomers: TopCustomer[];
  orders: ServiceRequest[];
  workerApplications: WorkerApplication[];
  approveWorker: (id: string) => Promise<void>;
  rejectWorker: (id: string, reason: string) => Promise<void>;
  fakeReports: FakeReport[];
  submitFakeReport: (reason: string, requestId?: string) => Promise<void>;
  auditLogs: AuditLog[];
  promoteToAdmin: (name: string) => Promise<void>;
  demoteAdmin: (name: string) => Promise<void>;
  areas: string[];
  isLoading: boolean;
  isOffline: boolean;
  refreshAll: () => Promise<void>;
  isResponsibilityModalOpen: boolean;
  openResponsibilityModal: () => void;
  closeResponsibilityModal: () => void;
  isDownloadModalOpen: boolean;
  openDownloadModal: () => void;
  closeDownloadModal: () => void;
  isStaffModalOpen: boolean;
  openStaffModal: () => void;
  closeStaffModal: () => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  submitNewRequest: (cat: string, desc: string, area: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentRole, setCurrentRole] = useState<UserRole>("customer");
  const [activeStatusIndex, setActiveStatusIndex] = useState<number>(2); // 'worker_on_way'
  const [isResponsibilityModalOpen, setIsResponsibilityModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("سبّاك ومواسرجي");

  // Real Database State (starts clean/empty, loaded live from DB)
  const [categories, setCategories] = useState<Category[]>([]);
  const [workersList, setWorkersList] = useState<Worker[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [orders, setOrders] = useState<ServiceRequest[]>([]);
  const [workerApplications, setWorkerApplications] = useState<WorkerApplication[]>([]);
  const [fakeReports, setFakeReports] = useState<FakeReport[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [areas, setAreas] = useState<string[]>(NABLUS_AREAS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  // Load all data live from laptop server database
  const loadData = useCallback(async () => {
    setIsLoading(true);
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
        api.fetchCategories(),
        api.fetchWorkers(),
        api.fetchCustomers(),
        api.fetchOrders(),
        api.fetchApplications(),
        api.fetchFakeReports(),
        api.fetchAuditLogs(),
        api.fetchAreas(),
      ]);

      if (catsRes && catsRes.length > 0) {
        setCategories(catsRes);
        if (catsRes[0]) setSelectedCategory(catsRes[0].name);
      } else if (catsRes) {
        setCategories([]);
      }
      setWorkersList(workersRes || []);
      setTopCustomers(custRes || []);
      setOrders(ordersRes || []);
      setWorkerApplications(appsRes || []);
      setFakeReports(reportsRes || []);
      setAuditLogs(logsRes || []);
      if (areasRes && areasRes.length > 0) setAreas(areasRes);

      setIsOffline(false);
    } catch (err) {
      console.warn('[AppContext] Could not connect to local server:', err);
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const advanceStatus = async () => {
    setActiveStatusIndex((prev) => (prev + 1) % 5);
    // If we have orders in DB, advance the top order status
    if (orders.length > 0) {
      const topOrder = orders[0];
      const statuses = ['pending', 'accepted', 'worker_on_way', 'in_progress', 'completed'];
      const currentIndex = statuses.indexOf(topOrder.status);
      const nextStatus = statuses[(currentIndex + 1) % statuses.length];
      try {
        await api.updateOrderStatus(topOrder.id, nextStatus, 'الأسطى خليل النابلسي');
        setOrders((prev) =>
          prev.map((o, idx) => (idx === 0 ? { ...o, status: nextStatus as any } : o))
        );
      } catch (err) {
        console.error('Failed to advance order status on server:', err);
      }
    }
  };

  const approveWorker = async (id: string) => {
    setWorkerApplications((prev) => prev.filter((a) => a.id !== id));
    try {
      await api.updateApplicationStatus(id, 'approved');
      const newLog = await api.createAuditLog({
        adminName: "أدمن النظام",
        action: "قبول طلب صنايعي وتعديل الدور",
        target: "مقدم الطلب",
      });
      setAuditLogs((prev) => [newLog, ...prev]);
    } catch (err) {
      console.error('Failed to approve application on server:', err);
    }
  };

  const rejectWorker = async (id: string, reason: string) => {
    setWorkerApplications((prev) => prev.filter((a) => a.id !== id));
    try {
      await api.updateApplicationStatus(id, 'rejected');
      const newLog = await api.createAuditLog({
        adminName: "أدمن النظام",
        action: "رفض طلب صنايعي",
        target: `السبب: ${reason}`,
      });
      setAuditLogs((prev) => [newLog, ...prev]);
    } catch (err) {
      console.error('Failed to reject application on server:', err);
    }
  };

  const submitFakeReport = async (reason: string, requestId?: string) => {
    try {
      const newRep = await api.createFakeReport({
        workerName: "الأسطى خليل (سبّاك)",
        customerName: "زبون نابلس",
        requestId: requestId || (orders[0]?.id ?? "REQ-102"),
        reason,
      });
      setFakeReports((prev) => [newRep, ...prev]);
    } catch (err) {
      console.error('Failed to submit fake report on server:', err);
      setFakeReports((prev) => [
        {
          id: `REP-${Date.now().toString().slice(-3)}`,
          workerName: "صنايعي نابلس",
          customerName: "زبون نابلس",
          requestId: requestId || "REQ-102",
          reason,
          status: "pending",
        },
        ...prev,
      ]);
    }
  };

  const promoteToAdmin = async (name: string) => {
    try {
      const newLog = await api.createAuditLog({
        adminName: "مالك التطبيق (المؤسس)",
        action: "تعيين كأدمن",
        target: name,
      });
      setAuditLogs((prev) => [newLog, ...prev]);
    } catch (err) {
      console.error('Failed to promote admin on server:', err);
    }
  };

  const demoteAdmin = async (name: string) => {
    try {
      const newLog = await api.createAuditLog({
        adminName: "مالك التطبيق (المؤسس)",
        action: "إزالة صلاحية أدمن",
        target: name,
      });
      setAuditLogs((prev) => [newLog, ...prev]);
    } catch (err) {
      console.error('Failed to demote admin on server:', err);
    }
  };

  const openResponsibilityModal = () => setIsResponsibilityModalOpen(true);
  const closeResponsibilityModal = () => setIsResponsibilityModalOpen(false);

  const openDownloadModal = () => setIsDownloadModalOpen(true);
  const closeDownloadModal = () => setIsDownloadModalOpen(false);

  const openStaffModal = () => setIsStaffModalOpen(true);
  const closeStaffModal = () => setIsStaffModalOpen(false);

  const submitNewRequest = async (cat: string, desc: string, area: string) => {
    setActiveStatusIndex(0); // 'pending'
    try {
      const created = await api.createOrder({
        category: cat,
        description: desc,
        area: area,
        customerName: 'أنا (الزبون الحالي)',
      });
      setOrders((prev) => [created, ...prev]);
    } catch (err) {
      console.error('Failed to create order on server:', err);
    }
    closeResponsibilityModal();
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeStatusIndex,
        advanceStatus,
        categories,
        workersList,
        topCustomers,
        orders,
        workerApplications,
        approveWorker,
        rejectWorker,
        fakeReports,
        submitFakeReport,
        auditLogs,
        promoteToAdmin,
        demoteAdmin,
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
        selectedCategory,
        setSelectedCategory,
        submitNewRequest,
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
