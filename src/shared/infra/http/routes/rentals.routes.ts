import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRentals/CreateRentalController';

import { ensureAutheticated } from '../middlewares/ensureAutheticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.use(ensureAutheticated);

rentalsRoutes.post('/', createRentalController.handle);

export { rentalsRoutes };
