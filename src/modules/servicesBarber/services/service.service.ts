import { RepositoryBarber } from "../repository/services.respository";
import { IService } from "../interfaces/IService";
import { IServiceResponse } from "../interfaces/IServiceResponse";
import { IServiceUpdate } from "../interfaces/IServiceUpdate";

import { CreateServiceDto, ICreateServiceDto } from "../interfaces/create-service.dto";
import { FirebaseStorageService } from "../../../utils/firebaseStorage";

import { BarberServiceDto, ServiceCategory } from "../dto/BarberServiceDto";

//Errors
import { BadRequestError } from "../../../core/errors/BadRequestError";
import { NotFoundError } from "../../../core/errors/NotFoundError";
import mongoose from "mongoose";

export class ServiceBarber {
    constructor(private repositoryServiceBarber: RepositoryBarber, private storageService: FirebaseStorageService) {

    }




    async create(idBarber: string, service: ICreateServiceDto, file?: Express.Multer.File) {


        const serviceExistForSameBarber = await this.repositoryServiceBarber.findServicesByNameAndBarber(idBarber, service.name);
        if (serviceExistForSameBarber) {
            throw new BadRequestError('The service is already registered with the same name.');
        }

        if (file) {
            // Subir archivo si viene si sabe 
            service.imageUrl = await this.storageService.uploadFile(
                "services",
                file.path,
                file.originalname,
                file.mimetype,
                { uploadedBy: `barber:${idBarber}`, originalName: file.originalname }
            );
        }

        const newService = {
            ...service,
            barber: idBarber,
            description: service.description ?? ""
        };

        const user = await this.repositoryServiceBarber.create(newService);
        return BarberServiceDto.fromEntity(user);
    }

    async update(idService: string, updates: Partial<ICreateServiceDto>, file?: Express.Multer.File) {
        const service = await this.repositoryServiceBarber.findServiceById(idService);

        if (!service) {
            throw new NotFoundError('Service not found.');
        }

        // Si va a cambiar el nombre, asegurarse que no exista otro igual para ese barbero
        if (updates.name && updates.name !== service.name) {
            const existing = await this.repositoryServiceBarber.findServicesByNameAndBarber(String(service.barber), updates.name);
            if (existing) {
                throw new BadRequestError('Another service with the same name already exists.');
            }
        }

        // Validar categoría si está presente
        if (updates.category) {
            const validCategories = ['Corte clásico', 'Fade', 'Diseño', 'Barba', 'Color', 'Tratamiento', 'Otro'];
            if (!validCategories.includes(updates.category)) {
                throw new BadRequestError('Invalid category.');
            }
        }

        // Si se sube una nueva imagen, reemplazar la anterior
        let imageUrl = service.imageUrl;
        if (file) {
            imageUrl = await this.storageService.uploadFile(
                `barbers/${service.barber}/services`,
                file.path,
                file.originalname,
                file.mimetype,
            );
        }

        const updatedData = {
            ...updates,
            imageUrl,
        };

        const updatedService = await this.repositoryServiceBarber.update(idService, updatedData);
        return BarberServiceDto.fromEntity(updatedService);
    }



    async findBarberServicesByIdBarber(idBarber: string): Promise<IServiceResponse[]> {

        if (!idBarber || !mongoose.Types.ObjectId.isValid(idBarber)) {
            throw new NotFoundError('Barber');
        }


        return await this.repositoryServiceBarber.findServicesByBarberId(idBarber);


    }


    async findAll(): Promise<object[]> {

        return await this.repositoryServiceBarber.findAll();

    }



    async findByCategory(category: ServiceCategory): Promise<object[]> {

        const validCategories = ['Corte clásico', 'Fade', 'Diseño', 'Barba', 'Color', 'Tratamiento', 'Otro'];
        if (!validCategories.includes(category)) {
            throw new BadRequestError('Invalid category.');
        }

        return await this.repositoryServiceBarber.findByCategory(category);

    }




}