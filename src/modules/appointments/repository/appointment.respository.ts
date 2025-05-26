import { AppointmentModel } from "../model/appointment";
import { IAppointment } from "../interfaces/IAppointment";
import { ICreateAppointmentDto } from "../dto/create-appointment.dto";
import { IAppointmentRepository } from "../interfaces/IAppointmentRepository";
import { statusAppointment } from "../dto/create-appointment.dto";


export class RepositoryAppointment implements IAppointmentRepository {
    constructor(private appointRepo: typeof AppointmentModel) { }


    async create(appointment: ICreateAppointmentDto): Promise<IAppointment> {
        const createdAppointment = await this.appointRepo.create(appointment);
        return createdAppointment.toObject ? createdAppointment.toObject() : createdAppointment;
    }

    async findById(id: string): Promise<IAppointment | null> {
        const appointment = await this.appointRepo.findById(id);
        return appointment ? (appointment.toObject ? appointment.toObject() : appointment) : null;
    }

    async findByIdPopulate(id: string): Promise<object | null> {
        const appointment = await this.appointRepo.findById(id).populate({ path: 'client', select: "-password" }).populate({ path: 'barber', select: "-password" }).populate('service');
        return appointment ? (appointment.toObject ? appointment.toObject() : appointment) : null;
    }



    async findAll(): Promise<IAppointment[]> {
        const appointments = await this.appointRepo.find();
        return appointments.map(a => (a.toObject ? a.toObject() : a));
    }

    async findByStatusAndIdClient(status: statusAppointment, idUserAuth: string): Promise<object[]> {
        const appointments = await this.appointRepo.find({ status, client: idUserAuth })
            .populate({ path: 'client', select: '-password' })
            .populate({ path: 'barber', select: '-password' })
            .populate('service');

        return appointments.map(a => (a.toObject ? a.toObject() : a));
    }




    async findByStatusAndIdBarber(status: statusAppointment, idUserAuth: string): Promise<object[]> {
        const appointments = await this.appointRepo.find({ status, barber: idUserAuth })
            .populate({ path: 'client', select: '-password' })
            .populate({ path: 'barber', select: '-password' })
            .populate('service');

        return appointments.map(a => (a.toObject ? a.toObject() : a));
    }




    async findStatusPendingByIdUser(idClient: string): Promise<object | null> {
        const appointment = await this.appointRepo.findOne({ status: 'pending', client: idClient })
            .populate({ path: 'client', select: '-password' })
            .populate({ path: 'barber', select: '-password' })
            .populate('service');

        return appointment ? (appointment.toObject ? appointment.toObject() : appointment) : null;
    }


    async update(id: string, update: Partial<IAppointment>): Promise<IAppointment | null> {
        const updated = await this.appointRepo.findByIdAndUpdate(id, update, { new: true });
        return updated ? (updated.toObject ? updated.toObject() : updated) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.appointRepo.findByIdAndDelete(id);
        return !!result;
    }






}