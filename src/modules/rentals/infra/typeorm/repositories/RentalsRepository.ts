import { getRepository, Repository } from 'typeorm';

import { ICreateRentalsDTO } from '@modules/rentals/dtos/ICreateRentalsDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  public async findById(id: string): Promise<Rental> {
    const rental = this.repository.findOne({
      where: { id },
    });

    return rental;
  }

  public async findByUserId(id: string): Promise<Rental[]> {
    const rentals = this.repository.find({
      where: { user_id: id },
      relations: ['car'],
    });

    return rentals;
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
      where: { car_id: carId, end_date: null },
    });

    return openByCar;
  }

  public async findOpenRentalByUser(userId: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id: userId, end_date: null },
    });

    return openByUser;
  }

  public async save(data: Rental): Promise<Rental> {
    return this.repository.save(data);
  }
}

export { RentalsRepository };
