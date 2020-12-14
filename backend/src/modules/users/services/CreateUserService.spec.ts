import 'reflect-metadata';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
describe('CreateUser', async () => {
    it('should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
        const user = await createUser.execute({
            name: 'Luan Ramos',
            email: 'luanramos@email.com',
            password: '123456',
        });

        expect(user).toHaveProperty('_id');
    });
});
