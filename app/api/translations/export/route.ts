import AdmZip from "adm-zip"
import { merge } from "merge-anything"

import { languageCodes } from "@/config/languages"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { namespace, namespaceId } = await request.json()

    const translations = await prisma.translation.findMany({
      where: { namespaceId },
    })

    const data: Record<(typeof languageCodes)[number], object> = {
      en: {},
      id: {},
      th: {},
      vn: {},
    }

    for (const item of languageCodes) {
      for (const translation of translations) {
        const json = convertToJson(translation.key, translation[item])
        data[item] = merge(data[item], json)
      }
    }

    const zip = new AdmZip()

    for (const item of languageCodes) {
      zip.addFile(
        `${item}/${namespace}.json`,
        Buffer.from(JSON.stringify(data[item], null, 2), "utf8")
      )
    }

    const zips = zip.toBuffer()

    return new Response(zips, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=${namespace}.zip`,
      },
    })
  } catch (error) {
    console.error("Error exporting translations: ", error)
    return new Response("Error exporting translations", { status: 500 })
  }
}

type NestedObject = { [key: string]: any }

function convertToJson(key: string, value: any): NestedObject {
  const keys = key.split(".")
  const result: NestedObject = {}

  let current = result
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]
    if (i === keys.length - 1) {
      current[k] = value
    } else {
      current[k] = {}
      current = current[k]
    }
  }

  return result
}
