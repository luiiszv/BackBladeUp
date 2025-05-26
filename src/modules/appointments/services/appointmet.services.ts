
import { RepositoryAppointment } from "../repository/appointment.respository";
import { IAppointment } from "../interfaces/IAppointment";
import { BarberRepository } from "../../barber/repository/barber.repository";
import { RepositoryBarber } from "../../servicesBarber/repository/services.respository";
import { ICreateAppointmentDto } from "../dto/create-appointment.dto";
import { AppointmentDto } from "../dto/appoinment.dto";

//Errors
import { NotFoundError } from "../../../core/errors/NotFoundError";
import { ConflictError } from "../../../core/errors/ConflictError ";
import { BadRequestError } from "../../../core/errors/BadRequestError";



import { statusAppointment } from "../dto/create-appointment.dto";
import mongoose from "mongoose";



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

        // const appoinmentPendingExist = await this.appointmentRepo.findStatusPendingByIdUser(clientId);
        // if (appoinmentPendingExist) {
        //     throw new ConflictError("There's an appointment in pending status, cancel to create another one")
        // }

        const createdAppointment = await this.appointmentRepo.create(completeData);
        if (!createdAppointment) {
            throw new ConflictError("There's an error")
        }


        const populatedAppointment = await this.appointmentRepo.findByIdPopulate(String(createdAppointment._id))
        return populatedAppointment
    }

    async findByStatusAndIdClient(status: statusAppointment, idUserAuth: string): Promise<object[]> {
        return await this.appointmentRepo.findByStatusAndIdClient(status, idUserAuth);

    }

    async findByStatusAndIdBarber(status: statusAppointment, idUserAuth: string): Promise<object[]> {
        return await this.appointmentRepo.findByStatusAndIdBarber(status, idUserAuth);

    }

    async findAllByIdBarber(idUserAuth: string): Promise<object[]> {
        return await this.appointmentRepo.findAllByIdBarber(idUserAuth);

    }
    async findAllByIdClient(idUserAuth: string): Promise<object[]> {
        return await this.appointmentRepo.findAllByIdClient(idUserAuth);

    }

    async findAll(): Promise<object[]> {
        return await this.appointmentRepo.findAll();

    }


    async updateAppointment(id: string, updateData: { status: statusAppointment }) {




        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestError('Appointment ID is required or invalid format');
        }




        const appExist = await this.appointmentRepo.findById(id);
        if (!appExist) {
            throw new NotFoundError(`Appointment ${id} not found`);
        }

        const allowedStatuses = Object.values(statusAppointment);
        if (!allowedStatuses.includes(updateData.status)) {
            throw new BadRequestError('Invalid status or missing status');
        }

        const appointment = await this.appointmentRepo.update(id, { status: updateData.status });

        return AppointmentDto.fromEntity(appointment);
    }



}