
import { RepositoryAppointment } from "../repository/appointment.respository";
import { IAppointment } from "../interfaces/IAppointment";
import { BarberRepository } from "../../barber/repository/barber.repository";
import { RepositoryBarber } from "../../servicesBarber/repository/services.respository";
import { NotFoundError } from "../../../core/errors/NotFoundError";
import { ICreateAppointmentDto } from "../dto/create-appointment.dto";

export class AppointmentServices {

    constructor(
        private appointmentRepo: RepositoryAppointment,
        private barberRepo: BarberRepository,
        private barberServiceRepo: RepositoryBarber

    ) { }



    async create(clientId: string, appointment: ICreateAppointmentDto) {
        const completeData = { ...appointment, client: clientId };

        const barberExist = await this.barberRepo.findBarberById(completeData.barber);
        if (!barberExist) {
            throw new NotFoundError("barber");
        }

        const serviceExist = await this.barberServiceRepo.findServiceById(completeData.service);
        if (!serviceExist) {
            throw new NotFoundError("service");
        }

        const user = await this.appointmentRepo.create(completeData);
        return user; 
    }


}