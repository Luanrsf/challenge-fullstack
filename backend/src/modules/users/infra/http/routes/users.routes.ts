import Router from 'express';
import UserMongo from '../../mongoUserModel/index';
import CreateUserController from '../controllers/CreateUserController';

const usersRouter = Router();
const createUserController = new CreateUserController();

usersRouter.get('/', async (req, res) => {
    const users = await UserMongo.find();
    res.json(users);
});

usersRouter.post('/register', createUserController.create);

export default usersRouter;
