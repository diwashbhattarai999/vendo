import { Environment } from "@vendo/env";
import { Params } from "nestjs-pino";
import { env } from "./env";

/**
 * Configuration for the Pino logger
 */
export const loggerConfig: Params = {
    /**
     * Pino HTTP configuration
     */
    pinoHttp: {
        /**
         * Log level configuration
         */
        level: env.NODE_ENV === Environment.Development ? "debug" : "info",

        /**
         * Transport configuration for development
         */
        transport:
            env.NODE_ENV === Environment.Development
                ? {
                      target: "pino-pretty",
                      options: {
                          colorize: true,
                          translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
                          singleLine: true,
                      },
                  }
                : undefined,

        /**
         * Custom log level mapping
         */
        customLogLevel: (_req, res, err) => {
            if (res.statusCode >= 400 && res.statusCode < 500) return "error";
            if (res.statusCode >= 500 || err) return "error";
            return "info";
        },

        /**
         * Assign a unique requestId for tracing
         */
        genReqId: (req) => req.headers["x-request-id"] || crypto.randomUUID(),
    },
};
