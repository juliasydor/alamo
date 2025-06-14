"use client"

import { useMemo } from "react"
import { useRoutines } from "./use-routines"
import { useRoutineStore } from "@/store/routine-store"
import { groupRoutinesByTimeOfDay } from "@/lib/utils"
import type { Routine } from "@/types/routine"

export const useFilteredRoutines = () => {
  const { data: routines = [], isLoading, error } = useRoutines()
  const { filters } = useRoutineStore()

  const filteredRoutines = useMemo(() => {
    let filtered = routines

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (routine: Routine) =>
          routine.name.toLowerCase().includes(searchLower) ||
          routine.details.some((detail) => detail.toLowerCase().includes(searchLower)),
      )
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((routine: Routine) => routine.category === filters.category)
    }

    return filtered
  }, [routines, filters])

  const groupedRoutines = useMemo(() => {
    return groupRoutinesByTimeOfDay(filteredRoutines)
  }, [filteredRoutines])

  return {
    routines: filteredRoutines,
    groupedRoutines,
    isLoading,
    error,
    totalCount: routines.length,
    filteredCount: filteredRoutines.length,
  }
}
