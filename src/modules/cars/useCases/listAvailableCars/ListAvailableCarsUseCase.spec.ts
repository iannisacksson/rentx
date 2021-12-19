import { v4 as uuidV4 } from 'uuid';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars.', async () => {
    await carsRepositoryInMemory.create({
      brand: 'brand',
      categoryId: uuidV4(),
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
      specifications: [],
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars by brand.', async () => {
    await carsRepositoryInMemory.create({
      brand: 'brand',
      categoryId: uuidV4(),
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
      specifications: [],
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'brand',
    });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars by name.', async () => {
    await carsRepositoryInMemory.create({
      brand: 'brand',
      categoryId: uuidV4(),
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
      specifications: [],
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Name car',
    });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars by category id.', async () => {
    const categoryId = uuidV4();

    await carsRepositoryInMemory.create({
      brand: 'brand',
      categoryId,
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
      specifications: [],
    });

    const cars = await listAvailableCarsUseCase.execute({
      categoryId,
    });

    expect(cars).toHaveLength(1);
  });
});
