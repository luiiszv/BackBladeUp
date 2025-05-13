import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';


//
import { HttpError } from "../../../core/errors/HttpError";

export class UserController {
    constructor(private readonly userService: UserService) {
        this.userService = userService
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [error, createUserDto] = CreateUserDto.create(req.body);

            if (error) {
                return next(new HttpError(error, 400));
            }

            const user = await this.userService.createUser(createUserDto!);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    };




    getUsers = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const users = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }

    };

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.updateUser(req.params.id, req.body);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.deleteUser(req.params.id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }
}