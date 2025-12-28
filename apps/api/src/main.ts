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

    // Apply CORS configuration
    app.enableCors(corsConfig);

    // Start the server
    await app.listen(env.PORT || 3000);
}

/**
 * Run the bootstrap function
 */
void bootstrap();
