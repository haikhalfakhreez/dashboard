"use client"

import "handsontable/dist/handsontable.full.min.css"
import "./data-table.css"

import * as React from "react"
import { HotTable, HotTableProps } from "@handsontable/react"
import { CheckIcon, Cross2Icon, UpdateIcon } from "@radix-ui/react-icons"
import { registerAllModules } from "handsontable/registry"

import { languageCodes } from "@/config/languages"
import { saveTranslations } from "@/lib/actions/translations"
import { TranslationTableData } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { CommandNote } from "@/components/command-note"
import { NoTranslations } from "@/components/no-translations"

registerAllModules()

export default function DataTable({
  colHeaders,
  data,
  namespaceId,
}: {
  colHeaders: HotTableProps["colHeaders"]
  data: TranslationTableData
  namespaceId: number
}) {
  const [isPending, startTransition] = React.useTransition()
  const tableRef = React.useRef<React.ElementRef<typeof HotTable> | null>(null)
  const [hasChanges, setHasChanges] = React.useState(false)
  const [pin, setPin] = React.useState<2 | 3>(2)

  const save = React.useCallback(() => {
    if (isPending) return
    startTransition(async () => {
      const instance = tableRef.current?.hotInstance
      const response = await saveTranslations({
        namespaceId,
        data: instance?.getData() as TranslationTableData,
      })

      if (response.success) {
        setHasChanges(false)
      }
    })
  }, [isPending, namespaceId])

  // Save when ⌘S is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        save()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [save])

  if (data.length === 0) {
    return <NoTranslations />
  }

  return (
    <div className="datatableContainer">
      <div className="sticky top-10 z-[200] flex items-center justify-between gap-2 border-b bg-white py-2">
        <SaveIndicator hasChanges={hasChanges} isSaving={isPending} />

        <div className="flex items-center gap-4">
          <Button
            size="xs"
            variant="outline"
            className="bg-white"
            onClick={() => {
              setPin((p) => (p === 2 ? 3 : 2))
            }}
          >
            {pin === 2 ? "Pin English" : "Unpin English"}
          </Button>

          <Stats data={data} />
        </div>
      </div>

      <HotTable
        ref={tableRef}
        data={data}
        rowHeaders={true}
        colHeaders={colHeaders}
        height="auto"
        width="100%"
        licenseKey="non-commercial-and-evaluation"
        fixedColumnsStart={pin}
        colWidths={(index) => {
          if (index === 0) return 0
          if (index === 1) return 250
          return 500
        }}
        manualColumnResize
        columns={() => ({ wordWrap: true })}
        tableClassName="text-xs datatable"
        afterChange={(_, source) => {
          if (["loadData", "updateData"].includes(source)) return
          if (!hasChanges) setHasChanges(true)
        }}
        hiddenColumns={{
          columns: [0],
        }}
      />
    </div>
  )
}

function SaveIndicator({
  hasChanges,
  isSaving,
}: {
  hasChanges: boolean
  isSaving: boolean
}) {
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (isSaving) setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }, [isSaving])

  return (
    <div className="relative flex items-center gap-2">
      <div className="relative flex items-center gap-1 rounded border px-2 py-1 text-2xs font-semibold">
        {loading ? (
          <>
            <UpdateIcon className="h-3 w-3 animate-spin" />
            <span>Saving...</span>
          </>
        ) : hasChanges ? (
          <>
            <Cross2Icon className="h-3 w-3 text-red-600" />
            <span className="text-red-600">Not saved</span>
          </>
        ) : (
          <>
            <CheckIcon className="h-3 w-3 text-indigo-600" />
            <span className="text-indigo-600">Saved</span>
          </>
        )}
      </div>

      {hasChanges && <CommandNote value="S" text="to save" />}
    </div>
  )
}

function Stats({ data }: { data: TranslationTableData }) {
  const getPercentage = React.useCallback(
    (index: number) => {
      const idx = index + 2
      const total = data.map((i) => i[0]).length // Key
      const current = data.map((i) => i[idx]).filter((i) => i).length
      const result = Math.floor((current / total) * 100)

      if (Number.isNaN(result)) return 0

      return result
    },
    [data]
  )

  return (
    <div className="flex items-center gap-4">
      {languageCodes.map((item, index) => (
        <div key={index} className="flex flex-1 items-center gap-1 text-xs">
          <div className="text-muted-foreground">{item}</div>
          <div className="font-semibold tabular-nums">
            {getPercentage(index)}
          </div>
        </div>
      ))}
    </div>
  )
}
