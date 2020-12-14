import User from '../entities/user';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import UserMongo from '../mongoUserModel/index';
import AppError from '@shared/errors/AppError';

class UsersRepository implements IUsersRepository {
    constructor() {}

    public async findById(id: string): Promise<User | null> {
        const user = await UserMongo.findById(id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await UserMongo.findOne({
            email: email,
        });
        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = await UserMongo.create(userData);

        return user;
    }
}
export default UsersRepository;
