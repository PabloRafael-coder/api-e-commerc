import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import CategoryController from './app/controllers/CategoryController';
import OrderController from './app/controllers/OrderController';

import authToken from './app/middlewares/auth'

import multer from 'multer'
import multerConfig from './config/multer'

const routes = new Router();
const upload = multer(multerConfig);



routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authToken)

routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);

routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update)


export default routes; 