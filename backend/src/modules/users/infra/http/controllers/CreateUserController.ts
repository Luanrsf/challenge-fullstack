import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/bCryptHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import UsersRepository from '../../repositories/UsersRepository';

export default class CreateUserController {
    public async create(req: Request, res: Response): Promise<Response> {
        const usersRepository = new UsersRepository();
        const hashProvider = new BCryptHashProvider();
        const createUserService = new CreateUserService(
            usersRepository,
            hashProvider,
        );
        try {
            const { name, email, password } = req.body;
            const user = await createUserService.execute({
                name,
                email,
                password,
            });

            return res.status(201).json({ user });
        } catch (err) {
            throw new AppError(err);
        }
    }
}
