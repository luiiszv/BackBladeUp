import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { AuthRepository } from "../repository/auth.repository";
import { AuthService } from "../services/auth.service";
import { UserModel } from "../../user/models/User";
import { TokenService } from "../services/token.service";

const repository = new AuthRepository(UserModel);
const tokenService = new TokenService();
const service = new AuthService(repository, tokenService);
const controller = new authController(service);

import { verifyTokenMiddleware } from "../../../core/middleware/verifyTokenMiddleware";


const router = Router();



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
 *     description: Autentica a un usuario y devuelve un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: luis@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Token JWT para autenticación
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     id:
 *                       type: string
 *                       example: "6823a0501ec170ea25496336"
 *                     email:
 *                       type: string
 *                       example: "luis@gmail.com"
 *                     role:
 *                       type: string
 *                       example: "client"
 *       400:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Error del servidor
 */
router.post('/login', controller.loginUser);


/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verificar token JWT
 *     description: |
 *       Verifica la validez de un token JWT y devuelve la información del usuario autenticado.
 *       Requiere un token válido en el header Authorization (Bearer token).
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Valid Token"
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "6823a0501ec170ea25496336"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "luis@gmail.com"
 *                     role:
 *                       type: string
 *                       example: "client"
 *                       enum: [client, admin, other_roles]  # Ajusta según tus roles reales
 *                     iat:
 *                       type: integer
 *                       description: Timestamp de cuando fue emitido el token
 *                       example: 1747340753
 *                     exp:
 *                       type: integer
 *                       description: Timestamp de cuando expira el token
 *                       example: 1747427153
 *       401:
 *         description: Error de autenticación
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/UnauthorizedError'
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Token expired"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Token not provided or invalid format"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 * 
 * components:
 *   schemas:
 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Unauthorized"
 *         statusCode:
 *           type: integer
 *           example: 401
 *     ServerError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Internal server error"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.get("/verify", verifyTokenMiddleware, controller.verify);


export default router;



