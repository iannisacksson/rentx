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

  public async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    return this.usersToken.find(token => token.refresh_token === refreshToken);
  }

  public async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken> {
    return this.usersToken.find(
      token => token.refresh_token === refreshToken && token.user_id === userId,
    );
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.usersToken.findIndex(token => token.id === id);

    this.usersToken.splice(findIndex, 1);
  }
}

export { UsersTokenRepositoryInMemory };
