import Link from "next/link"

import { getNamespaces } from "@/lib/api"
import { SiteLink } from "@/components/site-link"
import { TranslationsHeader } from "@/components/translations-header"

export default async function Page() {
  const namespaces = await getNamespaces()
  return (
    <>
      <TranslationsHeader />

      <div className="mb-4 text-sm">
        Select or{" "}
        <SiteLink href="/translations/namespaces">manage namespace</SiteLink>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {namespaces.map((item) => (
          <Link
            href={`/translations/namespace/${item.id}`}
            key={item.id}
            className="border bg-white p-4 text-sm font-medium hover:bg-gray-100"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  )
}
