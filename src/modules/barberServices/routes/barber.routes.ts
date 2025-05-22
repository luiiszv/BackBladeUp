import { BarberController } from "../controller/barber.controller";
import { UserModel } from "../../user/models/User";
import { BarberRepository } from "../repository/barber.repository";
import { BarberService } from "../services/barber.services";

import { Router } from "express";

const router = Router()
const barberRepo = new BarberRepository(UserModel);
const barberService = new BarberService(barberRepo);
const barberController = new BarberController(barberService);

//Middlewares
import { verifyTokenMiddleware } from "../../../core/middleware/verifyTokenMiddleware";




/**
 * @swagger
 * /api/barbers/:
 *   get:
 *     summary: Obtener todos los barberos
 *     tags:
 *       - Barbers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de barberos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Barber'
 *       401:
 *         description: No autorizado. Token inválido o ausente.
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Barber:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60f6c22e4f1a2c3b9c5d4d00"
 *         name:
 *           type: string
 *           example: "Carlos"
 *         lastName:
 *           type: string
 *           example: "Gómez"
 *         email:
 *           type: string
 *           format: email
 *           example: "carlos.gomez@example.com"
 *         role:
 *           type: string
 *           enum: [barber]
 *           example: "barber"
 *         creationDate:
 *           type: string
 *           format: date-time
 *           example: "2023-01-15T10:30:00Z"
 *         active:
 *           type: boolean
 *           example: true
 *         isBarberActive:
 *           type: boolean
 *           example: true
 */

router.get('/', verifyTokenMiddleware, barberController.findAllBarbers);
/**
 * @swagger
 * /api/barbers/{id}:
 *   get:
 *     summary: Obtener un barbero por ID
 *     tags:
 *       - Barbers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del barbero a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Barbero obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barber'
 *       401:
 *         description: No autorizado. Token inválido o ausente.
 *       404:
 *         description: Barbero no encontrado.
 */
router.get('/:id', verifyTokenMiddleware, barberController.findBarberById);

/**
 * @swagger
 * /api/barbers/change-status/{id}:
 *   put:
 *     summary: Cambiar el estado de un barbero por ID
 *     tags:
 *       - Barbers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del barbero cuyo estado se desea cambiar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado del barbero cambiado exitosamente
 *         content:
 *           application/json:

 *       401:
 *         description: No autorizado. Token inválido o ausente.
 *       404:
 *         description: Barbero no encontrado.
 */
router.put('/change-status/:id', verifyTokenMiddleware, barberController.changeStatusBarber);



export default router;
