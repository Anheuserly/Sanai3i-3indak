"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CustomerView } from "@/components/views/CustomerView";
import { WorkerView } from "@/components/views/WorkerView";
import { AdminView } from "@/components/views/AdminView";
import { OwnerAdminView } from "@/components/views/OwnerAdminView";

export default function Home() {
  const { currentRole } = useApp();

  return (
    <div>
      {currentRole === "customer" && <CustomerView />}
      {currentRole === "worker" && <WorkerView />}
      {currentRole === "admin" && <AdminView />}
      {currentRole === "owner_admin" && <OwnerAdminView />}
    </div>
  );
}
