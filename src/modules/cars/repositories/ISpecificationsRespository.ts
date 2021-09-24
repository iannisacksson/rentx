import ICreateSpecificationDTO from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../entities/Specification';

interface ISpecificationsRespository {
  findByName(name: string): Specification;
  list(): Specification[];
  create(data: ICreateSpecificationDTO): Specification;
}

export { ISpecificationsRespository };
