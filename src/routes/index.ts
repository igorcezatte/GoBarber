import { Router } from 'express';
import appoitmentsRouter from './appointments.routes';
import usersRouter from './user.routes';

const routes = Router();

routes.use('/appointments', appoitmentsRouter);
routes.use('/users', usersRouter);

export default routes;
