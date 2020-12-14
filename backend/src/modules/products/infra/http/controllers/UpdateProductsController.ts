import { Request, Response } from 'express';
import UpdateProductsService from '@modules/products/services/UpdateProductsService';
import ProductsRepository from '@modules/products/infra/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

export default class UpdateProductsControler {
    public async update(req: Request, res: Response) {
        const { _id, amount, name, picture, description, price } = req.body;
        const productsRepository = new ProductsRepository();
        const updateProductsService = new UpdateProductsService(
            productsRepository,
        );
        try {
            const productUpdated = await updateProductsService.execute(
                {
                    amount,
                    name,
                    picture,
                    description,
                    price,
                },
                _id,
            );
            return res.status(200).json(productUpdated);
        } catch (err) {
            throw new AppError(err);
        }
    }
}
