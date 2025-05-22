import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import { UserModel } from '../models/User';

const router = Router();

// Inyección de dependencias
const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService);





/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar nuevo usuario  
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Luis"
 *               lastName:
 *                 type: string
 *                 example: "Perez"
 *               email:
 *                 type: string
 *                 example: "luis@example.com"
 *               password:
 *                 type: string
 *                 example: "Password123"
 *               role:
 *                 type: string
 *                 example: "client"
 *     responses:
 *       201:
 *         description: Usuario registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Error en los datos o email ya existe
 *       500:
 *         description: Error del servidor
 */
router.post('/register', userController.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDto'
 */
router.get('/', userController.getUsers);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDto'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', userController.getUserById);


router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export default router;