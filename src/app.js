import express from 'express';
import routes from './routes.js';

class App {
  constructor() {
    this.app = express();
    this.midlleware();
    this.routes();
  }

  midlleware() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
