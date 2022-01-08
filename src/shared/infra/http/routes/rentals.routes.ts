import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRentals/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

import { ensureAutheticated } from '../middlewares/ensureAutheticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.use(ensureAutheticated);

rentalsRoutes.post('/', createRentalController.handle);

rentalsRoutes.post('/:id/devolution', devolutionRentalController.handle);

export { rentalsRoutes };
