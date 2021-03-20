import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import { Category } from '../models/Category';

interface ICategoriesRespository {
  findByName(name: string): Category;
  list(): Category[];
  create(data: ICreateCategoryDTO): Category;
}

export { ICategoriesRespository };
