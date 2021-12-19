import { getRepository, Repository } from 'typeorm';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  public async create(carId: string, imageName: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id: carId,
      image_name: imageName,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImageRepository };
