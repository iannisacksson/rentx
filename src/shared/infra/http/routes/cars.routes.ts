import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAutheticated } from '../middlewares/ensureAutheticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const uploadImage = multer(uploadConfig.upload('./tmp/avatar'));

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.use(ensureAutheticated);
carsRoutes.use(ensureAdmin);

carsRoutes.post('/', createCarController.handle);

carsRoutes.post(
  '/:id/images',
  uploadImage.array('images'),
  uploadCarImageController.handle,
);

carsRoutes.post('/:id/specifications', createCarSpecificationController.handle);

export { carsRoutes };
