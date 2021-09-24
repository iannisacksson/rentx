import ICreateSpecificationDTO from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../entities/Specification';

interface ISpecificationsRespository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create(data: ICreateSpecificationDTO): Promise<Specification>;
}

export { ISpecificationsRespository };
