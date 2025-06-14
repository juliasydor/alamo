export interface Routine {
    id: string
    time: string
    name: string
    details: string[]
    nutrients: {
      CHO: string
      PTN: string
      LIP: string
    }
    unit: string
    category: "morning" | "afternoon" | "evening"
  }
  
  export interface CreateRoutineData {
    time: string
    name: string
    details: string[]
    nutrients: {
      CHO: string
      PTN: string
      LIP: string
    }
    unit: string
    category: "morning" | "afternoon" | "evening"
  }
  
  export interface RoutineFilters {
    searchTerm: string
    category?: string
  }
  