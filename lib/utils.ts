import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateDiffInYears(dateold: Date, datenew: Date) {
  var ynew = datenew.getFullYear();
  var mnew = datenew.getMonth();
  var dnew = datenew.getDate();
  var yold = dateold.getFullYear();
  var mold = dateold.getMonth();
  var dold = dateold.getDate();
  var diff = ynew - yold;
  if (mold > mnew) diff--;
  else {
      if (mold == mnew) {
          if (dold > dnew) diff--;
      }
  }
  return diff;
}
