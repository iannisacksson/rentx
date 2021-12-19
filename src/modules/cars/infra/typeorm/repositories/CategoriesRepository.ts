import { getRepository, Repository } from 'typeorm';

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);

    return category;
  }

  public async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  public async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne({
      where: { id },
    });

    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const checkCategoryNameExists = await this.repository.findOne({
      where: { name },
    });

    return checkCategoryNameExists;
  }
}

export { CategoriesRepository };
