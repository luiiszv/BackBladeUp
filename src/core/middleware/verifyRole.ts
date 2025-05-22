import { Request, Response, NextFunction, RequestHandler } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";




export const verifyRole = (requiredRole?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const user = req.user!;
    if (!user) {
      throw new UnauthorizedError();
    }

    if (requiredRole && user.role !== requiredRole) {
      throw new UnauthorizedError('Access denied: insufficient role');

    }

    next();
  };
};
