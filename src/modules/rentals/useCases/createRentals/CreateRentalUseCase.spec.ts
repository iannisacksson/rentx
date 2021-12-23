import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it('should be able to create a new rental.', async () => {
    const rental = await createRentalUseCase.execute({
      carId: 'card_id',
      expectedReturnDate: dayAdd24Hours,
      userId: 'user_id',
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another to the same user.', async () => {
    await createRentalUseCase.execute({
      carId: 'other-car',
      expectedReturnDate: dayAdd24Hours,
      userId: 'user_id',
    });

    const rental = createRentalUseCase.execute({
      carId: 'card_id',
      expectedReturnDate: dayAdd24Hours,
      userId: 'user_id',
    });

    await expect(rental).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another to the same car.', async () => {
    await createRentalUseCase.execute({
      carId: 'card_id',
      expectedReturnDate: dayAdd24Hours,
      userId: 'other_user',
    });

    const rental = createRentalUseCase.execute({
      carId: 'card_id',
      expectedReturnDate: dayAdd24Hours,
      userId: 'user_id',
    });

    await expect(rental).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another to the same car.', async () => {
    const rental = createRentalUseCase.execute({
      carId: 'card_id',
      expectedReturnDate: dayjs().toDate(),
      userId: 'user_id',
    });

    await expect(rental).rejects.toBeInstanceOf(AppError);
  });
});
