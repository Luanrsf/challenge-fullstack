import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AuthConfig from '@config/auth';
import User from '../infra/entities/user';
import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IResponse {
    user: User;
    token: string;
}
interface IRequest {
    email: string;
    password: string;
}
@injectable()
export default class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Wrong email/password combinations');
        }
        const passwordMatched = await this.hashProvider.compareHash(
            password,
            user.password,
        );
        if (!passwordMatched) {
            throw new AppError('Wrong email/password combinations');
        }

        const { secret, expiresIn } = AuthConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn,
        });
        user.password = undefined;
        return {
            user,
            token,
        };
    }
}
