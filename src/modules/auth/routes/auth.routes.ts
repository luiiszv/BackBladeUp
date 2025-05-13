import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { authRepository } from "../repository/auth.repository";
import { authService } from "../services/auth.service";
import { UserModel } from "../../user/models/User";

const repository= new authRepository(UserModel);
const service= new authService(repository);
const controller= new authController(service);

const router= Router();



router.post("/login", )