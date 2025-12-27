import { Environment } from "./environment.enum";

/**
 * Get the current environment
 */
export function getEnvironment(): Environment {
	const env = process.env.NODE_ENV;
	if (
		env === Environment.Production ||
		env === Environment.Staging ||
		env === Environment.Test
	) {
		return env;
	}
	return Environment.Development;
}

/**
 * Check if running in a specific environment
 */
export function isEnvironment(env: Environment): boolean {
	return getEnvironment() === env;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
	return isEnvironment(Environment.Production);
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
	return isEnvironment(Environment.Development);
}

/**
 * Check if running in test
 */
export function isTest(): boolean {
	return isEnvironment(Environment.Test);
}

/**
 * Check if running in staging
 */
export function isStaging(): boolean {
	return isEnvironment(Environment.Staging);
}
