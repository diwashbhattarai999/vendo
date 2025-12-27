import { NestFactory } from "@nestjs/core";
import { env } from "@/config/env";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(env.PORT || 3000);
}

void bootstrap();
