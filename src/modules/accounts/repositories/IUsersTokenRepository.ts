import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

interface IUsersTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
}

export { IUsersTokenRepository };
