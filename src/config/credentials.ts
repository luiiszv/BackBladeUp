import {config} from 'dotenv';
config();



export const DB_NAME = process.env.DB_NAME as string;
export const DB_HOST = process.env.DB_HOST as string;
export const PORT = process.env.PORT;
export const TOKEN_SECRET= process.env.TOKEN_SECRET as string;
