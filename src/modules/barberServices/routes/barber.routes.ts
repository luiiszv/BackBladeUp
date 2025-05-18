import { BarberController } from "../controller/barber.controller";
import { UserModel } from "../../user/models/User";
import { BarberRepository } from "../repository/barber.repository";
import { BarberService } from "../services/barber.services";

import { Router } from "express";

const router = Router()
const barberRepo = new BarberRepository(UserModel);
const barberService = new BarberService(barberRepo);
const barberController = new BarberController(barberService);

//Middlewares
import { verifyTokenMiddleware } from "../../../core/middleware/verifyTokenMiddleware";


router.get('/', verifyTokenMiddleware, barberController.findAllBarbers);
router.get('/:id', verifyTokenMiddleware, barberController.findBarberById);
router.put('/change-status/:id', verifyTokenMiddleware, barberController.changeStatusBarber);



export default router;
