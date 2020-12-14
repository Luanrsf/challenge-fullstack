import { Request, Response } from 'express';
import ProductsRepository from '@modules/products/infra/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import UpdateVariantsService from '@modules/products/services/UpdateVariantsService';

export default class UpdateVariantsControler {
    public async update(req: Request, res: Response) {
        const { _id, amount, name, picture, description, price } = req.body;
        const productsRepository = new ProductsRepository();
        const updateVariantsService = new UpdateVariantsService(
            productsRepository,
        );
        try {
            const variantUpdated = await updateVariantsService.execute(
                {
                    amount,
                    name,
                    picture,
                    description,
                    price,
                },
                _id,
            );
            return res.status(200).json(variantUpdated);
        } catch (err) {
            throw new AppError(err);
        }
    }
}
