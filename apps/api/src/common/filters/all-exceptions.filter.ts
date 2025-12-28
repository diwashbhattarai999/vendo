import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from "@nestjs/common";

import { HttpAdapterHost } from "@nestjs/core";
import { Environment } from "@vendo/env";
import { env } from "@/config/env";

/**
 * Exception filter to handle all exceptions globally
 *
 * @param exception The exception to handle
 * @param host The arguments host
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    // Logger instance for logging error details
    private readonly logger = new Logger(AllExceptionsFilter.name);

    // Constructor to inject HttpAdapterHost for HTTP adapter integration
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    // Method to handle exceptions
    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();

        // Determine HTTP status code based on exception type
        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        // Extract exception response if available
        const exceptionResponse =
            exception instanceof HttpException ? exception.getResponse() : null;

        // Extract exception message if available
        const message =
            exception instanceof HttpException
                ? exception.message
                : "Internal server error";

        // Initialize error details and suggestions
        let errors = null;
        let details = "";
        let suggestions = "";

        // Extract error details from exception response if available
        if (exceptionResponse && typeof exceptionResponse === "object") {
            const resp = exceptionResponse as Record<string, unknown>;
            const rawMessage = resp.message;
            errors = rawMessage || null;

            // If message is an array (structured validation errors), we update details/suggestions
            if (Array.isArray(rawMessage)) {
                details = "One or more validation errors occurred.";
                suggestions =
                    "Check the 'errors' field for a detailed breakdown of field-specific validation failures.";
            }
        }

        // Handle different types of exceptions
        if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(
                `Unhandled Exception: ${message}`,
                exception instanceof Error ? exception.stack : "",
            );
            details = "An unexpected error occurred on our server.";
            suggestions =
                "Please try again later or contact support if the issue persists.";
        } else if (httpStatus === HttpStatus.NOT_FOUND) {
            details = `The requested resource '${request.url}' was not found.`;
            suggestions = "Verify the URL or resource ID and try again.";
        }

        // Prepare response body with error details
        const responseBody = {
            success: false,
            status: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message: Array.isArray(errors) ? "Validation Error" : message,
            details: details || message,
            suggestions: suggestions || "No specific suggestions available.",
            errors: Array.isArray(errors) ? errors : null,
            stack:
                env.NODE_ENV === Environment.Development
                    ? exception instanceof Error
                        ? exception.stack
                        : null
                    : null,
        };

        // Send response to client
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
