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
 * components:
 *   schemas:
 *     CreateAppointmentDto:
 *       type: object
 *       description: Datos necesarios para crear una cita (solo id del barbero y del servicio)
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
 *       properties:
 *         _id:
 *           type: string
 *           example: "68337c631dd8fc2a82a61df4"
 *         client:
 *           type: object
 *           properties:
 *             _id: { type: string, example: "682f801c439ee2598d722b56" }
 *             name: { type: string, example: "luis" }
 *             lastName: { type: string, example: "Barber" }
 *             email: { type: string, example: "client@gmail.com" }
 *             role: { type: string, example: "client" }
 *             isBarberActive: { type: boolean, example: false }
 *             active: { type: boolean, example: true }
 *             creationDate: { type: string, format: date-time }
 *         barber:
 *           type: object
 *           properties:
 *             _id: { type: string, example: "682a5ca83f96fc96570fd5f7" }
 *             name: { type: string, example: "luis" }
 *             lastName: { type: string, example: "Barber" }
 *             email: { type: string, example: "barber@gmail.com" }
 *             role: { type: string, example: "barber" }
 *             isBarberActive: { type: boolean, example: true }
 *             active: { type: boolean, example: true }
 *             creationDate: { type: string, format: date-time }
 *         service:
 *           type: object
 *           properties:
 *             _id: { type: string, example: "682f8a679f8923b706c2dd71" }
 *             name: { type: string, example: "Corte muchacho loco" }
 *             description: { type: string, example: "Corte especial, de la casa" }
 *             price: { type: number, example: 2000 }
 *             barber: { type: string, example: "682a5ca83f96fc96570fd5f7" }
 *         status:
 *           type: string
 *           example: "pending"
 *         date:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "There's an appointment in pending status, cancel to create another one"
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     tags:
 *       - Appointments
 *     summary: Crea una nueva Cita
 *     description: >
 *       Crea una nueva cita (solo el cliente lo puede hacer).  
 *       Valida que el barbero y el servicio existan,  
 *       que el cliente no tenga citas pendientes.
 *       Solo se deben enviar los IDs del barbero y del servicio.  
 *       El ID del cliente se obtiene automáticamente desde el token de autenticación.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAppointmentDto'
 *           example:
 *             barber: "682a5ca83f96fc96570fd5f7"
 *             service: "682f8a679f8923b706c2dd71"
 *     responses:
 *       '201':
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
 *         description: Barber or service not found
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


/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Obtener todas las citas
 *     description: Retorna una lista de todas las citas con información del cliente, barbero y servicio.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   client:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [client]
 *                       isBarberActive:
 *                         type: boolean
 *                       active:
 *                         type: boolean
 *                       creationDate:
 *                         type: string
 *                         format: date-time
 *                   barber:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [barber]
 *                       isBarberActive:
 *                         type: boolean
 *                       active:
 *                         type: boolean
 *                       creationDate:
 *                         type: string
 *                         format: date-time
 *                   service:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       category:
 *                         type: string
 *                       price:
 *                         type: number
 *                       barber:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                   status:
 *                     type: string
 *                     enum: [pending, accepted, cancelled, completed]
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", verifyTokenMiddleware, appoinmentController.findAll);


/**
 * @swagger
 * /api/appointments/barber/{id}:
 *   get:
 *     tags:
 *       - Appointments
 *     summary: Obtener todas las citas de un barbero por su ID
 *     description: Retorna todas las citas asociadas al barbero cuyo ID se pasa por parámetro.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del barbero (formato ObjectId de MongoDB)
 *         schema:
 *           type: string
 *           example: 682a5ca83f96fc96570fd5f7
 *     responses:
 *       200:
 *         description: Lista de citas del barbero encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentDto'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Barbero no encontrado o sin citas
 */
router.get("/barber/:id", verifyTokenMiddleware, appoinmentController.findAllByParamsIdBarber);


/**
 * @swagger
 * /api/appointments/barber-auth:
 *   get:
 *     tags:
 *       - Appointments
 *     summary: Obtener todas las citas del barbero autenticado
 *     description: Retorna todas las citas asociadas al barbero autenticado (requiere autenticación).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas del barbero autenticado encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentDto'
 *       401:
 *         description: No autorizado
 */
router.get("/barber-auth", verifyTokenMiddleware, appoinmentController.findAllByIdBarber);

/**
 * @swagger
 * /api/appointments/client-auth:
 *   get:
 *     tags:
 *       - Appointments
 *     summary: Obtener todas las citas del cliente autenticado
 *     description: Retorna todas las citas asociadas al cliente autenticado (requiere autenticación).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas del cliente autenticado encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentDto'
 *       401:
 *         description: No autorizado
 */
router.get("/client-auth", verifyTokenMiddleware, appoinmentController.findAllByIdClient);

export default router;