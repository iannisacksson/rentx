import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAutheticated } from '@shared/infra/http/middlewares/ensureAutheticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAutheticated);
specificationsRoutes.use(ensureAdmin);

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
