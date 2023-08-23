import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export const SiteLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => (
  <Link
    {...props}
    ref={ref}
    className={cn(
      "text-sm underline underline-offset-4 transition-colors hover:text-muted-foreground",
      className
    )}
  />
))
SiteLink.displayName = "SiteLink"
