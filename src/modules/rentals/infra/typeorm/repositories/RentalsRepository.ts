import { getRepository, Repository } from 'typeorm';

import { ICreateRentalsDTO } from '@modules/rentals/dtos/ICreateRentalsDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  public async create({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalsDTO): Promise<Rental> {
    const car = this.repository.create({
      car_id: carId,
      expected_return_date: expectedReturnDate,
      user_id: userId,
    });

    await this.repository.save(car);

    return car;
  }

  public async findOpenRentalByCar(carId: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id: carId },
    });

    return openByCar;
  }

  public async findOpenRentalByUser(userId: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id: userId },
    });

    return openByUser;
  }
}

export { RentalsRepository };
