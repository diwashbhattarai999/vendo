import { createEnv, Environment, loadEnv } from "@vendo/env";
import { z } from "zod";

// Load environment variables from .env files
loadEnv({
    dir: process.cwd(),
    environment:
        (process.env.NODE_ENV as Environment) || Environment.Development,
});

/**
 * Type-safe environment configuration for the API application
 */
export const env = createEnv({
    server: z.object({
        // Node Environment
        NODE_ENV: z.enum(Environment).default(Environment.Development),

        // Server Configuration
        PORT: z.coerce.number().default(3000),
        HOST: z.string().default("localhost"),

        // // API Configuration
        // API_PREFIX: z.string().default("/api"),
        // API_RATE_LIMIT_TTL: z.coerce.number().default(60),
        // API_RATE_LIMIT_MAX: z.coerce.number().default(100),

        // // CORS Configuration
        // CORS_ORIGIN: z.string().default("http://localhost:3001"),
        // CORS_CREDENTIALS: z.coerce.boolean().default(true),

        // Database
        DATABASE_URL: z.url(),

        // // Redis
        // REDIS_URL: z.url().optional(),

        // // Authentication
        // JWT_SECRET: z.string().min(32),
        // JWT_EXPIRES_IN: z.string().default("7d"),
        // REFRESH_TOKEN_EXPIRES_IN: z.string().default("30d"),

        // // File Upload
        // MAX_FILE_SIZE: z.coerce.number().default(10485760), // 10MB
        // UPLOAD_DEST: z.string().default("./uploads"),

        // // Email
        // EMAIL_FROM: z.string().email().default("noreply@vendo.com"),
        // EMAIL_FROM_NAME: z.string().default("Vendo Platform"),
        // EMAIL_SERVICE_API_KEY: z.string().optional(),

        // // Storage
        // STORAGE_BUCKET_NAME: z.string().optional(),
        // STORAGE_ACCESS_KEY: z.string().optional(),
        // STORAGE_SECRET_KEY: z.string().optional(),
        // STORAGE_REGION: z.string().optional(),

        // // Logging
        // LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

        // // Feature Flags
        // FEATURE_ANALYTICS_ENABLED: z.coerce.boolean().default(false),
        // FEATURE_EMAIL_NOTIFICATIONS: z.coerce.boolean().default(true),
    }),
    strict: true,
});

export type Env = typeof env;
