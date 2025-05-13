import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { TOKEN_SECRET } from '../../config/credentials';
import { jwtData } from '../../types/express';

export class RoleMiddleware {
  static verify(requiredRole?: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is required' });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token is required' });
      }

      try {
        const decoded = jwt.verify(token, TOKEN_SECRET) as jwtData;

        req.user = {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role,
          iat: decoded.iat,
          exp: decoded.exp,
        };

        if (requiredRole && req.user.role !== requiredRole) {
          return res.status(403).json({
            message: `Access forbidden: Required role '${requiredRole}'`,
          });
        }

        next();
      } catch (err) {
        return res.status(403).json({
          message: 'Invalid or expired token',
          error: err,
        });
      }
    };
  }
}
