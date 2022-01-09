import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  public async findByUserIdAndRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<UserToken> {
    const user = await this.repository.findOne({
      where: { user_id: id, refresh_token: refreshToken },
    });

    return user;
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

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokenRepository };
