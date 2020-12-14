import ICreateDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import IUsersRepository from '../IUsersRepository';
import User from '../../infra/entities/user';

export default class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];
    public async findById(id: string): Promise<User | null | undefined> {
        const findUser = this.users.find(user => user.id == id);
        return findUser;
    }
    public async findByEmail(email: string): Promise<User | null | undefined> {
        const findUser = this.users.find(user => user.email == email);
        return findUser;
    }
    public async create(userData: ICreateDTO): Promise<User> {
        const user = new User();
        Object.assign(user, { _id: uuid() }, userData);

        this.users.push(user);
        return user;
    }
}
