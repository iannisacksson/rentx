import { container } from 'tsyringe';

import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRespository } from '../../modules/cars/repositories/implementations/SpecificationsRespository';
import { ISpecificationsRespository } from '../../modules/cars/repositories/ISpecificationsRespository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRespository>(
  'SpecificationsRespository',
  SpecificationsRespository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
