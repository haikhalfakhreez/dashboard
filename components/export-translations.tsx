"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function ExportTranslations({
  namespace,
  namespaceId,
}: {
  namespace: string
  namespaceId: number
}) {
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  async function handleExport() {
    const response = await fetch("/api/translations/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ namespace, namespaceId }),
    })

    const blob = await response.blob()

    toast({
      title: "✅ Success!",
      description: (
        <span>
          Translation for <span className="font-semibold">{namespace}</span> has
          been exported successfully.
        </span>
      ),
    })

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${namespace}.zip`
    a.click()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-white"
      type="button"
      onClick={() => {
        startTransition(async () => await handleExport())
      }}
      disabled={isPending}
    >
      Export
    </Button>
  )
}
