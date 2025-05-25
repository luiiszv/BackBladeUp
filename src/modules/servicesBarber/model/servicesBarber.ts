
import { Schema, model, Types } from 'mongoose';
import { IService } from '../interfaces/IService';


const ServiceSchema = new Schema<IService>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,

    },
    barber: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
     

    },
});

export const ServiceModel = model<IService>('Service', ServiceSchema);


