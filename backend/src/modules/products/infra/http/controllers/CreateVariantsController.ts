import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateVariantService from '../../../services/CreateVariantsService';
import ProductsRepository from '../../repositories/ProductsRepository';

export default class CreateVariantsController {
    public async create(req: Request, res: Response) {
        const productsRepository = new ProductsRepository();
        const createVariantService = new CreateVariantService(
            productsRepository,
        );
        const {
            product_id,
            amount,
            name,
            picture,
            description,
            price,
        } = req.body;

        try {
            const variant = await createVariantService.execute(
                {
                    amount,
                    name,
                    picture,
                    description,
                    price,
                },
                product_id,
            );
            return res.status(201).json(variant);
        } catch (err) {
            throw new AppError(err);
        }
    }
}
