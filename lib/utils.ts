import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateDiffInYears(dateold: Date, datenew: Date) {
  const ynew = datenew.getFullYear();
  const mnew = datenew.getMonth();
  const dnew = datenew.getDate();
  const yold = dateold.getFullYear();
  const mold = dateold.getMonth();
  const dold = dateold.getDate();
  let diff = ynew - yold;
  if (mold > mnew) diff--;
  else {
      if (mold == mnew) {
          if (dold > dnew) diff--;
      }
  }
  return diff;
}
