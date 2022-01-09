import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { UserToken } from '../../infra/typeorm/entities/UserToken';
import { IUsersTokenRepository } from '../IUsersTokenRepository';

class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  private usersToken: UserToken[] = [];

  public async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expires_date: expiresDate,
      refresh_token: refreshToken,
      user_id: userId,
    });

    this.usersToken.push(userToken);

    return userToken;
  }
}

export { UsersTokenRepositoryInMemory };
