
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../dto/loginDto";
import { NextFunction, Request, Response } from "express";



//Errrors
import { HttpError } from "../../../core/errors/HttpError";
import { UnauthorizedError } from "../../../core/errors/UnauthorizedError";


export class authController {

    constructor(private userService: AuthService) {

    }

    loginUser = async (req: Request, res: Response, next: NextFunction) => {


        try {
            const [error, ILoginReq] = LoginDto.login(req.body);

            if (error) {
                return next(new HttpError(error, 400));

            }




            const userLioggin = await this.userService.login(ILoginReq!)
            res.status(200).json(userLioggin);

        } catch (error) {
            next(error)

        }
    }




    verify = async (req: Request, res: Response) => {

        res.status(200).json({ message: "Valid Token", user: req.user });
    };





}