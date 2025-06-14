"use client";

import { useFilteredRoutines } from "@/hooks/use-filtered-routines";
import { useRoutineStore } from "@/store/routine-store";
import { RoutineCard } from "./routine-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function RoutineList() {
  const { groupedRoutines, isLoading, error, filteredCount, totalCount } =
    useFilteredRoutines();
  const { setSelectedRoutineId } = useRoutineStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load routines. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (filteredCount === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {totalCount === 0
            ? "No routines found."
            : "No routines match your search criteria."}
        </p>
      </div>
    );
  }

  const timeGroups = [
    { key: "morning", title: "Morning", routines: groupedRoutines.morning },
    {
      key: "afternoon",
      title: "Afternoon",
      routines: groupedRoutines.afternoon,
    },
    { key: "evening", title: "Evening", routines: groupedRoutines.evening },
  ];

  return (
    <div className="space-y-8">
      {timeGroups.map(({ key, title, routines }) => {
        if (routines.length === 0) return null;

        return (
          <div key={key} className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{title}</h2>
              <span className="text-sm text-muted-foreground">
                ({routines.length} routine{routines.length !== 1 ? "s" : ""})
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {routines.map((routine) => (
                <RoutineCard
                  key={routine.id}
                  routine={routine}
                  onClick={() => setSelectedRoutineId(routine.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
