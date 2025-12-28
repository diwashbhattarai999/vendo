import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator,
} from "@nestjs/terminus";
import { PrismaHealthIndicator } from "./indicators/prisma.health";

@ApiTags("health")
@Controller("health")
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private prismaHealth: PrismaHealthIndicator,
        private memory: MemoryHealthIndicator,
        private disk: DiskHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    @ApiOperation({ summary: "Comprehensive health check (DB, Memory, Disk)" })
    check() {
        return this.health.check([
            () => this.prismaHealth.isHealthy("database"),
            () => this.memory.checkHeap("memory_heap", 150 * 1024 * 1024), // 150MB
            () => this.memory.checkRSS("memory_rss", 300 * 1024 * 1024), // 300MB
            () =>
                this.disk.checkStorage("disk", {
                    path: "/",
                    thresholdPercent: 0.99,
                }),
        ]);
    }

    @Get("live")
    @HealthCheck()
    @ApiOperation({ summary: "Liveness probe" })
    checkLiveness() {
        return this.health.check([]); // Simply returns 200 if app is running
    }

    @Get("ready")
    @HealthCheck()
    @ApiOperation({ summary: "Readiness probe (Database check)" })
    checkReadiness() {
        return this.health.check([
            () => this.prismaHealth.isHealthy("database"),
        ]);
    }
}
