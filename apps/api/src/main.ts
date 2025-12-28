import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";

import { AppModule } from "@/app/app.module";
import { AllExceptionsFilter } from "@/common/filters/all-exceptions.filter";
import { corsConfig } from "@/config/cors.config";
import { env } from "@/config/env";
import { validationConfig } from "@/config/validation.config";

/**
 * Bootstrap function to initialize the NestJS application
 * and start the server
 */
async function bootstrap() {
    // Create the NestJS application
    const app = await NestFactory.create(AppModule);

    // Get HTTP adapter for global filters
    const httpAdapterHost = app.get(HttpAdapterHost);

    // Apply global validation pipe
    app.useGlobalPipes(new ValidationPipe(validationConfig));

    // Apply global exception filter
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

    // Apply CORS configuration
    app.enableCors(corsConfig);

    // Start the server
    await app.listen(env.PORT || 3000);
}

/**
 * Run the bootstrap function
 */
void bootstrap();
