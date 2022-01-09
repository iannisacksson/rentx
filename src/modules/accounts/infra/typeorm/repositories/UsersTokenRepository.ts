import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  public async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expires_date: expiresDate,
      refresh_token: refreshToken,
      user_id: userId,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokenRepository };
