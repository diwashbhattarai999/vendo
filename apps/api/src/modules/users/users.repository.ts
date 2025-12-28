import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@/generated/prisma/client";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    /**
     * Create a new user
     *
     * @param data - Data to create a new user
     * @returns The created user
     */
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }

    /**
     * Find a user by unique input
     *
     * @param uniqueInput - Unique input to find a user
     * @returns The found user or null if not found
     */
    async findOne(
        uniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({ where: uniqueInput });
    }

    /**
     * Find all users
     *
     * @param params - Parameters to find all users
     * @returns The found users
     */
    async findAll(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        return this.prisma.user.findMany(params);
    }

    /**
     * Update a user
     *
     * @param params - Parameters to update a user
     * @returns The updated user
     */
    async update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({ data, where });
    }

    /**
     * Remove a user
     *
     * @param where - Unique input to remove a user
     * @returns The removed user
     */
    async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({ where });
    }
}
