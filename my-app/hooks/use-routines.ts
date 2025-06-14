import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { routineService } from "@/services/routine-service"
import type { CreateRoutineData } from "@/types/routine"

export const ROUTINE_QUERY_KEYS = {
  all: ["routines"] as const,
  lists: () => [...ROUTINE_QUERY_KEYS.all, "list"] as const,
  list: (filters: Record<string, any>) => [...ROUTINE_QUERY_KEYS.lists(), filters] as const,
  details: () => [...ROUTINE_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...ROUTINE_QUERY_KEYS.details(), id] as const,
}

export const useRoutines = () => {
  return useQuery({
    queryKey: ROUTINE_QUERY_KEYS.lists(),
    queryFn: () => routineService.getRoutines(),
    select: (response) => response.data,
  })
}

export const useRoutine = (id: string) => {
  return useQuery({
    queryKey: ROUTINE_QUERY_KEYS.detail(id),
    queryFn: () => routineService.getRoutineById(id),
    select: (response) => response.data,
    enabled: !!id,
  })
}

export const useCreateRoutine = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRoutineData) => routineService.createRoutine(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROUTINE_QUERY_KEYS.lists() })
    },
  })
}

export const useUpdateRoutine = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateRoutineData> }) =>
      routineService.updateRoutine(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ROUTINE_QUERY_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: ROUTINE_QUERY_KEYS.detail(response.data.id) })
    },
  })
}

export const useDeleteRoutine = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => routineService.deleteRoutine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROUTINE_QUERY_KEYS.lists() })
    },
  })
}
