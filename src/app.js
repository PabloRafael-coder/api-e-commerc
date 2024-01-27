import express from 'express';
import { resolve } from 'path';
import routes from './routes';
import './database/'



class App {
  constructor() {
    this.app = express();
    this.midlleware();
    this.routes();
  }

  midlleware() {
    this.app.use(express.json());
    this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app; 
