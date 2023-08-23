"use server"

import { cache } from "react"
import { revalidatePath } from "next/cache"
import { Prisma, Translation } from "@prisma/client"

import { languageCodes } from "@/config/languages"
import { ActionResponse } from "@/lib/actions/types"
import { prisma } from "@/lib/prisma"
import { TranslationTableData } from "@/lib/schema"

export async function saveTranslations({
  namespaceId,
  data,
}: {
  namespaceId: number
  data: TranslationTableData
}) {
  try {
    await prisma.$transaction(
      data.map((item) => {
        const [translationId, key, en, id, th, vn] = item
        return prisma.translation.update({
          where: { translationId },
          data: {
            key,
            en,
            id,
            th,
            vn,
          },
        })
      })
    )
    return true
  } catch (error) {
    console.error("Error saving translations:", error)
    return false
  }
}

type TranslationObject = Omit<Translation, "translationId">

export const uploadTranslations = cache(
  async (
    formData: FormData
  ): Promise<
    ActionResponse<{
      id: number
    }>
  > => {
    try {
      const namespaceId = formData.get("namespace")
      const en = formData.get("en")

      if (!namespaceId || !en) {
        throw new Error("Missing namespace or english translation")
      }

      const data: Record<(typeof languageCodes)[number], LanguageObject[]> = {
        en: [],
        id: [],
        th: [],
        vn: [],
      }

      for (const code of languageCodes) {
        const value = formData.get(code)

        if (value && typeof value === "string") {
          const json = JSON.parse(value)
          data[code] = parse(json)
        }
      }

      const translations: TranslationObject[] = []

      for (const { key, value } of data.en) {
        translations.push({
          namespaceId: Number(namespaceId),
          key,
          en: value,
          id: data.id.find((i) => i.key === key)?.value ?? null,
          th: data.th.find((i) => i.key === key)?.value ?? null,
          vn: data.vn.find((i) => i.key === key)?.value ?? null,
        })
      }

      await prisma.$transaction([
        prisma.translation.deleteMany({
          where: { namespaceId: Number(namespaceId) },
        }),
        ...translations.map((item) => {
          return prisma.translation.create({
            data: {
              namespaceId: item.namespaceId,
              key: item.key,
              en: item.en,
              id: item.id,
              th: item.th,
              vn: item.vn,
            },
          })
        }),
      ])

      revalidatePath("/translations")

      return {
        success: true,
        data: {
          id: Number(namespaceId),
        },
      }
    } catch (error) {
      console.error(error)

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return {
          success: false,
          message:
            "Translation key must be unique, including from all other namespaces.",
        }
      }

      return {
        success: false,
        message: "Something went wrong. Please check the console for details.",
      }
    }
  }
)

export type LanguageObject = {
  key: string
  value: string
}

function parse(obj: any, parentKey = ""): LanguageObject[] {
  let result: LanguageObject[] = []

  for (const item in obj) {
    if (typeof obj[item] === "string") {
      const key = parentKey ? `${parentKey}.${item}` : item
      const value = obj[item]
      result.push({ key, value })
    } else if (typeof obj[item] === "object") {
      const nestedKey = parentKey ? `${parentKey}.${item}` : item
      result = result.concat(parse(obj[item], nestedKey))
    }
  }

  return result
}
