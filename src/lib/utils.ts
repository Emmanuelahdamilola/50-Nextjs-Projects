import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// cn() is the standard helper used in every serious Next.js / Tailwind project.
// clsx handles conditional logic: cn('base', isActive && 'active')
// twMerge handles conflicts:      cn('p-4', 'p-6') → 'p-6'  (last one wins)
// You will use this in almost every component you write.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}