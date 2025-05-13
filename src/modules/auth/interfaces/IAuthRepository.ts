import { LoginDto } from "../dto/loginDto";
import { ILoginRes } from "../interfaces/ILoginUser";
import { IUser } from "../../user/interfaces/user.interface";


export interface IAuthRepository {

    findById(id: string): Promise<IUser | null>;
     findByEmail(email: string): Promise<IUser | null>;

}