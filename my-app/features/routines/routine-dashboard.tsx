"use client";

import { RoutineList } from "@/components/routines/routine-list";
import { AddRoutineModal } from "@/components/routines/add-routine-modal";

export function RoutineDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Laboratory Routines
        </h1>
        <p className="text-muted-foreground">
          Manage and monitor your daily laboratory procedures and protocols.
        </p>
      </div>

      <RoutineList />
      <AddRoutineModal />
    </div>
  );
}
