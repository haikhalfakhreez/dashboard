"use client"

import { Button } from "@/components/ui/button"
import { SiteLink } from "@/components/site-link"

export function NoTranslations() {
  return (
    <div>
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
