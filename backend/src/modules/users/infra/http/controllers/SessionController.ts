import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import BCryptProvider from '@modules/users/providers/HashProvider/implementations/bCryptHashProvider';
import UserRepository from '../../repositories/UsersRepository';

export default class SessionController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const hashProvider = new BCryptProvider();
        const userRepository = new UserRepository();
        const authenticateUser = new AuthenticateUserService(
            userRepository,
            hashProvider,
        );
        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });
        return res.status(201).json({ user, token });
    }
}
