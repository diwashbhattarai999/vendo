/**
 * Get the base URL of the application.
 * It first checks for the NEXT_PUBLIC_APP_URL environment variable.
 * If not found, it defaults to "http://localhost:3000".
 *
 * @return {string} The base URL of the application.
 */
export const getBaseUrl = (): string => {
	if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;

	return "http://localhost:3000";
};
