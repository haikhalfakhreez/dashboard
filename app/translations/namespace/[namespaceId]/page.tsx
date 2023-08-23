import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

import { getNamespaces, getTranslations } from "@/lib/api"
import { getNamespaceId } from "@/lib/utils"

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
    <DataTable colHeaders={colHeaders} data={data} namespaceId={namespaceId} />
  )
}
