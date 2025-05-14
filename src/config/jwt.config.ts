// src/auth/config/jwt.config.ts



export const jwtConfig = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET || 'defaultAccessSecret',
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1d', // 15 minutos
    issuer: process.env.JWT_ISSUER || 'your-app-name',
    audience: process.env.JWT_AUDIENCE || 'your-app-client',
  },
  verificationToken: {
    secret: process.env.JWT_VERIFICATION_SECRET || 'defaultVerificationSecret',
    expiresIn: process.env.JWT_VERIFICATION_EXPIRES_IN || '1d', // 1 día
  },
  passwordResetToken: {
    secret: process.env.JWT_PASSWORD_RESET_SECRET || 'defaultPasswordResetSecret',
    expiresIn: process.env.JWT_PASSWORD_RESET_EXPIRES_IN || '1h', // 1 hora
  },
};