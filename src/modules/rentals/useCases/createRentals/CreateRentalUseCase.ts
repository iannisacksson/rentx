import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({
    carId,
    userId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const minimunHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      carId,
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      userId,
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHour(
      dateNow,
      expectedReturnDate,
    );

    if (compare < minimunHour) {
      throw new AppError('Invalid return time');
    }

    const rental = await this.rentalsRepository.create({
      carId,
      expectedReturnDate,
      userId,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
