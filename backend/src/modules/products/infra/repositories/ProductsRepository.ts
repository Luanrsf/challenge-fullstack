import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';
import Products from '../entities/Products';
import productsModelDB from '../mongoDB/productsModelDB';

export default class ProductsRepository {
    ////
    //Cria um produto sem nenhuma variant
    ////vvvvv
    public async create({
        amount,
        name,
        picture,
        description,
        price,
    }: ICreateProductsDTO): Promise<Products | null> {
        const product = await productsModelDB.create({
            amount,
            name,
            picture,
            description,
            price,
        });
        return product;
    }
    ////
    //Cria uma variant dentro do produto do id inserido
    ////vvvvv
    public async createVariantByAllData(
        variants: ICreateProductsDTO,
        id: string,
    ): Promise<Products | null | undefined> {
        await productsModelDB.updateOne(
            { _id: id },
            { $push: { variants: variants } },
        );
        const findProduct = await this.findProductById(id);

        const product =
            findProduct?.variants[findProduct?.variants?.length - 1];
        return product;
    }
    ////
    // Busca todos os produtos
    ///vvvvv
    public async getAllProducts(): Promise<Products[] | null> {
        const products = await productsModelDB.find({});
        return products;
    }
    ////
    //Busca um produto baseado no id
    ////vvvvv
    public async findProductById(id: string): Promise<Products | null> {
        const product = await productsModelDB.findOne({ _id: id });
        return product;
    }
    /////
    //Busca uma variant baseado no id da variant
    ////vvvvv
    public async findVariantById(
        id: string,
    ): Promise<Products | null | undefined> {
        const product = await productsModelDB.find({ 'variants._id': id });
        const variant = product[0].variants?.filter(item => item._id == id)[0];
        return variant;
    }
    ////
    //Deleta o registro de um produto baseado no id do produto, e consequentimente deleta as variants nesse produto
    ////vvvvv
    public async deleteProductById(_id: string): Promise<Products | null> {
        const product = await this.findProductById(_id);
        await productsModelDB.deleteOne({ _id: _id });
        return product;
    }
    ////
    //Delete uma Variant baseado no ID dela
    ////vvvvv

    public async deleteVariantById(
        id: string,
    ): Promise<Products | null | undefined> {
        const variant = await this.findVariantById(id);

        await productsModelDB.updateOne(
            { 'variants._id': id },
            {
                $pull: {
                    variants: { _id: id },
                },
            },
        );
        return variant;
    }
    ////
    //Atualiza um produto baseado no ID do produto e atualiza os dados inseridos
    ////vvvvv
    public async updateProductsByAllData(
        data: ICreateProductsDTO,
        id: string,
    ): Promise<Products | null> {
        await productsModelDB.updateOne(
            { _id: id },
            {
                _id: id,
                amount: data.amount,
                name: data.name,
                picture: data.picture,
                description: data.description,
                price: data.price,
            },
        );

        const product = await this.findProductById(id);
        return product;
    }

    ////
    //Atualiza uma variant baseado no id da variant e atualiza com o dados inseridos
    ////vvvvv
    public async updateVariantsByAllData(
        data: ICreateProductsDTO,
        id: string,
    ): Promise<Products | null | undefined> {
        const product = await productsModelDB.find({ 'variants._id': id });
        await this.deleteVariantById(id);
        const variantResponse = this.createVariantByAllData(
            data,
            product[0]._id,
        );

        return variantResponse;
    }
}
