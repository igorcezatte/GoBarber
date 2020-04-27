import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Hello Omnistack' }),
);

export default routes;
