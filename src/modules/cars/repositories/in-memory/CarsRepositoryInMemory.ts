import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  public async findById(id: string): Promise<Car> {
    return this.cars.find(findCar => findCar.id === id);
  }

  public async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string,
  ): Promise<Car[]> {
    return this.cars.filter(findCar => {
      return (
        findCar.available ||
        (brand && findCar.brand === brand) ||
        (categoryId && findCar.category_id === categoryId) ||
        (name && findCar.name === name)
      );
    });
  }

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
    specifications,
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
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  public async save(car: Car): Promise<Car> {
    const carIndex = this.cars.findIndex(findCar => findCar.id === car.id);

    this.cars[carIndex] = car;

    return car;
  }
}

export { CarsRepositoryInMemory };
