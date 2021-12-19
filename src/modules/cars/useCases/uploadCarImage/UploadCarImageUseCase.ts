import { inject, injectable } from 'tsyringe';

import { CarImage } from '../../infra/typeorm/entities/CarImage';
import { ICarsImageRepository } from '../../repositories/ICarsImageRepository';

interface IRequest {
  carId: string;
  imagesName: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository,
  ) {}

  public async execute({ carId, imagesName }: IRequest): Promise<CarImage[]> {
    const carsImage = await Promise.all(
      imagesName.map(async imageName => {
        return this.carsImageRepository.create(carId, imageName);
      }),
    );

    return carsImage;
  }
}

export { UploadCarImageUseCase };
