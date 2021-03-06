import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { Specification } from '../../infra/typeorm/entities/Specification';
import { ISpecificationsRespository } from '../../repositories/ISpecificationsRespository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRespository')
    private specificationsRespository: ISpecificationsRespository,
  ) {}

  public async execute({
    name,
    description,
  }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationsRespository.findByName(
      name,
    );

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    const specification = await this.specificationsRespository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
