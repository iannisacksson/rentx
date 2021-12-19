import { v4 as uuidV4 } from 'uuid';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRespositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRespositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRespositoryInMemory: SpecificationsRespositoryInMemory;

let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRespositoryInMemory = new SpecificationsRespositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRespositoryInMemory,
    );
  });

  it('should be able to add a new specification to the car.', async () => {
    const specification = await specificationsRespositoryInMemory.create({
      name: 'New Specification',
      description: 'Description specification',
    });

    const car = await carsRepositoryInMemory.create({
      brand: 'brand',
      categoryId: uuidV4(),
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
      specifications: [],
    });

    const specificationCars = await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId: [specification.id],
    });

    expect(specificationCars).toHaveProperty('specifications');
    expect(specificationCars.specifications).toHaveLength(1);
  });

  it('should not be able to add a new specification to the car if it does not exists.', async () => {
    const response = createCarSpecificationUseCase.execute({
      carId: 'non-existing-car',
      specificationsId: ['1234'],
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });
});
