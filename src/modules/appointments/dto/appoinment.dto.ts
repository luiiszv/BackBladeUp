import { statusAppointment } from './create-appointment.dto' // Asegúrate de importar correctamente el enum si está en otro archivo

export class AppointmentDto {
    constructor(
        public readonly id: string,
        public readonly client: string,
        public readonly barber: string,
        public readonly service: string,
        public readonly date: Date,
        public readonly status: statusAppointment,
        public readonly createdAt: Date
    ) { }

    static fromEntity(appointment: any): AppointmentDto {
        return new AppointmentDto(
            appointment._id,
            appointment.client,
            appointment.barber,
            appointment.service,
            appointment.date,
            appointment.status,
            appointment.createdAt
        );
    }
}
