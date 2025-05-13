import express, { Application } from 'express';
import { config } from 'dotenv';
import { ErrorHandler } from './core/middleware/error.middleware';  // Importa la clase ErrorHandler
import userRoutes from './modules/user/routes/user.routes';  // Rutas del módulo de usuario

config();

const app: Application = express();

// Middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/users', userRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    ErrorHandler.handle(err, req, res, next);
});

// Configuración del puerto
app.set('port', process.env.PORT || 4000);

export default app;
