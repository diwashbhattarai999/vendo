import { Environment } from "@vendo/env";
import type { HelmetOptions } from "helmet";
import { env } from "@/config/env";

/**
 * Helmet configuration for the API
 *
 * We configure CSP to allow Swagger UI to function correctly.
 * Swagger UI requires 'unsafe-inline' for scripts and styles in some versions,
 * or specific CDNs/endpoints if not served locally.
 */
export const helmetConfig: HelmetOptions = {
    /**
     * Strict-Transport-Security (HSTS)
     * Only enable in production with HTTPS
     * Forces browsers to use HTTPS for all requests
     */
    hsts:
        env.NODE_ENV === Environment.Production
            ? {
                  maxAge: 31536000, // 1 year
                  includeSubDomains: true,
                  preload: true,
              }
            : false,

    /**
     * Content Security Policy
     * Allow Swagger UI to work in development
     * In production, CSP will use Helmet's defaults which are more restrictive
     *
     * Swagger UI requires:
     * - Inline scripts and styles
     * - Ability to make requests to the API server
     * - External resources for validation
     *
     * @see https://docs.nestjs.com/openapi/introduction
     */
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "validator.swagger.io"],
            connectSrc: [
                "'self'",
                `http://localhost:${env.PORT}`,
                `http://127.0.0.1:${env.PORT}`,
                `http://${env.HOST}:${env.PORT}`,
            ],
        },
    },
    crossOriginEmbedderPolicy: false,
};
