import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

/**
 * Swagger configuration for the Vendo API
 */
const config = new DocumentBuilder()
    .setTitle("Vendo Multi-Tenant SaaS API")
    .setDescription(
        "Modern, scalable API for the Vendo platform, handling multi-vendor operations, authentication, and product management.",
    )
    .setVersion("1.0")
    .addBearerAuth()
    .build();

/**
 * Setup Swagger documentation for the application
 *
 * @param app NestJS application instance
 */
export function setupSwagger(app: INestApplication): void {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: "Vendo API Docs",
    });
}
