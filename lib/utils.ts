import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getNamespaceId(namespaceId: string | string[] | undefined) {
  if (typeof namespaceId === "string") {
    return parseInt(namespaceId, 10)
  }

  return undefined
}
