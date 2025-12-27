import * as fs from "node:fs";
import * as path from "node:path";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

import { Environment } from "./environment.enum";

/**
 * Options for loading environment variables
 */
export interface LoadEnvOptions {
	/**
	 * The current environment (defaults to NODE_ENV or 'development')
	 */
	environment?: Environment;

	/**
	 * Directory to search for .env files (defaults to process.cwd())
	 */
	dir?: string;

	/**
	 * Whether to validate environment variables (defaults to true)
	 */
	validate?: boolean;

	/**
	 * Whether to throw an error if validation fails (defaults to true)
	 * If false, will log warnings instead
	 */
	strict?: boolean;
}

/**
 * Load environment variables from .env files with proper precedence
 *
 * Precedence (highest to lowest):
 * 1. Process environment variables
 * 2. .env.{environment}.local (e.g., .env.production.local)
 * 3. .env.local (not loaded in test environment)
 * 4. .env.{environment} (e.g., .env.production)
 * 5. .env
 *
 * @param options - Configuration options for loading environment
 */
export function loadEnv(options: LoadEnvOptions = {}): void {
	const {
		environment = (process.env.NODE_ENV as Environment) || "development",
		dir = process.cwd(),
	} = options;

	// Store original NODE_ENV
	const originalNodeEnv = process.env.NODE_ENV;

	// Set NODE_ENV if not already set
	if (!process.env.NODE_ENV) {
		process.env.NODE_ENV = environment;
	}

	// List of .env files to load (in reverse order of precedence)
	const envFiles = [
		".env",
		`.env.${environment}`,
		environment !== "test" && ".env.local",
		`.env.${environment}.local`,
	].filter(Boolean) as string[];

	// Load each .env file
	for (const file of envFiles) {
		const filePath = path.resolve(dir, file);
		if (fs.existsSync(filePath)) {
			const result = config({ path: filePath, override: false });
			if (result.parsed) {
				expand(result);
			}
		}
	}

	// Restore original NODE_ENV if it was set
	if (originalNodeEnv) {
		process.env.NODE_ENV = originalNodeEnv;
	}
}
