import AppError from '@shared/errors/AppError';
import { inject } from 'tsyringe';
import ICreateProductsDTO from '../dtos/ICreateProductsDTO';

import IProductsRepository from '../repositories/IProductsRepository';

export default class UpdateProductsService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    public async execute(data: ICreateProductsDTO, id: string) {
        const checkProductsExists = await this.productsRepository.findProductById(
            id,
        );

        if (!checkProductsExists) {
            throw new AppError('Product not find');
        }
        const productsUpdated = await this.productsRepository.updateProductsByAllData(
            data,
            id,
        );
        return productsUpdated;
    }
}
