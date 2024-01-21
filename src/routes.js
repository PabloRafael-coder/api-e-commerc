import { Router } from 'express';
import Usercontroller from './app/controllers/Usercontroller'


const routes = new Router();

routes.post('/users', Usercontroller.store)

export default routes; 