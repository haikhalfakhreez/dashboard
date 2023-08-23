import { notFound } from "next/navigation"

import { getNamespaces, getTranslations } from "@/lib/api"
import { ExportTranslations } from "@/components/export-translations"
import { SelectNamespaces } from "@/components/select-namespaces"
import { TranslationsHeader } from "@/components/translations-header"
import { UploadTranslations } from "@/components/upload-translations"

export default async function Layout({
  params,
  children,
}: {
  params: { namespaceId: string }
  children: React.ReactNode
}) {
  const namespaces = await getNamespaces()
  const namespaceId = getNamespaceId(params.namespaceId)
  const namespace = namespaces.find((i) => i.id === namespaceId)?.name

  if (!namespaceId || !namespace) {
    notFound()
  }

  return (
    <>
      <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
        <TranslationsHeader className="pb-0" />

        <div className="flex items-center gap-2">
          <ExportTranslations namespace={namespace} namespaceId={namespaceId} />
          <UploadTranslations />
        </div>
      </div>

      <div className="mb-4">
        <SelectNamespaces namespaces={namespaces} namespaceId={namespaceId} />
      </div>

      {children}
    </>
  )
}

export function getNamespaceId(namespaceId: string | string[] | undefined) {
  if (typeof namespaceId === "string") {
    return parseInt(namespaceId, 10)
  }

  return undefined
}
