import Link from "next/link"

import { getNamespaces } from "@/lib/api"
import { SiteLink } from "@/components/site-link"
import { TranslationsHeader } from "@/components/translations-header"

import { EmptyNamespaces } from "./empty-namespaces"

export default async function Page() {
  const namespaces = await getNamespaces()
  return (
    <>
      <TranslationsHeader />

      {namespaces.length === 0 ? (
        <EmptyNamespaces />
      ) : (
        <div className="mx-auto max-w-lg">
          <div className="mb-8 text-center text-sm">
            Select or{" "}
            <SiteLink href="/translations/namespaces">
              manage namespace
            </SiteLink>
            .
          </div>

          <div className="grid gap-4">
            {namespaces.map((item) => (
              <Link
                href={`/translations/namespace/${item.id}`}
                key={item.id}
                className="rounded border bg-white p-4 text-center text-sm font-semibold hover:bg-gray-100"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
