import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental.', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'brand',
      categoryId: 'catgory id',
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
      specifications: [],
    });

    const rental = await createRentalUseCase.execute({
      carId: car.id,
      expectedReturnDate: dayAdd24Hours,
      userId: 'user_id',
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another to the same user.', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'brand',
      categoryId: 'catgory id',
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
      specifications: [],
    });

    await rentalsRepositoryInMemory.create({
      carId: car.id,
      expectedReturnDate: dayAdd24Hours,
      userId: 'user_id',
    });

    const rental = createRentalUseCase.execute({
      carId: 'card_id',
      expectedReturnDate: dayAdd24Hours,
      userId: 'user_id',
    });

    await expect(rental).rejects.toEqual(
      new AppError("There's a rental in progress for user"),
    );
  });

  it('should not be able to create a new rental if there is another to the same car.', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'brand',
      categoryId: 'catgory id',
      dailyRate: 100,
      description: 'Description car',
      fineAmount: 60,
      licensePlate: 'ABC-1234',
      name: 'Name car',
      specifications: [],
    });

    await createRentalUseCase.execute({
      carId: car.id,
      expectedReturnDate: dayAdd24Hours,
      userId: 'user_id',
    });

    const rental = createRentalUseCase.execute({
      carId: car.id,
      expectedReturnDate: dayAdd24Hours,
      userId: 'user_id',
    });

    await expect(rental).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('should not be able to create a new rental if there is another to the same car.', async () => {
    const rental = createRentalUseCase.execute({
      carId: 'card_id',
      expectedReturnDate: dayjs().toDate(),
      userId: 'user_id',
    });

    await expect(rental).rejects.toEqual(new AppError('Invalid return time'));
  });
});
