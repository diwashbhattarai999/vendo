import { NestFactory } from "@nestjs/core";

import { AppModule } from "@/app/app.module";
import { env } from "@/config/env";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(env.PORT || 3000);
}

void bootstrap();
