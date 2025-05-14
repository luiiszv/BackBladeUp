import { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string,
    name: string;
    lastName: string;
    email: string;
    password: string;
    role?: 'barber' | 'client';
    creationDate?: Date;
    active?: boolean;
}