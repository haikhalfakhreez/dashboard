"use client"

import Link from "next/link"
import { Namespace } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { SelectNamespaces } from "@/components/select-namespaces"
import { SiteLink } from "@/components/site-link"

export function NoTranslations({
  namespaces,
  namespaceId,
}: {
  namespaces: Namespace[]
  namespaceId: number
}) {
  return (
    <div>
      <div className="flex justify-end">
        <SelectNamespaces namespaces={namespaces} namespaceId={namespaceId} />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-40">
        <div>You have no translations for this namespace.</div>
        <Button
          onClick={() => {
            const btn = document.querySelector("#upload-translations")
            if (btn && btn instanceof HTMLButtonElement) btn.click()
          }}
        >
          Add New Translation
        </Button>

        <div className="text-sm">
          Or{" "}
          <SiteLink href="/translations/namespaces">
            manage your namespaces
          </SiteLink>
          .
        </div>
      </div>
    </div>
  )
}
