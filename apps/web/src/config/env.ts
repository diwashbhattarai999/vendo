import { createEnv, Environment, loadEnv } from "@vendo/env";
import { z } from "zod";

// Load environment variables from .env files
loadEnv({
	dir: process.cwd(),
	environment: (process.env.NODE_ENV as Environment) || Environment.Development,
});

/**
 * Type-safe environment configuration for the Web application
 *
 * Note: Next.js has special handling for environment variables:
 * - Variables prefixed with NEXT_PUBLIC_ are exposed to the browser
 * - Other variables are only available server-side
 */
export const env = createEnv({
	// Server-side environment variables (not exposed to browser)
	server: z.object({
		// Node Environment
		NODE_ENV: z.enum(Environment).default(Environment.Development),

		// Server Configuration
		PORT: z.coerce.number().default(3001),
	}),

	// Client-side environment variables (exposed to browser)
	client: z.object({
		// API Configuration
		NEXT_PUBLIC_API_URL: z.url(),
		NEXT_PUBLIC_APP_URL: z.url(),
	}),

	strict: true,

	// Map environment variables to the schema
	// This is required for Next.js because process.env is replaced at build time
	runtimeEnv: {
		// Server
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.PORT,

		// Client
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_APP_URL: `${process.env.NEXT_PUBLIC_APP_URL}/api/v1`,
	},
});

export type Env = typeof env;
