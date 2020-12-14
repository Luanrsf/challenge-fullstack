import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class DeleteProductsService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    public async execute(_id: string) {
        const checkProductExists = await this.productsRepository.findProductById(
            _id,
        );
        if (!checkProductExists) {
            throw new AppError('Product not find');
        }
        const productDeleted = await this.productsRepository.deleteProductById(
            _id,
        );
        return productDeleted;
    }
}
