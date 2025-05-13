import { IUserRepository } from '../interfaces/user-repository.interface';
import { CreateUserDto, ICreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';

import { hash } from "bcrypt";

//Errors
import { BadRequestError } from "../../../core/errors/BadRequestError";

export class UserService {
    constructor(private readonly userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    createUser = async (createUserDto: ICreateUserDto) => {
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new BadRequestError('User with this email already exists');
        }

        const passwordHashed = await hash(createUserDto.password, 10);
        const userPassHashed = { ...createUserDto, password: passwordHashed };
        const user = await this.userRepository.create(userPassHashed);
        return UserDto.fromEntity(user);
    }

    async getUsers(): Promise<UserDto[]> {
        const users = await this.userRepository.findAll();
        return users.map(user => UserDto.fromEntity(user));
    }

    async getUserById(id: string): Promise<UserDto> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return UserDto.fromEntity(user);
    }

    updateUser = async (id: string, updateData: any) => {
        const user = await this.userRepository.update(id, updateData);
        if (!user) {
            throw new Error('User not found');
        }
        return UserDto.fromEntity(user);
    }

    async deleteUser(id: string): Promise<UserDto> {
        const user = await this.userRepository.delete(id);
        if (!user) {
            throw new Error('User not found');
        }
        return UserDto.fromEntity(user);
    }
}