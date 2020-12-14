import 'reflect-metadata';
import 'express-async-errors';
import '@shared/container';
import http from 'http';
import AppError from '@shared/errors/AppError';
import cors from 'cors';

import express, { NextFunction, Response, Request } from 'express';
import routes from '../http/routes';
import * as dontenv from 'dotenv';
import GetAllProductsService from '@modules/products/services/GetAllProductsService';
import ProductsRepository from '@modules/products/infra/repositories/ProductsRepository';
import Products from '@modules/products/infra/entities/Products';
import CreateProductsService from '@modules/products/services/CreateProductsService';
import DeleteProductsService from '@modules/products/services/DeleteProductsService';
import CreateVariantsService from '@modules/products/services/CreateVariantsService';
import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';
import GetVariantsByIdService from '@modules/products/services/GetvariantsByIdService';
import DeleteVariantService from '@modules/products/services/DeleteVariantService';
import UpdateProductsService from '@modules/products/services/UpdateProductsService';
import UpdateVariantsService from '@modules/products/services/UpdateVariantsService';
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

dontenv.config();

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

////
//Configurando socket
////

const server = http.createServer(app);
var io = require('socket.io')(server);
const productsRepository = new ProductsRepository();
const getAllProductsService = new GetAllProductsService(productsRepository);
const getVariantsByIdService = new GetVariantsByIdService(productsRepository);
const createProductsService = new CreateProductsService(productsRepository);
const createVariantsService = new CreateVariantsService(productsRepository);
const deleteProductsService = new DeleteProductsService(productsRepository);
const deleteVariantsService = new DeleteVariantService(productsRepository);
const updateProductsService = new UpdateProductsService(productsRepository);
const updateVariantsService = new UpdateVariantsService(productsRepository);

io.on('connection', socket => {
    socket.on('RegisterProducts', async (product: Products) => {
        await createProductsService.execute(product);
        console.log('Connected');
        const products = await getAllProductsService.execute();
        socket.broadcast.emit('GetProducts', products);
    });
    socket.on('DeleteProducts', async (_id: string) => {
        await deleteProductsService.execute(_id);
        const products = await getAllProductsService.execute();
        socket.broadcast.emit('GetProducts', products);
    });
    socket.on(
        'RegisterVariant',
        async (variant: ICreateProductsDTO, id: string) => {
            await createVariantsService.execute(variant, id);
            const variants = await getVariantsByIdService.execute(id);

            socket.broadcast.emit('GetVariants', variants);
        },
    );
    socket.on(
        'UpdateProduct',
        async (products: ICreateProductsDTO, id: string) => {
            const product = await updateProductsService.execute(products, id);

            socket.broadcast.emit('GetSingleProduct', product);
        },
    );

    socket.on(
        'UpdateVariant',
        async (variants: ICreateProductsDTO, id: string) => {
            const variant = await updateVariantsService.execute(variants, id);
            socket.broadcast.emit('GetSingleVariant', variant);
        },
    );
    socket.on('DeleteVariants', async (_id: string, productId: string) => {
        await deleteVariantsService.execute(_id);
        const variants = await getVariantsByIdService.execute(productId);
        socket.broadcast.emit('GetVariants', variants);
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started on port 3334!`);
});
