"use client"

import * as React from "react"
import { Namespace } from "@prisma/client"
import { PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons"

import { createNamespace } from "@/lib/actions/namespace"
import { uploadTranslations } from "@/lib/actions/translations"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { UploadTranslationsForm } from "@/components/upload-translations/form"

export function UploadTranslationsDialog({
  namespaces,
}: {
  namespaces: Namespace[]
}) {
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()
  const [isNamespacePending, startNamespaceTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)
  const [showNamespace, setShowNamespace] = React.useState(false)
  const [namespaceId, setNamespaceId] = React.useState<string | undefined>()
  const namespaceInputRef = React.useRef<HTMLInputElement>(null)

  const handleNamespaceSubmit = React.useCallback(() => {
    const input = namespaceInputRef.current
    if (!input || isPending) return

    startNamespaceTransition(async () => {
      const response = await createNamespace(input.value)

      if (response.success) {
        toast({
          title: `Success!`,
          description: (
            <span>
              Namespace{" "}
              <span className="font-semibold">{response.data.name}</span> is
              created.
            </span>
          ),
        })
        setNamespaceId(String(response.data.id))
        setShowNamespace(false)
        input.value = ""
        return
      }

      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: response.message,
      })
    })
  }, [isPending, toast])

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)

        if (!value) {
          setShowNamespace(false)
          const input = namespaceInputRef.current
          if (input) input.value = ""
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" id="upload-translations">
          Upload
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Translations</DialogTitle>
        </DialogHeader>

        <form
          className="grid gap-4 py-4"
          id="translations-upload"
          action={(formData) => {
            const namespace = formData.get("namespace")
            const en = formData.get("en")

            if (!namespace || !en) {
              toast({
                variant: "destructive",
                title: "Please fill in all required fields.",
                description: `Namespace and English translation are required.`,
              })
              return
            }

            startTransition(async () => {
              const response = await uploadTranslations(formData)

              if (response.success) {
                setOpen(false)
                return
              }

              toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: response.message,
              })
            })
          }}
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Namespace</Label>
              <Button
                type="button"
                size="xs"
                variant="outline"
                className="flex items-center justify-center"
                onClick={() => setShowNamespace(true)}
                disabled={isPending}
              >
                <span>Add New</span>
                <PlusCircledIcon className="ml-1 h-3 w-3" />
              </Button>
            </div>
            <Select
              name="namespace"
              value={namespaceId}
              onValueChange={(v) => {
                if (v) setNamespaceId(v)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select namespace" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {namespaces.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {showNamespace && (
            <div className="space-y-1">
              <Label className="text-xs">Namespace</Label>

              <div className="flex items-stretch gap-2">
                <Input ref={namespaceInputRef} autoFocus className="flex-1" />
                <Button
                  type="button"
                  onClick={handleNamespaceSubmit}
                  disabled={isNamespacePending}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Add namespace</span>
                </Button>
              </div>
            </div>
          )}

          <UploadTranslationsForm />
        </form>

        <DialogFooter>
          <Button type="submit" form="translations-upload" disabled={isPending}>
            {isPending ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
