import express, { Application } from 'express';
import { config } from 'dotenv';
import { ErrorHandler } from './core/middleware/error.middleware';
import userRoutes from './modules/user/routes/user.routes';  // Rutas del módulo de usuario
import AuthRoutes from "./modules/auth/routes/auth.routes";

import swaggerUi from "swagger-ui-express"; //swagger

config();

const app: Application = express();

// Middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//spects swagger
import specs from "./config/swagger-config";
import { any } from 'zod';

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/auth', AuthRoutes);

//SwaggerDocs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.get("/", (req, res) => {
  res.send("BladeUp Api. La documentación está disponible en /api-docs");
});


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    ErrorHandler.handle(err, req, res, next);
});

// Configuración del puerto
app.set('port', process.env.PORT || 4000);

export default app;
