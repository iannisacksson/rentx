import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRespository } from '@modules/cars/repositories/ISpecificationsRespository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  carId: string;
  specificationsId: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRespository')
    private specificationsRespository: ISpecificationsRespository,
  ) {}

  public async execute({ carId, specificationsId }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(carId);

    if (!carExists) {
      throw new AppError('Car does not exists');
    }

    const specifications = await this.specificationsRespository.findByIds(
      specificationsId,
    );

    carExists.specifications = specifications;

    await this.carsRepository.save(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
