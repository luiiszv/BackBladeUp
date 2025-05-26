import { NextFunction, Request, Response } from "express";
import { ServiceBarber } from "../services/service.service";
import { IServiceResponse } from "../interfaces/IServiceResponse";
import { CreateServiceDto, ICreateServiceDto } from "../interfaces/create-service.dto";
import { HttpError } from "../../../core/errors/HttpError";
import admin from "../../../config/firebase";
import { ServiceCategory } from "../dto/BarberServiceDto";

export class ServicesBarberController {
    constructor(private servicesBarber: ServiceBarber) { }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const barberId = req.user!.userId;

        try {
            const props: Partial<ICreateServiceDto> = {
                name: req.body.name,
                price: Number(req.body.price),
                description: req.body.description,
                category: req.body.category
            };

            const [error, createServiceDto] = CreateServiceDto.create(props);

            if (error) {
                return next(new HttpError(error, 400));
            }

            console.log(createServiceDto)



            const response = await this.servicesBarber.create(barberId, props as ICreateServiceDto, req.file);
            res.status(201).json(response);

        } catch (error) {
            if (error instanceof Error) {
                // Manejo específico para errores de Firebase Storage
                if ('code' in error && error.code === 403) {
                    return next(new HttpError('Permission denied on storage bucket', 403));
                }
                // Manejo para archivos demasiado grandes
                if ('code' in error && error.code === 'ENTITY_TOO_LARGE') {
                    return next(new HttpError('File size exceeds limit', 413));
                }
            }
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const idService = req.params.id;
        try {

            const response = await this.servicesBarber.update(idService, req.body, req.file);
            res.status(200).json(response);

        } catch (error) {
            console.log(error)
            next(error);
        }

    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const idService = req.params.id;
        try {

            const response = await this.servicesBarber.delete(idService);
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


    findByCategory = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { category } = req.params;
            const response = await this.servicesBarber.findByCategory(category as ServiceCategory);
            res.status(200).json(response);

        } catch (error) {

            next()

        }

    }






}