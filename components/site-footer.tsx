export function SiteFooter() {
  return (
    <footer className="py-4">
      <div className="site-container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-xs leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href={`https://www.haikhalfakhreez.com`}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            ekaliacid
          </a>
          . The source code is available on{" "}
          <a
            href={`https://github.com/haikhalfakhreez/dashboard`}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
