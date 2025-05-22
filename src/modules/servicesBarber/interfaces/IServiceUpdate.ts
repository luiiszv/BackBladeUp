import { Document } from "mongoose";


export interface IServiceUpdate extends Document {
    _id: string;
    name?: string;
    description?: string;
    price?: number;

}
