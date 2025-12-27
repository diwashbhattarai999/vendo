# Environment Setup Guide

This guide explains how to configure and use environment variables in the Vendo monorepo.

## Overview

The Vendo monorepo uses a **layered environment configuration strategy** that supports:

- ✅ **Local development** - Easy setup for developers
- ✅ **Test/CI** - Isolated test environments
- ✅ **Staging** - Pre-production validation
- ✅ **Production** - Secure production deployments
- ✅ **Type-safe** - Full TypeScript support with validation
- ✅ **Monorepo-friendly** - Shared and app-specific variables

## Architecture

### Shared Environment Package

The `@vendo/env` package provides:

- **Type-safe environment loading** using Zod schemas
- **Runtime validation** with helpful error messages
- **Environment-specific configuration** (local, test, staging, production)
- **Utility functions** for environment detection

### Environment File Hierarchy

Environment variables are loaded with the following precedence (highest to lowest):

1. **Process environment variables** (set by CI/CD or shell)
2. `.env.{environment}.local` (e.g., `.env.production.local`)
3. `.env.local` (not loaded in test environment)
4. `.env.{environment}` (e.g., `.env.production`)
5. `.env` (base configuration)

> [!IMPORTANT]
> Files ending in `.local` are **never committed to git** and are for local overrides only.

## Quick Start

### 1. Set Up Local Development

```bash
# Copy root-level environment template
cp .env.example .env.local

# Copy app-specific templates
cp apps/api/.env.example apps/api/.env.local
cp apps/web/.env.example apps/web/.env.local

# Edit .env.local files with your local values
```

### 2. Configure Environment Variables

Edit `.env.local` files with your local configuration:

**Root `.env.local`:**
```bash
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vendo_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=local-dev-secret-change-in-production
```

**`apps/api/.env.local`:**
```bash
PORT=3000
CORS_ORIGIN=http://localhost:3001
```

**`apps/web/.env.local`:**
```bash
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 3. Start Development

```bash
# Start all apps
pnpm dev

# Or start individual apps
pnpm --filter api dev
pnpm --filter web dev
```

## Environment Configuration by App

### API Application

The API app uses server-side environment variables defined in `apps/api/src/config/env.ts`.

**Example usage:**

```typescript
import { env } from './config/env';

// Type-safe access to environment variables
const port = env.PORT; // number
const databaseUrl = env.DATABASE_URL; // string (validated as URL)
const jwtSecret = env.JWT_SECRET; // string (min 32 chars)
```

**Available variables:**

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `PORT` | number | 3000 | Server port |
| `DATABASE_URL` | string | - | PostgreSQL connection string |
| `JWT_SECRET` | string | - | JWT signing secret (min 32 chars) |
| `CORS_ORIGIN` | string | http://localhost:3001 | Allowed CORS origin |

See `apps/api/.env.example` for the complete list.

### Web Application

The Web app uses both server-side and client-side environment variables defined in `apps/web/src/config/env.ts`.

> [!WARNING]
> **Next.js Environment Variables**
> 
> Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. All other variables are server-side only.

**Example usage:**

```typescript
import { env } from './config/env';

// Client-side (browser)
const apiUrl = env.NEXT_PUBLIC_API_URL; // Available in browser

// Server-side only
const stripeKey = env.STRIPE_SECRET_KEY; // NOT available in browser
```

**Available variables:**

| Variable | Type | Exposed to Browser | Description |
|----------|------|-------------------|-------------|
| `NEXT_PUBLIC_API_URL` | string | ✅ Yes | API endpoint URL |
| `NEXT_PUBLIC_APP_URL` | string | ✅ Yes | Web app URL |
| `NEXTAUTH_SECRET` | string | ❌ No | NextAuth secret |
| `STRIPE_SECRET_KEY` | string | ❌ No | Stripe API key |

See `apps/web/.env.example` for the complete list.

## Adding New Environment Variables

### 1. Add to Example File

Add the variable to the appropriate `.env.example` file:

```bash
# apps/api/.env.example
NEW_API_KEY=your-api-key-here
```

### 2. Update Environment Schema

Add validation to the app's `env.ts` file:

```typescript
// apps/api/src/config/env.ts
export const env = createEnv({
  server: z.object({
    // ... existing variables
    NEW_API_KEY: z.string().min(1),
  }),
});
```

### 3. Update Turbo Configuration (if needed)

If the variable affects builds or should be passed through Turbo:

```json
// turbo.json
{
  "globalEnv": [
    "NEW_API_KEY"
  ]
}
```

### 4. Document the Variable

Add documentation to this file and update the app's `.env.example`.

## Environment-Specific Configuration

### Test Environment

For running tests:

```bash
# Use test-specific environment
NODE_ENV=test pnpm test

# Or copy test template
cp .env.test.example .env.test
```

Test environment automatically:
- Uses separate database (`.env.test`)
- Disables external services
- Uses shorter token expiration times

### Staging Environment

For staging deployments, set environment variables in your CI/CD platform:

```bash
NODE_ENV=staging
DATABASE_URL=${STAGING_DATABASE_URL}
JWT_SECRET=${STAGING_JWT_SECRET}
```

### Production Environment

For production deployments:

> [!CAUTION]
> **Never commit production secrets to git!**
> 
> Always use your CI/CD platform's secrets management or a dedicated secrets manager (AWS Secrets Manager, HashiCorp Vault, etc.).

```bash
NODE_ENV=production
DATABASE_URL=${PRODUCTION_DATABASE_URL}
JWT_SECRET=${PRODUCTION_JWT_SECRET}
```

## Naming Conventions

Follow these conventions when naming environment variables:

### General Rules

- Use `SCREAMING_SNAKE_CASE`
- Be descriptive and specific
- Group related variables with prefixes

### Prefixes

| Prefix | Usage | Example |
|--------|-------|---------|
| `NEXT_PUBLIC_` | Next.js client-side variables | `NEXT_PUBLIC_API_URL` |
| `DATABASE_` | Database configuration | `DATABASE_URL` |
| `REDIS_` | Redis configuration | `REDIS_URL` |
| `JWT_` | JWT configuration | `JWT_SECRET` |
| `FEATURE_` | Feature flags | `FEATURE_ANALYTICS_ENABLED` |

## Troubleshooting

### Missing Environment Variables

If you see an error like:

```
❌ Invalid server environment variables:
{
  "DATABASE_URL": {
    "_errors": ["Required"]
  }
}
```

**Solution:** Add the missing variable to your `.env.local` file.

### Type Errors

If TypeScript shows errors accessing environment variables:

1. Ensure the `@vendo/env` package is built: `pnpm --filter @vendo/env build`
2. Restart your TypeScript server
3. Check that the variable is defined in the env schema

### Variables Not Loading

If environment variables aren't loading:

1. Check file names match exactly (`.env.local`, not `.env.development.local`)
2. Ensure files are in the correct directory (root or app-specific)
3. Restart your development server
4. Check that `loadEnv()` is called in your env config file

### Next.js Client Variables Not Working

If `NEXT_PUBLIC_` variables aren't available in the browser:

1. Ensure the variable name starts with `NEXT_PUBLIC_`
2. Add it to the `runtimeEnv` object in `apps/web/src/config/env.ts`
3. Restart the Next.js development server (environment variables are embedded at build time)

## CI/CD Integration

### GitHub Actions Example

```yaml
name: CI

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: test
      DATABASE_URL: postgresql://postgres:postgres@localhost:5432/vendo_test
      JWT_SECRET: ${{ secrets.TEST_JWT_SECRET }}
    
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm test
```

### Environment Variables in CI

Set these secrets in your CI/CD platform:

**Required for all environments:**
- `DATABASE_URL`
- `JWT_SECRET`
- `REDIS_URL`

**Production-specific:**
- `PRODUCTION_DATABASE_URL`
- `PRODUCTION_JWT_SECRET`
- `STRIPE_SECRET_KEY`
- `EMAIL_SERVICE_API_KEY`

## Best Practices

### Security

- ✅ Never commit `.env.local` or `.env.*.local` files
- ✅ Use strong, randomly generated secrets
- ✅ Rotate secrets regularly
- ✅ Use different secrets for each environment
- ✅ Use a secrets manager for production
- ❌ Don't use production secrets in development
- ❌ Don't expose sensitive data to the browser

### Development

- ✅ Keep `.env.example` files up to date
- ✅ Document all environment variables
- ✅ Use sensible defaults where possible
- ✅ Validate all environment variables
- ✅ Use type-safe access via the env config
- ❌ Don't access `process.env` directly in app code
- ❌ Don't use hardcoded values

### Monorepo

- ✅ Share common variables at the root level
- ✅ Keep app-specific variables in app directories
- ✅ Use Turbo's `globalEnv` for shared variables
- ✅ Document which variables affect caching
- ❌ Don't duplicate variables across apps

## Additional Resources

- [Zod Documentation](https://zod.dev/) - Schema validation
- [dotenv Documentation](https://github.com/motdotla/dotenv) - Environment file loading
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Turborepo Environment Variables](https://turbo.build/repo/docs/core-concepts/caching#environment-variables)
