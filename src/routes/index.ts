import { Router } from 'express';
import appoitmentRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appoitmentRouter);

export default routes;
