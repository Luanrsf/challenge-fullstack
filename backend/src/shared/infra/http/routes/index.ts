import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import prodructsRouter from '@modules/products/infra/http/routes/products.routes';
import sessionController from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionController);
routes.use('/products', prodructsRouter);

export default routes;
