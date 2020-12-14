import { Request, Response } from 'express';
import DeleteVariantsService from '@modules/products/services/DeleteVariantService';
import ProductsRepository from '@modules/products/infra/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

export default class DeleteVariantsControler {
    public async delete(req: Request, res: Response) {
        const { id } = req.params;

        const productsRepository = new ProductsRepository();
        const deleteVariantsService = new DeleteVariantsService(
            productsRepository,
        );
        try {
            const variantsDeleted = await deleteVariantsService.execute(id);
            return res.status(200).json(variantsDeleted);
        } catch (err) {
            throw new AppError(err);
        }
    }
}
