import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  public async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find(findCar => findCar.license_plate === licensePlate);
  }

  private cars: Car[] = [];

  public async create({
    brand,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id: categoryId,
      daily_rate: dailyRate,
      description,
      fine_amount: fineAmount,
      license_plate: licensePlate,
      name,
    });

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
