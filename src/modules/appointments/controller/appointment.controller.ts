import { Response, Request, NextFunction } from "express";
import { AppointmentServices } from "../services/appointmet.services";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { HttpError } from "../../../core/errors/HttpError";
import { statusAppointment } from "../dto/create-appointment.dto";


export class AppointmentController {

    constructor(private appointmentServ: AppointmentServices) { }

    create = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const idUser = req.user?.userId

            const [error, createUserDto] = CreateAppointmentDto.create(req.body);

            if (error) {
                return next(new HttpError(error, 400));
            }

            const response = await this.appointmentServ.create(idUser!, createUserDto!)
            res.status(201).json(response);

        } catch (error) {
            console.log(error)
            next(error)
        }

    }


    findPendingAppoinmentClient = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const idUser = req.user?.userId
            const response = await this.appointmentServ.findByStatusAndIdClient(statusAppointment.PENDING, idUser!)
            res.status(200).json(response)


        } catch (error) {
            next(error)

        }


    }

    findPendingAppoinmentBarber = async (req: Request, res: Response, next: NextFunction) => {

        try {

            const idUser = req.user?.userId
            const response = await this.appointmentServ.findByStatusAndIdBarber(statusAppointment.PENDING, idUser!)
            res.status(200).json(response)

        } catch (error) {
            next(error)

        }


    }



    updateApp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { status } = req.body;

            const response = await this.appointmentServ.updateAppointment(req.params.id, { status });
            res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    };






}