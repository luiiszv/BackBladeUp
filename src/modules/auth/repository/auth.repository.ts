import { IUser } from "../../user/interfaces/user.interface";
import { UserModel } from "../../user/models/User";
import { IAuthRepository } from "../interfaces/IAuthRepository";

export class AuthRepository implements IAuthRepository {
  constructor(private readonly userModel: typeof UserModel) {}

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.userModel.findOne({ email })
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Error retrieving user');
    }
  }

  async findById(id: string): Promise<IUser | null> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      console.error('Error finding user by id:', error);
      throw new Error('Error retrieving user');
    }
  }
}