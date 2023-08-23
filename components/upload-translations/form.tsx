"use client"

import * as React from "react"
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons"

import { languages } from "@/config/languages"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

export function UploadTranslationsForm() {
  const { toast } = useToast()

  const [state, setState] = React.useState<{
    [key: string]: string
  }>({})

  const handleFileUpload = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, code: string) => {
      const file = e.target.files?.[0]
      if (!file) return

      const json = await file.text()

      if (isValidJson(json)) {
        setState((prev) => ({
          ...prev,
          [code]: json,
        }))
        e.target.value = ""
        return
      }

      toast({
        variant: "destructive",
        title: "Invalid JSON",
        description: "Please upload a valid JSON file.",
      })
      e.target.value = ""
    },
    [toast]
  )

  const handlePaste = React.useCallback(
    async (code: string) => {
      const text = await navigator.clipboard.readText()

      if (isValidJson(text)) {
        setState((prev) => ({
          ...prev,
          [code]: text,
        }))
        return
      }

      toast({
        variant: "destructive",
        title: "Invalid JSON",
        description: "Please paste a valid JSON string.",
      })
    },
    [toast]
  )

  const handleRemoval = React.useCallback((code: string) => {
    setState((prev) => {
      const newState = { ...prev }
      delete newState[code]
      return newState
    })

    const input = document.getElementById(code)

    if (input && input instanceof HTMLInputElement) {
      input.value = ""
    }
  }, [])

  return (
    <div className="space-y-1">
      <pre className="text-2xs">{JSON.stringify(state, null, 2)}</pre>
      <Label className="text-xs">JSON</Label>

      <div className="space-y-3">
        {Object.values(languages).map((item) => {
          const value = state[item.code]
          const hasValue = Boolean(value)

          return (
            <div
              key={item.code}
              className="grid grid-cols-4 items-center gap-4"
            >
              <div className="flex">
                <div className="relative text-xs">
                  {item.label}
                  {item.required && (
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="absolute right-0 top-0 h-2 w-2 -translate-y-1/2 translate-x-2 rounded-full bg-red-600 " />
                      </TooltipTrigger>
                      <TooltipContent sideOffset={20} className="text-2xs">
                        <p>Required</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>

              <div className="col-span-2 flex items-stretch gap-2">
                {hasValue ? (
                  <div className="flex h-8 flex-1 items-center justify-center rounded-md border text-center text-xs font-medium">
                    <span>Uploaded!</span>
                    <div className="ml-2 rounded-full bg-green-500 p-0.5">
                      <CheckIcon className="h-3 w-3 text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor={item.code}
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          size: "sm",
                          className: "flex-1 cursor-pointer",
                        }),
                        hasValue && "pointer-events-none opacity-50"
                      )}
                    >
                      Upload
                    </label>

                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="flex-1"
                      disabled={hasValue}
                      onClick={() => handlePaste(item.code)}
                    >
                      Paste
                    </Button>
                  </>
                )}
              </div>

              <input
                type="file"
                className="hidden"
                id={`file-${item.code}`}
                name={`file-${item.code}`}
                onChange={(e) => handleFileUpload(e, item.code)}
                disabled={hasValue}
              />
              <input
                type="text"
                className="hidden"
                id={item.code}
                name={item.code}
                value={value}
              />

              {value && (
                <div className="flex flex-1 items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleRemoval(item.code)}
                  >
                    Remove?
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function isValidJson(json: string) {
  try {
    JSON.parse(json)
    return true
  } catch (e) {
    return false
  }
}
