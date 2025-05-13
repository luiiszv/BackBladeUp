import { AuthRepository } from "../repository/auth.repository";
import { compare } from "bcrypt";
import { ILoginReq } from "../interfaces/ILoginUser";
import { NotFoundError } from "../../../core/errors/NotFoundError";
import { BadRequestError } from "../../../core/errors/BadRequestError";





export class authService {
    constructor(private readonly repository: AuthRepository) {

    }

    login = async (user: ILoginReq) => {

        const { email, password } = user;

        const userExist = await this.repository.findByEmail(email);

        if (!userExist) {
            throw new NotFoundError("User not found")
        }


        const match = await compare(password, userExist.password);
        if (!match) {
            throw new BadRequestError("Incorrect password")
        }

        const payload = {
            userId: userExist._id,
            roleId: userExist.role,
        };

         const token = await createAccessToken(payload);




    }




}










}