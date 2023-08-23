import { Kbd } from "@/components/kbd"

export function CommandNote({ value, text }: { value: string; text: string }) {
  return (
    <div className="translate-y-px text-2xs text-muted-foreground md:whitespace-nowrap">
      Press <Kbd value={value} className="h-4 px-1 text-[8px]" /> {text}
    </div>
  )
}
