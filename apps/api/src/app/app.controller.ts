import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppService } from "@/app/app.service";

@ApiTags("health")
@Controller({ version: VERSION_NEUTRAL })
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({ summary: "Get API information and status" })
    @ApiOkResponse({
        description: "API information retrieved successfully.",
        schema: {
            example: {
                name: "Vendo Multi-Tenant SaaS API",
                version: "1.0",
                status: "healthy",
                message: "Welcome to Vendo API",
                docs: "/docs",
            },
        },
    })
    getHello() {
        return this.appService.getAppInfo();
    }
}
