import { Environment } from "@vendo/env";
import type { CookieOptions } from "express";
import { env } from "./env";

/**
 * Cookie configuration
 *
 * This configuration provides secure defaults for cookies used in the application.
 * It automatically adjusts settings based on the environment (e.g., Secure flag).
 */
export const cookieConfig: CookieOptions = {
    /**
     * HttpOnly flag
     *
     * Cookie is only accessible by the web server.
     * Prevents XSS attacks from reading the cookie.
     *
     * @default true
     */
    httpOnly: true,

    /**
     * Secure flag
     *
     * Cookie is only sent over HTTPS.
     * Enabled in production and staging environments.
     */
    secure:
        env.NODE_ENV !== Environment.Development &&
        env.NODE_ENV !== Environment.Test,

    /**
     * SameSite attribute for cookies
     * - 'strict': Cookie is only sent in a first-party context
     * - 'lax': Cookie is sent in first-party and cross-site top-level navigations
     * - 'none': Cookie is sent in all contexts (requires Secure flag)
     */
    sameSite: env.NODE_ENV !== Environment.Development ? "strict" : "lax",

    /**
     * The domain for which the cookie is valid.
     * If provided in environment variables, it will be set.
     */
    domain: env.COOKIE_DOMAIN,

    /**
     * Cookie signature.
     * Cookies will be signed using the COOKIE_SECRET.
     *
     * @default true
     */
    signed: true,

    /**
     * Default path for the cookie.
     *
     * @default "/"
     */
    path: "/",
};
