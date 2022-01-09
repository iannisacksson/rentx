import { AppError } from '@shared/errors/AppError';

import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it('should be able to authenticate user.', async () => {
    await createUserUseCase.execute({
      email: 'iann@email.com',
      driverLicense: '654321',
      name: 'Iann Isacksson',
      password: '123456',
      filename: 'avatar.png',
    });

    const token = await authenticateUserUseCase.execute({
      email: 'iann@email.com',
      password: '123456',
    });

    expect(token).toHaveProperty('token');
    expect(typeof token.token).toBe('string');
  });

  it('should not be able to authenticate user with email does not exists.', async () => {
    const response = authenticateUserUseCase.execute({
      email: 'non-existing-user',
      password: '123456',
    });

    await expect(response).rejects.toEqual(
      new AppError('Email or password incorrect.'),
    );
  });

  it('should not be able to authenticate user with incorrect password.', async () => {
    await createUserUseCase.execute({
      email: 'iann@email.com',
      driverLicense: '654321',
      name: 'Iann Isacksson',
      password: '123456',
      filename: 'avatar.png',
    });

    const response = authenticateUserUseCase.execute({
      email: 'iann@email.com',
      password: 'other-passoword',
    });

    await expect(response).rejects.toEqual(
      new AppError('Email or password incorrect.'),
    );
  });
});
