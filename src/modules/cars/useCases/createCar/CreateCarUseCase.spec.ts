import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(
      carsRepositoryInMemory,
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new car.', async () => {
    const category = await categoriesRepositoryInMemory.create({
      description: 'Description category',
      name: 'Category name',
    });

    const car = await createCarUseCase.execute({
      brand: 'brand',
      categoryId: category.id,
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
    });

    expect(car).toHaveProperty('id');
    expect(car.available).toEqual(true);
  });

  it('should not be able to create a car if category does not exist.', async () => {
    const response = createCarUseCase.execute({
      brand: 'brand',
      categoryId: 'non-existing-category',
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
    });

    await expect(response).rejects.toEqual(
      new AppError('Category does not exist', 404),
    );
  });

  it('should not be able to create a car with exists license plate.', async () => {
    const category = await categoriesRepositoryInMemory.create({
      description: 'Test',
      name: 'Test',
    });

    await carsRepositoryInMemory.create({
      brand: 'brand',
      categoryId: 'catgory id',
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
      specifications: [],
    });

    const response = createCarUseCase.execute({
      brand: 'brand',
      categoryId: category.id,
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
    });

    await expect(response).rejects.toEqual(new AppError('Car already exists'));
  });
});
