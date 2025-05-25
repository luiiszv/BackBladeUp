import { Document } from "mongoose";

interface IBarberResponse {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    role: string;
    isBarberActive: boolean;
    active: boolean;
    creationDate: string;
    __v: number;
}

export interface IServiceResponse extends Document {
    _id: string;
    name: string;
    description?: string;
    price: number;
    barber: IBarberResponse;
}
