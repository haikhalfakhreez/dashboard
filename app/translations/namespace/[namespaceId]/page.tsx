import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

import { getNamespaces, getTranslations } from "@/lib/api"
import { ExportTranslations } from "@/components/export-translations"
import { TranslationsHeader } from "@/components/translations-header"
import { UploadTranslations } from "@/components/upload-translations"

const DataTable = dynamic(() => import("./components/data-table"), {
  ssr: false,
})

export default async function Page({
  params,
}: {
  params: { namespaceId: string }
}) {
  const namespaces = await getNamespaces()
  const namespaceId = getNamespaceId(params.namespaceId)
  const namespace = namespaces.find((i) => i.id === namespaceId)?.name

  if (!namespaceId || !namespace) {
    notFound()
  }

  const { colHeaders, data } = await getTranslations(namespaceId)

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <TranslationsHeader />

        <div className="flex items-center gap-2">
          <ExportTranslations namespace={namespace} namespaceId={namespaceId} />
          <UploadTranslations />
        </div>
      </div>

      <DataTable
        colHeaders={colHeaders}
        data={data}
        namespaces={namespaces}
        namespaceId={namespaceId}
      />
    </>
  )
}

function getNamespaceId(namespaceId: string | string[] | undefined) {
  if (typeof namespaceId === "string") {
    return parseInt(namespaceId, 10)
  }

  return undefined
}
