import { ValidationPipe, VersioningType } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { Logger } from "nestjs-pino";
import { AppModule } from "@/app/app.module";
import { AllExceptionsFilter } from "@/common/filters/all-exceptions.filter";
import { corsConfig } from "@/config/cors.config";
import { env } from "@/config/env";
import { helmetConfig } from "@/config/helmet.config";
import { setupSwagger } from "@/config/swagger.config";
import { validationConfig } from "@/config/validation.config";

/**
 * Bootstrap function to initialize the NestJS application
 * and start the server
 */
async function bootstrap() {
    // Create the NestJS application
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    // Use Pino logger
    app.useLogger(app.get(Logger));

    // Apply cookie parser middleware
    app.use(cookieParser(env.COOKIE_SECRET));

    // Apply Helmet security headers
    app.use(helmet(helmetConfig));

    // Get HTTP adapter for global filters
    const httpAdapterHost = app.get(HttpAdapterHost);

    // Set global prefix
    app.setGlobalPrefix(env.API_PREFIX, {
        exclude: ["/", "health", "health/*path"],
    });

    // Enable versioning
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "0",
    });

    // Apply global validation pipe
    app.useGlobalPipes(new ValidationPipe(validationConfig));

    // Setup Swagger documentation
    setupSwagger(app);

    // Apply global exception filter
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

    // Apply CORS configuration
    app.enableCors(corsConfig);

    // Enable graceful shutdown hooks
    app.enableShutdownHooks();

    // Start the server
    const port = env.PORT || 3000;
    await app.listen(port);

    // Log application startup information
    const logger = app.get(Logger);
    logger.log(`🚀 Application is running on: http://localhost:${port}`);
    logger.log(`📖 Swagger documentation: http://localhost:${port}/docs`);
}

/**
 * Run the bootstrap function
 */
void bootstrap();
