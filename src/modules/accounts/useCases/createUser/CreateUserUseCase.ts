import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    driverLicense,
    password,
    name,
    email,
  }: ICreateUserDTO): Promise<User> {
    const userExist = this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      driverLicense,
      password: passwordHash,
      name,
      email,
    });

    return user;
  }
}

export { CreateUserUseCase };
