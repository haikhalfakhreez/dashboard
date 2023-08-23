import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"

export function EmptyNamespaces() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center space-y-6">
      <div className="rounded-md border bg-gray-50 p-4 font-mono text-sm">
        <div>
          You have no namespaces. To start, you have to add your first
          namespace.
        </div>
      </div>
      <Link href="/translations/namespaces" className={buttonVariants()}>
        Add Namespace
      </Link>
    </div>
  )
}
