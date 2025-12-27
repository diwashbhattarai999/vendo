# @vendo/env

> Type-safe environment variable management for the Vendo monorepo

A production-grade environment configuration package that provides type-safe environment variable validation, loading, and management across different environments (development, test, staging, production).

## Features

- ✅ **Type-Safe**: Full TypeScript support with Zod schema validation
- 🔒 **Runtime Validation**: Catch configuration errors before they reach production
- 🌍 **Multi-Environment**: Built-in support for development, test, staging, and production
- 📁 **Hierarchical Loading**: Smart `.env` file precedence following industry best practices
- 🔄 **Variable Expansion**: Support for variable interpolation in `.env` files
- 🎯 **Framework Agnostic**: Works with Next.js, NestJS, and any Node.js application
- 🚀 **Zero Config**: Sensible defaults with full customization options

## Installation

This is an internal workspace package. Add it to your app's dependencies:

```json
{
  "dependencies": {
    "@vendo/env": "workspace:*"
  }
}
```

Then install dependencies:

```bash
pnpm install
```

## Quick Start

### Basic Usage

```typescript
import { createEnv, loadEnv, Environment } from "@vendo/env";
import { z } from "zod";

// 1. Load environment variables from .env files
loadEnv({
  dir: process.cwd(),
  environment: (process.env.NODE_ENV as Environment) || Environment.Development,
});

// 2. Define and validate your environment schema
export const env = createEnv({
  server: z.object({
    NODE_ENV: z.enum(Environment).default(Environment.Development),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url(),
    API_KEY: z.string().min(32),
  }),
});

// 3. Use your type-safe environment variables
console.log(env.PORT); // TypeScript knows this is a number
console.log(env.DATABASE_URL); // TypeScript knows this is a string
```

### Next.js Usage

Next.js requires explicit runtime environment mapping:

```typescript
import { createEnv, loadEnv, Environment } from "@vendo/env";
import { z } from "zod";

loadEnv({
  dir: process.cwd(),
  environment: (process.env.NODE_ENV as Environment) || Environment.Development,
});

export const env = createEnv({
  server: z.object({
    DATABASE_URL: z.string().url(),
    API_SECRET: z.string(),
  }),
  client: z.object({
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_APP_NAME: z.string(),
  }),
  // Required for Next.js - explicitly map process.env
  runtimeEnv: {
    // Server
    DATABASE_URL: process.env.DATABASE_URL,
    API_SECRET: process.env.API_SECRET,
    // Client
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
});
```

## API Reference

### `loadEnv(options?)`

Loads environment variables from `.env` files with proper precedence.

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `environment` | `Environment` | `process.env.NODE_ENV \|\| "development"` | Current environment |
| `dir` | `string` | `process.cwd()` | Directory to search for `.env` files |
| `validate` | `boolean` | `true` | Whether to validate environment variables |
| `strict` | `boolean` | `true` | Throw errors on validation failure |

#### File Precedence

Files are loaded in this order (highest to lowest priority):

1. **Process environment variables** (highest priority)
2. `.env.{environment}.local` (e.g., `.env.production.local`)
3. `.env.local` (not loaded in test environment)
4. `.env.{environment}` (e.g., `.env.production`)
5. `.env` (lowest priority)

#### Example

```typescript
import { loadEnv, Environment } from "@vendo/env";

loadEnv({
  dir: process.cwd(),
  environment: Environment.Production,
  strict: true,
});
```

### `createEnv(config)`

Creates a type-safe environment configuration validator.

#### Config

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `server` | `z.ZodObject` | Yes | Server-side environment variables schema |
| `client` | `z.ZodObject` | No | Client-side environment variables schema |
| `strict` | `boolean` | No | Throw on validation errors (default: `true`) |
| `runtimeEnv` | `Record<string, string \| undefined>` | No | Runtime environment variables (required for Next.js) |

#### Returns

A validated and typed environment object combining server and client variables.

#### Example

```typescript
import { createEnv } from "@vendo/env";
import { z } from "zod";

const env = createEnv({
  server: z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().default(3000),
  }),
  client: z.object({
    NEXT_PUBLIC_API_URL: z.string().url(),
  }),
  strict: true,
});
```

### Environment Utilities

Helper functions for environment detection:

```typescript
import {
  getEnvironment,
  isEnvironment,
  isProduction,
  isDevelopment,
  isTest,
  isStaging,
  Environment,
} from "@vendo/env";

// Get current environment
const env = getEnvironment(); // Environment.Development | Environment.Test | Environment.Staging | Environment.Production

// Check specific environment
if (isProduction()) {
  // Production-only code
}

if (isDevelopment()) {
  // Development-only code
}

// Generic environment check
if (isEnvironment(Environment.Staging)) {
  // Staging-only code
}
```

### Environment Enum

```typescript
enum Environment {
  Development = "development",
  Test = "test",
  Staging = "staging",
  Production = "production",
}
```

## Environment File Structure

### Recommended Setup

```
your-app/
├── .env                      # Default values (committed to git)
├── .env.local                # Local overrides (gitignored)
├── .env.development          # Development defaults (committed)
├── .env.development.local    # Local dev overrides (gitignored)
├── .env.test                 # Test environment (committed)
├── .env.staging              # Staging environment (committed)
├── .env.staging.local        # Local staging overrides (gitignored)
├── .env.production           # Production defaults (committed)
└── .env.production.local     # Local prod overrides (gitignored)
```

### Example `.env` File

```bash
# Node Environment
NODE_ENV=development

# Server Configuration
PORT=3000
HOST=localhost

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# API Keys (use .env.local for real values)
API_KEY=your-api-key-here

# Variable Expansion (supported via dotenv-expand)
BASE_URL=http://${HOST}:${PORT}
```

## Best Practices

### 1. **Never Commit Secrets**

```bash
# .gitignore
.env.local
.env.*.local
```

### 2. **Use `.env.example` for Documentation**

```bash
# .env.example
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
API_KEY=your-api-key-here
```

### 3. **Validate Early**

Load and validate environment variables at application startup:

```typescript
// src/config/env.ts
import { createEnv, loadEnv, Environment } from "@vendo/env";
import { z } from "zod";

loadEnv({
  dir: process.cwd(),
  environment: (process.env.NODE_ENV as Environment) || Environment.Development,
});

export const env = createEnv({
  server: z.object({
    NODE_ENV: z.enum(Environment).default(Environment.Development),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url(),
  }),
  strict: true,
});

// src/main.ts or src/index.ts
import { env } from "./config/env";

// Environment is validated before app starts
console.log(`Starting server on port ${env.PORT}`);
```

### 4. **Use Type-Safe Defaults**

```typescript
const env = createEnv({
  server: z.object({
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
    ENABLE_CORS: z.coerce.boolean().default(true),
  }),
});
```

### 5. **Separate Client and Server Variables**

```typescript
const env = createEnv({
  // Server-only (never exposed to browser)
  server: z.object({
    DATABASE_URL: z.string().url(),
    API_SECRET: z.string(),
  }),
  // Client-safe (exposed to browser)
  client: z.object({
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
  }),
});
```

## Error Handling

### Validation Errors

When validation fails, you'll get detailed error messages:

```typescript
// Missing required variable
❌ Invalid server environment variables:
{
  "DATABASE_URL": {
    "_errors": ["Required"]
  }
}

// Invalid format
❌ Invalid server environment variables:
{
  "DATABASE_URL": {
    "_errors": ["Invalid url"]
  }
}
```

### Non-Strict Mode

For development, you can use non-strict mode to log warnings instead of throwing:

```typescript
const env = createEnv({
  server: z.object({
    DATABASE_URL: z.string().url(),
  }),
  strict: false, // Logs warnings instead of throwing
});
```

## Migration Guide

### From Plain `process.env`

**Before:**
```typescript
const port = Number(process.env.PORT) || 3000;
const dbUrl = process.env.DATABASE_URL; // Could be undefined!
```

**After:**
```typescript
import { createEnv } from "@vendo/env";
import { z } from "zod";

const env = createEnv({
  server: z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url(), // Guaranteed to exist and be valid
  }),
});

const port = env.PORT; // Type: number
const dbUrl = env.DATABASE_URL; // Type: string (validated URL)
```

### From `dotenv`

**Before:**
```typescript
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;
```

**After:**
```typescript
import { createEnv, loadEnv } from "@vendo/env";
import { z } from "zod";

loadEnv();

const env = createEnv({
  server: z.object({
    API_KEY: z.string().min(32),
  }),
});

const apiKey = env.API_KEY; // Type-safe and validated
```

## Development

### Scripts

```bash
# Build the package
pnpm build

# Watch mode for development
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Format code
pnpm format

# Clean build artifacts
pnpm clean
```

### Project Structure

```
packages/env/
├── src/
│   ├── create-env.ts       # Main validation function
│   ├── load.env.ts         # Environment file loader
│   ├── env.utils.ts        # Utility functions
│   ├── environment.enum.ts # Environment enum
│   └── index.ts            # Public API exports
├── dist/                   # Compiled output
├── biome.json              # Linting configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- **[zod](https://zod.dev/)** (v4.x) - TypeScript-first schema validation
- **[dotenv](https://github.com/motdotla/dotenv)** - Loads environment variables from `.env` files
- **[dotenv-expand](https://github.com/motdotla/dotenv-expand)** - Variable expansion for `.env` files

## License

Internal package for the Vendo monorepo.

## Support

For issues or questions, please refer to the [main repository documentation](../../README.md) or contact the platform team.
