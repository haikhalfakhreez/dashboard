import { cn } from "@/lib/utils"

export function Kbd({
  className,
  value,
}: {
  className?: string
  value: string
}) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-sans text-[10px] font-medium tabular-nums opacity-100",
        className
      )}
    >
      ⌘ {value}
    </kbd>
  )
}
