import { getRepository, Repository } from 'typeorm';

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRespository } from '@modules/cars/repositories/ISpecificationsRespository';

class SpecificationsRespository implements ISpecificationsRespository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }

  public async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    const checkSpecificationNameExists = this.repository.findOne({
      where: { name },
    });

    return checkSpecificationNameExists;
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    const checkSpecificationNameExists = this.repository.findByIds(ids);

    return checkSpecificationNameExists;
  }
}

export { SpecificationsRespository };
