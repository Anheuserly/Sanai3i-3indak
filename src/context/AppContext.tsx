"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Worker,
  TOP_WORKERS,
  WorkerApplication,
  FakeReport,
  AuditLog,
} from "@/data/mockData";

export type UserRole = "customer" | "worker" | "admin" | "owner_admin";

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeStatusIndex: number;
  advanceStatus: () => void;
  workerApplications: WorkerApplication[];
  approveWorker: (id: string) => void;
  rejectWorker: (id: string, reason: string) => void;
  fakeReports: FakeReport[];
  submitFakeReport: (reason: string) => void;
  auditLogs: AuditLog[];
  promoteToAdmin: (name: string) => void;
  demoteAdmin: (name: string) => void;
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
  submitNewRequest: (cat: string, desc: string, area: string) => void;
  workersList: Worker[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentRole, setCurrentRole] = useState<UserRole>("customer");
  const [activeStatusIndex, setActiveStatusIndex] = useState<number>(2); // 'worker_on_way'
  const [isResponsibilityModalOpen, setIsResponsibilityModalOpen] =
    useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("سبّاك");
  const [workersList] = useState<Worker[]>(TOP_WORKERS);

  const [workerApplications, setWorkerApplications] = useState<
    WorkerApplication[]
  >([
    {
      id: "APP-1",
      name: "ياسر الشكعة",
      phone: "0599876543",
      profession: "كهربائي",
      experienceYears: 9,
      area: "الجبل الشمالي، نابلس",
      description: "صيانة لوحات قواطع منزلية، تمديد خطوط طوارئ وإنارة.",
      status: "pending",
    },
    {
      id: "APP-2",
      name: "بلال عاشور",
      phone: "0599443322",
      profession: "دهّان",
      experienceYears: 6,
      area: "المعاجين، نابلس",
      description: "أعمال دهان ناعم ومعجونة وعزل رطوبة الجدران الداخلية.",
      status: "pending",
    },
  ]);

  const [fakeReports, setFakeReports] = useState<FakeReport[]>([
    {
      id: "REP-101",
      workerName: "الأسطى خليل النابلسي (سبّاك)",
      customerName: "سعيد م. (زبون)",
      requestId: "REQ-088",
      reason:
        "وصلت للموقع المتفق عليه بالمعاجين والزبون لا يجيب الهاتف منذ أكثر من 45 دقيقة.",
      status: "pending",
    },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: "LOG-1",
      adminName: "المؤسس الأول (مالك التطبيق)",
      action: "تعيين أدمن",
      target: "فؤاد كنعان",
      timestamp: "اليوم، 10:15 ص",
    },
    {
      id: "LOG-2",
      adminName: "الأدمن فؤاد كنعان",
      action: "قبول صنايعي معتمد",
      target: "طارق المصري (كهربائي)",
      timestamp: "اليوم، 11:30 ص",
    },
    {
      id: "LOG-3",
      adminName: "المؤسس الثاني (مالك التطبيق)",
      action: "توجيه تحذير لزبون مسيء",
      target: "سعيد م. (بسبب طلب وهمي)",
      timestamp: "اليوم، 01:20 م",
    },
  ]);

  const advanceStatus = () => {
    setActiveStatusIndex((prev) => (prev + 1) % 5); // 0 to 4 (completed)
  };

  const approveWorker = (id: string) => {
    setWorkerApplications((prev) => prev.filter((a) => a.id !== id));
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        adminName: "أدمن النظام",
        action: "قبول طلب صنايعي وتعديل الدور",
        target: "مقدم الطلب",
        timestamp: "الآن",
      },
      ...prev,
    ]);
  };

  const rejectWorker = (id: string, reason: string) => {
    setWorkerApplications((prev) => prev.filter((a) => a.id !== id));
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        adminName: "أدمن النظام",
        action: "رفض طلب صنايعي",
        target: `السبب: ${reason}`,
        timestamp: "الآن",
      },
      ...prev,
    ]);
  };

  const submitFakeReport = (reason: string) => {
    const newRep: FakeReport = {
      id: `REP-${Math.floor(Math.random() * 1000)}`,
      workerName: "الأسطى خليل (سبّاك)",
      customerName: "أحمد النابلسي (زبون)",
      requestId: "REQ-102",
      reason,
      status: "pending",
    };
    setFakeReports((prev) => [newRep, ...prev]);
  };

  const promoteToAdmin = (name: string) => {
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        adminName: "مالك التطبيق (المؤسس)",
        action: "تعيين كأدمن",
        target: name,
        timestamp: "الآن",
      },
      ...prev,
    ]);
  };

  const demoteAdmin = (name: string) => {
    setAuditLogs((prev) => [
      {
        id: `LOG-${Date.now()}`,
        adminName: "مالك التطبيق (المؤسس)",
        action: "إزالة صلاحية أدمن",
        target: name,
        timestamp: "الآن",
      },
      ...prev,
    ]);
  };

  const openResponsibilityModal = () => setIsResponsibilityModalOpen(true);
  const closeResponsibilityModal = () => setIsResponsibilityModalOpen(false);

  const openDownloadModal = () => setIsDownloadModalOpen(true);
  const closeDownloadModal = () => setIsDownloadModalOpen(false);

  const openStaffModal = () => setIsStaffModalOpen(true);
  const closeStaffModal = () => setIsStaffModalOpen(false);

  const submitNewRequest = (cat: string, desc: string, area: string) => {
    setActiveStatusIndex(0); // 'pending'
    closeResponsibilityModal();
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeStatusIndex,
        advanceStatus,
        workerApplications,
        approveWorker,
        rejectWorker,
        fakeReports,
        submitFakeReport,
        auditLogs,
        promoteToAdmin,
        demoteAdmin,
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
        workersList,
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
