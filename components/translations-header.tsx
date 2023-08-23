import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export function TranslationsHeader() {
  return (
    <PageHeader className="pb-6">
      <PageHeaderHeading>Translations</PageHeaderHeading>
      <PageHeaderDescription>Manage your translations.</PageHeaderDescription>
    </PageHeader>
  )
}
