import Link from "next/link"

import { getNamespaces } from "@/lib/api"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CommandNote } from "@/components/command-note"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

import { DeleteButton } from "./delete-button"
import { KeyListener } from "./key-listener"

export default async function Page() {
  const namespaces = await getNamespaces()
  return (
    <>
      <PageHeader className="pb-6">
        <PageHeaderHeading>Namespaces</PageHeaderHeading>
        <PageHeaderDescription>Manage your namespaces.</PageHeaderDescription>
      </PageHeader>

      <form id="add-namespace" className="mb-4 flex">
        <div className="flex items-center gap-2">
          <Input
            name="name"
            placeholder="Add Namespace"
            className="text-xs"
            autoFocus
          />

          <CommandNote value="⏎" text="to add" />

          <KeyListener />
        </div>
      </form>

      <Table>
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-[300px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {namespaces.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-xs tabular-nums text-muted-foreground">
                {item.id}
              </TableCell>
              <TableCell className="flex">
                <div className="rounded border bg-muted px-2 py-1 text-xs font-semibold">
                  <Link
                    href={`/translations/namespace/${item.id}`}
                    className="hover:underline"
                  >
                    {item.name}
                  </Link>
                </div>
              </TableCell>
              <TableCell>
                <DeleteButton id={item.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
