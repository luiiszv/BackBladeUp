import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpError';  // Asegúrate de tener la clase HttpError definida en src/errors/HttpError.ts

export class ErrorHandler {
  // Método estático para manejar los errores
  static handle(
    err: any,  // Se puede usar `any` para capturar cualquier tipo de error
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(err);  // Para loguear el error en el servidor

    // Si el error es una instancia de `HttpError`, devolvemos el código y el mensaje
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({
        error: err.message,
      });
    }

    // Para errores no controlados, responder con un mensaje genérico
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
}
