import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { TokenService } from "../../modules/auth/services/token.service";
import { UserService } from "../../modules/user/service/user.service";
import { UserRepository } from "../../modules/user/repository/user.repository";


const tokenService = new TokenService();


export const verifyTokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        const token = tokenService.extractTokenFromHeader(authHeader);

        if (!token) {
            throw new UnauthorizedError("Token not provided or invalid format");
        }

        const decoded = await tokenService.verifyToken(token);
        req.user = decoded;
        next(); // sigue al siguiente middleware o controlador
    } catch (error) {
        next(error);
    }
};
