import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export default function Home() {
  return (
    <main className="site-container py-6">
      <PageHeader className="pb-8">
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          A collection of tools to help you build your next project.
        </PageHeaderDescription>
      </PageHeader>
    </main>
  )
}
