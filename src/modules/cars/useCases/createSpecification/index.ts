import { SpecificationsRespository } from '../../repositories/implementations/SpecificationsRespository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationsRespository = SpecificationsRespository.getInstance();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRespository,
);

const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);

export { createSpecificationController };
