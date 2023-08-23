"use client"

import * as React from "react"
import { Cross1Icon } from "@radix-ui/react-icons"

import { deleteNamespace } from "@/lib/actions/namespace"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function DeleteButton({ id }: { id: number }) {
  const [sure, setSure] = React.useState(false)
  const { toast } = useToast()
  return (
    <>
      {sure ? (
        <div className="flex items-center gap-2">
          <div className="mr-4">
            <div className="mb-0.5 whitespace-nowrap text-xs font-semibold">
              Are you sure?
            </div>
            <div className="whitespace-nowrap text-2xs leading-3">
              This will delete all translations.
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="bg-white"
            onClick={async () => {
              const response = await deleteNamespace(id)

              if (response.success) {
                toast({
                  description: (
                    <span>
                      Namespace{" "}
                      <span className="font-semibold">
                        {response.data.name}
                      </span>{" "}
                      has been successfully deleted.
                    </span>
                  ),
                })
                setSure(false)
              }
            }}
          >
            Yes
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSure(false)}>
            No
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          variant="destructive"
          className="h-8 w-8 p-0"
          onClick={() => setSure(true)}
        >
          <Cross1Icon className="h-4 w-4" />
        </Button>
      )}
    </>
  )
}
