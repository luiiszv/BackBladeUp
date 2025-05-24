import { AppointmentModel } from "../model/appointment";
import { RepositoryAppointment } from "../repository/appointment.respository";
import { AppointmentServices } from "../services/appointmet.services";
import { AppointmentController } from "../controller/appointment.controller";

//Barber
import { BarberRepository } from "../../barber/repository/barber.repository";
import { UserModel } from "../../user/models/User";
//BarberServices
import { RepositoryBarber as BarberServicesRepo } from "../../servicesBarber/repository/services.respository";
import { ServiceModel } from "../../servicesBarber/model/servicesBarber";

import { Router } from "express";
const router = Router();


//Inyect depen
const appointmentRespo = new RepositoryAppointment(AppointmentModel);
const barberRespo = new BarberRepository(UserModel);
const babrberServicesRepo = new BarberServicesRepo(ServiceModel);
const appointmentServices = new AppointmentServices(appointmentRespo, barberRespo, babrberServicesRepo);
const appoinmentController = new AppointmentController(appointmentServices);


//Auth
import { verifyTokenMiddleware } from "../../../core/middleware/verifyTokenMiddleware";
import { verifyRole } from "../../../core/middleware/verifyRole";

router.post("/", verifyTokenMiddleware, verifyRole("client"), appoinmentController.create);

export default router;