import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "@/config/env";
import { PrismaClient } from "@/generated/prisma/client";

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        const pool = new Pool({ connectionString: env.DATABASE_URL });
        const adapter = new PrismaPg(pool);

        // Pass the adapter to the PrismaClient constructor
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
