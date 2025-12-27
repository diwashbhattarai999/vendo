import z from "zod";

/**
 * Create a type-safe environment configuration validator
 *
 * @param schema - Zod schema defining the environment variables
 * @param options - Options for validation
 * @returns Validated and typed environment object
 *
 * @example
 * ```ts
 * const env = createEnv({
 *   server: z.object({
 *     DATABASE_URL: z.string().url(),
 *     PORT: z.coerce.number().default(3000),
 *   }),
 *   client: z.object({
 *     NEXT_PUBLIC_API_URL: z.string().url(),
 *   }),
 * });
 * ```
 */
export function createEnv<
	TServer extends z.ZodObject<z.ZodRawShape>,
	TClient extends z.ZodObject<z.ZodRawShape> = z.ZodObject<
		Record<string, never>
	>,
>(config: {
	/**
	 * Server-side environment variables schema
	 */
	server: TServer;

	/**
	 * Client-side environment variables schema (e.g., NEXT_PUBLIC_*)
	 */
	client?: TClient;

	/**
	 * Whether to throw on validation errors (defaults to true)
	 */
	strict?: boolean;

	/**
	 * Runtime environment variables (defaults to process.env)
	 */
	runtimeEnv?: Record<string, string | undefined>;
}): z.infer<TServer> & z.infer<TClient> {
	const { server, client, strict = true, runtimeEnv = process.env } = config;

	// Validate server-side variables
	const serverResult = server.safeParse(runtimeEnv);
	if (!serverResult.success) {
		const errors = serverResult.error.format();
		const errorMessage = `❌ Invalid server environment variables:\n${JSON.stringify(errors, null, 2)}`;

		if (strict) {
			throw new Error(errorMessage);
		}
		console.warn(errorMessage);
	}

	// Validate client-side variables if provided
	let clientResult:
		| { success: true; data: z.infer<TClient> }
		| { success: false; error: z.ZodError }
		| undefined;
	if (client) {
		clientResult = client.safeParse(runtimeEnv);
		if (!clientResult.success) {
			const errors = clientResult.error.format();
			const errorMessage = `❌ Invalid client environment variables:\n${JSON.stringify(errors, null, 2)}`;

			if (strict) {
				throw new Error(errorMessage);
			}
			console.warn(errorMessage);
		}
	}

	return {
		...(serverResult.success ? serverResult.data : {}),
		...(clientResult?.success ? clientResult.data : {}),
	} as z.infer<TServer> & z.infer<TClient>;
}
