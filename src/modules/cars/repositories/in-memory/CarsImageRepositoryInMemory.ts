import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

import { ICarsImageRepository } from '../ICarsImageRepository';

class CarsImageRepositoryInMemory implements ICarsImageRepository {
  private carsImage: CarImage[] = [];

  public async create(carId: string, imageName: string): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, {
      car_id: carId,
      image_name: imageName,
    });

    this.carsImage.push(carImage);

    return carImage;
  }
}

export { CarsImageRepositoryInMemory };
