import type { Routine, CreateRoutineData } from "@/types/routine"
import type { ApiResponse } from "@/types/api"

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock database
let routinesData: Routine[] = []

// Initialize with data from JSON file
const initializeData = async (): Promise<void> => {
  if (routinesData.length === 0) {
    try {
      const response = await fetch("/data/routines.json")
      const data = await response.json()
      routinesData = data.routines
    } catch (error) {
      console.error("Failed to load initial data:", error)
      routinesData = []
    }
  }
}

export const routineService = {
  // Get all routines
  getRoutines: async (): Promise<ApiResponse<Routine[]>> => {
    await initializeData()
    await delay(500) // Simulate network delay

    return {
      data: [...routinesData].sort((a, b) => a.time.localeCompare(b.time)),
      success: true,
    }
  },

  // Get routine by ID
  getRoutineById: async (id: string): Promise<ApiResponse<Routine | null>> => {
    await initializeData()
    await delay(300)

    const routine = routinesData.find((r) => r.id === id) || null

    return {
      data: routine,
      success: true,
    }
  },

  // Create new routine
  createRoutine: async (data: CreateRoutineData): Promise<ApiResponse<Routine>> => {
    await initializeData()
    await delay(800)

    const newRoutine: Routine = {
      id: `routine-${Date.now()}`,
      ...data,
    }

    routinesData.push(newRoutine)

    return {
      data: newRoutine,
      success: true,
      message: "Routine created successfully",
    }
  },

  // Update routine
  updateRoutine: async (id: string, data: Partial<CreateRoutineData>): Promise<ApiResponse<Routine>> => {
    await initializeData()
    await delay(600)

    const index = routinesData.findIndex((r) => r.id === id)
    if (index === -1) {
      throw new Error("Routine not found")
    }

    routinesData[index] = { ...routinesData[index], ...data }

    return {
      data: routinesData[index],
      success: true,
      message: "Routine updated successfully",
    }
  },

  // Delete routine
  deleteRoutine: async (id: string): Promise<ApiResponse<boolean>> => {
    await initializeData()
    await delay(400)

    const index = routinesData.findIndex((r) => r.id === id)
    if (index === -1) {
      throw new Error("Routine not found")
    }

    routinesData.splice(index, 1)

    return {
      data: true,
      success: true,
      message: "Routine deleted successfully",
    }
  },
}
