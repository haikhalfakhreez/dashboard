import { cn } from "@/lib/utils"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export function TranslationsHeader({ className }: { className?: string }) {
  return (
    <PageHeader className={cn("pb-6", className)}>
      <PageHeaderHeading>Translations</PageHeaderHeading>
      <PageHeaderDescription>Manage your translations.</PageHeaderDescription>
    </PageHeader>
  )
}
