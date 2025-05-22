
import { IBarber } from "../interfaces/iBarber";
import { IBarberRepository } from "../interfaces/IBarberRepository";
import { BarberRepository } from "../repository/barber.repository";
import { NotFoundError } from "../../../core/errors/NotFoundError";

//Mongoose
import mongoose from "mongoose";
import { BadRequestError } from "../../../core/errors/BadRequestError";

export class BarberService {
    constructor(private barberRepository: BarberRepository) { }

    async findBarberById(id: string): Promise<IBarber | null> {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestError("Invalid id fromat")
        }

        const barberExist = await this.barberRepository.findBarberById(id);
        if (!barberExist) {
            throw new NotFoundError('Barber')
        }

        return this.barberRepository.findBarberById(id);
    }

    async findAllBarbers(): Promise<IBarber[]> {
        return this.barberRepository.findAllBarbers();
    }

    async changeStatusBarber(id: string): Promise<IBarber | null> {

        const barberExist = await this.barberRepository.findBarberById(id);
        if (!barberExist) {
            throw new NotFoundError('Barber')
        }
        const barber = await this.barberRepository.changeStatusBarber(id);

        return barber;

    }
}


