import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { RoutineFilters } from "@/types/routine"

interface RoutineState {
  // Filters
  filters: RoutineFilters
  setSearchTerm: (searchTerm: string) => void
  setCategory: (category: string | undefined) => void
  clearFilters: () => void

  // Modal state
  isAddModalOpen: boolean
  openAddModal: () => void
  closeAddModal: () => void

  // UI state
  selectedRoutineId: string | null
  setSelectedRoutineId: (id: string | null) => void
}

export const useRoutineStore = create<RoutineState>()(
  devtools(
    (set) => ({
      // Filters
      filters: {
        searchTerm: "",
        category: undefined,
      },
      setSearchTerm: (searchTerm: string) =>
        set(
          (state) => ({
            filters: { ...state.filters, searchTerm },
          }),
          false,
          "setSearchTerm",
        ),
      setCategory: (category: string | undefined) =>
        set(
          (state) => ({
            filters: { ...state.filters, category },
          }),
          false,
          "setCategory",
        ),
      clearFilters: () =>
        set(
          {
            filters: {
              searchTerm: "",
              category: undefined,
            },
          },
          false,
          "clearFilters",
        ),

      // Modal state
      isAddModalOpen: false,
      openAddModal: () => set({ isAddModalOpen: true }, false, "openAddModal"),
      closeAddModal: () => set({ isAddModalOpen: false }, false, "closeAddModal"),

      // UI state
      selectedRoutineId: null,
      setSelectedRoutineId: (id: string | null) => set({ selectedRoutineId: id }, false, "setSelectedRoutineId"),
    }),
    { name: "routine-store" },
  ),
)
