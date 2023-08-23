import { getNamespaces } from "@/lib/api"
import { UploadTranslationsDialog } from "@/components/upload-translations/dialog"

export async function UploadTranslations() {
  const namespaces = await getNamespaces()
  return <UploadTranslationsDialog namespaces={namespaces} />
}
