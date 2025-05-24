import { Response, Request, NextFunction } from "express";
import { AppointmentServices } from "../services/appointmet.services";



export class AppointmentController {

    constructor(private appointmentServ: AppointmentServices) { }

    create = async (req: Request, res: Response, next: NextFunction) => {

        const barberId = req.user!.userId;
        try {

            const response = await this.appointmentServ.create(barberId, req.body)
            res.status(200).json(response);

        } catch (error) {
            console.log(error)
            next(error)
        }

    }
}