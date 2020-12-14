import ICreateProductsDTO from '../dtos/ICreateProductsDTO';
import Products from '../infra/entities/Products';
import IProductsRepository from '../repositories/IProductsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class CreateProductsService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({
        amount,
        name,
        picture,
        description,
        price,
    }: ICreateProductsDTO): Promise<Products | null> {
        const product = await this.productsRepository.create({
            amount,
            name,
            picture,
            description,
            price,
        });

        return product;
    }
}
