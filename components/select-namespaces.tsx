"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Namespace } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RadioTabs, RadioTabsItem } from "@/components/radio-tabs"

export function SelectNamespaces({
  namespaces,
  namespaceId,
}: {
  namespaces: Namespace[]
  namespaceId: number
}) {
  const router = useRouter()

  const showedNamespace = React.useMemo(
    () => namespaces.slice(0, 5),
    [namespaces]
  )

  const extraNamespaces = React.useMemo(() => {
    if (namespaces.length <= 5) return []
    return namespaces.slice(5)
  }, [namespaces])

  return (
    <div className="flex items-center gap-2">
      <div className="text-xs font-medium text-muted-foreground">
        Namespace:
      </div>

      {showedNamespace.length > 0 && (
        <RadioTabs
          defaultValue={String(namespaceId)}
          onValueChange={(value) => {
            router.push(`/translations/namespace/${value}`)
          }}
        >
          {showedNamespace.map((item) => (
            <RadioTabsItem key={item.id} value={String(item.id)}>
              {item.name}
            </RadioTabsItem>
          ))}
          {extraNamespaces.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="xs"
                  className="ml-1 bg-white px-4 text-xs font-medium hover:bg-gray-50"
                >
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="max-w-[100px] space-y-1"
              >
                {extraNamespaces.map((item) => (
                  <DropdownMenuItem key={item.id} className="w-full p-0">
                    <RadioTabsItem
                      value={String(item.id)}
                      className="justify-start px-2 text-left data-[state=checked]:bg-gray-100"
                    >
                      {item.name}
                    </RadioTabsItem>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </RadioTabs>
      )}

      <Button
        size="xs"
        variant="outline"
        onClick={() => router.push("/translations/namespaces")}
      >
        Manage
      </Button>
    </div>
  )
}
