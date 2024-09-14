import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateRandomString = (stringLength: number) => {
  const uuid = uuidv4();
  return uuid.replace(/-/g, '').substring(0, stringLength);
}