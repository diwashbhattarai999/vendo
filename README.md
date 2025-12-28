# Vendo Monorepo

Vendo is a collection of packages and projects for the Vendo platform, organized as a high-performance monorepo managed by [Turborepo](https://turbo.build/repo).

## Project Structure

This monorepo uses [PNPM](https://pnpm.io/) Workspaces to manage dependencies across multiple applications and shared packages.

### Applications (`apps/`)

- **[api](./apps/api)**: Backend API built with NestJS (v11), featuring Zod-based environment validation and a modular architecture.
- **[web](./apps/web)**: Frontend web application built with Next.js (App Router) and React 19, styled with Tailwind CSS 4.

### Shared Packages (`packages/`)

- **[ui](./packages/ui)**: Shared React components and design system tokens.
- **[env](./packages/env)**: Type-safe environment variable management and validation using Zod.
- **[biome-config](./packages/biome-config)**: Shared Linting and Formatting configuration for Biome.
- **[typescript-config](./packages/typescript-config)**: Shared TypeScript configurations used across the workspace.
- **[jest-config](./packages/jest-config)**: Shared Jest configuration for automated testing.

## Tech Stack

- **Monorepo Manager**: [Turborepo](https://turbo.build/repo)
- **Package Manager**: [PNPM](https://pnpm.io/) (>=10.0.0)
- **Runtime**: Node.js (>=20.0.0)
- **Backend**: NestJS, TypeScript
- **Frontend**: Next.js (App Router), React 19, Tailwind CSS 4
- **Code Quality**: Biome (Linting & Formatting)
- **Testing**: Jest (API), Vitest (Web)
- **Validation**: Zod

## Getting Started

### Installation

```bash
pnpm install
```

### Development

To start all applications in development mode:

```bash
pnpm dev
```

### Build

To build all projects in the workspace:

```bash
pnpm build
```

## Common Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Run all apps in development mode |
| `pnpm build` | Build all projects |
| `pnpm test` | Run tests across the workspace |
| `pnpm lint` | Lint all files using Biome |
| `pnpm format` | Format all files using Biome |
| `pnpm typecheck` | Run type checking for all projects |
| `pnpm clean` | Remove build artifacts and caches |

## CI/CD

The repository is integrated with **GitHub Actions** for:
- **CI**: Automated linting, type-checking, and testing on every pull request.
- **Release**: Semantic release automation for versioning and changelogs.

---

Built with ❤️ by [Diwash Bhattarai](https://diwashb.com.np).
