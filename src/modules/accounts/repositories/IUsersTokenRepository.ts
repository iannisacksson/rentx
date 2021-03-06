import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

interface IUsersTokenRepository {
  findByRefreshToken(refreshToken: string): Promise<UserToken>;
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByUserIdAndRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<UserToken>;
}

export { IUsersTokenRepository };
