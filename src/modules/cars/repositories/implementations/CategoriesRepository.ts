import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import { Category } from '../../models/Category';
import { ICategoriesRespository } from '../ICategoriesRespository';

class CategoriesRepository implements ICategoriesRespository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  public create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      create_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }

  public list(): Category[] {
    return this.categories;
  }

  public findByName(name: string): Category | undefined {
    const checkCategoryNameExists = this.categories.find(
      category => category.name === name,
    );

    return checkCategoryNameExists;
  }
}

export { CategoriesRepository };
