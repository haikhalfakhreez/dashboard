# Dashboard

A collection of tools to automate and simplify my workflow.
Built using the new Next.js 13 App router, React Server Component, and Server Actions.
Open source.

> **Warning**
> This app is a work in progress. I'll be adding new features and fixing bugs as I go.
> See the roadmap below.

## About this project

This project serve to automate and simplify my workflow. It will also act as an experiment to see how modern features would work in Next.js 13 and server components.

## Features

- New `/app` router from [**Next.js**](https://nextjs.org/)
- UI Components from [**shadcn/ui**](https://ui.shadcn.com/)
- Server Actions
- ORM using [**Prisma**](https://www.prisma.io/)
- Database using **SQLite**
- Server and Client Components
- Prettier import autosort [**@ianvs/prettier-plugin-sort-imports**](https://github.com/IanVS/prettier-plugin-sort-imports)

## Roadmap

- [ ] GPT-4 chat integration using OpenAI API and [Vercel AI SDK](https://vercel.com/blog/introducing-the-vercel-ai-sdk)
- [ ] Authentication using NextAuth
- [ ] Move database to NoSQL (MongoDB) & MySQL (PlanetScale)
- [ ] Responsive style
- [ ] Add OG image and metadata
- [ ] Dark mode

## Known Issues

1. `handsontable` typescript definitions are not working. Need to manually patch from `node_modules`.
2. `adm-zip` is giving build warnings, but it doesn't break the build.

## Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Patch `handsontable` and `@handsontable/react` typescript definitions:

```sh
pnpm postinstall
```

3. Copy `.env.example` to `.env` and update the variables.

```sh
cp .env.example .env
```

4. Start the development server:

```sh
pnpm dev
```
