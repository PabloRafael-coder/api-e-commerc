import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';

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

export default routes; 