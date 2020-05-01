import { Router } from 'express';
import { uuid } from 'uuidv4';

const appoitmentRouter = Router();

const appointments = [];

appoitmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appoitmentRouter;
