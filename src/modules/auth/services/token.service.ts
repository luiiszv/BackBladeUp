import { sign, verify, decode } from 'jsonwebtoken';
import { jwtConfig } from '../../../config/jwt.config';
import { UnauthorizedError } from "../../../core/errors/UnauthorizedError";
import { IUser } from '../../user/interfaces/user.interface';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { jwtData } from '../../../types/express';

export class TokenService {
  /**
   * Genera un token de acceso JWT (versión con promesa)
   */
  public async generateAccessToken(user: IUser): Promise<string> {
    if (!user) {
      throw new Error('User is missing');
    }

    const payload: object = {
      userId: user._id,
      email: user.email,
      role: user.role

    };

    return new Promise((resolve, reject) => {
      sign(payload, jwtConfig.accessToken.secret, { expiresIn: "1d" }, (err, token) => {
        if (err) return reject(err);
        resolve(token!);
      });
    });
  }

  /**
   * Verifica un token JWT (versión con promesa)
   */
  public async verifyToken<T>(token: string): Promise<jwtData> {
    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    return new Promise((resolve, reject) => {
      verify(
        token,
        jwtConfig.accessToken.secret,
        (err, decoded) => {
          if (err) return reject(new UnauthorizedError('Invalid or expired token'));
          if (!decoded) return reject(new UnauthorizedError('Token could not be verified'));
          resolve(decoded as jwtData);
        }
      );
    });
  }

  /**
   * Decodifica un token JWT sin verificar su validez
   * (No necesita promesa ya que decode es síncrono)
   */
  public decodeToken<T>(token: string): T | null {
    if (!token) {
      return null;
    }

    try {
      return decode(token) as T;
    } catch {
      return null;
    }
  }

  /**
   * Extrae el token de un header Authorization
   * (Método auxiliar sigue siendo síncrono)
   */
  public extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader) {
      return null;
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
}