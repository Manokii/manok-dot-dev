import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility for `className` prop.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
