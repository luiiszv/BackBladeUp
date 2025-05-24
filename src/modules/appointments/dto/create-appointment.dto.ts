// Definición del enum para status
export enum statusAppointment {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed'
    // Agrega otros status si es necesario
}

// Interface para validación estática
export interface ICreateAppointmentDto {
    barber: string;
    service: string;
    status?: statusAppointment;
}

// Clase DTO con métodos de validación
export class CreateAppointmentDto {
    private constructor(
  
        public readonly barber: string,
        public readonly service: string,
        public readonly status: statusAppointment
    ) { }

    // Factory method con validación
    static create(props: Partial<ICreateAppointmentDto>): [string | null, CreateAppointmentDto?] {
        if (!props) {
            return ['Data required'];
        }

        const { barber, service, status } = props;

        // Validaciones básicas
        if (!barber || !service) {
            return ['Client, barber and service are required'];
        }

        if (status && !Object.values(statusAppointment).includes(status)) {
            return [`Invalid status. Valid statuses are: ${Object.values(statusAppointment).join(', ')}`];
        }

        return [
            null,
            new CreateAppointmentDto(
                barber.trim(),
                service.trim(),
                status || statusAppointment.PENDING
            )
        ];
    }
}
