import { Document } from "mongoose";


export interface IServiceUpdate extends Document {
    _id: string;
    name?: string;
    description?: string;
    price?: number;
    category: 'Corte clásico' | 'Fade' | 'Diseño' | 'Barba' | 'Color' | 'Tratamiento' | 'Otro';
    imageUrl: string;


}
