import { join } from "node:path";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { LoggerModule } from "nestjs-pino";
import { loggerConfig } from "@/config/logger.config";
import { throttlerConfig } from "@/config/throttler.config";
import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { HealthModule } from "@/modules/health/health.module";
import { UsersModule } from "@/modules/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), "public"),
            exclude: ["/api/:path*"],
        }),
        ThrottlerModule.forRoot(throttlerConfig),
        LoggerModule.forRoot(loggerConfig),
        PrismaModule,
        UsersModule,
        HealthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
