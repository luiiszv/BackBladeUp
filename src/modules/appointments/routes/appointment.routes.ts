import { AppointmentModel } from "../model/appointment";
import { RepositoryAppointment } from "../repository/appointment.respository";
import { AppointmentServices } from "../services/appointmet.services";
import { AppointmentController } from "../controller/appointment.controller";

//Barber
import { BarberRepository } from "../../barber/repository/barber.repository";
import { UserModel } from "../../user/models/User";
//BarberServices
import { RepositoryBarber as BarberServicesRepo } from "../../servicesBarber/repository/services.respository";
import { ServiceModel } from "../../servicesBarber/model/servicesBarber";

import { Router } from "express";
const router = Router();


//Inyect depen
const appointmentRespo = new RepositoryAppointment(AppointmentModel);
const barberRespo = new BarberRepository(UserModel);
const babrberServicesRepo = new BarberServicesRepo(ServiceModel);
const appointmentServices = new AppointmentServices(appointmentRespo, barberRespo, babrberServicesRepo);
const appoinmentController = new AppointmentController(appointmentServices);


//Auth
import { verifyTokenMiddleware } from "../../../core/middleware/verifyTokenMiddleware";
import { verifyRole } from "../../../core/middleware/verifyRole";


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateAppointmentDto:
 *       type: object
 *       description: Datos necesarios para crear una cita (solo id barber y servicio)
 *       properties:
 *         barber:
 *           type: string
 *           description: ID del barbero
 *           example: "682a5ca83f96fc96570fd5f7"
 *         service:
 *           type: string
 *           description: ID del servicio solicitado
 *           example: "682f8a679f8923b706c2dd71"
 *       required:
 *         - barber
 *         - service
 *
 *     AppointmentDto:
 *       type: object
 *       description: Datos generales de una cita registrada
 */
/**
 * @swagger
 * /api/appointments:
 *   post:
 *     tags:
 *       - Appointments
 *     summary: Create a new appointment
 *     description: >
 *       Crea una nueva cita  (Solo el Cliente lo hace).  
 *       Valida que el Barbero y el servicio exista,  
 *       y que el cliente no tenga citas pendientes si sabe.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAppointmentDto'
 *           example:
 *             barber: "642e5f4e7f1c2a3b4c5d6e7f"
 *             service: "642e5f8a7f1c2a3b4c5d6e80"
 *             status: "pending"
 *     responses:
 *       '200':
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentDto'
 *       '400':
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: Barber or Service not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '409':
 *         description: Conflict - Pending appointment exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', verifyTokenMiddleware, verifyRole('client'), appoinmentController.create)

/**
 * @swagger
 * /api/appointments/barber=pending:
 *   get:
 *     tags:
 *       - Appointments
 *     summary: Obtener citas pendientes del barbero autenticado
 *     description: >
 *       Este endpoint retorna todas las citas con estado **pending** (pendiente) asociadas al barbero autenticado.  
 *       Se requiere autenticación con token y que el rol sea **barber**.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de citas pendientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentDto'
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso denegado - solo barberos
 */

router.get("/barber=pending", verifyTokenMiddleware, verifyRole("barber"), appoinmentController.findPendingAppoinmentBarber);


/**
 * @swagger
 * /api/appointments/client=pending:
 *   get:
 *     tags:
 *       - Appointments
 *     summary: Obtener citas pendientes del cliente autenticado
 *     description: >
 *       Este endpoint retorna todas las citas con estado **pending** (pendiente) asociadas al cliente autenticado.  
 *       Se requiere autenticación con token y que el rol sea **client**.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de citas pendientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentDto'
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso denegado - solo clientes
 */

router.get("/client=pending", verifyTokenMiddleware, verifyRole("client"), appoinmentController.findPendingAppoinmentClient);



/**
 * @swagger
 * /appointments/update/{id}:
 *   put:
 *     tags:
 *       - Appointments
 *     summary: Actualizar el estado de una cita
 *     description: >
 *       Actualiza el campo `status` de una cita existente.  
 *       Solo se puede cambiar el estado entre los siguientes valores permitidos:
 *       `pending`, `accepted`, `rejected`, `cancelled`, `completed`.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cita a actualizar (formato ObjectId de MongoDB)
 *         schema:
 *           type: string
 *           example: 68322a177e4d057e7797bz93
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, rejected, cancelled, completed]
 *                 description: Nuevo estado para la cita
 *                 example: accepted
 *     responses:
 *       '200':
 *         description: Cita actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentDto'
 *       '400':
 *         description: ID inválido o estado no permitido
 *       '401':
 *         description: No autorizado
 *       '404':
 *         description: Cita no encontrada
 */

router.put("/update/:id", verifyTokenMiddleware, appoinmentController.updateApp);


export default router;