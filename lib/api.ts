import { cache } from "react"
import { Translation } from "@prisma/client"

import { prisma } from "@/lib/prisma"
import { translationSchema, TranslationTableData } from "@/lib/schema"

export const getTranslations = cache(async (namespaceId: number) => {
  const response = await prisma.translation.findMany({
    where: {
      namespaceId,
    },
  })
  const { colHeaders, data } = transform(response)
  return {
    colHeaders,
    data: translationSchema.parse(data),
  }
})

export const getNamespaces = cache(async () => {
  return await prisma.namespace.findMany()
})

// The order will always be:
// 1. Key, 2. En, 3. Id, 4. Th, 5. Vn
function transform(translations: Translation[]) {
  const data: TranslationTableData = []

  for (const { translationId, key, en, id, th, vn } of translations) {
    data.push([translationId, key, en, id ?? "", th ?? "", vn ?? ""])
  }

  return {
    colHeaders: [
      "id",
      "Key",
      "English",
      "Indonesian",
      "Thailand",
      "Vietnamese",
    ],
    data,
  }
}
