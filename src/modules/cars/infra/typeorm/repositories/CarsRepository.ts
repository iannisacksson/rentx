import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  public async create({
    name,
    description,
    brand,
    dailyRate,
    categoryId,
    fineAmount,
    licensePlate,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      daily_rate: dailyRate,
      category_id: categoryId,
      fine_amount: fineAmount,
      license_plate: licensePlate,
    });

    await this.repository.save(car);

    return car;
  }

  public async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: { license_plate: licensePlate },
    });

    return car;
  }

  public async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('car')
      .where('car.available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('car.brand = :brand', { brand });
    }

    if (categoryId) {
      carsQuery.andWhere('car.category_id = :id', { id: categoryId });
    }

    if (name) {
      carsQuery.andWhere('car.name = :name', { name });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}

export { CarsRepository };
