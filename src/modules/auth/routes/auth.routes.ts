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


router.post('/login', controller.loginUser);

router.get("/verify", verifyTokenMiddleware, controller.verify);


export default router;



