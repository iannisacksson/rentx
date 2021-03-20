import ICreateSpecificationDTO from '../../dtos/ICreateSpecificationDTO';
import { Specification } from '../../models/Specification';
import { ISpecificationsRespository } from '../ISpecificationsRespository';

class SpecificationsRespository implements ISpecificationsRespository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRespository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRespository {
    if (!SpecificationsRespository.INSTANCE) {
      SpecificationsRespository.INSTANCE = new SpecificationsRespository();
    }

    return SpecificationsRespository.INSTANCE;
  }

  public create({ name, description }: ICreateSpecificationDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      create_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  public list(): Specification[] {
    return this.specifications;
  }

  public findByName(name: string): Specification | undefined {
    const checkSpecificationNameExists = this.specifications.find(
      specification => specification.name === name,
    );

    return checkSpecificationNameExists;
  }
}

export { SpecificationsRespository };
