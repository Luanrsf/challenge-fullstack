import productsModelDB from '../infra/mongoDB/productsModelDB';
import ICreateProductsDTO from '../dtos/ICreateProductsDTO';
import Products from '../infra/entities/Products';
import { inject, injectable } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateVariantsService {
    constructor(
        @inject('ProductsRepsitory')
        private productsRepository: IProductsRepository,
    ) {}
    public async execute(
        variant: ICreateProductsDTO,
        product_id: string,
    ): Promise<Products | null | undefined> {
        const checkProductExists = await this.productsRepository.findProductById(
            product_id,
        );
        if (!checkProductExists) {
            throw new AppError('Product not find');
        }

        const product = await this.productsRepository.createVariantByAllData(
            variant,
            product_id,
        );

        return product;
    }
}
