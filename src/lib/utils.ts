import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removePrefixIfApplicable(prefix: string, input: string) {
  if (input.startsWith(prefix)) {
    return input.slice(prefix.length);
  }
  return input;
}
