import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: "user@example.com",
        description: "The email address of the user",
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: "John Doe",
        description: "The full name of the user",
        required: false,
    })
    @IsString()
    @IsOptional()
    name?: string;
}
