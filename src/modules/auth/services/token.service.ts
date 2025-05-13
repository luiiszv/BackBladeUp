
import { IUser } from '../../user/interfaces/user.interface';
import { jwtConfig } from '../config/jwt.config';


export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Genera un token de acceso JWT
   */
  public generateAccessToken(user: IUser): string {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role
    };

    return this.jwtService.sign(payload, {
      secret: jwtConfig.accessToken.secret,
      expiresIn: jwtConfig.accessToken.expiresIn
    });
  }

  /**
   * Genera un token de refresco JWT
   */
//   public generateRefreshToken(user: IUser): string {
//     const payload = {
//       sub: user._id,
//       tokenVersion: user.tokenVersion // Asegúrate de tener este campo en tu User model
//     };

//     return this.jwtService.sign(payload, {
//       secret: jwtConfig.refreshToken.secret,
//       expiresIn: jwtConfig.refreshToken.expiresIn
//     });
//   }

  /**
   * Verifica un token JWT
   */
  public verifyToken<T>(token: string): T {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Decodifica un token JWT sin verificar su validez
   */
  public decodeToken<T>(token: string): T {
    return this.jwtService.decode(token) as T;
  }
}