import { ICreateRentalsDTO } from '@modules/rentals/dtos/ICreateRentalsDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  public async findById(id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.id === id);
  }

  public async findByUserId(id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === id);
  }

  public async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.car_id === carId && !rental.end_date,
    );
  }

  public async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.user_id === userId && !rental.end_date,
    );
  }

  public async create({
    userId,
    expectedReturnDate,
    carId,
  }: ICreateRentalsDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id: userId,
      expected_return_date: expectedReturnDate,
      car_id: carId,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  public async save(data: Rental): Promise<Rental> {
    const rentalIndex = this.rentals.findIndex(item => item.id === data.id);

    this.rentals[rentalIndex] = data;

    return data;
  }
}

export { RentalsRepositoryInMemory };
