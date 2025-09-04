import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

const setUserRoutes = (app) => {
    router.post('/users', userController.createUser);
    router.get('/users/:id', userController.getUser);
    router.put('/users/:id', userController.updateUser);
    router.delete('/users/:id', userController.deleteUser);

    app.use('/api', router);
};

export default setUserRoutes;