import { AppointmentModel } from "../model/appointment";
import { IAppointment } from "../interfaces/IAppointment";


export class RepositoryAppointment {
    constructor(private appointRepo: typeof AppointmentModel) { }


    async create(appointment: IAppointment): Promise<IAppointment> {
        return await this.appointRepo.create(appointment)
    }




}