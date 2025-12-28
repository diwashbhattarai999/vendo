# Vendo API

The backend API for the Vendo platform, built with [NestJS](https://nestjs.com/).

## Core Technologies

- **Framework**: [NestJS](https://nestjs.com/) (v11+)
- **Runtime**: Node.js (>=20)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Validation**: [Zod](https://zod.dev/) for type-safe environment and schemas
- **Formatting/Linting**: [Biome](https://biomejs.dev/)
- **Testing**: [Jest](https://jestjs.io/)
- **Monorepo Tooling**: [Turborepo](https://turbo.build/repo)

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [PNPM](https://pnpm.io/) (>=10.0.0)
- Node.js (>=20.0.0)

### Development

From the root of the monorepo, you can start the API in development mode:

```bash
pnpm dev --filter api
```

Or, from this directory (`apps/api`):

```bash
pnpm dev
```

The server will run at [http://localhost:3000](http://localhost:3000) by default.

## Scripts

| Script | Description |
| :--- | :--- |
| `pnpm dev` | Starts the server in watch mode |
| `pnpm build` | Builds the application for production |
| `pnpm start` | Starts the compiled application |
| `pnpm lint` | Runs Biome linting |
| `pnpm format` | Formats code using Biome |
| `pnpm test` | Runs unit tests |
| `pnpm test:e2e` | Runs end-to-end tests |
| `pnpm typecheck` | Runs TypeScript type checking |

## Environment Variables

Copy the `.env.example` to `.env` and configure the required variables:

```bash
cp .env.example .env
```

Key configuration areas:
- `PORT` & `HOST`: Server connection details.
- `NODE_ENV`: Application environment (development, test, production).

> [!NOTE]
> Environment variables are validated on startup using Zod in [src/config/env.ts](./src/config/env.ts).

## Architecture

The API follows a modular NestJS architecture:
- `src/main.ts`: Entry point of the application.
- `src/app.module.ts`: Root module managing dependencies.
- `src/config/`: Configuration and environment validation.
