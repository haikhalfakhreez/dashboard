"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-4 w-4" />
        <span className="hidden text-sm font-bold sm:inline-block">
          dashboard
        </span>
      </Link>

      <nav className="flex items-center space-x-6 text-xs font-medium">
        <Link
          href="/translations"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.includes("/translations")
              ? "text-foreground underline underline-offset-2"
              : "text-foreground/60"
          )}
        >
          Translations
        </Link>
      </nav>
    </div>
  )
}
