import { Request, Response, NextFunction } from "express";
import { BarberService } from "../services/barber.services";




export class BarberController {

    constructor(private readonly barberService: BarberService) {


    }

    findBarberById = async (req: Request, res: Response, next: NextFunction) => {
        const idBarber = req.params.id;

        try {
            const response = await this.barberService.findBarberById(idBarber);
            res.status(200).json(response);

        } catch (error) {
            next(error)
        }
    }

    findAllBarbers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allBarbers = await this.barberService.findAllBarbers();
            res.status(200).json(allBarbers);

        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    changeStatusBarber = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idBarber = req.params.id;
            const response = await this.barberService.changeStatusBarber(idBarber);
            res.status(200).json(response);

        } catch (error) {
            console.log(error)
            next(error)
        }

    }
}