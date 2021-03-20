import { Specification } from '../../models/Specification';
import { ISpecificationsRespository } from '../../repositories/ISpecificationsRespository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRespository: ISpecificationsRespository) {}

  public execute({ name, description }: IRequest): Specification {
    const specificationAlreadyExists = this.specificationsRespository.findByName(
      name,
    );

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!');
    }

    const specification = this.specificationsRespository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
