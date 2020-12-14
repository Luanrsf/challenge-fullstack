import User from '../infra/entities/user';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User | null | undefined>;
    findById(id: string): Promise<User | null | undefined>;
}
