import { Router } from "express";
import { ServiceModel } from "../model/servicesBarber";
import { ServicesBarberController } from "../controller/services.controller";
import { ServiceBarber } from "../services/service.service";
import { RepositoryBarber as RepositoryServicesBarber } from "../repository/services.respository";
import { verifyTokenMiddleware } from "../../../core/middleware/verifyTokenMiddleware";
import { verifyRole } from "../../../core/middleware/verifyRole";

const router = Router();

const repositoryBarberRepo = new RepositoryServicesBarber(ServiceModel);
const servicesBarberServices = new ServiceBarber(repositoryBarberRepo);
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
 *           example: "682f8a679f8923b706c2dd71"
 *         name:
 *           type: string
 *           example: "Corte muchacho loco"
 *         description:
 *           type: string
 *           example: "Corte especial, de la casa"
 *         price:
 *           type: number
 *           example: 25000
 *         barber:
 *           type: string
 *           example: "682a5ca83f96fc96570fd5f7"
 *         __v:
 *           type: number
 *           example: 0
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
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Corte básico"
 *               price:
 *                 type: number
 *                 example: 20000
 *               description:
 *                 type: string
 *                 example: "Corte con tijera y máquina"
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
router.post('/', verifyTokenMiddleware, verifyRole("barber"), controllerServiceBarber.create);

/**
 * @swagger
 * /api/barber-services/update/{id}:
 *   get:
 *     summary: Actualizar un servicio por ID
 *     tags: [BarberServices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del servicio a actualizar
 *         schema:
 *           type: string
 *           example: "682f8a679f8923b706c2dd71"
 *     responses:
 *       200:
 *         description: Servicio encontrado y listo para actualización
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Servicio no encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 */
router.put('/update/:id', verifyTokenMiddleware, verifyRole("barber"), controllerServiceBarber.update);

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
 *         description: Acceso denegado (solo barberos)
 */
router.get('/me', verifyTokenMiddleware, verifyRole("barber"), controllerServiceBarber.findBarberServicesByBarberAuth); //Aqui me por barbero se ve en el verifyRole


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
 *         description: ID del barbero a consultar
 *         schema:
 *           type: string
 *           example: 682a5ca83f96fc96570fd5f7
 *     responses:
 *       200:
 *         description: Lista de servicios del barbero especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Barbero no encontrado o sin servicios
 *       500:
 *         description: Error interno del servidor
 */

router.get('/barber/:id', verifyTokenMiddleware, controllerServiceBarber.findBarberServicesByBarberId); //Aqui trae los servicion que el usurio le enviae por parametro 




export default router;
