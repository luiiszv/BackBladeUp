import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role?: 'Barber' | 'Client';
    creationDate?: Date;
    active?: boolean;
}