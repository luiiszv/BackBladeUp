import { ServiceModel } from "../model/servicesBarber";
import { IService } from "../interfaces/IService";
import { Types } from 'mongoose';
import { IServiceResponse } from "../interfaces/IServiceResponse";
import { ServiceCategory } from "../dto/BarberServiceDto";


import { CreateServiceDto } from "../interfaces/create-service.dto";
import { securityRules } from "firebase-admin";


export class RepositoryBarber {

    constructor(private readonly serviceModel: typeof ServiceModel) { }

    async findServicesByBarberId(barberId: string): Promise<IServiceResponse[]> {

        return await this.serviceModel.find({ barber: barberId });

    }

    async findAll(): Promise<object[]> {

        return await this.serviceModel.find().populate({
            path: 'barber',
            select: "-password"
        });

    }

    async findByCategory(category: ServiceCategory): Promise<object[]> {

        return await this.serviceModel.find({
            category
        }).populate({
            path: 'barber',
            select: "-password"
        });

    }



    async findServiceById(_id: string): Promise<IServiceResponse | null> {
        return await this.serviceModel.findById(_id);


    }


    //Busca los servicios por el nombre pero del mismo user barber
    async findServicesByNameAndBarber(barber: string, name: string): Promise<object | null> {
        return await this.serviceModel.findOne({ barber: barber, name });


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