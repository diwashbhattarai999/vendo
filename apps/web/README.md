# Vendo Web

The frontend web application for the Vendo platform, built with [Next.js](https://nextjs.org/).

## Core Technologies

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Runtime**: Node.js (>=20)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Validation**: [Zod](https://zod.dev/) for type-safe environment and schemas
- **Formatting/Linting**: [Biome](https://biomejs.dev/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Monorepo Tooling**: [Turborepo](https://turbo.build/repo)

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [PNPM](https://pnpm.io/) (>=10.0.0)
- Node.js (>=20.0.0)

### Development

From the root of the monorepo, you can start the web app in development mode:

```bash
pnpm dev --filter web
```

Or, from this directory (`apps/web`):

```bash
pnpm dev
```

The application will run at [http://localhost:3001](http://localhost:3001) by default.

## Scripts

| Script | Description |
| :--- | :--- |
| `pnpm dev` | Starts the development server with Turbopack |
| `pnpm build` | Builds the application for production |
| `pnpm start` | Starts the production server |
| `pnpm lint` | Runs Biome linting |
| `pnpm format` | Formats code using Biome |
| `pnpm test` | Runs tests using Vitest |
| `pnpm test:watch` | Runs tests in watch mode |
| `pnpm typecheck` | Runs TypeScript type checking |

## Environment Variables

Copy the `.env.example` to `.env` and configure the required variables:

```bash
cp .env.example .env
```

Key configuration areas:
- `NEXT_PUBLIC_API_URL`: URL of the Vendo API.
- `NEXT_PUBLIC_APP_URL`: Base URL of this web application.

> [!NOTE]
> Environment variables are validated on startup using Zod in [src/config/env.ts](./src/config/env.ts). Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Architecture

The application uses the Next.js App Router:
- `src/app/`: Contains the routes and layouts.
- `src/components/`: Reusable UI components.
- `src/config/`: Configuration and environment validation.
- `src/lib/`: Shared utilities and logic.
