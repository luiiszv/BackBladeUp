import { ServiceModel } from "../model/servicesBarber";
import { IService } from "../interfaces/IService";
import { Types } from 'mongoose';
import { IServiceResponse } from "../interfaces/IServiceResponse";



import { CreateServiceDto } from "../interfaces/create-service.dto";


export class RepositoryBarber {

    constructor(private readonly serviceModel: typeof ServiceModel) { }

    async findServicesByBarberId(barberId: string): Promise<IServiceResponse[]> {

        return await this.serviceModel.find({ barber: barberId });

    }


    async findServiceById(_id: string): Promise<IServiceResponse | null> {
        return await this.serviceModel.findById(_id);


    }


    //Busca los servicios por el nombre pero del mismo user barber
    async findServicesByNameAndBarber(barberId: string, name: string): Promise<IServiceResponse | null> {
        return await this.serviceModel.findOne({ barber: barberId, name });


    }

    async create(service: CreateServiceDto): Promise<IService> {
        return await this.serviceModel.create(service)
    }

    async update(id: string, service: object): Promise<IServiceResponse | null> {
        return await this.serviceModel.findByIdAndUpdate(
            id,
            { $set: service },
            { new: true }
        )
    }



}