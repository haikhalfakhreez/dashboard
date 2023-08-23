import { z } from "zod"

// [translation_id, key, en, id, th, vn]
export const translationSchema = z.array(
  z.tuple([
    z.number(),
    z.string(),
    z.string(),
    z.string(),
    z.string(),
    z.string(),
  ])
)

export type TranslationTableData = z.infer<typeof translationSchema>
