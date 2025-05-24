import { IUser } from '../interfaces/user.interface';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserModel } from '../models/User'; // Importa el modelo correctamente

export class UserRepository implements IUserRepository {
    constructor(private readonly userModel: typeof UserModel) {} 

    async create(user: CreateUserDto): Promise<IUser> {
        return await this.userModel.create(user);
    }


    async findAll(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }

    async findById(id: string): Promise<IUser | null> {
        return await this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.userModel.findOne({ email }).exec();
    }

    async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    async delete(id: string): Promise<IUser | null> {
        return await this.userModel.findByIdAndDelete(id).exec();
    }
}