import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO';
import { ISpecificationsRespository } from '../ISpecificationsRespository';

class SpecificationsRespositoryInMemory implements ISpecificationsRespository {
  private specifications: Specification[] = [];

  public async list(): Promise<Specification[]> {
    return this.specifications;
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(findSpecification =>
      ids.includes(findSpecification.id),
    );
  }

  public async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      findSpecification => findSpecification.name === name,
    );
  }

  public async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);

    return specification;
  }
}

export { SpecificationsRespositoryInMemory };
