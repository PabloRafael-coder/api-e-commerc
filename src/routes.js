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

routes.get('/products', ProductController.index);
routes.post('/products', upload.single('file'), ProductController.store);
routes.put('/products/:id', upload.single('file'), ProductController.update);


routes.get('/categories', CategoryController.index);
routes.post('/categories', upload.single('file'), CategoryController.store);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);


routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);


export default routes; 