import { Router } from "express";
import { BarberController } from "../controller/barber.controller";
import { UserModel } from "../../user/models/User";
import { BarberRepository } from "../repository/barber.repository";
import { BarberService } from "../services/barber.services";
import { verifyTokenMiddleware } from "../../../core/middleware/verifyTokenMiddleware";

const router = Router();

const barberRepo = new BarberRepository(UserModel);
const barberService = new BarberService(barberRepo);
const barberController = new BarberController(barberService);

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
 *           example: "664d7c8189a3a9038a1e4a55"
 *         name:
 *           type: string
 *           example: "Luis"
 *         lastName:
 *           type: string
 *           example: "Martínez"
 *         email:
 *           type: string
 *           format: email
 *           example: "luis.martinez@example.com"
 *         role:
 *           type: string
 *           enum: [barber]
 *           example: "barber"
 *         creationDate:
 *           type: string
 *           format: date-time
 *           example: "2024-05-22T15:30:00.000Z"
 *         active:
 *           type: boolean
 *           example: true
 *         isBarberActive:
 *           type: boolean
 *           example: true
 */

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
 *       401:
 *         description: No autorizado. Token inválido o ausente.
 *       404:
 *         description: Barbero no encontrado.
 */
router.put('/change-status/:id', verifyTokenMiddleware, barberController.changeStatusBarber);

export default router;
