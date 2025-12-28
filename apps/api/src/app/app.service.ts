import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    getAppInfo() {
        return {
            name: "Vendo Multi-Tenant SaaS API",
            version: "1.0.0",
            status: "healthy",
            message: "Welcome to Vendo API",
            docs: "/docs",
        };
    }
}
