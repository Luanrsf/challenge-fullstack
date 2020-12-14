import CreateProductsService from '@modules/products/services/CreateProductsService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import Products from '../../entities/Products';
import ProductsRepository from '../../repositories/ProductsRepository';

export default class CreateProductsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const productsRepository = new ProductsRepository();
        const createProductsService = new CreateProductsService(
            productsRepository,
        );
        try {
            const { amount, name, picture, description, price } = req.body;
            const product = await createProductsService.execute({
                amount,
                name,
                picture,
                description,
                price,
            });
            res.status(201).json(product);
        } catch (err) {
            throw new AppError(err);
        }
    }
}
