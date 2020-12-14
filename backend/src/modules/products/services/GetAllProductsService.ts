import { inject, injectable } from 'tsyringe';
import Products from '../infra/entities/Products';
import IProductsRepository from '../repositories/IProductsRepository';
@injectable()
export default class GetAllProductsService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    public async execute() {
        const products = await this.productsRepository.getAllProducts();

        return products;
    }
}
