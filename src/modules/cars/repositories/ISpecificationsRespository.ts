import ICreateSpecificationDTO from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../models/Specification';

interface ISpecificationsRespository {
  findByName(name: string): Specification;
  list(): Specification[];
  create(data: ICreateSpecificationDTO): Specification;
}

export { ISpecificationsRespository };
