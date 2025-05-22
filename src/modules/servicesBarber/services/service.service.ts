import { RepositoryBarber } from "../repository/services.respository";
import { IService } from "../interfaces/IService";
import { IServiceResponse } from "../interfaces/IServiceResponse";
import { IServiceUpdate } from "../interfaces/IServiceUpdate";

import { CreateServiceDto, ICreateServiceDto } from "../interfaces/create-service.dto";

import { BarberServiceDto } from "../dto/BarberServiceDto";

//Errors
import { BadRequestError } from "../../../core/errors/BadRequestError";
import { NotFoundError } from "../../../core/errors/NotFoundError";
import mongoose from "mongoose";

export class ServiceBarber {
    constructor(private repositoryServiceBarber: RepositoryBarber) { }


    async create(idBarber: string, service: ICreateServiceDto) {

        const serviceExistForSameBarber = await this.repositoryServiceBarber.findServicesByNameAndBarber(idBarber, service.name);
        if (serviceExistForSameBarber) {
            throw new BadRequestError('The service is already registered with the same name.');
        }

        const newService = { ...service, barber: idBarber }

        const user = await this.repositoryServiceBarber.create(newService);
        return BarberServiceDto.fromEntity(user)

    }

    async update(id: string, newData: IServiceUpdate): Promise<IServiceResponse | null> {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestError("idService is required  or type is't valid");
        }

        const serviceExist = this.repositoryServiceBarber.findServiceById(id);

        if (!serviceExist) {
            throw new NotFoundError('Service');
        }


        return await this.repositoryServiceBarber.update(id, newData)

    }


    async findBarberServicesByIdBarber(idBarber: string): Promise<IServiceResponse[]> {

        if (!idBarber || !mongoose.Types.ObjectId.isValid(idBarber)) {
            throw new NotFoundError('Barber');
        }


        return await this.repositoryServiceBarber.findServicesByBarberId(idBarber);


    }



}