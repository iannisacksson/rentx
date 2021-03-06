import { AppError } from '@shared/errors/AppError';

import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new category.', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Category Test',
      description: 'Category description test',
    });

    expect(category).toHaveProperty('id');
    expect(category.name).toBe('Category Test');
  });

  it('should not be able to create a new category with name exists.', async () => {
    await categoriesRepositoryInMemory.create({
      name: 'Category Test',
      description: 'Category description test',
    });

    const response = createCategoryUseCase.execute({
      name: 'Category Test',
      description: 'Category description test',
    });

    await expect(response).rejects.toEqual(
      new AppError('Category already exists!'),
    );
  });
});
