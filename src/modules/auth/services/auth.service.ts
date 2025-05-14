import { AuthRepository } from "../repository/auth.repository";
import { compare } from "bcrypt";
import { ILoginReq, ILoginRes } from "../interfaces/ILoginUser";
import { NotFoundError } from "../../../core/errors/NotFoundError";
import { BadRequestError } from "../../../core/errors/BadRequestError";
import { TokenService } from "../services/token.service";
import { UnauthorizedError } from "../../../core/errors/UnauthorizedError";

export class AuthService {
    constructor(
        private readonly repository: AuthRepository,
        private readonly tokenService: TokenService
    ) { }

    /**
     * Autentica un usuario y genera un token de acceso
     * @param user Credenciales del usuario (email y password)
     * @returns Objeto con token y datos básicos del usuario
     * @throws NotFoundError si el usuario no existe
     * @throws BadRequestError si la contraseña es incorrecta
     * @throws UnauthorizedError si hay problemas al generar el token
     */
    public async login(user: ILoginReq): Promise<ILoginRes> {
        const { email, password } = user;

        // 1. Validar email
        if (!email || !password) {
            throw new BadRequestError("Email and password are required");
        }

        // 2. Buscar usuario
        const userExist = await this.repository.findByEmail(email);
        if (!userExist) {
            throw new NotFoundError("User not found");
        }

        // 3. Verificar contraseña
        const isPasswordValid = await compare(password, userExist.password);
        if (!isPasswordValid) {
            throw new BadRequestError("Incorrect password");
        }


        try {

            const token = await this.tokenService.generateAccessToken(userExist);
          

            return {
                id: userExist._id,
                email,
                token,
                role: userExist.role

            };
        } catch (error) {
            throw new UnauthorizedError("Authentication failed");
        }
    }

    /**
     * Valida y decodifica un token JWT
     * @param token Token JWT
     * @returns Payload del token
     * @throws UnauthorizedError si el token es inválido
     */
    public async validateToken(token: string) {
        try {
            return await this.tokenService.verifyToken(token);
        } catch (error) {
            throw new UnauthorizedError("Invalid token");
        }
    }
}