import type { ThrottlerModuleOptions } from "@nestjs/throttler";
import { env } from "@/config/env";

/**
 * Throttler configuration for the API
 *
 * We use the environment variables to define the rate limit TTL and max requests.
 */
export const throttlerConfig: ThrottlerModuleOptions = [
    {
        /**
         * Time to live for the rate limit
         */
        ttl: env.API_RATE_LIMIT_TTL * 1000, // Convert to milliseconds

        /**
         * Maximum number of requests allowed in the time window
         */
        limit: env.API_RATE_LIMIT_MAX,

        /**
         * Skip rate limiting
         */
        skipIf: () => env.API_RATE_LIMIT_SKIP_IF,
    },
];
