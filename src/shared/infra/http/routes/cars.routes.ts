import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAutheticated } from '../middlewares/ensureAutheticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
carsRoutes.use(ensureAutheticated);
carsRoutes.use(ensureAdmin);

carsRoutes.post('/', createCarController.handle);

export { carsRoutes };
