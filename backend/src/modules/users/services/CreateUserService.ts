import User from '@modules/users/infra/entities/user';

import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    email: string;
    password: string;
}
@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}
    public async execute({
        name,
        email,
        password,
    }: IRequest): Promise<User | null> {
        const emailAlreadyExists = await this.usersRepository.findByEmail(
            email,
        );

        if (emailAlreadyExists) {
            throw new AppError('Email already exists');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);
        const user = await this.usersRepository.create({
            name,
            password: hashedPassword,
            email,
            created_at: new Date(),
            updated_at: new Date(),
        });
        user.password = undefined;
        return user;
    }
}
