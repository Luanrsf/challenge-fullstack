import { inject, injectable } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';
@injectable()
export default class GetVariantsByIdService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    public async execute(id: string) {
        const products = await this.productsRepository.findProductById(id);

        return products?.variants;
    }
}
