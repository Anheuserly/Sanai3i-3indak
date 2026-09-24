"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CustomerView } from "@/components/views/CustomerView";
import { WorkerView } from "@/components/views/WorkerView";
import { OwnerView } from "@/components/views/OwnerView";

export default function Home() {
  const { currentRole } = useApp();

  return (
    <main>
      {currentRole === "customer" && <CustomerView />}
      {currentRole === "worker" && <WorkerView />}
      {currentRole === "owner" && <OwnerView />}
    </main>
  );
}
