import { Request, Response } from 'express';
import DeleteProductsService from '@modules/products/services/DeleteProductsService';
import ProductsRepository from '@modules/products/infra/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

export default class DeleteProductsControler {
    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        const productsRepository = new ProductsRepository();
        const deleteProductsService = new DeleteProductsService(
            productsRepository,
        );
        try {
            const productDeleted = await deleteProductsService.execute(id);
            return res.status(200).json(productDeleted);
        } catch (err) {
            throw new AppError(err);
        }
    }
}
