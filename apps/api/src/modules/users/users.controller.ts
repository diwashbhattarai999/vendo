import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: "Create a new user" })
    @ApiCreatedResponse({ description: "User has been successfully created." })
    @ApiConflictResponse({ description: "Email already exists." })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: "Retrieve all users" })
    @ApiOkResponse({ description: "Successfully retrieved list of users." })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a user by ID" })
    @ApiOkResponse({ description: "Successfully retrieved user." })
    @ApiNotFoundResponse({ description: "User not found." })
    findOne(@Param("id") id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(":id")
    @ApiOperation({ summary: "Update an existing user" })
    @ApiOkResponse({ description: "User has been successfully updated." })
    @ApiNotFoundResponse({ description: "User not found." })
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Delete a user" })
    @ApiOkResponse({ description: "User has been successfully deleted." })
    @ApiNotFoundResponse({ description: "User not found." })
    remove(@Param("id") id: string) {
        return this.usersService.remove(id);
    }
}
