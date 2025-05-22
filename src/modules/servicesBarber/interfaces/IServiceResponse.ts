import { Document, Types } from "mongoose";


export interface IServiceResponse extends Document {
    _id: string;
    name: string;
    description?: string;
    price: number;
    barber: object;

}
