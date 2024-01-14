import { Router } from 'express';

const routes = new Router();

routes.get('/', (resquest, response) => {
  return response.json({ message: 'Hello Would' });
});

export default routes;
