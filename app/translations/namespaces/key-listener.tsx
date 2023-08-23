"use client"

import * as React from "react"

import { createNamespace } from "@/lib/actions/namespace"
import { useToast } from "@/components/ui/use-toast"

export function KeyListener() {
  const { toast } = useToast()
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()

        async function addNamespace() {
          const form = document.getElementById("add-namespace")

          if (form && form instanceof HTMLFormElement) {
            const formData = new FormData(form)
            const name = formData.get("name")

            if (name && typeof name === "string") {
              const response = await createNamespace(name)

              if (response.success) {
                form.reset()
                toast({
                  title: `Success!`,
                  description: (
                    <span>
                      Namespace{" "}
                      <span className="font-semibold">
                        {response.data.name}
                      </span>{" "}
                      has been successfully created.
                    </span>
                  ),
                })
              }
            }
          }
        }
        addNamespace()
        return
      }

      if (e.key === "Enter") {
        e.preventDefault()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [toast])
  return null
}
