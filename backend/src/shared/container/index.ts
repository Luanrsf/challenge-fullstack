import { container } from 'tsyringe';
import '@modules/users/providers/index';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/repositories/UsersRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/repositories/ProductsRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IProductsRepository>(
    'ProductsRepository',
    ProductsRepository,
);
