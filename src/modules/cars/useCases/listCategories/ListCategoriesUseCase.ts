import { Category } from '../../models/Category';
import { ICategoriesRespository } from '../../repositories/ICategoriesRespository';

class ListCategoriesUseCase {
  constructor(private categoriesRespository: ICategoriesRespository) {}

  public execute(): Category[] {
    const categories = this.categoriesRespository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
