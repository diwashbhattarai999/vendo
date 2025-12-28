import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "@/app/app.module";
import { corsConfig } from "@/config/cors.config";
import { env } from "@/config/env";

/**
 * Bootstrap function to initialize the NestJS application
 * and start the server
 */
async function bootstrap() {
    // Create the NestJS application
    const app = await NestFactory.create(AppModule);

    // Apply global validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Remove unknown properties
            transform: true, // Convert input data to the expected type
            forbidNonWhitelisted: true, // Throw an error if unknown properties are present
        }),
    );

    // Apply CORS configuration
    app.enableCors(corsConfig);

    // Start the server
    await app.listen(env.PORT || 3000);
}

/**
 * Run the bootstrap function
 */
void bootstrap();
