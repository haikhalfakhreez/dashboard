"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

const RadioTabs = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        "flex items-stretch gap-0.5 overflow-hidden rounded border bg-gray-100 p-0.5",
        className
      )}
      {...props}
      ref={ref}
    />
  )
})
RadioTabs.displayName = RadioGroupPrimitive.Root.displayName

const RadioTabsItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "block min-w-[80px] truncate rounded p-1 text-xs font-medium text-muted-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-white data-[state=checked]:text-primary",
        className
      )}
      {...props}
    />
  )
})
RadioTabsItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioTabs, RadioTabsItem }
