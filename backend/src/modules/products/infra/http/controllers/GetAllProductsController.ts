import GetAllProductsService from '@modules/products/services/GetAllProductsService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import ProductsRepository from '../../repositories/ProductsRepository';

export default class GetAllProductsController {
    public async get(req: Request, res: Response) {
        const productsRepository = new ProductsRepository();
        const getAllProductsService = new GetAllProductsService(
            productsRepository,
        );
        try {
            const products = await getAllProductsService.execute();
            return res.status(200).json(products);
        } catch (err) {
            throw new AppError(err);
        }
    }
}
