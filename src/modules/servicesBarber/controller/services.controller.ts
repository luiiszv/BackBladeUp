import { NextFunction, Request, Response } from "express";
import { ServiceBarber } from "../services/service.service";
import { IServiceResponse } from "../interfaces/IServiceResponse";
import { CreateServiceDto } from "../interfaces/create-service.dto";
import { HttpError } from "../../../core/errors/HttpError";


export class ServicesBarberController {
    constructor(private servicesBarber: ServiceBarber) { }


    create = async (req: Request, res: Response, next: NextFunction) => {
        const barberId = req.user!.userId;
        try {

            const [error, createServiceDto] = CreateServiceDto.create(req.body);

            if (error) {
                return next(new HttpError(error, 400));
            }

            const response = await this.servicesBarber.create(barberId, createServiceDto!);
            res.status(200).json(response);

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const idService = req.params.id;
        try {

            const response = await this.servicesBarber.update(idService, req.body);
            res.status(200).json(response);

        } catch (error) {
            console.log(error)
            next(error);
        }

    }


    findBarberServicesByBarberAuth = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const idBarber = req.user?.userId

            const response = await this.servicesBarber.findBarberServicesByIdBarber(idBarber!);
            res.status(200).json(response);

        } catch (error) {
            console.log(error)
            next(error);
        }
    }


    findBarberServicesByBarberId = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const idBarber = req.params.id;
            const response = await this.servicesBarber.findBarberServicesByIdBarber(idBarber);
            res.status(200).json(response);

        } catch (error) {
            console.log(error)
            next(error);
        }
    }


    findAll = async (req: Request, res: Response, next: NextFunction) => {

        try {

            const response = await this.servicesBarber.findAll();
            res.status(200).json(response);

        } catch (error) {

            next()

        }

    }






}