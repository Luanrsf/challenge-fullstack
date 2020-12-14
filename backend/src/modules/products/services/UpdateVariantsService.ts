import AppError from '@shared/errors/AppError';
import { inject } from 'tsyringe';
import ICreateProductsDTO from '../dtos/ICreateProductsDTO';

import IProductsRepository from '../repositories/IProductsRepository';

export default class UpdateVariantsService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    public async execute(data: ICreateProductsDTO, id: string) {
        const checkVariantExists = await this.productsRepository.findVariantById(
            id,
        );
        if (!checkVariantExists) {
            throw new AppError('Variant not find');
        }
        const variantsUpdated = await this.productsRepository.updateVariantsByAllData(
            data,
            id,
        );
        return variantsUpdated;
    }
}
