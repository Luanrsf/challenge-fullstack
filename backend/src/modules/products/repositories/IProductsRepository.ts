import ICreateProductsDTO from '../dtos/ICreateProductsDTO';
import Products from '../infra/entities/Products';

export default interface IProductsRepository {
    create({
        amount,
        name,
        picture,
        description,
        price,
    }: ICreateProductsDTO): Promise<Products | null>;
    findProductById(id: string): Promise<Products | null>;
    findVariantById(id: string): Promise<Products | null | undefined>;
    createVariantByAllData(
        data: ICreateProductsDTO,
        id: string,
    ): Promise<Products | null | undefined>;
    deleteVariantById(id: string): Promise<Products | null | undefined>;
    deleteProductById(id: string): Promise<Products | null>;
    updateProductsByAllData(
        data: ICreateProductsDTO,
        id: string,
    ): Promise<Products | null>;
    updateVariantsByAllData(
        data: ICreateProductsDTO,
        id: string,
    ): Promise<Products | null | undefined>;
    getAllProducts(): Promise<Products[] | null>;
}
