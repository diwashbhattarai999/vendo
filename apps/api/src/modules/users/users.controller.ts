import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { Prisma } from "@/generated/prisma/client";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() data: Prisma.UserCreateInput) {
        return this.usersService.create(data);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() data: Prisma.UserUpdateInput) {
        return this.usersService.update(id, data);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.usersService.remove(id);
    }
}
