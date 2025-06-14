export interface ApiResponse<T> {
    data: T
    success: boolean
    message?: string
  }
  
  export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    total: number
    page: number
    limit: number
  }
  