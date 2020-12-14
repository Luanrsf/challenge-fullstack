import Router from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CreateProductsController from '../controllers/CreateProductsController';
import CreateVariantsController from '../controllers/CreateVariantsController';
import DeleteProductsControler from '../controllers/DeleteProductsController';
import DeleteVariantsController from '../controllers/DeleteVariantsController';
import UpdateProductsController from '../controllers/UpdateProductsController';
import UpdateVariantsController from '../controllers/UpdateVariantsController';
import GetAllProductsController from '../controllers/GetAllProductsController';

const productsRouter = Router();

const createProductsController = new CreateProductsController();
const createVariantsController = new CreateVariantsController();
const deleteProductsController = new DeleteProductsControler();
const deleteVariantsController = new DeleteVariantsController();
const getAllProductsController = new GetAllProductsController();
const updateProductsController = new UpdateProductsController();
const updateVariantsController = new UpdateVariantsController();

productsRouter.get('/', ensureAuthenticated, getAllProductsController.get);

productsRouter.post('/', ensureAuthenticated, createProductsController.create);

productsRouter.post(
    '/variants',
    ensureAuthenticated,
    createVariantsController.create,
);

productsRouter.delete(
    '/:id',
    ensureAuthenticated,
    deleteProductsController.delete,
);

productsRouter.delete(
    '/variants/:id',
    ensureAuthenticated,
    deleteVariantsController.delete,
);

productsRouter.put('/', ensureAuthenticated, updateProductsController.update);

productsRouter.put(
    '/variants',
    ensureAuthenticated,
    updateVariantsController.update,
);

export default productsRouter;
