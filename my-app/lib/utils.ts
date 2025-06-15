import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(time: string): string {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

interface Routine {
  id: string;
  time: string;
  [key: string]: any;
}

export function groupRoutinesByTimeOfDay(routines: Routine[]) {
  const groups: {
    morning: Routine[];
    afternoon: Routine[];
    evening: Routine[];
    night: Routine[];
  } = {
    morning: [],
    afternoon: [],
    evening: [],
    night: [],
  };

  routines.forEach((routine) => {
    const hour = parseInt(routine.time.split(":")[0]);
    if (hour >= 5 && hour < 12) {
      groups.morning.push(routine);
    } else if (hour >= 12 && hour < 17) {
      groups.afternoon.push(routine);
    } else if (hour >= 17 && hour < 21) {
      groups.evening.push(routine);
    } else {
      groups.night.push(routine);
    }
  });

  return groups;
}
