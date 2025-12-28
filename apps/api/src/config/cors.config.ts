import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { env } from "./env";

/**
 * CORS configuration
 *
 * This configuration allows for dynamic origin validation based on the
 * environment variables. It handles credentials, common methods, and headers
 * required for a modern web application.
 */
export const corsConfig: CorsOptions = {
    /**
     * Set the allowed origins.
     * In development, this typically includes localhost.
     * In production, this should be limited to the actual web application domain.
     */
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const allowedOrigins = env.CORS_ORIGIN;

        if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },

    /**
     * Allow credentials (cookies, authorization headers, etc.)
     * This is required if the web app needs to send cookies to the API.
     */
    credentials: env.CORS_CREDENTIALS,

    /**
     * Standard HTTP methods allowed.
     */
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    /**
     * Common headers allowed in requests.
     */
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "X-Requested-With",
        "X-HTTP-Method-Override",
    ],

    /**
     * How long the results of a preflight request can be cached.
     * 86400 seconds = 24 hours.
     */
    maxAge: 86400,
};
