import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRentals/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAutheticated } from '../middlewares/ensureAutheticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.use(ensureAutheticated);

rentalsRoutes.post('/', createRentalController.handle);

rentalsRoutes.post('/:id/devolution', devolutionRentalController.handle);

rentalsRoutes.get('/users', listRentalsByUserController.handle);

export { rentalsRoutes };
