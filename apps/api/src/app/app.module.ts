import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { LoggerModule } from "nestjs-pino";
import { loggerConfig } from "@/config/logger.config";
import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { HealthModule } from "@/modules/health/health.module";
import { UsersModule } from "@/modules/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), "public"),
            exclude: ["/api*"],
        }),
        LoggerModule.forRoot(loggerConfig),
        PrismaModule,
        UsersModule,
        HealthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
