import { ObjectId } from "mongoose";

export interface ILoginReq {
    email: string,
    password: string
}

export interface ILoginRes {
    id: string,
    email: string,
    token: string
    role?: 'barber' | 'client';
}