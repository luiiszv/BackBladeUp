import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtData } from "../../types/express";

export class AuthMiddleware {

  
  private static validateToken(token: string): jwtData | null {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT secret not found in .env");

      const decoded = jwt.verify(token, secret) as jwtData;
      return decoded;
    } catch {
      return null;
    }
  }

  static handle(req: Request, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization;
      const cookieToken = req.headers["cookie"]?.split("=")[1];
      const token = authHeader || cookieToken;

      if (!token) {
        res.status(401).json({ error: "Token no proporcionado" });
        return;
      }

      const decoded = this.validateToken(token);

      if (!decoded) {
        res.status(401).json({ message: "Access Denied" });
        return;
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(500).json({
        error: "Error interno en el middleware de autenticación",
      });
    }
  }
}
