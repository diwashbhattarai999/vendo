import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(private readonly repository: UsersRepository) {}

    /**
     * Create a new user
     *
     * @param data - Data to create a new user
     * @returns The created user
     */
    async create(data: CreateUserDto) {
        return this.repository.create(data);
    }

    /**
     * Find all users
     *
     * @returns The found users
     */
    async findAll() {
        return this.repository.findAll();
    }

    /**
     * Find a user by unique input
     *
     * @param id - ID of the user to find
     * @returns The found user or null if not found
     */
    async findOne(id: string) {
        const user = await this.repository.findOne({ id });
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);

        return user;
    }

    /**
     * Update a user
     *
     * @param id - ID of the user to update
     * @param data - Data to update the user
     * @returns The updated user
     */
    async update(id: string, data: UpdateUserDto) {
        await this.findOne(id);
        return this.repository.update({ where: { id }, data });
    }

    /**
     * Remove a user
     *
     * @param id - ID of the user to remove
     * @returns The removed user
     */
    async remove(id: string) {
        await this.findOne(id);
        return this.repository.remove({ id });
    }
}
