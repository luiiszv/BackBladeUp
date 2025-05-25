import { Router } from "express";
import { ServiceModel } from "../model/servicesBarber";
import { ServicesBarberController } from "../controller/services.controller";
import { ServiceBarber } from "../services/service.service";
import { RepositoryBarber as RepositoryServicesBarber } from "../repository/services.respository";
import { verifyTokenMiddleware } from "../../../core/middleware/verifyTokenMiddleware";
import { verifyRole } from "../../../core/middleware/verifyRole";
import { FirebaseStorageService } from "../../../utils/firebaseStorage";
import { uploadServiceImage } from "../../../config/multer";

const router = Router();

const repositoryBarberRepo = new RepositoryServicesBarber(ServiceModel);
const storageService = new FirebaseStorageService();
const servicesBarberServices = new ServiceBarber(repositoryBarberRepo, storageService);
const controllerServiceBarber = new ServicesBarberController(servicesBarberServices);

/**
 * @swagger
 * tags:
 *   name: BarberServices
 *   description: Gestión de servicios ofrecidos por barberos
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         barber:
 *           type: string
 *         imageUrl:
 *           type: string
 *           description: URL de la imagen del servicio
 *         __v:
 *           type: number
 */

/**
 * @swagger
 * /api/barber-services/:
 *   post:
 *     summary: Crear un nuevo servicio
 *     tags: [BarberServices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del servicio (opcional)
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 */
router.post(
  "/",
  verifyTokenMiddleware,
  verifyRole("barber"),
  uploadServiceImage.single("image"),
  controllerServiceBarber.create
);

/**
 * @swagger
 * /api/barber-services/update/{id}:
 *   put:
 *     summary: Actualizar un servicio por ID
 *     tags: [BarberServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del servicio
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del servicio (opcional)
 *     responses:
 *       200:
 *         description: Servicio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Servicio no encontrado
 */
router.put(
  "/update/:id",
  verifyTokenMiddleware,
  verifyRole("barber"),
  uploadServiceImage.single("image"),
  controllerServiceBarber.update
);

/**
 * @swagger
 * /api/barber-services/me:
 *   get:
 *     summary: Obtener los servicios creados por el barbero autenticado
 *     tags: [BarberServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de servicios del barbero autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 */
router.get(
  "/me",
  verifyTokenMiddleware,
  verifyRole("barber"),
  controllerServiceBarber.findBarberServicesByBarberAuth
);

/**
 * @swagger
 * /api/barber-services/barber/{id}:
 *   get:
 *     summary: Obtener servicios de un barbero por su ID
 *     tags: [BarberServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del barbero
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de servicios del barbero
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Barbero no encontrado
 */
router.get(
  "/barber/:id",
  verifyTokenMiddleware,
  controllerServiceBarber.findBarberServicesByBarberId
);

/**
 * @swagger
 * /api/barber-services:
 *   get:
 *     summary: Obtener todos los servicios ofrecidos por los barberos
 *     tags: [BarberServices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de servicios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       401:
 *         description: No autorizado
 */
router.get(
  "/",
  verifyTokenMiddleware,
  controllerServiceBarber.findAll
);

export default router;
