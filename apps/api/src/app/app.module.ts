import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { loggerConfig } from "@/config/logger.config";
import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { UsersModule } from "@/modules/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [LoggerModule.forRoot(loggerConfig), PrismaModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
