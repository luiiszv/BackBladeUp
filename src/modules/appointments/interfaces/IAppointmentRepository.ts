import { ICreateAppointmentDto } from "../dto/create-appointment.dto";
import { IAppointment } from "../interfaces/IAppointment";


export interface IAppointmentRepository {
    create(appointment: ICreateAppointmentDto): Promise<IAppointment>;


}