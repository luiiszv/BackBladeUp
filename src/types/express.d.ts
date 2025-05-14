// @types/express.d.ts
import express from 'express';
import { JwtPayload } from "jsonwebtoken";

// Definir el tipo jwtData para el payload
export interface jwtData extends JwtPayload {
  userId: string;
  email: string;
  role?: 'barber' | 'client';
  iat: number;
  exp: number;
}


declare global {
  namespace Express {
    export interface Request {
      user?: jwtData;
    }
  }
}
