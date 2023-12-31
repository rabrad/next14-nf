import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function  formatString(str: string) {
  if (str?.length >= 3) {
    return str.substring(0, 3) // Return the first three characters
  } 
} 