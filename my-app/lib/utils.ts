import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours, 10)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function groupRoutinesByTimeOfDay(routines: any[]) {
  const groups = {
    morning: [] as any[],
    afternoon: [] as any[],
    evening: [] as any[],
  }

  routines.forEach((routine) => {
    const hour = Number.parseInt(routine.time.split(":")[0])
    if (hour < 12) {
      groups.morning.push(routine)
    } else if (hour < 18) {
      groups.afternoon.push(routine)
    } else {
      groups.evening.push(routine)
    }
  })

  return groups
}
