import AppError from '@shared/errors/AppError';
import { inject } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';

export default class DeleteVariantService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    public async execute(id: string) {
        const checkVariantExists = await this.productsRepository.findVariantById(
            id,
        );
        if (!checkVariantExists) {
            throw new AppError('Variant not find');
        }
        const variantDeleted = await this.productsRepository.deleteVariantById(
            id,
        );
        return variantDeleted;
    }
}
